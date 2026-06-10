---
sidebar_position: 15
title: "Rozdział 15: Struktura biblioteki JUnit"
description: "Streszczenie: Rozdział 15: Struktura biblioteki JUnit — Czysty Kod, Robert C. Martin"
---

## Rozdział 15: Struktura biblioteki JUnit – Praktyczne streszczenie

### 1. O co chodzi w tej sekcji
Głównym celem tego rozdziału jest demonstracja procesu profesjonalnej krytyki i refaktoryzacji kodu na przykładzie klasy `ComparisonCompactor` z biblioteki JUnit. Robert C. Martin (Wujek Bob) stawia tezę, że nawet „ikoniczny” kod napisany przez mistrzów (Kent Beck, Erich Gamma) nie jest doskonały i zawsze może zostać ulepszony poprzez rygorystyczne stosowanie zasad czystego kodu oraz **zasady skautów** — pozostawienia modułu czyściejszym, niż go zastaliśmy.

### 2. Kluczowe zasady i reguły
W trakcie analizy i poprawiania klasy `ComparisonCompactor`, autor stosuje następujące heurystyki i reguły:

*   **Eliminacja prefiksów:** Współczesne środowiska programistyczne czynią prefiksy (np. `fPrefix`) zbędnymi; kodowanie zakresu zmiennych w ich nazwach to nadmiarowa informacja.
*   **Hermetyzacja warunków logicznych:** Złożone instrukcje `if` należy wydzielać do osobnych metod o opisowych nazwach, aby intencje autora były od razu jasne.
*   **Dobór znaczących nazw:** Nazwy zmiennych i metod powinny ewoluować wraz ze strukturą kodu. Zmiana `fExpected` na `expected` to tylko początek; ważniejsze jest unikanie nazw, które nie mówią prawdy o tym, co funkcja faktycznie zwraca (np. zmiana `compact` na `formatCompactedComparison`).
*   **Unikanie warunków negatywnych:** Wyrażenia pozytywne (np. `canBeCompacted()`) są znacznie łatwiejsze do zrozumienia dla ludzkiego mózgu niż ich negatywne odpowiedniki (np. `!shouldNotCompact()`).
*   **Zasada jednej odpowiedzialności (SRP):** Funkcja powinna robić jedną rzecz. Jeśli metoda formatuje komunikat i jednocześnie oblicza różnice, należy ją podzielić na mniejsze, wyspecjalizowane jednostki.
*   **Ujawnianie sprzężeń czasowych:** Jeśli pewne funkcje muszą być wywoływane w określonej kolejności, warto to zaznaczyć, np. poprzez przekazywanie wyniku jednej funkcji jako argumentu do drugiej, zamiast polegać na niejawnym ustawianiu pól klasy.
*   **Usuwanie martwego kodu:** Należy bezwzględnie usuwać instrukcje `if`, które nigdy nie są spełnione, lub zmienne, które po refaktoryzacji stały się zbędne.
*   **Sortowanie topologiczne:** Definicje funkcji powinny znajdować się zaraz po ich pierwszym użyciu, co pozwala czytać kod od góry do dołu jak artykuł w gazecie.

### 3. Przykłady kodu

#### Przed refaktoryzacją (oryginalny kod JUnit)
Oryginalna implementacja zawierała prefiksy, wymieszane poziomy abstrakcji i niejasne operacje matematyczne (np. słynne `+1`).

```java
// Listing 15.2. ComparisonCompactor.java (Oryginalny)
package junit.framework;

public class ComparisonCompactor {
  private static final String ELLIPSIS = "...";
  private static final String DELTA_END = "]";
  private static final String DELTA_START = "[";
  private int fContextLength;
  private String fExpected;
  private String fActual;
  private int fPrefix;
  private int fSuffix;

  public ComparisonCompactor(int contextLength, String expected, String actual) {
    fContextLength = contextLength;
    fExpected = expected;
    fActual = actual;
  }

  public String compact(String message) {
    if (fExpected == null || fActual == null || areStringsEqual())
      return Assert.format(message, fExpected, fActual);
    findCommonPrefix();
    findCommonSuffix();
    String expected = compactString(fExpected);
    String actual = compactString(fActual);
    return Assert.format(message, expected, actual);
  }

  private String compactString(String source) {
    String result = DELTA_START + 
                    source.substring(fPrefix, source.length() - fSuffix + 1) + 
                    DELTA_END;
    if (fPrefix > 0)
      result = computeCommonPrefix() + result;
    if (fSuffix > 0)
      result = result + computeCommonSuffix();
    return result;
  }

  private void findCommonPrefix() {
    fPrefix = 0;
    int end = Math.min(fExpected.length(), fActual.length());
    for (; fPrefix < end; fPrefix++) {
      if (fExpected.charAt(fPrefix) != fActual.charAt(fPrefix))
        break;
    }
  }

  private void findCommonSuffix() {
    int expectedSuffix = fExpected.length() - 1;
    int actualSuffix = fActual.length() - 1;
    for (; actualSuffix >= fPrefix && expectedSuffix >= fPrefix; 
         actualSuffix--, expectedSuffix--) {
      if (fExpected.charAt(expectedSuffix) != fActual.charAt(actualSuffix))
        break;
    }
    fSuffix = fExpected.length() - expectedSuffix;
  }

  private String computeCommonPrefix() {
    return (fPrefix > fContextLength ? ELLIPSIS : "") + 
           fExpected.substring(Math.max(0, fPrefix - fContextLength), fPrefix);
  }

  private String computeCommonSuffix() {
    int end = Math.min(fExpected.length() - fSuffix + 1 + fContextLength, 
                       fExpected.length());
    return fExpected.substring(fExpected.length() - fSuffix + 1, end) + 
           (fExpected.length() - fSuffix + 1 < fExpected.length() - fContextLength 
            ? ELLIPSIS : "");
  }

  private boolean areStringsEqual() {
    return fExpected.equals(fActual);
  }
}
```

