---
sidebar_position: 2
title: "Rozdział 2: Znaczące nazwy"
description: "Streszczenie: Rozdział 2: Znaczące nazwy — Czysty Kod, Robert C. Martin"
---

## Rozdział 2: Znaczące nazwy – Praktyczne streszczenie

### O co chodzi w tej sekcji
Główną tezą Roberta C. Martina jest to, że nazwy w kodzie pełnią funkcję fundamentu komunikacji między programistami, a ich właściwy dobór jest inwestycją, która zwraca się wielokrotnie poprzez oszczędność czasu potrzebnego na analizę logiki [1]. Dobra nazwa powinna być odpowiedzią na pytania: dlaczego dany element istnieje, co robi i jak jest używany – jeśli nazwa wymaga komentarza, to znaczy, że nie spełnia swojej roli [1].

### Kluczowe zasady i reguły

*   **Używaj nazw przedstawiających intencje:** Nazwa musi jasno określać cel zmiennej lub funkcji. Unikaj enigmatycznych skrótów i nazw, które nic nie mówią o mierzonej wielkości lub jednostce [1, 2].
*   **Unikaj dezinformacji:** Nie używaj nazw, które sugerują inny typ danych niż ten faktycznie użyty (np. nie używaj przyrostka `List`, jeśli obiekt nie jest listą) oraz unikaj nazw o niemal identycznym wyglądzie [3].
*   **Twórz wyraźne różnice:** Jeśli musisz odróżnić od siebie dwa podobne obiekty, zrób to w sposób niosący informację. Nazwy typu `a1`, `a2` czy dodawanie słów „szumów” (np. `ProductData`, `ProductInfo`) nie pozwalają czytelnikowi zrozumieć różnicy między nimi [4, 5].
*   **Twórz nazwy, które można wymówić:** Programowanie to aktywność społeczna. Jeśli nie potrafisz wymówić nazwy zmiennej (np. `genymdhms`), nie będziesz mógł o niej swobodnie dyskutować z zespołem [6].
*   **Stosuj nazwy łatwe do wyszukania:** Unikaj jednoliterowych nazw i stałych numerycznych. Dłuższe, opisowe nazwy (np. `WORK_DAYS_PER_WEEK`) są znacznie łatwiejsze do zlokalizowania w dużym projekcie niż pojedyncza cyfra „5” [7, 8].
*   **Unikaj kodowania i notacji węgierskiej:** W nowoczesnych językach z silnym typowaniem (jak Java) kodowanie typów w nazwach tylko przeszkadza. Nie używaj przedrostków typu `m_` dla zmiennych składowych ani prefiksów `I` dla interfejsów [9-11].
*   **Nazwy klas powinny być rzeczownikami:** Używaj nazw takich jak `Customer` czy `Account`. Unikaj ogólników jak `Manager`, `Processor`, `Data` czy `Info` [12].
*   **Nazwy metod powinny być czasownikami:** Metody mają wykonywać akcje (np. `postPayment`, `deletePage`). Akcesory i mutatory powinny być zgodne ze standardem JavaBean (`get`, `set`, `is`) [12].
*   **Jedno słowo na pojęcie:** Bądź konsekwentny. Jeśli w jednym miejscu używasz `fetch`, nie używaj `retrieve` czy `get` w innym miejscu do tej samej operacji [13].
*   **Korzystaj z nazw dziedziny rozwiązania i problemu:** Używaj terminów informatycznych (algorytmy, wzorce projektowe) tam, gdzie to możliwe, a nazw z domeny biznesowej tam, gdzie brakuje terminów technicznych [14, 15].

### Przykłady kodu

**1. Ujawnianie intencji – przed i po refaktoryzacji**
Zamiast niejasnych nazw, wybierz te, które opisują jednostki i cel [2]:

```java
// Przed
int d; // Czas trwania w dniach

// Po
int elapsedTimeInDays;
int daysSinceCreation;
int fileAgeInDays;
```

