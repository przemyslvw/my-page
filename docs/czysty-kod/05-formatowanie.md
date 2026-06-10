---
sidebar_position: 5
title: "Rozdział 5: Formatowanie"
description: "Streszczenie: Rozdział 5: Formatowanie — Czysty Kod, Robert C. Martin"
---

## Rozdział 5: Formatowanie – Profesjonalna Komunikacja w Kodzie

### O co chodzi w tej sekcji
Główną tezą Roberta C. Martina jest stwierdzenie, że **formatowanie kodu służy komunikacji**, a sprawna komunikacja jest najważniejszym obowiązkiem profesjonalnego programisty. Czytelność kodu ma bezpośredni wpływ na łatwość jego utrzymania i rozszerzania w przyszłości, ponieważ styl i dyscyplina zapisu przetrwają w projekcie znacznie dłużej niż konkretne fragmenty logiki biznesowej.

---

### Kluczowe zasady i reguły

#### Formatowanie pionowe
*   **Metafora gazety:** Plik źródłowy powinien przypominać artykuł prasowy – na samej górze znajduje się nagłówek (nazwa klasy) informujący o temacie, następnie algorytmy wysokiego poziomu, a im niżej schodzimy, tym więcej pojawia się szczegółów implementacyjnych.
*   **Odstępy pionowe:** Myśli i koncepcje powinny być oddzielone pustymi wierszami. Każdy pusty wiersz to sygnał wzrokowy dla czytelnika, że zaczyna się nowa, odrębna koncepcja (np. nowa metoda lub grupa zmiennych).
*   **Gęstość pionowa:** Wiersze kodu, które są ze sobą ściśle powiązane (np. zmienne instancyjne klasy), powinny znajdować się blisko siebie, bez zbędnych komentarzy czy pustych linii pomiędzy nimi.
*   **Zasada bliskości (Odległość pionowa):**
    *   **Deklaracje zmiennych:** Powinny znajdować się jak najbliżej miejsca ich użycia.
    *   **Zmienne instancyjne:** W języku Java powinny być zgrupowane na początku klasy.
    *   **Funkcje zależne:** Jeśli jedna funkcja wywołuje inną, powinny znajdować się blisko siebie w pionie, przy czym funkcja wywołująca powinna być nad wywoływaną.
*   **Rozmiar pliku:** Optymalna wielkość pliku to około 200 wierszy, przy czym absolutna górna granica powinna wynosić 500 wierszy.

#### Formatowanie poziome
*   **Długość wiersza:** Należy unikać konieczności przewijania ekranu w prawo. Autor sugeruje limit **120 znaków** na wiersz.
*   **Odstępy poziome:** Używamy spacji do oddzielenia operatorów przypisania od operandów (w celu ich wyróżnienia) oraz po przecinkach w listach argumentów. Nie dodajemy spacji między nazwą funkcji a nawiasem otwierającym, ponieważ są one ze sobą ściśle związane.
*   **Wcięcia (Indentation):** Są kluczowe dla wizualizacji hierarchii kodu. Pozwalają programiście szybko przeskakiwać fragmenty zakresów (np. instrukcje `if` lub `while`), które go w danej chwili nie interesują.
*   **Brak wyrównywania w kolumnach:** Nie należy wyrównywać nazw zmiennych ani wartości przypisań w kolumnach. Taki zabieg odciąga wzrok od istotnych informacji i jest zazwyczaj usuwany przez automatyczne formattery kodu.

---

### Przykłady kodu

#### Gęstość pionowa i zbędne komentarze
Poniżej przykład, jak zbędne komentarze psują relację między zmiennymi (źle):
```java
public class ReporterConfig {
  /**
   * Nazwa klasy nasłuchu raportu.
   */
  private String m_className;
  /**
   * Właściwości nasłuchu raportu.
   */
  private List<Property> m_properties = new ArrayList<Property>();
  public void addProperty(Property property) {
    m_properties.add(property);
  }
}
```
Po usunięciu szumu i zachowaniu gęstości pionowej (dobrze):
```java
public class ReporterConfig {
  private String m_className;
  private List<Property> m_properties = new ArrayList<Property>();

  public void addProperty(Property property) {
    m_properties.add(property);
  }
}
```
Dzięki takiemu formatowaniu klasę można objąć wzrokiem bez przemieszczania go po kodzie w poszukiwaniu sensu.

#### Zależności funkcji w pionie
Funkcja wywołująca powinna znajdować się nad wywoływaną (dobrze):
```java
public Response makeResponse(FitNesseContext context, Request request) throws Exception {
  String pageName = getPageNameOrDefault(request, "FrontPage");
  loadPage(pageName, context);
  if (page == null)
    return notFoundResponse(context, request);
  else
    return makePageResponse(context);
}

private String getPageNameOrDefault(Request request, String defaultPageName) {
  String pageName = request.getResource();
  if (StringUtil.isBlank(pageName))
    pageName = defaultPageName;
  return pageName;
}
```
Taki układ tworzy naturalny przepływ programu od ogółu do szczegółu.

#### Wyrównywanie poziome (czego nie robić)
Wyrównywanie w kolumnach jest nieużyteczne i maskuje problemy projektowe (źle):
```java
public class FitNesseExpediter implements ResponseSender {
  private   Socket          socket;
  private   InputStream     input;
  private   OutputStream    output;
  private   Request         request;
  private   Response        response;
  private   FitNesseContext context;
}
```
Zamiast tego stosuj naturalne odstępy (dobrze):
```java
public class FitNesseExpediter implements ResponseSender {
  private Socket socket;
  private InputStream input;
  private OutputStream output;
  private Request request;
  private Response response;
  private FitNesseContext context;
}
```
Jeśli lista zmiennych jest tak długa, że kusi jej wyrównanie, to problemem jest zbyt duża klasa, a nie brak wyrównania.

#### Łamanie wcięć
Nawet w krótkich instrukcjach nie należy „upychać” kodu w jednym wierszu (źle):
```java
public class CommentWidget extends TextWidget {
  public CommentWidget(ParentWidget parent, String text) {super(parent, text);}
  public String render() throws Exception {return ""; }
}
```
Lepiej zachować pełną strukturę wcięć (dobrze):
```java
public class CommentWidget extends TextWidget {
  public CommentWidget(ParentWidget parent, String text) {
    super(parent, text);
  }

  public String render() throws Exception {
    return "";
  }
}
```

---

### Praktyczne wnioski

1.  **Przestań traktować formatowanie jako sprawę drugorzędną.** Kod, który „tylko działa”, ale jest nieczytelny, jest nieprofesjonalny i generuje dług techniczny.
2.  **Ustal z zespołem jeden wspólny standard.** Nie ma znaczenia, gdzie stawiacie klamry, dopóki wszyscy robią to identycznie. Spójność stylu w projekcie buduje zaufanie czytelnika.
3.  **Skonfiguruj formatter w IDE.** Wykorzystaj narzędzia automatyczne, aby wymuszały ustalone zasady zespołowe przy każdym zapisie pliku.
4.  **Stosuj zasadę bliskości.** Deklaruj zmienne tam, gdzie ich używasz, a nie na początku każdej funkcji „na zapas”.
5.  **Dbaj o hierarchię pionową.** Pisz kod tak, aby czytało się go od góry do dołu. Jeśli musisz skakać między początkiem a końcem pliku, by zrozumieć prosty algorytm, to formatowanie pionowe jest do poprawy.
6.  **Usuwaj martwy kod i zbędny szum.** Puste konstruktory, nieużywane zmienne i komentarze typu „zwiększenie i” zaciemniają obraz i utrudniają komunikację.