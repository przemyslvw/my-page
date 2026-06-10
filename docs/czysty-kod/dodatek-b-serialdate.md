---
sidebar_position: 19
title: "Dodatek B: org.jfree.date.SerialDate"
description: "Streszczenie: Dodatek B: org.jfree.date.SerialDate — Czysty Kod, Robert C. Martin"
---

Oto praktyczne streszczenie analizy i przebudowy klasy `org.jfree.date.SerialDate` przeprowadzonej przez Roberta C. Martina, oparte na treści rozdziału 16 oraz powiązanego z nim dodatku B.

## 1. O co chodzi w tej sekcji

Główną tezą autora jest to, że nawet kod napisany przez doświadczonego i kompetentnego programistę („dobry kod”) wymaga krytycznej recenzji i może zostać znacząco usprawniony poprzez zastosowanie zasad czystego kodu [1]. Martin udowadnia, że proces profesjonalnej refaktoryzacji musi być napędzany przez **agresywne zwiększanie pokrycia testami**, eliminację ukrytych zależności między klasami bazowymi a pochodnymi oraz bezlitosne usuwanie zaszłości historycznych, które zaciemniają strukturę systemu [2, 3].

## 2. Kluczowe zasady i reguły

Podczas analizy `SerialDate`, Martin stosuje następujące reguły:

*   **Testy to podstawa:** Nie wolno refaktoryzować kodu przy niskim pokryciu testami. Oryginalne 50% pokrycia było „dziurawym kocem”; Martin podniósł je do ponad 90%, zanim zaczął zmieniać strukturę [2].
*   **Nazewnictwo na odpowiednim poziomie abstrakcji:** Nazwa klasy nie powinna sugerować implementacji. `SerialDate` sugeruje użycie „numeru seryjnego”, co jest szczegółem technicznym. Lepiej użyć nazwy `DayDate`, która mówi o tym, co klasa reprezentuje (datę z dokładnością do dnia), a nie jak to robi [4, 5].
*   **Klasa bazowa nie zna klas pochodnych:** Naruszeniem czystości jest sytuacja, w której klasa abstrakcyjna (`SerialDate`) wywołuje konstruktor swojej klasy konkretnej (`SpreadsheetDate`). Należy to zastąpić wzorcem Fabryki Abstrakcyjnej [6].
*   **Typy wyliczeniowe zamiast stałych:** Interfejsy przechowujące stałe (jak `MonthConstants`) to relikt. Wszystkie stałe opisujące miesiące czy dni tygodnia powinny być samodzielnymi typami `enum`, co zapewnia bezpieczeństwo typów i pozwala na dodawanie do nich zachowań (metod) [5, 7, 8].
*   **Preferuj metody instancyjne nad statycznymi:** Jeśli metoda statyczna przyjmuje jako argument obiekt własnej klasy i na nim operuje (np. `addDays(int, SerialDate)`), powinna zostać zmieniona w metodę instancyjną (np. `date.plusDays(int)`), co jest bardziej naturalne w programowaniu obiektowym [9, 10].
*   **Zasada skauta:** Pozostaw kod czyściejszym, niż go zastałeś. Usuwaj komentarze z historią zmian (od tego jest system kontroli wersji) oraz zbędne znaczniki HTML w Javadoc [3, 4, 11].

## 3. Przykłady kodu

### Zastąpienie stałych typem wyliczeniowym
Zamiast dziedziczyć po interfejsie ze stałymi [5, 12]:
```java
// PRZED
public interface MonthConstants {
    public static final int JANUARY = 1;
    // ...
}
public abstract class SerialDate implements MonthConstants { ... }
```
Martin wprowadza `enum` wewnątrz klasy (lub jako osobny plik) [7, 13]:
```java
// PO
public enum Month {
    JANUARY(1), FEBRUARY(2), MARCH(3), APRIL(4), MAY(5), JUNE(6),
    JULY(7), AUGUST(8), SEPTEMBER(9), OCTOBER(10), NOVEMBER(11), DECEMBER(12);
    // ... metody pomocnicze, np. fromInt(int)
}
```

