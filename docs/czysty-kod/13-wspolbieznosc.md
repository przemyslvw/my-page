---
sidebar_position: 13
title: "Rozdział 13: Współbieżność"
description: "Streszczenie: Rozdział 13: Współbieżność — Czysty Kod, Robert C. Martin"
---

## O co chodzi w sekcji Współbieżność

Współbieżność to przede wszystkim strategia **oddzielenia tego, co jest wykonywane, od tego, kiedy jest wykonywane** [1, 2]. W aplikacjach jednowątkowych te dwa aspekty są ze sobą nierozerwalnie złączone, co ułatwia debugowanie, ale ogranicza wydajność i narzuca sztywną strukturę kodu [2]. Głównym celem stosowania wątków jest poprawa przepustowości i struktury aplikacji, jednak cena za to jest wysoka: pisanie poprawnego kodu wielowątkowego jest ekstremalnie trudne, ponieważ błędy często ujawniają się dopiero pod dużym obciążeniem lub w rzadkich, trudnych do powtórzenia warunkach [1-3].

## Kluczowe zasady i reguły

*   **Zasada pojedynczej odpowiedzialności (SRP):** Kod zarządzający współbieżnością powinien być całkowicie odizolowany od reszty logiki biznesowej [4, 5]. Zarządzanie wątkami ma własny cykl życia, wyzwania i sposoby testowania [5].
*   **Ograniczanie zakresu danych:** Należy rygorystycznie stosować hermetyzację i minimalizować liczbę miejsc, w których dane są współużytkowane [5, 6]. Każda dodatkowa sekcja krytyczna to większe ryzyko przeoczenia blokady lub powielenia błędów [6].
*   **Wątki powinny być niezależne:** Najbezpieczniejszą metodą jest projektowanie wątków tak, aby każdy z nich przetwarzał żądanie w izolacji, korzystając wyłącznie ze zmiennych lokalnych [7, 8].
*   **Korzystanie z kopii danych:** Jeśli to możliwe, zamiast synchronizować dostęp do obiektu, lepiej pracować na jego kopii przeznaczonej tylko do odczytu lub połączyć wyniki z wielu wątków na samym końcu [9].
*   **Znajomość bibliotek klasy `java.util.concurrent`:** Zamiast ręcznie budować blokady, należy używać gotowych, bezpiecznych kolekcji (np. `ConcurrentHashMap`), wykonawców (`Executor`) do zarządzania zadaniami oraz rozwiązań nieblokujących (np. `AtomicInteger`) [10-12].
*   **Minimalizacja sekcji synchronizowanych:** Blokady są kosztowne i zwiększają rywalizację o zasoby, dlatego sekcje chronione przez `synchronized` powinny być tak małe, jak to tylko możliwe [13, 14].
*   **Unikanie zależności między metodami synchronizowanymi:** Jeśli obiekt posiada więcej niż jedną metodę synchronizowaną, ich łączne wywoływanie przez klienta często prowadzi do subtelnych błędów, które wymagają dodatkowego blokowania po stronie serwera lub adaptera [15, 16].

## Przykłady kodu

### Pułapka operacji atomowych
Naiwny programista może sądzić, że prosta inkrementacja jest bezpieczna. W rzeczywistości jeden wiersz kodu Java odpowiada wielu instrukcjom kodu bajtowego, co przy dwóch wątkach może prowadzić do utraty danych [17, 18].

```java
// Przykład potencjalnego błędu - operacja ++ nie jest atomowa [17]
public class IdGenerator {
    private int lastIdUsed;
    public int getNextId() {
        return ++lastIdUsed; // Tutaj może wystąpić wyścig (race condition) [17, 18]
    }
}
```

### Refaktoryzacja: Oddzielenie zarządzania wątkami
Zamiast mieszać logikę serwera z tworzeniem wątków, należy wydzielić harmonogram do osobnej klasy [19, 20].

