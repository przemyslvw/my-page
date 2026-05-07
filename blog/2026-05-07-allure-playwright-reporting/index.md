---
slug: allure-playwright-reporting
title: "Nowoczesne Raportowanie E2E: Implementacja Allure w projekcie reads"
authors: [przemyslvw]
tags: [opensource, devops, devsecops, secops, playwright, automation, testing, cicd, github-pages, github-actions]
date: "2026-05-07"
---

W zapewnianiu jakości oprogramowania (QA) samo posiadanie testów automatycznych to dopiero połowa sukcesu. Kluczem do efektywnej pracy zespołu jest **widoczność (visibility)** i szybkość diagnozy błędów. W ramach rozwoju projektu **reads** – autorskiego menedżera zakładek typu self-hosted – wdrożony został zaawansowany system raportowania oparty na frameworku **Allure** oraz **Playwright**.

<!-- truncate -->

Oto jak podejście „Automation First” przekłada się na realną użyteczność w procesie CI/CD.


## Dlaczego Allure? Przewaga nad standardowymi raportami
Standardowe wyjście z konsoli czy proste raporty HTML często nie wystarczają, gdy projekt rośnie. Allure Framework dostarcza czytelną, interaktywną wizualizację wyników, która pozwala na:
*   **Szybką analizę przyczyn błędów (Root Cause Analysis):** Dzięki automatycznemu załączaniu zrzutów ekranu, nagrań wideo oraz logów (trace) bezpośrednio w raporcie.
*   **Śledzenie trendów:** Monitorowanie historycznych danych testowych, co pozwala wyłapać tzw. *flaky tests* (testy niestabilne).
*   **Segmentację wyników:** Przejrzysty podział na funkcjonalności (Features), co ułatwia ocenę, która część aplikacji wymaga uwagi.

---

## Architektura wdrożenia w potoku CI/CD
Wdrożenie w projekcie **reads** zostało zaprojektowane w sposób optymalny dla zasobów, zgodnie z zasadą **Secure by Design**. Proces został podzielony na dwa kluczowe etapy w GitHub Actions:

### 1. Walidacja "Pre-merge"
Każdy Pull Request przechodzi automatyczną weryfikację jakościową (`quality.yml`). Na tym etapie Playwright uruchamia testy w izolowanym środowisku lokalnym. Jeśli jakakolwiek zmiana psuje kluczowe funkcjonalności (np. ekstrakcję treści do trybu reader), proces CI zatrzymuje merge, chroniąc główną gałąź kodu.

### 2. Pełna Regresja na Stagingu
Po wdrożeniu aplikacji na środowisko stagingowe (`[https://reads-staging.baluarte.pl](https://reads-staging.baluarte.pl)`), automatycznie wyzwalany jest pełny zestaw testów regresyjnych. To tutaj Allure pokazuje swoją pełną moc:
*   **Multi-reporter:** System jednocześnie generuje raporty w formatach `list`, `html` oraz dane dla `allure-playwright`.
*   **Automatyczna publikacja:** Wyniki są generowane jako statyczna strona i publikowane na **GitHub Pages**. Dzięki temu zespół ma stały dostęp do najświeższego statusu aplikacji pod dedykowanym adresem.

| Cecha | Konfiguracja w reads | Korzyść |
| :--- | :--- | :--- |
| **Retencja danych** | 14-30 dni | Oszczędność miejsca w chmurze GitHub |
| **Zasoby wideo/trace** | `retain-on-failure` | Szybki debug bez obciążania CI zbędnymi plikami |
| **Historyczność** | Ciągłość między workflowami | Możliwość analizy trendów stabilności aplikacji |

---

## reads: Poligon doświadczalny i narzędzie codziennego użytku
Projekt **reads** (dostępny na [GitHub](https://github.com/przemyslvw/reads)) to nie tylko manager zakładek. To publiczny **showcase warsztatu technologicznego**, gdzie rozwiązania takie jak integracja Playwright z Allure służą jako wzorzec (PoC) dla komercyjnych wdrożeń.

### Kluczowe funkcjonalności reads:
*   Pobieranie metadanych (tytuł, opis, favicon, og:image).
*   Ekstrakcja treści do czystego trybu czytania (Reader Mode).
*   Tagowanie i zaawansowane wyszukiwanie.
*   Architektura gotowa do pracy w modelu self-hosted.

## Podsumowanie
Wprowadzenie raportowania Allure do stacku technologicznego projektu znacząco skraca **Time-to-Fix**. Zamiast analizować surowe logi w poszukiwaniu błędów, zespół otrzymuje gotowy materiał wizualny z dokładnym wskazaniem miejsca awarii. To standard, który powinien towarzyszyć każdemu nowoczesnemu projektowi IT dbającemu o jakość i bezpieczeństwo.

---
*Interesuje Cię kod źródłowy tej integracji? Sprawdź pliki konfiguracyjne w [repozytorium reads](https://github.com/przemyslvw/reads).*