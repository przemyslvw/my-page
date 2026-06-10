---
sidebar_position: 3
title: "Rozdział 3: Funkcje"
description: "Streszczenie: Rozdział 3: Funkcje — Czysty Kod, Robert C. Martin"
---

## Rozdział 3: Funkcje — Fundament Czystego Kodu

### 1. O co chodzi w tej sekcji
Główną tezą Roberta C. Martina jest to, że **funkcje stanowią pierwszą linię organizacji każdego programu**. Aby kod był czytelny i łatwy w utrzymaniu, każda funkcja musi być **maksymalnie krótka**, realizować **tylko jedno zadanie** i operować na **jednym poziomie abstrakcji**. Pisanie funkcji to w rzeczywistości projektowanie języka, którym opowiadamy historię działania systemu.

---

### 2. Kluczowe zasady i reguły

*   **Małe, a nawet mniejsze:** Funkcja nie powinna mieć więcej niż **20 wierszy**. Jeśli jest dłuższa, prawdopodobnie robi zbyt wiele.
*   **Zasada jednej operacji (Do One Thing):** Funkcja powinna wykonywać tylko jedną czynność, robić to dobrze i robić tylko to. Jeśli możesz wyodrębnić z niej inną funkcję, która nie jest tylko zmianą implementacji, to znaczy, że pierwotna funkcja robiła zbyt wiele.
*   **Jeden poziom abstrakcji:** Wszystkie instrukcje wewnątrz funkcji muszą znajdować się na tym samym poziomie szczegółowości. Mieszanie wysokopoziomowych koncepcji (np. `getHtml()`) z niskopoziomowymi detalami (np. `append("\n")`) wprowadza chaos.
*   **Zasada zstępująca (The Step-Down Rule):** Kod powinien czytać się od góry do dołu jak artykuł w gazecie. Każda funkcja powinna wprowadzać kolejny poziom abstrakcji, opowiadając historię typu: „Aby zrobić A, robimy B i C. Aby zrobić B, robimy B1...”.
*   **Liczba argumentów:** Ideałem jest **zero argumentów**. Dopuszczalne są jeden lub dwa. Trzy wymagają mocnego uzasadnienia, a więcej niż trzy to ewidentny błąd projektowy. Argumenty są trudne w testowaniu i wymagają dużej energii koncepcyjnej od czytelnika.
*   **Brak argumentów znacznikowych (Flag Arguments):** Przekazywanie `boolean` do funkcji (np. `render(true)`) to zła praktyka. Od razu informuje to, że funkcja robi dwie rzeczy: jedną dla `true`, drugą dla `false`.
*   **Unikanie efektów ubocznych:** Funkcja nie może kłamać. Jeśli nazywa się `checkPassword`, nie może w ukryciu inicjalizować sesji. Takie „niespodzianki” prowadzą do trudnych do wykrycia błędów i sprzężeń czasowych.
*   **Rozdzielenie poleceń i zapytań (Command Query Separation):** Funkcja powinna albo coś robić (zmieniać stan obiektu), albo odpowiadać na pytanie (zwracać informacje), ale nigdy jedno i drugie naraz.
*   **Wyjątki zamiast kodów błędów:** Zwracanie kodów błędów prowadzi do głębokich zagnieżdżeń instrukcji `if`. Wyjątki pozwalają oddzielić „ścieżkę szczęśliwą” od obsługi sytuacji awaryjnych.
*   **DRY (Don't Repeat Yourself):** Powtórzenia kodu to źródło wszelkiego zła. Każdy zduplikowany algorytm należy wyodrębnić do wspólnej metody.

---

### 3. Przykłady kodu

#### Refaktoryzacja: Od chaosu do czytelności
Poniżej przykład funkcji przed i po czyszczeniu. Wersja pierwotna miesza poziomy abstrakcji i jest trudna do analizy.

**Przed (Listing 3.1):**
```java
public static String testableHtml(
  PageData pageData,
  boolean includeSuiteSetup
) throws Exception {
  WikiPage wikiPage = pageData.getWikiPage();
  StringBuffer buffer = new StringBuffer();
  if (pageData.hasAttribute("Test")) {
    if (includeSuiteSetup) {
      WikiPage suiteSetup =
        PageCrawlerImpl.getInheritedPage(
                SuiteResponder.SUITE_SETUP_NAME, wikiPage
        );
      if (suiteSetup != null) {
        WikiPagePath pagePath =
          suiteSetup.getPageCrawler().getFullPath(suiteSetup);
        String pagePathName = PathParser.render(pagePath);
        buffer.append("!include -setup .")
              .append(pagePathName)
              .append("\n");
      }
    }
    // ... (więcej skomplikowanego kodu)
  }
  // ...
  return pageData.getHtml();
}
```


**Po refaktoryzacji (Listing 3.3):**
```java
public static String renderPageWithSetupsAndTeardowns(
  PageData pageData, boolean isSuite) throws Exception {
  if (isTestPage(pageData))
    includeSetupAndTeardownPages(pageData, isSuite);
  return pageData.getHtml();
}
```


#### Eliminacja instrukcji switch (Polimorfizm)
Zamiast rozbudowanych `switch`, które trzeba modyfikować przy każdym nowym typie, Martin zaleca ukrycie ich w fabryce.

**Przed (Listing 3.4):**
```java
public Money calculatePay(Employee e) throws InvalidEmployeeType {
    switch (e.type) {
      case COMMISSIONED:
        return calculateCommissionedPay(e);
      case HOURLY:
        return calculateHourlyPay(e);
      case SALARIED:
        return calculateSalariedPay(e);
      default:
        throw new InvalidEmployeeType(e.type);
  }
}
```


**Po (Ukrycie w fabryce - Listing 3.5):**
```java
public abstract class Employee {
  public abstract boolean isPayday();
  public abstract Money calculatePay();
}

public class EmployeeFactoryImpl implements EmployeeFactory {
  public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
    switch (r.type) {
      case COMMISSIONED:
        return new CommissionedEmployee(r);
      case HOURLY:
        return new HourlyEmployee(r);
      // ...
    }
  }
}
```


#### Separacja obsługi błędów
Obsługa błędów to „jedna operacja”, więc powinna mieć własną funkcję.

```java
public void delete(Page page) {
  try {
    deletePageAndAllReferences(page);
  }
  catch (Exception e) {
    logError(e);
  }
}

private void deletePageAndAllReferences(Page page) throws Exception {
  deletePage(page);
  registry.deteleReference(page.name);
  configKeys.deleteKey(page.name.makeKey());
}
```


---

### 4. Praktyczne wnioski — co zmienić od jutra?

1.  **Rozbijaj funkcje powyżej 20 linii:** Jeśli Twoja funkcja nie mieści się na małym ekranie bez przewijania, to znak, że czas na refaktoryzację.
2.  **Stosuj nazwy opisowe zamiast komentarzy:** Długa, precyzyjna nazwa funkcji (np. `includeSetupAndTeardownPages`) jest znacznie lepsza niż krótka nazwa z komentarzem objaśniającym.
3.  **Usuń argumenty wyjściowe:** Zamiast `appendFooter(report)`, używaj `report.appendFooter()`. Jeśli funkcja ma coś zmieniać, niech zmienia stan obiektu, na którym jest wywołana.
4.  **Wyeliminuj „flagi” w argumentach:** Jeśli widzisz wywołanie `save(user, true)`, stwórz dwie funkcje: `saveNewUser(user)` oraz `updateExistingUser(user)`.
5.  **Stosuj zasadę Command-Query Separation:** Nigdy nie pisz kodu typu `if (set("username", "bob"))`. Rozbij to na `if (attributeExists("username")) { setAttribute("username", "bob"); }`.
6.  **Wyodrębniaj bloki `try-catch`:** Twoja główna logika nie powinna być zaśmiecona obsługą wyjątków. Główna funkcja powinna zawierać tylko blok `try` wywołujący inną funkcję oraz blok `catch`.
7.  **Pamiętaj o „Zasadzie Skautów”:** Za każdym razem, gdy zmieniasz funkcję, postaraj się zostawić ją choć odrobinę czystszą, niż ją zastałeś.