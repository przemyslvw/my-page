---
slug: czysty-kod-robert-martin-notatki
title: "Czysty Kod – Robert C. Martin: notatki z lektury"
authors: [przemyslvw]
tags: [book-review, tutorial, kurs, optimization, dokumentacja]
date: "2026-06-10"
---

„Czysty Kod. Podręcznik dobrego programisty" Roberta C. Martina (Uncle Boba) to jedna z tych książek, które programista powinien przeczytać przynajmniej raz — a potem wracać do nich za każdym razem, gdy trafi na kod, który budzi wątpliwości.

Zebrałem z niej szczegółowe notatki z każdego rozdziału: kluczowe zasady, przykłady kodu przed i po refaktoryzacji oraz praktyczne wnioski gotowe do zastosowania od zaraz.

<!-- truncate -->

## O książce

Oryginał nosi tytuł *Clean Code: A Handbook of Agile Software Craftsmanship* (2009). Książka składa się z trzech części:

- **Część I (rozdziały 1–13)** — zasady i wzorce pisania czystego kodu: nazewnictwo, funkcje, komentarze, formatowanie, obsługa błędów, testy jednostkowe, klasy, systemy
- **Część II (rozdziały 14–16)** — analizy przypadków: Uncle Bob bierze realny kod i czyści go krok po kroku na oczach czytelnika
- **Część III (rozdział 17)** — katalog heurystyk i zapachów kodu, czyli lista rzeczy, na które warto zwracać uwagę przy code review

## Notatki z rozdziałów

Każdy rozdział ma osobną stronę z praktycznym streszczeniem, przykładami kodu i wnioskami:

| # | Rozdział |
|---|---------|
| 1 | [Czysty kod](/docs/czysty-kod/czysty-kod) |
| 2 | [Znaczące nazwy](/docs/czysty-kod/znaczace-nazwy) |
| 3 | [Funkcje](/docs/czysty-kod/funkcje) |
| 4 | [Komentarze](/docs/czysty-kod/komentarze) |
| 5 | [Formatowanie](/docs/czysty-kod/formatowanie) |
| 6 | [Obiekty i struktury danych](/docs/czysty-kod/obiekty-i-struktury) |
| 7 | [Obsługa błędów](/docs/czysty-kod/obsluga-bledow) |
| 8 | [Granice](/docs/czysty-kod/granice) |
| 9 | [Testy jednostkowe](/docs/czysty-kod/testy-jednostkowe) |
| 10 | [Klasy](/docs/czysty-kod/klasy) |
| 11 | [Systemy](/docs/czysty-kod/systemy) |
| 12 | [Powstawanie projektu](/docs/czysty-kod/powstawanie-projektu) |
| 13 | [Współbieżność](/docs/czysty-kod/wspolbieznosc) |
| 14 | [Udane oczyszczanie kodu](/docs/czysty-kod/udane-oczyszczanie) |
| 15 | [Struktura biblioteki JUnit](/docs/czysty-kod/struktura-junit) |
| 16 | [Przebudowa klasy SerialDate](/docs/czysty-kod/przebudowa-serialdate) |
| 17 | [Zapachy kodu i heurystyki](/docs/czysty-kod/zapachy-i-heurystyki) |
| A | [Dodatek A: Współbieżność II](/docs/czysty-kod/dodatek-a-wspolbieznosc) |
| B | [Dodatek B: org.jfree.date.SerialDate](/docs/czysty-kod/dodatek-b-serialdate) |
| — | [Epilog](/docs/czysty-kod/epilog) |

Albo przejdź od razu do [przeglądu wszystkich notatek](/docs/category/czysty-kod).

## Czego się spodziewać

Notatki nie są recenzją — są skrótem do zastosowania. Każda strona zawiera:

- **O co chodzi** — tezę rozdziału w kilku zdaniach
- **Kluczowe zasady** — wypunktowane, bez lania wody
- **Przykłady kodu** — pary „przed i po" refaktoryzacji cytowane wprost z książki
- **Praktyczne wnioski** — co zmienić w swoim kodzie po przeczytaniu

Przykłady są w Javie (język oryginalnej książki), ale zasady są uniwersalne — działają tak samo w TypeScript, Pythonie, PHP czy Go.
