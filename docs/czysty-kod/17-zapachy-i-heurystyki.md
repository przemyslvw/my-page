---
sidebar_position: 17
title: "Rozdział 17: Zapachy kodu i heurystyki"
description: "Streszczenie: Rozdział 17: Zapachy kodu i heurystyki — Czysty Kod, Robert C. Martin"
---

Oto praktyczne streszczenie Rozdziału 17 książki „Czysty Kod”, który stanowi swego rodzaju katalog błędów projektowych i sprawdzonych reguł rzemiosła programistycznego, zebranych przez Roberta C. Martina podczas wieloletniej praktyki i refaktoryzacji systemów.

## 1. O co chodzi w tej sekcji
Główną tezą autora jest to, że czystość kodu nie wynika z zestawu sztywnych reguł, ale z wypracowanej intuicji i dyscypliny stosowania **heurystyk**, czyli wskazówek pomagających ocenić jakość rozwiązania. Rozdział ten pełni rolę kompletnej „listy kontrolnej” zapachów (symptomów gnicia kodu), którą programista powinien mieć w głowie podczas pisania, a zwłaszcza podczas czyszczenia kodu. Celem jest doprowadzenie do stanu, w którym kod nie tylko działa, ale jest zrozumiały, łatwy w utrzymaniu i wolny od ukrytych pułapek.

## 2. Kluczowe zasady i reguły

### Komentarze (C1-C5)
*   **Usuwaj niewłaściwe informacje:** Komentarze nie powinny służyć jako system kontroli wersji czy miejsce na metadane (autor, data modyfikacji) – od tego jest Git.
*   **Kasuj przestarzałe komentarze:** Komentarz, który nie pasuje do aktualnego kodu, jest dezinformacją i „pływającą wyspą nieistotności”.
*   **Nigdy nie zostawiaj zakomentowanego kodu:** To jeden z najgorszych grzechów. Inni programiści boją się go usunąć, a on „pleśnieje”, odwołując się do nieistniejących funkcji.

### Środowisko (E1-E2)
*   **Budowanie w jednym kroku:** Skompilowanie i zbudowanie całego systemu powinno wymagać jednej, prostej operacji (np. `ant all` lub `mvn install`).
*   **Testy w jednym kroku:** Uruchomienie wszystkich testów jednostkowych musi być natychmiastowe i wymagać jednego kliknięcia lub komendy.

### Funkcje (F1-F4)
*   **Ograniczaj liczbę argumentów:** Ideałem jest zero argumentów, dopuszczalne są jeden, dwa lub trzy. Więcej to niemal zawsze błąd projektowy.
*   **Unikaj argumentów wyjściowych:** Czytelnik oczekuje, że dane „wchodzą” przez argumenty, a „wychodzą” przez wynik funkcji.
*   **Precz z argumentami znacznikowymi (boolean):** Przekazywanie flagi do funkcji jasno mówi, że wykonuje ona więcej niż jedną operację. Zamiast tego stwórz dwie osobne funkcje.

### Ogólne zasady (G1-G36)
*   **Zasada DRY (Don’t Repeat Yourself):** Każde powtórzenie kodu to utracona szansa na abstrakcję. Wykrywaj podobne algorytmy i łącz je za pomocą wzorców (np. *Template Method*).
*   **Odpowiedni poziom abstrakcji:** Nie mieszaj szczegółów implementacyjnych z logiką wysokopoziomową. Klasa bazowa nie powinna wiedzieć nic o swoich klasach pochodnych.
*   **Zasada najmniejszego zaskoczenia:** Każda funkcja powinna robić to, czego spodziewa się po niej inny programista. Jeśli `stringToDay` nie rozpoznaje „Monday” niezależnie od wielkości liter, tracisz zaufanie czytelnika.
*   **Hermetyzuj warunki:** Zamiast skomplikowanych operacji logicznych w `if`, wyodrębnij funkcję, która wyjaśnia intencję warunku.

### Nazewnictwo (N1-N7)
*   **Nazwy opisowe:** W 90% przypadków czytelność kodu zależy od nazw. Nie wybieraj ich zbyt szybko; upewnij się, że są precyzyjne i odzwierciedlają poziom abstrakcji.
*   **Używaj standardowej nomenklatury:** Jeśli stosujesz wzorzec projektowy, umieść jego nazwę w nazwie klasy (np. `AutoHangupModemDecorator`).

## 3. Przykłady kodu

