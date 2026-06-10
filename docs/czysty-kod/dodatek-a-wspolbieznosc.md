---
sidebar_position: 18
title: "Dodatek A: Współbieżność II"
description: "Streszczenie: Dodatek A: Współbieżność II — Czysty Kod, Robert C. Martin"
---

## Dodatek A: Współbieżność II – Praktyczne Podsumowanie

### 1. O co chodzi w tej sekcji
Główną tezą autora jest to, że **współbieżność jest zbyt złożona, aby mieszać ją z logiką biznesową**, dlatego zarządzanie wątkami musi być odseparowane i zamknięte w dedykowanych klasach zgodnie z Zasadą Pojedynczej Odpowiedzialności (SRP). Sekcja ta udowadnia, że nawet proste operacje w Javie nie są atomowe na poziomie kodu bajtowego, co przy braku odpowiedniej struktury i testowania prowadzi do błędów niemożliwych do powtórzenia w kontrolowanych warunkach.

### 2. Kluczowe zasady i reguły
*   **Separacja odpowiedzialności (SRP):** Kod zarządzający współbieżnością powinien zajmować się wyłącznie wątkami i być oddzielony od logiki aplikacji.
*   **Wybieraj blokowanie na serwerze zamiast na kliencie:** Blokowanie po stronie klienta jest kruche, narusza zasadę DRY i zmusza każdego użytkownika do pamiętania o synchronizacji; lepiej udostępnić jedną, bezpieczną metodę na serwerze.
*   **Znajomość bibliotek to podstawa:** Zamiast prymitywnych blokad `synchronized`, używaj `java.util.concurrent`, klasy `Executor` oraz atomowych zmiennych z `java.util.concurrent.atomic`.
*   **Rozwiązania nieblokujące są wydajniejsze:** Mechanizmy typu *Compare and Swap* (CAS) stosowane w klasach atomowych są zazwyczaj szybsze niż pesymistyczne blokowanie, ponieważ unikają narzutu związanego z nakładaniem blokady.
*   **Zależności między metodami niszczą bezpieczeństwo wątkowe:** Nawet jeśli pojedyncze metody są zsynchronizowane, ich sekwencyjne wywołanie (np. `if(list.hasNext()) list.next()`) może prowadzić do błędów, jeśli inny wątek wtrąci się między nie.
*   **Minimalizuj sekcje krytyczne:** Blokady `synchronized` powinny być jak najmniejsze, aby nie ograniczać niepotrzebnie przepustowości systemu.
*   **Zrozum cztery warunki zakleszczenia:** Aby uniknąć martwego ciągu (deadlock), musisz złamać jeden z warunków: wzajemne wykluczanie, blokowanie i oczekiwanie, brak wywłaszczania lub cykliczne oczekiwanie.

### 3. Przykłady kodu

#### SRP: Wydzielenie zarządzania wątkami
Poniżej przykład naiwnej implementacji serwera, gdzie zarządzanie wątkami jest wymieszane z logiką obsługi gniazda (przed refaktoryzacją):

```java
// Przed refaktoryzacją - naruszenie SRP
void process(final Socket socket) {
    if (socket == null) return;
    Runnable clientHandler = new Runnable() {
        public void run() {
            try {
                String message = MessageUtils.getMessage(socket);
                MessageUtils.sendMessage(socket, "Processed: " + message);
                socket.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };
    Thread clientConnection = new Thread(clientHandler);
    clientConnection.start();
}
```

Po refaktoryzacji wprowadzamy interfejs `ClientScheduler`, który pozwala na zmianę strategii wątkowania bez dotykania logiki serwera:

```java
// Po refaktoryzacji - czyste SRP
public void run() {
    while (keepProcessing) {
        try {
            ClientConnection clientConnection = connectionManager.awaitClient();
            ClientRequestProcessor requestProcessor = new ClientRequestProcessor(clientConnection);
            clientScheduler.schedule(requestProcessor); // Strategia wątków jest tutaj
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    connectionManager.shutdown();
}
```

#### Zależności między metodami (Blokowanie na serwerze)
Problem z zewnątrz bezpiecznymi metodami, które razem tworzą niebezpieczną sekwencję:

```java
// PROBLEM: Kod klienta korzystający z bezpiecznych metod w sposób niebezpieczny
IntegerIterator iterator = new IntegerIterator();
while(iterator.hasNext()) { // Inny wątek może zmienić stan tu...
    int nextValue = iterator.next(); // ...zanim to wywołanie nastąpi
}
```

Rozwiązanie poprzez zmianę API serwera, co eliminuje potrzebę blokowania na kliencie:

```java
// ROZWIĄZANIE: Blokowanie na serwerze (zmiana API)
public class IntegerIteratorServerLocked {
    private Integer nextValue = 0;
    public synchronized Integer getNextOrNull() { // Operacja atomowa łącząca sprawdzanie i pobieranie
        if (nextValue < 100000)
            return nextValue++;
        else
            return null;
    }
}
```

#### Wykorzystanie zmiennych atomowych
Zastąpienie ciężkiej synchronizacji wydajniejszym rozwiązaniem nieblokującym:

```java
// Przed: Blokowanie pesymistyczne
public class ObjectWithValue {
    private int value;
    public synchronized void incrementValue() { ++value; }
    public int getValue() { return value; }
}

// Po: Rozwiązanie nieblokujące (CAS)
public class ObjectWithValue {
    private AtomicInteger value = new AtomicInteger(0);
    public void incrementValue() {
        value.incrementAndGet();
    }
    public int getValue() {
        return value.get();
    }
}
```

### 4. Praktyczne wnioski – co zmienić w swoim kodzie?

1.  **Przestań używać `synchronized` na poziomie całych metod biznesowych.** Sprawdź, czy nie możesz ograniczyć blokady tylko do kilku linii modyfikujących wspólny stan lub zastąpić jej klasami z pakietu `atomic`.
2.  **Przejrzyj pętle z iteratorami i operacjami „jeśli istnieje, to zrób”.** Jeśli iterator jest współdzielony, przenieś tę logikę do jednej zsynchronizowanej metody na serwerze (np. `putIfAbsent` zamiast `if(!contains) put`).
3.  **Wyrzuć ręczne tworzenie obiektów `new Thread()`.** Zacznij korzystać z `ExecutorService` i pul wątków. Pozwala to na lepszą kontrolę nad zasobami i oddziela „co” ma być zrobione od tego „jak” (w ilu wątkach).
4.  **Wprowadź instrumentację do testów.** Jeśli masz błąd, którego nie możesz powtórzyć, dodaj do kodu testowego losowe wywołania `Thread.yield()` lub `Thread.sleep()`. To „wstrząsanie” (jiggling) zwiększa prawdopodobieństwo wykrycia wyścigów (race conditions) poprzez zmianę kolejności przełączania kontekstu.
5.  **Uczyń kod wątków „konfigurowalnym”.** Pozwól na łatwą zmianę liczby wątków w testach, aby móc uruchomić system w konfiguracji z większą liczbą wątków niż procesorów, co wymusza częstsze przełączanie zadań i ujawnia błędy sekcji krytycznych.
6.  **Zawsze dostarczaj kontekst w wyjątkach współbieżnych.** Standardowy ślad stosu często nie wystarcza do zdiagnozowania problemu w środowisku wielowątkowym; dodawaj informacje o tym, jaka operacja zawiodła i jaki był stan obiektu.