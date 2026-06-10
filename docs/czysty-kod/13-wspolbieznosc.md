---
sidebar_position: 13
title: "Rozdział 13: Współbieżność"
description: "Streszczenie: Rozdział 13: Współbieżność — Czysty Kod, Robert C. Martin"
---

## O co chodzi w sekcji Współbieżność

Współbieżność to przede wszystkim strategia **oddzielenia tego, co jest wykonywane, od tego, kiedy jest wykonywane**. W aplikacjach jednowątkowych te dwa aspekty są ze sobą nierozerwalnie złączone, co ułatwia debugowanie, ale ogranicza wydajność i narzuca sztywną strukturę kodu. Głównym celem stosowania wątków jest poprawa przepustowości i struktury aplikacji, jednak cena za to jest wysoka: pisanie poprawnego kodu wielowątkowego jest ekstremalnie trudne, ponieważ błędy często ujawniają się dopiero pod dużym obciążeniem lub w rzadkich, trudnych do powtórzenia warunkach.

## Kluczowe zasady i reguły

*   **Zasada pojedynczej odpowiedzialności (SRP):** Kod zarządzający współbieżnością powinien być całkowicie odizolowany od reszty logiki biznesowej. Zarządzanie wątkami ma własny cykl życia, wyzwania i sposoby testowania.
*   **Ograniczanie zakresu danych:** Należy rygorystycznie stosować hermetyzację i minimalizować liczbę miejsc, w których dane są współużytkowane. Każda dodatkowa sekcja krytyczna to większe ryzyko przeoczenia blokady lub powielenia błędów.
*   **Wątki powinny być niezależne:** Najbezpieczniejszą metodą jest projektowanie wątków tak, aby każdy z nich przetwarzał żądanie w izolacji, korzystając wyłącznie ze zmiennych lokalnych.
*   **Korzystanie z kopii danych:** Jeśli to możliwe, zamiast synchronizować dostęp do obiektu, lepiej pracować na jego kopii przeznaczonej tylko do odczytu lub połączyć wyniki z wielu wątków na samym końcu.
*   **Znajomość bibliotek klasy `java.util.concurrent`:** Zamiast ręcznie budować blokady, należy używać gotowych, bezpiecznych kolekcji (np. `ConcurrentHashMap`), wykonawców (`Executor`) do zarządzania zadaniami oraz rozwiązań nieblokujących (np. `AtomicInteger`).
*   **Minimalizacja sekcji synchronizowanych:** Blokady są kosztowne i zwiększają rywalizację o zasoby, dlatego sekcje chronione przez `synchronized` powinny być tak małe, jak to tylko możliwe.
*   **Unikanie zależności między metodami synchronizowanymi:** Jeśli obiekt posiada więcej niż jedną metodę synchronizowaną, ich łączne wywoływanie przez klienta często prowadzi do subtelnych błędów, które wymagają dodatkowego blokowania po stronie serwera lub adaptera.

## Przykłady kodu

### Pułapka operacji atomowych
Naiwny programista może sądzić, że prosta inkrementacja jest bezpieczna. W rzeczywistości jeden wiersz kodu Java odpowiada wielu instrukcjom kodu bajtowego, co przy dwóch wątkach może prowadzić do utraty danych.

```java
// Przykład potencjalnego błędu - operacja ++ nie jest atomowa
public class IdGenerator {
    private int lastIdUsed;
    public int getNextId() {
        return ++lastIdUsed; // Tutaj może wystąpić wyścig (race condition)
    }
}
```

### Refaktoryzacja: Oddzielenie zarządzania wątkami
Zamiast mieszać logikę serwera z tworzeniem wątków, należy wydzielić harmonogram do osobnej klasy.

**Przed (logika wymieszana z wątkami):**
```java
// Serwer tworzy wątki bezpośrednio w metodzie procesującej
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
// Logika biznesowa nie wie o istnieniu wątków - zarządza nimi scheduler
public void run() {
    while (keepProcessing) {
        try {
            ClientConnection clientConnection = connectionManager.awaitClient();
            ClientRequestProcessor requestProcessor = new ClientRequestProcessor(clientConnection);
            clientScheduler.schedule(requestProcessor); // Jedno miejsce kontroli wątków
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### Rozwiązania nieblokujące zamiast blokad
Użycie klas atomowych jest zazwyczaj wydajniejsze niż słowo kluczowe `synchronized`, ponieważ wykorzystuje sprzętowe wsparcie procesora dla operacji Compare and Swap (CAS).

```java
// Zamiast synchronizacji...
public class ObjectWithValue {
    private int value;
    public synchronized void incrementValue() { ++value; }
}

// ...lepiej użyć AtomicInteger
public class ObjectWithValue {
    private AtomicInteger value = new AtomicInteger(0);
    public void incrementValue() {
        value.incrementAndGet(); // Wydajniejsze i bezpieczne
    }
}
```

### Blokowanie na serwerze vs na kliencie
Blokowanie na kliencie jest ryzykowne, bo każdy programista musi pamiętać o blokadzie. Lepiej zmienić API serwera, by było bezpieczne z natury.

**Ryzykowne blokowanie na kliencie:**
```java
// Klient musi pamiętać o synchronizacji iteratora
synchronized (iterator) {
    if (iterator.hasNext()) {
        nextValue = iterator.next();
    }
}
```

**Bezpieczne blokowanie na serwerze:**
```java
// Serwer udostępnia jedną, bezpieczną metodę
public class IntegerIteratorServerLocked {
    private Integer nextValue = 0;
    public synchronized Integer getNextOrNull() {
        if (nextValue < 100000) return nextValue++;
        else return null;
    }
}
```

## Praktyczne wnioski

1.  **Traktuj każdą przypadkową awarię poważnie:** W świecie wielowątkowości nie istnieją "sytuacje jednorazowe". Jeśli test zawiódł raz na tysiąc uruchomień, oznacza to realny błąd w logice współbieżności, a nie szum systemowy.
2.  **Najpierw uruchamiaj kod w jednym wątku:** Upewnij się, że logika biznesowa (POJO) działa poprawnie poza środowiskiem wielowątkowym. Nie szukaj jednocześnie błędów w algorytmie i w synchronizacji.
3.  **Wymuszaj błędy przez "wstrząsanie" kodem:** Podczas testów wstawiaj ręcznie lub automatycznie wywołania `Thread.yield()` lub `Thread.sleep()` w sekcjach krytycznych. Pozwala to przetestować różne ścieżki wykonania i znacznie zwiększa szansę na wykrycie ukrytych wyścigów.
4.  **Testuj na wielu platformach i z różnym obciążeniem:** Zasady szeregowania wątków różnią się między systemami operacyjnymi (np. OS X vs Windows). Kod musi być testowany w każdym środowisku docelowym.
5.  **Uruchamiaj więcej wątków niż masz rdzeni procesora:** Przełączanie kontekstu jest momentem, w którym najczęściej dochodzi do błędów; wymuszenie częstszego przełączania pomaga ujawnić brakujące sekcje krytyczne.
6.  **Używaj standardowych algorytmów:** Naucz się rozpoznawać problemy typu Producent-Konsument czy Czytelnik-Pisarz i stosuj dla nich sprawdzone rozwiązania, zamiast wymyślać własne mechanizmy sygnalizacji.