### Eliminacja zależności klasy bazowej od pochodnej
Oryginalnie klasa bazowa tworzyła instancję konkretnej podklasy [14]:
```java
// PRZED (w klasie SerialDate)
public static SerialDate createInstance(final int day, final int month, final int yyyy) {
    return new SpreadsheetDate(day, month, yyyy);
}
```
Martin wprowadza dedykowaną fabrykę [6]:
```java
// PO
public abstract class DayDateFactory {
    private static DayDateFactory factory = new SpreadsheetDateFactory();
    public static DayDate makeDate(int day, Month month, int year) {
        return factory._makeDate(day, month, year);
    }
    protected abstract DayDate _makeDate(int day, Month month, int year);
}
```

### Zmiana metody statycznej na instancyjną i poprawa ekspresywności
Metoda statyczna operująca na przekazanym obiekcie [15]:
```java
// PRZED
public static SerialDate addDays(final int days, final SerialDate base) {
    final int serialDayNumber = base.toSerial() + days;
    return SerialDate.createInstance(serialDayNumber);
}
```
Zmieniona na metodę instancyjną o lepszej nazwie [10]:
```java
// PO
public DayDate plusDays(int days) {
    return DayDateFactory.makeDate(getOrdinalDay() + days);
}
```

### Poprawa logiki warunkowej (isLeapYear)
Oryginalny kod był pełen zagnieżdżonych `if` [16]:
```java
// PRZED
public static boolean isLeapYear(final int yyyy) {
    if ((yyyy % 4) != 0) {
        return false;
    } else if ((yyyy % 400) == 0) {
        return true;
    } else if ((yyyy % 100) == 0) {
        return false;
    } else {
        return true;
    }
}
```
Wersja bardziej ekspresyjna [17]:
```java
// PO
public static boolean isLeapYear(int year) {
    boolean fourth = year % 4 == 0;
    boolean hundredth = year % 100 == 0;
    boolean fourHundredth = year % 400 == 0;
    return fourth && (!hundredth || fourHundredth);
}
```

## 4. Praktyczne wnioski

Co konkretnie zmienić w swoim kodzie po lekturze tej sekcji:

1.  **Wyczyść Javadoc:** Usuń historię zmian, informacje o autorach w każdym pliku i zbędne tagi HTML. Używaj znacznika `<pre>` dla zachowania formatowania, jeśli jest to konieczne [4, 11].
2.  **Zabij "Magiczne Liczby" i stałe interfejsów:** Jeśli widzisz klasy typu `*Constants`, zamień je na `enum`. Daje to nie tylko czytelność, ale i miejsce na logikę (np. metoda `Month.lastDay()`) [5, 17, 18].
3.  **Audyt metod statycznych:** Przejrzyj swoje metody statyczne. Jeśli większość z nich przyjmuje jako pierwszy argument obiekt danej klasy, prawdopodobnie powinny to być metody instancyjne tego obiektu [9, 19].
4.  **Uważaj na "Zazdrość o funkcje" (Feature Envy):** Jeśli metoda w klasie A intensywnie korzysta z getterów klasy B, rozważ przeniesienie tej metody do klasy B. Martin zrobił to z metodami analizującymi nazwy miesięcy, przenosząc je do enuma `Month` [20, 21].
5.  **Stosuj nazwy bez prefiksów:** Usuń prefiksy typu `f` dla pól (np. `fExpected` -> `expected`) lub `m_`. Nowoczesne IDE kolorują składnię, więc takie kodowanie zakresu jest tylko szumem [22, 23].
6.  **Hermetyzuj warunki graniczne:** Zamiast rozrzucać `+1` i `-1` po całym kodzie, nazwij te operacje lub wprowadź zmienne objaśniające (np. `int resultMonth = ... % 12 + Month.JANUARY.toInt()`) [24].