#### Po refaktoryzacji (wersja Wujka Boba)
Kod stał się bardziej modularny, nazwy są precyzyjne, a logika została rozdzielona na funkcje analityczne i syntetyczne.

```java
// Listing 15.5. ComparisonCompactor.java (Ostateczny)
package junit.framework;

public class ComparisonCompactor {
  private static final String ELLIPSIS = "...";
  private static final String DELTA_END = "]";
  private static final String DELTA_START = "[";
  private int contextLength;
  private String expected;
  private String actual;
  private int prefixLength;
  private int suffixLength;

  public ComparisonCompactor(int contextLength, String expected, String actual) {
    this.contextLength = contextLength;
    this.expected = expected;
    this.actual = actual;
  }

  public String formatCompactedComparison(String message) {
    String compactExpected = expected;
    String compactActual = actual;
    if (shouldBeCompacted()) {
      findCommonPrefixAndSuffix();
      compactExpected = compact(expected);
      compactActual = compact(actual);
    }
    return Assert.format(message, compactExpected, compactActual);
  }

  private boolean shouldBeCompacted() {
    return !shouldNotBeCompacted();
  }

  private boolean shouldNotBeCompacted() {
    return expected == null || actual == null || expected.equals(actual);
  }

  private void findCommonPrefixAndSuffix() {
    findCommonPrefix();
    suffixLength = 0;
    for (; !suffixOverlapsPrefix(); suffixLength++) {
      if (charFromEnd(expected, suffixLength) != charFromEnd(actual, suffixLength))
        break;
    }
  }

  private char charFromEnd(String s, int i) {
    return s.charAt(s.length() - i - 1);
  }

  private boolean suffixOverlapsPrefix() {
    return actual.length() - suffixLength <= prefixLength ||
           expected.length() - suffixLength <= prefixLength;
  }

  private void findCommonPrefix() {
    prefixLength = 0;
    int end = Math.min(expected.length(), actual.length());
    for (; prefixLength < end; prefixLength++)
      if (expected.charAt(prefixLength) != actual.charAt(prefixLength))
        break;
  }

  private String compact(String s) {
    return new StringBuilder()
      .append(startingEllipsis())
      .append(startingContext())
      .append(DELTA_START)
      .append(delta(s))
      .append(DELTA_END)
      .append(endingContext())
      .append(endingEllipsis())
      .toString();
  }

  private String startingEllipsis() {
    return prefixLength > contextLength ? ELLIPSIS : "";
  }

  private String startingContext() {
    int contextStart = Math.max(0, prefixLength - contextLength);
    int contextEnd = prefixLength;
    return expected.substring(contextStart, contextEnd);
  }

  private String delta(String s) {
    int deltaStart = prefixLength;
    int deltaEnd = s.length() - suffixLength;
    return s.substring(deltaStart, deltaEnd);
  }

  private String endingContext() {
    int contextStart = expected.length() - suffixLength;
    int contextEnd = Math.min(contextStart + contextLength, expected.length());
    return expected.substring(contextStart, contextEnd);
  }

  private String endingEllipsis() {
    return (suffixLength > contextLength ? ELLIPSIS : "");
  }
}
```

### 4. Praktyczne wnioski
Po lekturze tej sekcji programista powinien wprowadzić następujące zmiany w swoim codziennym workflow:

1.  **Stosuj Zasadę Skautów:** Nigdy nie ignoruj drobnych mankamentów w kodzie, który właśnie edytujesz. Nawet jeśli zmieniasz tylko jeden wiersz logiki, spróbuj przy okazji poprawić nazwę zmiennej lub wydzielić zbyt długi warunek logiczny.
2.  **Refaktoryzacja to proces iteracyjny:** Nie oczekuj, że za pierwszym razem napiszesz idealnie czysty kod. To proces prób i błędów, gdzie często będziesz cofać pewne decyzje (np. wbudowywanie metod z powrotem), aby uzyskać lepszą strukturę całościową.
3.  **Pisz testy przed zmianami:** Zanim zaczniesz „czyścić” kod, upewnij się, że masz 100% pokrycia testami jednostkowymi. Tylko one dadzą Ci pewność, że Twoje usprawnienia nie popsuły działania systemu.
4.  **Ujawniaj zależności:** Jeśli Twoje funkcje manipulują polami klasy w określonej kolejności, przebuduj je tak, aby kolejność ta wynikała z sygnatur metod. To zapobiega błędom, które są niezwykle trudne do wyłapania podczas debugowania.
5.  **Bądź dumny z rzemiosła:** Pisanie czystego kodu to dążenie do profesjonalizmu. Krytykuj kod (swój i cudzy) merytorycznie i bez złośliwości, traktując to jako okazję do nauki.