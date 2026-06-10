---
sidebar_position: 9
title: "Rozdział 9: Testy jednostkowe"
description: "Streszczenie: Rozdział 9: Testy jednostkowe — Czysty Kod, Robert C. Martin"
---

## Rozdział 9: Testy jednostkowe – Streszczenie praktyczne

### O co chodzi w tej sekcji
Główną tezą autora jest to, że **kod testowy jest tak samo ważny jak kod produkcyjny** i musi być utrzymywany w najwyższej czystości, ponieważ "brudne" testy są gorsze niż ich brak. Tylko zestaw czystych testów jednostkowych daje programiście pewność niezbędną do bezkarnego zmieniania i czyszczenia kodu produkcyjnego – bez nich każda modyfikacja staje się potencjalnym błędem, co prowadzi do degradacji systemu.

---

### Kluczowe zasady i reguły

*   **Trzy prawa TDD:**
    1.  Nie wolno pisać kodu produkcyjnego bez wcześniej napisanego testu, który nie przechodzi.
    2.  Nie wolno pisać więcej testu jednostkowego, niż potrzeba, by nie przeszedł (brak kompilacji to też błąd).
    3.  Nie wolno pisać więcej kodu produkcyjnego, niż wystarczy do zaliczenia bieżącego testu.
*   **Czytelność przede wszystkim:** To najważniejsza cecha czystego testu. Powinien on być klarowny, prosty i spójny, aby czytelnik mógł błyskawicznie zrozumieć intencję sprawdzanej logiki.
*   **Wzorzec BUILD-OPERATE-CHECK:** Struktura testu powinna być podzielona na trzy wyraźne fazy: budowanie danych testowych, wykonanie operacji na tych danych i sprawdzenie wyników.
*   **Tworzenie domenowego języka testowania (DSL):** Zamiast bezpośrednio wywoływać skomplikowane API systemowe, warto tworzyć metody pomocnicze (wrappery), które ukrywają techniczny szum i pozwalają czytać test jak opowieść o logice biznesowej.
*   **Podwójny standard wydajności:** Kod testowy musi być czysty, ale nie musi być tak wydajny jak produkcyjny. Można w nim stosować mniej optymalne rozwiązania (np. łączenie napisów zamiast `StringBuffer`), jeśli tylko poprawia to czytelność.
*   **Jedna koncepcja na test:** Unikaj długich metod testowych sprawdzających wiele rzeczy po kolei. Każdy test powinien skupiać się na jednym konkretnym aspekcie działania.
*   **Zasady F.I.R.S.T.:**
    *   **Fast (Szybkie):** Testy muszą działać błyskawicznie, inaczej programiści nie będą ich uruchamiać.
    *   **Independent (Niezależne):** Testy nie mogą zależeć od siebie nawzajem ani od kolejności uruchomienia.
    *   **Repeatable (Powtarzalne):** Test musi dawać ten sam wynik w każdym środowisku (u programisty, na serwerze, w pociągu bez sieci).
    *   **Self-Validating (Samokontrolujące się):** Test zwraca zero-jedynkowy wynik (sukces/porażka); nie wymaga czytania logów przez człowieka.
    *   **Timely (O czasie):** Testy piszemy bezpośrednio przed kodem produkcyjnym.

---

### Przykłady kodu

**Przed refaktoryzacją: Test przeładowany szczegółami technicznymi**
Poniższy kod jest trudny do zrozumienia, ponieważ zawiera mnóstwo szumu związanego z API FitNesse, rzutowaniem typów i ręcznym budowaniem żądań.

```java
public void testGetPageHieratchyAsXml() throws Exception {
  crawler.addPage(root, PathParser.parse("PageOne"));
  crawler.addPage(root, PathParser.parse("PageOne.ChildOne"));
  crawler.addPage(root, PathParser.parse("PageTwo"));
  request.setResource("root");
  request.addInput("type", "pages");
  Responder responder = new SerializedPageResponder();
  SimpleResponse response =
    (SimpleResponse) responder.makeResponse(
      new FitNesseContext(root), request);
  String xml = response.getContent();
  assertEquals("text/xml", response.getContentType());
  assertSubString("<name>PageOne</name>", xml);
  assertSubString("<name>PageTwo</name>", xml);
  assertSubString("<name>ChildOne</name>", xml);
}
```

**Po refaktoryzacji: Czysty test korzystający z domenowego API**
Dzięki wydzieleniu metod pomocniczych (`makePages`, `submitRequest`), test stał się czytelny i wyraźnie pokazuje intencje autora.

```java
public void testGetPageHierarchyAsXml() throws Exception {
  makePages("PageOne", "PageOne.ChildOne", "PageTwo");
  submitRequest("root", "type:pages");
  assertResponseIsXML();
  assertResponseContains(
    "<name>PageOne</name>", "<name>PageTwo</name>", " <name>ChildOne</name>"
  );
}
```

**Przykład "Podwójnego Standardu": Czytelność ponad wydajność**
W testach systemów wbudowanych autor zamiast sprawdzania każdego czujnika osobno, używa krótkiego ciągu znaków do reprezentacji stanu, co jest mniej wydajne, ale znacznie łatwiejsze do skanowania wzrokiem.

```java
// Podejście tradycyjne - trudne do szybkiego odczytania
assertTrue(hw.heaterState());
assertTrue(hw.blowerState());
assertFalse(hw.coolerState());
assertFalse(hw.hiTempAlarm());
assertTrue(hw.loTempAlarm());

// Podejście z podwójnym standardem - asercja na zwięzłym stanie
assertEquals("HBchL", hw.getState()); 
// H=heater, B=blower, c=cooler(off), h=hiAlarm(off), L=loAlarm
```

---

### Praktyczne wnioski

1.  **Utrzymuj testy tak samo rygorystycznie jak produkcję.** Jeśli pozwolisz na bałagan w testach, ich utrzymanie stanie się tak drogie, że zespół w końcu przestanie je pisać, co doprowadzi do błędu "brodzenia" w kiepskim kodzie.
2.  **Stosuj refaktoryzację w obu kierunkach.** Po doprowadzeniu testu do "zielonego", nie przechodź od razu do następnego zadania. Poświęć czas na wyczyszczenie kodu testowego, który właśnie napisałeś.
3.  **Wyeliminuj techniczny szum.** Jeśli Twój test zaczyna się od 20 linii ustawiania mocków i bazy danych, wydziel to do metody `setUp` lub dedykowanej klasy fabrykującej.
4.  **Nie bój się długich nazw w testach.** Metody testowe powinny być precyzyjne – nazwa `testSymbolicLinksAreNotInXmlPageHierarchy` jest znacznie lepsza niż `testLinks`.
5.  **Dąż do minimalizacji asercji.** Nie musisz kurczowo trzymać się zasady "jednej asercji na test", ale pilnuj, by test sprawdzał tylko jedną koncepcję biznesową.
6.  **Zadbaj o niezależność od środowiska.** Jeśli test przechodzi u Ciebie, ale wywala się na serwerze CI (lub odwrotnie), nie ignoruj tego – to sygnał o ukrytych sprzężeniach, które zemszczą się w przyszłości.