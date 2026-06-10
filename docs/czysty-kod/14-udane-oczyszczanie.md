---
sidebar_position: 14
title: "Rozdział 14: Udane oczyszczanie kodu"
description: "Streszczenie: Rozdział 14: Udane oczyszczanie kodu — Czysty Kod, Robert C. Martin"
---

Rozdział 14. książki „Czysty Kod” to praktyczna lekcja rzemiosła, pokazująca proces ewolucji kodu od „brudnego szkicu” do eleganckiego, profesjonalnego modułu [1]. Robert C. Martin udowadnia tutaj, że nikt nie pisze doskonałego kodu za pierwszym razem, a kluczem do sukcesu jest **sukcesywne doskonalenie** (ang. *successive refinement*) [2].

## O co chodzi w tej sekcji
Główną tezą autora jest stwierdzenie, że **programowanie to rzemiosło, w którym czystość osiąga się poprzez wielokrotne poprawianie roboczej wersji kodu** [2]. Martin pokazuje, że zatrzymanie się w momencie, gdy „program już działa”, to zawodowe samobójstwo, ponieważ narastający bałagan szybko uniemożliwi dalszy rozwój projektu [2, 3]. Udane oczyszczanie kodu polega na wprowadzaniu serii bardzo małych, bezpiecznych zmian, przy jednoczesnym zachowaniu pełnej sprawności systemu dzięki testom jednostkowym [4, 5].

## Kluczowe zasady i reguły
Zamiast teoretycznych rozważań, „Wujek Bob” proponuje konkretne zasady działania:

*   **Najpierw nabrudź, potem posprzątaj:** Nie oczekuj od siebie pisania czystego kodu od razu; napisz rozwiązanie, które działa, a następnie przejdź do fazy czyszczenia, traktując to jako integralną część pracy [2].
*   **Refaktoryzacja przyrostowa (małe kroki):** Nigdy nie wprowadzaj ogromnych zmian naraz w imię „poprawy struktury”; każda zmiana powinna być na tyle mała, by system przez większość czasu był sprawny [4, 6].
*   **Testy to podstawa:** Nie możesz bezpiecznie czyścić kodu bez zestawu automatycznych testów jednostkowych, które uruchamiasz po każdej, nawet najmniejszej modyfikacji [4, 7].
*   **Zasada pojedynczej odpowiedzialności (SRP):** Jeśli Twój parser argumentów zajmuje się jednocześnie logiką parsowania, przechowywaniem danych i formatowaniem błędów, musisz go podzielić na mniejsze klasy [8, 9].
*   **Polimorfizm zamiast instrukcji `switch/if-else`:** Jeśli zauważysz, że musisz dodawać nowe bloki `case` przy każdym nowym typie danych, przenieś tę logikę do hierarchii klas i ukryj ją za wspólnym interfejsem [10, 11].
*   **Używaj iteratorów do przekazywania stanu:** Przekazywanie całych list lub tablic do metod pomocniczych jest nieeleganckie; lepiej przekazać iterator, który pozwala metodom „konsumować” argumenty wiersza poleceń [10, 12].

## Przykłady kodu: Przed i po refaktoryzacji

Poniżej przedstawiono kluczowe momenty transformacji klasy `Args`.

### 1. Pierwszy szkic (Fragmenty) — chaos i brak skalowalności
W pierwszej wersji autor używał osobnych map dla każdego typu danych i ręcznie zarządzał każdym nowym parametrem, co prowadziło do „ropiejącego” bałaganu [13, 14].

```java
// Listing 14.8 - Pierwszy szkic, który "działa", ale jest trudny w utrzymaniu [13, 15-21]
public class Args {
  private Map<Character, Boolean> booleanArgs = new HashMap<Character, Boolean>();
  private Map<Character, String> stringArgs = new HashMap<Character, String>();
  private Map<Character, Integer> intArgs = new HashMap<Character, Integer>();
  // ... mnóstwo innych zmiennych instancyjnych ...

  private boolean setArgument(char argChar) throws ArgsException {
    if (isBooleanArg(argChar))
      setBooleanArg(argChar, true);
    else if (isStringArg(argChar))
      setStringArg(argChar);
    else if (isIntArg(argChar))
      setIntArg(argChar);
    else
      return false;
    return true;
  }

  private void setIntArg(char argChar) throws ArgsException {
    currentArgument++;
    String parameter = args[currentArgument];
    try {
      intArgs.put(argChar, new Integer(parameter));
    } catch (ArrayIndexOutOfBoundsException e) {
      // obsługa błędu...
    } catch (NumberFormatException e) {
      // obsługa błędu...
    }
  }
}
```

