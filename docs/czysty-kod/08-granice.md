---
sidebar_position: 8
title: "Rozdział 8: Granice"
description: "Streszczenie: Rozdział 8: Granice — Czysty Kod, Robert C. Martin"
---

## Rozdział 8: Granice — Jak zachować kontrolę nad własnym systemem

### O co chodzi w tej sekcji
Rozdział ten skupia się na problematyce integracji kodu, którego nie jesteśmy autorami — bibliotek zewnętrznych, pakietów open source czy komponentów dostarczanych przez inne zespoły — z naszą własną aplikacją [1]. Główną tezą autora jest to, że na granicach systemów zachodzą procesy, które mogą prowadzić do chaosu, dlatego musimy stosować techniki hermetyzacji i separacji, aby zmiany w zewnętrznych zależnościach nie wymusiły kosztownej przebudowy całego naszego kodu [1, 2]. Chodzi o to, abyśmy to my kontrolowali granice naszego oprogramowania, a nie byli przez nie kontrolowani [2].

### Kluczowe zasady i reguły

*   **Unikaj przesyłania interfejsów zewnętrznych przez całą aplikację** — Dostawcy bibliotek dążą do maksymalnej elastyczności (np. `java.util.Map`), co często kłóci się z konkretnymi potrzebami Twojej aplikacji [3]. Przekazywanie takich obiektów jako parametrów lub wyników metod powoduje, że każda zmiana w bibliotece uderza w wiele miejsc w systemie [4].
*   **Hermetyzuj granice** — Zamiast bezpośrednio korzystać z zewnętrznego API w całej aplikacji, zamknij je w dedykowanej klasie (wrapperze) [5]. Dzięki temu rzutowanie i zarządzanie typami odbywa się w jednym miejscu, a reszta systemu operuje na czystych, domenowych interfejsach [5].
*   **Stosuj testy uczące (Learning Tests)** — Zamiast eksperymentować z nową biblioteką w kodzie produkcyjnym, napisz serię testów sprawdzających Twoje zrozumienie zewnętrznego API [6]. Pozwalają one na kontrolowane poznawanie funkcji biblioteki i wykrywanie problemów przed integracją [6].
*   **Testy uczące to darmowe ubezpieczenie** — Kiedy pojawia się nowa wersja biblioteki, wystarczy uruchomić testy uczące, aby sprawdzić, czy zmiany u dostawcy nie wpłynęły negatywnie na Twoją aplikację [7]. Jeśli testy przechodzą, ryzyko aktualizacji jest minimalne; jeśli nie, natychmiast wiesz o regresji [7].
*   **Definiuj granice dla kodu, który jeszcze nie istnieje** — Jeśli Twój zespół czeka na moduł od innego zespołu, którego API nie jest jeszcze znane, zdefiniuj własny, idealny interfejs, który odpowiada Twoim potrzebom [8, 9]. Pozwoli to pisać kod bez blokowania prac, a po otrzymaniu gotowego modułu wystarczy dopisać prosty adapter [9].
*   **Rób tylko to, czego potrzebujesz** — Ograniczaj interfejsy zewnętrzne do podzbioru funkcji, których faktycznie używa Twój system, co ułatwia testowanie i zrozumienie logiki biznesowej [5].

### Przykłady kodu

#### Przykład 1: Hermetyzacja klasy `Map`

W tym przykładzie autor pokazuje, jak niebezpieczne jest używanie surowej mapy w wielu miejscach systemu.

**Przed refaktoryzacją (kod „brudny”):**
Pobieranie obiektu z mapy wymaga rzutowania, co zaśmieca kod i utrudnia czytanie [10].
```java
Map sensors = new HashMap();
// ... gdzieś w kodzie
Sensor s = (Sensor)sensors.get(sensorId);
```

Nawet użycie typów ogólnych (Generics) nie rozwiązuje problemu nadmiernej elastyczności mapy [4].
```java
Map<Sensor> sensors = new HashMap<Sensor>();
// ... gdzieś w kodzie
Sensor s = sensors.get(sensorId);
```

