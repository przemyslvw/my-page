---
sidebar_position: 16
title: "Rozdział 16: Przebudowa klasy SerialDate"
description: "Streszczenie: Rozdział 16: Przebudowa klasy SerialDate — Czysty Kod, Robert C. Martin"
---

## Rozdział 16: Przebudowa klasy SerialDate – Praktyczne Streszczenie

W rozdziale 16 Robert C. Martin (Uncle Bob) przeprowadza „sekcję zwłok” na działającej, profesjonalnej bibliotece JCommon, a konkretnie na klasie `SerialDate` autorstwa Davida Gilberta. To lekcja pokory i rzemiosła, która pokazuje, że nawet dobry, przetestowany kod można (i należy) ulepszyć, aby stał się bardziej czytelny i łatwiejszy w utrzymaniu.

### 1. O co chodzi w tej sekcji
Główną tezą autora jest to, że **żaden kod nie jest nietykalny**, a profesjonalizm programisty objawia się w gotowości do poddawania własnej i cudzej pracy konstruktywnej krytyce. Martin pokazuje proces iteracyjnej poprawy struktury kodu (refaktoryzacji), wychodząc od zwiększenia pokrycia testami, a kończąc na całkowitej zmianie architektury klasy.

### 2. Kluczowe zasady i reguły
Uncle Bob podczas przebudowy klasy stosuje szereg heurystyk „czystego kodu”:

*   **Testy przede wszystkim:** Zanim dotkniesz kodu, musisz mieć testy o wysokim pokryciu. Martin odkrył, że oryginalne testy pokrywały tylko 50% instrukcji, co pozwoliło na ukrycie realnych błędów w logice.
*   **Wyeliminuj „zazdrość o funkcje” (Feature Envy):** Metody powinny operować na zmiennych klasy, w której się znajdują. Jeśli metoda klasy A używa głównie getterów klasy B, powinna prawdopodobnie zostać przeniesiona do klasy B.
*   **Stosuj Typy Wyliczeniowe (Enums):** Zamiast statycznych stałych typu `int` (np. `public static final int JANUARY = 1`), używaj `enum`. Zapewnia to bezpieczeństwo typów i eliminuje potrzebę walidacji „magicznych liczb”.
*   **Nazewnictwo na właściwym poziomie abstrakcji:** Nazwa `SerialDate` była zła, ponieważ sugerowała implementację (numer seryjny). Martin zmienił ją na `DayDate`, co lepiej oddaje istotę klasy (data operująca na dniach, a nie na czasie).
*   **Ukrywaj szczegóły implementacji:** Stałe specyficzne dla konkretnego sposobu przechowywania danych (np. `EARLIEST_DATE_ORDINAL`) powinny znajdować się w klasach pochodnych, a nie w klasie bazowej.
*   **Unikaj zależności bazy od pochodnych:** Klasa bazowa (`DayDate`) nie powinna wiedzieć o swoich potomkach (`SpreadsheetDate`). Martin rozwiązał to, wprowadzając wzorzec Fabryki Abstrakcyjnej (`DayDateFactory`).

### 3. Przykłady kodu

#### Naprawa błędnego algorytmu
Oryginalna metoda `getNearestDayOfWeek` zawierała błąd logiczny, który Martin wykrył dzięki testom jednostkowym.

**Przed (Błędna logika):**
```java
// Wiersz 717 w SerialDate
int adjust = -Math.abs(targetDOW - baseDOW);
if (adjust >= 4) {
    adjust = 7 - adjust;
}
if (adjust <= -4) {
    adjust = 7 + adjust;
}
return SerialDate.addDays(adjust, base);
```

**Po (Poprawna logika):**
```java
// Uproszczony i poprawny algorytm
int delta = targetDOW - base.getDayOfWeek();
int positiveDelta = delta + 7;
int adjust = positiveDelta % 7;

if (adjust > 3)
  adjust -= 7;
return SerialDate.addDays(adjust, base);
```

#### Zamiana statycznych stałych na Enum
Wprowadzenie typu wyliczeniowego dla miesięcy pozwoliło na usunięcie zbędnych metod walidujących.

**Przed (Stałe i walidacja):**
```java
public static final int JANUARY = 1;
// ...
public static boolean isValidMonthCode(final int code) {
    switch(code) {
        case JANUARY: // ...
            return true;
        default: return false;
    }
}
```

**Po (Enum wewnątrz DayDate):**
```java
public static enum Month {
    JANUARY(1), FEBRUARY(2), MARCH(3), APRIL(4), MAY(5), JUNE(6),
    JULY(7), AUGUST(8), SEPTEMBER(9), OCTOBER(10), NOVEMBER(11), DECEMBER(12);

    Month(int index) { this.index = index; }
    public final int index;

    public static Month make(int monthIndex) {
        for (Month m : Month.values()) {
            if (m.index == monthIndex) return m;
        }
        throw new IllegalArgumentException("Niewłaściwy indeks miesiąca " + monthIndex);
    }
}
```

#### Zmiana metod statycznych na instancyjne
Metody modyfikujące datę sugerowały zmianę obiektu w miejscu, co było mylące dla klasy niezmiennej (immutable).

**Przed (Statyczna i niejasna):**
```java
// Użycie: SerialDate nowaData = SerialDate.addDays(7, staraData);
public static SerialDate addDays(final int days, final SerialDate base) {
    final int serialDayNumber = base.toSerial() + days;
    return SerialDate.createInstance(serialDayNumber);
}
```

**Po (Instancyjna i opisowa):**
```java
// Użycie: DayDate nowaData = staraData.plusDays(7);
public DayDate plusDays(int days) {
    return DayDateFactory.makeDate(getOrdinalDay() + days);
}
```

### 4. Praktyczne wnioski dla programisty

1.  **Stosuj zasadę skauta:** Zawsze pozostawiaj kod nieco czyściejszym, niż go zastałeś. Nawet zmiana jednej nazwy zmiennej przy okazji naprawy błędu ma znaczenie.
2.  **Ufaj testom, nie intuicji:** Jeśli Clover (lub inne narzędzie pokrycia) pokazuje, że jakiś fragment kodu nie jest testowany, to znaczy, że prawdopodobnie zawiera błąd, o którym nie wiesz.
3.  **Wypychaj logikę do Enumów:** Jeśli masz dużo instrukcji `switch` operujących na stałych liczbowych, przenieś tę logikę do metod wewnątrz `enum`.
4.  **Używaj zmiennych tymczasowych:** Zamiast budować skomplikowane jednolinijkowe wyrażenia, rozbij je na kroki pośrednie z opisowymi nazwami zmiennych (np. `thisMonthAsOrdinal`, `resultYear`).
5.  **Usuwaj martwy kod:** Jeśli metoda nie jest używana (co wykaże analiza statyczna lub testy), usuń ją bez litości. System kontroli wersji (Git) i tak ją zapamięta.
6.  **Unikaj prefiksów:** W nowoczesnych IDE prefiksy typu `f` (dla pól) czy `m_` są zbędnym szumem. Usuń je, by kod czytało się jak prozę.

Refaktoryzacja to proces iteracyjny. Martin przyznaje, że podczas pracy nad `SerialDate` wielokrotnie cofał własne decyzje, by w kolejnym kroku znaleźć jeszcze lepsze rozwiązanie. To dążenie do doskonałości jest fundamentem profesjonalizmu w programowaniu.