### 2. Pośredni etap — wprowadzenie `ArgumentMarshaler`
Martin zauważył, że każdy typ argumentu wymaga tych samych trzech operacji: parsowania schematu, pobierania wartości i konwersji [22]. Stworzył więc interfejs pomocniczy.

```java
// Ewolucja w kierunku polimorfizmu [23, 24]
private abstract class ArgumentMarshaler {
  public abstract void set(Iterator<String> currentArgument) throws ArgsException;
  public abstract Object get();
}

private class IntegerArgumentMarshaler extends ArgumentMarshaler {
  private int intValue = 0;
  public void set(Iterator<String> currentArgument) throws ArgsException {
    try {
      intValue = Integer.parseInt(currentArgument.next());
    } catch (NumberFormatException e) {
      throw new ArgsException();
    }
  }
  public Object get() { return intValue; }
}
```

### 3. Wersja końcowa — czysta i rozszerzalna
W ostatecznej wersji klasa `Args` nie wie już nic o szczegółach parsowania poszczególnych typów. Deleguje to zadanie do odpowiednich „szeregowników” (marshalers) [25, 26].

```java
// Listing 14.16 - Docelowa struktura klasy Args [26-29]
public class Args {
  private Map<Character, ArgumentMarshaler> marshalers = new HashMap<Character, ArgumentMarshaler>();
  private Set<Character> argsFound = new HashSet<Character>();
  private Iterator<String> currentArgument;

  public Args(String schema, String[] args) throws ArgsException {
    parseSchema(schema);
    parseArgumentStrings(Arrays.asList(args));
  }

  private void parseArgumentCharacter(char argChar) throws ArgsException {
    ArgumentMarshaler m = marshalers.get(argChar);
    if (m == null) {
      throw new ArgsException(UNEXPECTED_ARGUMENT, argChar, null);
    } else {
      argsFound.add(argChar);
      try {
        m.set(currentArgument); // Czysty polimorfizm [30]
      } catch (ArgsException e) {
        e.setErrorArgumentId(argChar);
        throw e;
      }
    }
  }
}
```

## Praktyczne wnioski

Po przeczytaniu tej analizy przypadku, jako programista powinieneś wprowadzić następujące zmiany w swoim sposobie pracy:

1.  **Nie akceptuj „działającego bałaganu”:** Jeśli doprowadziłeś funkcjonalność do działania, ale kod jest brzydki (np. ma za dużo zmiennych instancyjnych lub długie instrukcje `if-else`), Twoja praca nie jest skończona [3].
2.  **Stosuj TDD jako siatkę bezpieczeństwa:** Przed rozpoczęciem jakiegokolwiek czyszczenia, upewnij się, że masz testy pokrywające 100% logicznych ścieżek [31]. Jeśli ich nie masz, dopisz je, zanim dotkniesz struktury kodu [32].
3.  **Rozdzielaj poziomy abstrakcji:** Logika parsera (co robić z argumentem) powinna być oddzielona od mechaniki parsowania (jak wyciągnąć `int` z ciągu znaków) [9].
4.  **Zabijaj instrukcje `switch` polimorfizmem:** Jeśli Twój kod „rozpoznaje typy” w wielu miejscach, stwórz hierarchię klas. Dodanie nowego typu danych powinno polegać na stworzeniu nowej klasy, a nie na edycji wielkiego parsera [33, 34].
5.  **Czyść przyrostowo:** Refaktoryzacja to nie „przepisanie wszystkiego od zera”, ale seria drobnych ruchów, jak układanie kostki Rubika [6]. Każdy krok musi kończyć się zielonymi testami [4].
6.  **Wydzielaj obsługę błędów:** Wyjątki i ich komunikaty nie powinny zaśmiecać głównej logiki biznesowej; przenieś je do dedykowanych klas (np. `ArgsException`) [5, 35].

Pamiętaj: **Zły kod psuje się dalej, stając się coraz większym ciężarem dla zespołu** [3]. Najtaniej i najłatwiej jest posprzątać od razu po sobie, zanim bałagan wymknie się spod kontroli [36].