### Nazewnictwo i magiczne liczby (N1, G25)
Programista bez „wyczucia kodu” pisze enigmatycznie:
```java
// BŁĘDNIE
public int x() {
  int q = 0;
  int z = 0;
  for (int kk = 0; kk < 10; kk++) {
    if (l[z] == 10) {
      q += 10 + (l[z + 1] + l[z + 2]);
      z += 1;
    }
    // ... dalszy bełkot
  }
  return q;
}
```
Profesjonalista używa nazw opisowych, które wyjaśniają algorytm (tu: punktacja w kręglach):
```java
// POPRAWNIE
public int score() {
  int score = 0;
  int frame = 0;
  for (int frameNumber = 0; frameNumber < 10; frameNumber++) {
    if (isStrike(frame)) {
      score += 10 + nextTwoBallsForStrike(frame);
      frame += 1;
    } else if (isSpare(frame)) {
      score += 10 + nextBallForSpare(frame);
      frame += 2;
    } else {
      score += twoBallsInFrame(frame);
      frame += 2;
    }
  }
  return score;
}
```
*(Źródło:)*

### Argumenty wybierające (G15)
Zamiast przekazywać flagę sterującą logiką:
```java
// BŁĘDNIE
public int calculateWeeklyPay(boolean overtime) {
  // ... skomplikowana logika z użyciem overtime ? 1.5 : 1.0
}
```
Zastosuj podział na mniejsze, jawne funkcje:
```java
// POPRAWNIE
public int straightPay() {
  return getTenthsWorked() * getTenthRate();
}
public int overTimePay() {
  int overTimeTenths = Math.max(0, getTenthsWorked() - 400);
  int overTimePay = overTimeBonus(overTimeTenths);
  return straightPay() + overTimePay;
}
```
*(Źródło:)*

### Hermetyzacja warunków granicznych (G33)
Nie pozwól, by „+1” i „-1” rozlały się po kodzie:
```java
// BŁĘDNIE
if(level + 1 < tags.length) {
  parts = new Parse(body, tags, level + 1, offset + endTag);
}
```
Zhermetyzuj warunek w opisowej zmiennej:
```java
// POPRAWNIE
int nextLevel = level + 1;
if(nextLevel < tags.length) {
  parts = new Parse(body, tags, nextLevel, offset + endTag);
}
```
*(Źródło:)*

### Rozdzielanie poziomów abstrakcji (G34)
Funkcja mieszająca tworzenie znaczników HTML z logiką wielkości:
```java
// BŁĘDNIE
public String render() throws Exception {
  StringBuffer html = new StringBuffer("<hr");
  if(size > 0)
    html.append(" size=\"").append(size + 1).append("\"");
  html.append(">");
  return html.toString();
}
```
Po refaktoryzacji – logika HTML jest odseparowana:
```java
// POPRAWNIE
public String render() throws Exception {
  HtmlTag hr = new HtmlTag("hr");
  if (extraDashes > 0)
    hr.addAttribute("size", hrSize(extraDashes));
  return hr.html();
}
private String hrSize(int height) {
  int hrSize = height + 1;
  return String.format("%d", hrSize);
}
```
*(Źródło:)*

## 4. Praktyczne wnioski

Po lekturze tej sekcji Twoje podejście do codziennej pracy powinno ulec następującym zmianom:
1.  **Zastosuj Zasadę Skautów:** Nigdy nie kończ zadania, jeśli kod nie jest choć trochę czystszy niż w momencie, gdy go pobrałeś z repozytorium.
2.  **Bądź bezlitosny dla martwego kodu:** Jeśli funkcja nie jest wywoływana, usuń ją. Jeśli test jest ignorowany, uznaj to za brak precyzji w wymaganiach i napraw go lub usuń.
3.  **Weryfikuj poziomy abstrakcji:** Przy każdym przeglądzie kodu (Code Review) sprawdzaj, czy funkcje wysokopoziomowe nie są zanieczyszczone szczegółami, takimi jak formatowanie stringów czy operacje na kolekcjach.
4.  **Zależności fizyczne zamiast logicznych:** Nie zakładaj, że inna klasa zrobi coś za Ciebie (zależność logiczna). Jeśli potrzebujesz informacji o wielkości strony, zapytaj o to obiekt odpowiedzialny za formatowanie zamiast hardkodować stałą.
5.  **Dąż do „testowalności”:** Jeśli kod jest trudny do przetestowania, to zazwyczaj dlatego, że jest źle zaprojektowany (zbyt duże sprzężenie, brak abstrakcji). Testy nie tylko sprawdzają poprawność, ale wymuszają lepszą architekturę.