**2. Kod niejawny vs kod czytelny (przykład Saper)**
Refaktoryzacja funkcji wybierającej zaznaczone komórki z tablicy [3, 16-18]:

```java
// Przed: Kompletnie nie wiadomo, co oznaczają liczby 4 i 0
public List<int[]> getThem() {
   List<int[]> list1 = new ArrayList<int[]>();
   for (int[] x : theList)
      if (x == 4)
         list1.add(x);
   return list1;
}

// Po kroku 1: Nazwanie zmiennych domenowych
public List<int[]> getFlaggedCells() {
   List<int[]> flaggedCells = new ArrayList<int[]>();
   for (int[] cell : gameBoard)
      if (cell[STATUS_VALUE] == FLAGGED)
         flaggedCells.add(cell);
   return flaggedCells;
}

// Po kroku 2: Wprowadzenie klasy obiektowej (najlepsza czytelność)
public List<Cell> getFlaggedCells() {
    List<Cell> flaggedCells = new ArrayList<Cell>();
    for (Cell cell : gameBoard)
       if (cell.isFlagged())
          flaggedCells.add(cell);
    return flaggedCells;
}
```

**3. Unikanie kodowania składowych**
Nowoczesne IDE kolorują składnię, więc przedrostki są zbędne [10]:

```java
// Przed
public class Part {
   private String m_dsc;
   void setName(String name) {
      m_dsc = name;
   }
}

// Po
public class Part {
   String description;
   void setDescription(String description) {
      this.description = description;
   }
}
```

**4. Dodawanie znaczącego kontekstu**
Zamiast rozproszonych zmiennych, zgrupuj je w klasę [19, 20]:

```java
// Przed: Kontekst musi być wywnioskowany z algorytmu
private void printGuessStatistics(char candidate, int count) {
    String number;
    String verb;
    String pluralModifier;
    // ... logika if-else przypisująca wartości ...
    String guessMessage = String.format("There %s %s %s%s", verb, number, candidate, pluralModifier);
    print(guessMessage);
}

// Po: Kontekst zapewniony przez klasę
public class GuessStatisticsMessage {
    private String number;
    private String verb;
    private String pluralModifier;

    public String make(char candidate, int count) {
       createPluralDependentMessageParts(count);
       return String.format("There %s %s %s%s", verb, number, candidate, pluralModifier);
    }
    // ... metody prywatne ...
}
```

### Praktyczne wnioski

Po przeczytaniu tej sekcji powinieneś natychmiast wprowadzić następujące zmiany w swoim kodzie:

1.  **Przestań używać jednoliterowych zmiennych** poza licznikami bardzo krótkich pętli (np. `i` w pętli na 3 linijki) [7, 21].
2.  **Zmień nazwy wszystkich zmiennych składowych**, które zaczynają się od `m_` lub `f_`. Twoje IDE i tak je wyróżnia, a te przedrostki to tylko szum [10, 22].
3.  **Przeprowadź inspekcję „magic any”**. Jeśli masz stałe numeryczne lub tekstowe w kodzie, zamień je na nazwane stałe o zasięgu klasowym [7].
4.  **Zmień nazwy interfejsów**, jeśli zaczynają się od `I`. Lepiej nazwać interfejs `ShapeFactory`, a implementację `ShapeFactoryImpl`, niż dekorować nazwę interfejsu [11, 21].
5.  **Stosuj standardowe nazewnictwo wzorców projektowych**. Jeśli klasa jest fabryką, niech ma w nazwie `Factory`. Jeśli jest dekoratorem, niech ma `Decorator` [14, 23].
6.  **Pamiętaj: kod czyta się 10 razy częściej niż pisze**. Spędzenie dodatkowej minuty na wymyśleniu nazwy `elapsedTimeInDays` zamiast `d` zaoszczędzi komuś (lub Tobie za miesiąc) dziesięć minut na analizę kodu [1, 24].