**Przed (logika wymieszana z wątkami):**
```java
// Serwer tworzy wątki bezpośrednio w metodzie procesującej [19]
void process(final Socket socket) {
    if (socket == null) return;
    Runnable clientHandler = new Runnable() {
        public void run() {
            // ... logika obsługi klienta ...
        }
    };
    Thread clientConnection = new Thread(clientHandler);
    clientConnection.start();
}
```

**Po (zastosowanie SRP):**
```java
// Logika biznesowa nie wie o istnieniu wątków - zarządza nimi scheduler [20, 21]
public void run() {
    while (keepProcessing) {
        try {
            ClientConnection clientConnection = connectionManager.awaitClient();
            ClientRequestProcessor requestProcessor = new ClientRequestProcessor(clientConnection);
            clientScheduler.schedule(requestProcessor); // Jedno miejsce kontroli wątków [20]
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Rozwiązania nieblokujące zamiast blokad
Użycie klas atomowych jest zazwyczaj wydajniejsze niż słowo kluczowe `synchronized`, ponieważ wykorzystuje sprzętowe wsparcie procesora dla operacji Compare and Swap (CAS) [12, 22].

```java
// Zamiast synchronizacji... [12]
public class ObjectWithValue {
    private int value;
    public synchronized void incrementValue() { ++value; }
}

// ...lepiej użyć AtomicInteger [22]
public class ObjectWithValue {
    private AtomicInteger value = new AtomicInteger(0);
    public void incrementValue() {
        value.incrementAndGet(); // Wydajniejsze i bezpieczne [22]
    }
}
```

### Blokowanie na serwerze vs na kliencie
Blokowanie na kliencie jest ryzykowne, bo każdy programista musi pamiętać o blokadzie. Lepiej zmienić API serwera, by było bezpieczne z natury [23, 24].

**Ryzykowne blokowanie na kliencie:**
```java
// Klient musi pamiętać o synchronizacji iteratora [23]
synchronized (iterator) {
    if (iterator.hasNext()) {
        nextValue = iterator.next();
    }
}
```

**Bezpieczne blokowanie na serwerze:**
```java
// Serwer udostępnia jedną, bezpieczną metodę [24]
public class IntegerIteratorServerLocked {
    private Integer nextValue = 0;
    public synchronized Integer getNextOrNull() {
        if (nextValue < 100000) return nextValue++;
        else return null;
    }
}
```

## Praktyczne wnioski

1.  **Traktuj każdą przypadkową awarię poważnie:** W świecie wielowątkowości nie istnieją "sytuacje jednorazowe" [25]. Jeśli test zawiódł raz na tysiąc uruchomień, oznacza to realny błąd w logice współbieżności, a nie szum systemowy [25].
2.  **Najpierw uruchamiaj kod w jednym wątku:** Upewnij się, że logika biznesowa (POJO) działa poprawnie poza środowiskiem wielowątkowym [26]. Nie szukaj jednocześnie błędów w algorytmie i w synchronizacji [26].
3.  **Wymuszaj błędy przez "wstrząsanie" kodem:** Podczas testów wstawiaj ręcznie lub automatycznie wywołania `Thread.yield()` lub `Thread.sleep()` w sekcjach krytycznych [27-29]. Pozwala to przetestować różne ścieżki wykonania i znacznie zwiększa szansę na wykrycie ukrytych wyścigów [27, 30].
4.  **Testuj na wielu platformach i z różnym obciążeniem:** Zasady szeregowania wątków różnią się między systemami operacyjnymi (np. OS X vs Windows) [27, 31]. Kod musi być testowany w każdym środowisku docelowym [27].
5.  **Uruchamiaj więcej wątków niż masz rdzeni procesora:** Przełączanie kontekstu jest momentem, w którym najczęściej dochodzi do błędów; wymuszenie częstszego przełączania pomaga ujawnić brakujące sekcje krytyczne [31, 32].
6.  **Używaj standardowych algorytmów:** Naucz się rozpoznawać problemy typu Producent-Konsument czy Czytelnik-Pisarz i stosuj dla nich sprawdzone rozwiązania, zamiast wymyślać własne mechanizmy sygnalizacji [33-35].