**Po refaktoryzacji (kod czysty):**
Interfejs `Map` zostaje ukryty wewnątrz klasy `Sensors`. Pozostała część aplikacji nie wie o istnieniu mapy i nie może np. przypadkowo wyczyścić jej zawartości metodą `clear()` [5].
```java
public class Sensors {
    private Map sensors = new HashMap();

    public Sensor getById(String id) {
        return (Sensor) sensors.get(id);
    }
    // Pozostałe metody ograniczone do potrzeb aplikacji
}
```

#### Przykład 2: Testy uczące dla biblioteki log4j

Zamiast czytać całą dokumentację, programista sprawdza działanie biblioteki poprzez testy jednostkowe [11].

```java
public class LogTest {
    private Logger logger;

    @Before
    public void initialize() {
        logger = Logger.getLogger("logger");
        logger.removeAllAppenders();
        Logger.getRootLogger().removeAllAppenders();
    }

    @Test
    public void basicLogger() {
        BasicConfigurator.configure();
        logger.info("basicLogger");
    }

    @Test
    public void addAppenderWithStream() {
        logger.addAppender(new ConsoleAppender(
            new PatternLayout("%p %t %m%n"),
            ConsoleAppender.SYSTEM_OUT));
        logger.info("addAppenderWithStream");
    }
}
```
Zastosowanie testów uczących pozwoliło odkryć, że domyślny konstruktor `ConsoleAppender` wymaga dodatkowej konfiguracji, co bez testów mogłoby prowadzić do długiego debugowania [12, 13].

#### Przykład 3: Adapter dla nieistniejącego kodu

Gdy API nadajnika nie było jeszcze zdefiniowane, zespół utworzył własny interfejs `Transmitter` z metodą `transmit`, co pozwoliło na kontynuowanie prac nad logiką kontrolera [9].

```java
// Nasz idealny interfejs, nad którym mamy kontrolę
public interface Transmitter {
    void transmit(double frequency, Stream stream);
}

// Późniejszy adapter łączący nasz interfejs z API dostarczonym przez inną stronę
public class TransmitterAdapter implements Transmitter {
    private ExternalTransmitterAPI api;

    public void transmit(double frequency, Stream stream) {
        // Mapowanie naszego wywołania na metody zewnętrznego API
        api.setFrequency(frequency);
        api.sendData(stream);
    }
}
```

### Praktyczne wnioski

Po lekturze tej sekcji powinieneś wprowadzić następujące zmiany w swoim sposobie kodowania:

1.  **Przejrzyj publiczne API swoich modułów** — Jeśli zwracasz z nich bezpośrednio typy takie jak `Map`, `List` czy inne skomplikowane obiekty z bibliotek zewnętrznych, zastanów się nad ich opakowaniem w obiekty domenowe [5].
2.  **Zastosuj zasadę „używaj tego, co kontrolujesz”** — Kiedy integrujesz nową bibliotekę, napisz dla niej „testy uczące” [6]. Nie traktuj ich jako jednorazowych skryptów — wrzuć je do repozytorium, aby służyły jako strażnicy przy przyszłych aktualizacjach biblioteki [7].
3.  **Projektuj interfejsy od strony użytkownika, a nie dostawcy** — Jeśli potrzebujesz specyficznej funkcji od zewnętrznego systemu, zdefiniuj własny interfejs, który ją opisuje, a następnie użyj wzorca Adapter, aby „przetłumaczyć” go na język obcej biblioteki [2, 9].
4.  **Ograniczaj punkty styku** — Kod graniczny powinien być skoncentrowany w minimalnej liczbie miejsc [2]. Rozsianie wywołań biblioteki zewnętrznej po całym projekcie to przepis na „sztywną” architekturę, którą bardzo trudno zmienić [2].
5.  **Nie ufaj intuicji przy API firm trzecich** — Dokumentacja często kłamie lub jest niepełna [12]. Tylko testy uczące dają pewność, jak biblioteka zachowuje się w Twoim konkretnym środowisku wykonawczym [7].