---
slug: automatyzacja-testow-infrastruktura
title: "Jak zbudować nowoczesną automatyzację testów: Zwieńczenie – Infrastruktura i CI/CD (Część 5)"
authors: [przemyslvw]
tags: [testing, cicd, devops, playwright, github-actions]
date: "2026-06-08"
---

Witamy w wielkim finale naszej serii! Przez ostatnie tygodnie budowaliśmy Piramidę Testów, walczyliśmy z asynchronicznością, przejmowaliśmy kontrolę nad bazą danych i API, pilnowaliśmy dostępności i bawiliśmy się w hakerów.

Jednak wszystkie te niesamowite testy, bez względu na to jak czysty jest ich kod, nie mają znaczenia, dopóki działają wyłącznie na komputerze dewelopera. Prawdziwa jakość rodzi się w **Continuous Integration (CI/CD)**.

W tej części przyjrzymy się infrastrukturze i sposobom wpinania automatyzacji tak, by stanowiła twardą bramkę jakościową (Quality Gate).

<!-- truncate -->

## 1. Parallel Test Execution & Architecture

Uruchamianie setek testów E2E jeden po drugim trwałoby wieki. Architektura naszych testów musi być domyślnie przystosowana do **równoległości (Concurrency/Parallelism)**. Kluczem jest tu pełna niezależność danych (każdy test tworzy własne zasoby i sprząta po sobie), dzięki czemu uniemożliwiamy powstanie zjawiska *race conditions* na bazie danych.

W Playwright natywna równoległość jest wbudowana. Wystarczy skonfigurować *workery* zależnie od środowiska. Zobaczmy wycinek z naszego `playwright.config.ts`:

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: "./tests",
  // Włączenie w pełni równoległego uruchamiania wszystkich plików testowych naraz
  fullyParallel: true,
  // Lokalnie Playwright dobierze workery sam, na CI ograniczamy je sztucznie by nie ubić maszyny
  workers: process.env.CI ? 4 : undefined,
  // Testy na CI ponawiamy w przypadku "chwilowych" niestabilności sieci
  retries: process.env.CI ? 2 : 0,
});
```

Dzięki odpalaniu 4 workerów jednocześnie na serwerze CI (posiadającym wielordzeniowy procesor), czas wykonania całego pakietu regresji spada drastycznie.

---

## 2. CI/CD i Full Regression

Kiedy nasz kod w postaci Pull Requestu (PR) trafia na GitHub lub GitLab, automatycznie podnoszone jest dedykowane środowisko. Architektura zakłada postawienie aplikacji Webowej, API oraz tymczasowej bazy danych PostgreSQL.

Poniżej wycinek pliku `.github/workflows/full-regression.yml` – pipeline’u odpowiadającego za pełną walidację kodu:

```yaml
name: Full Regression

on:
  schedule:
    - cron: '0 2 * * *' # Codziennie o 2:00 w nocy wykonujemy pełną regresję (Nightly Run)
  workflow_dispatch:    # Możliwość ręcznego wywołania

jobs:
  full-regression:
    name: Full Regression Testing
    runs-on: self-hosted

    # 1. Definicja kontenera z pustą bazą danych do testów
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: test
          POSTGRES_USER: reads
          POSTGRES_PASSWORD: password
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v6
      - uses: actions/setup-node@v4
      
      # 2. Instalacja, Migracje i Budowanie
      - name: Instalacja zależności
        run: pnpm install --frozen-lockfile
      - name: Uruchomienie Migracji Bazy
        run: pnpm -F api db:migrate
      - name: Budowanie API i Frontendu
        run: NEXT_PUBLIC_API_URL=http://localhost:3003 pnpm -r build

      # 3. Instalacja przeglądarek i start testów Playwright
      - name: Install Playwright Browsers
        run: pnpm -F web exec playwright install --with-deps chromium firefox webkit
      - name: Run Playwright Full Regression Tests
        run: pnpm -F web test:e2e
```

Taki przepływ to doskonały przykład *Release Validation*. Dzięki Nightly Runs mamy pełny raport stabilności każdego dnia o poranku.

---

## 3. Maintenance: Testowanie branchy LTS (Long-Term Support)

W projektach klasy Enterprise często pracujemy na starych, stabilnych wersjach w celach wsparcia klientów (gałęzie LTS). Kiedy wprowadzamy krytyczną łatkę bezpieczeństwa (Backporting) na taką gałąź, ryzyko regresji logiki biznesowej jest ogromne.

Dlatego wdrożyliśmy specjalną strategię testową. Plik `.github/workflows/lts-testing.yml` uruchamia się wyłącznie dla konkretnych naming-conventions gałęzi (np. `lts/*` lub `support/*`):

```yaml
# Fragment lts-testing.yml
name: LTS Branch Testing

on:
  push:
    branches:
      - 'lts/**'
      - 'support/**'
  pull_request:
    branches:
      - 'lts/**'
      - 'support/**'

jobs:
  lts-validation:
    name: Validate LTS Backports
    runs-on: self-hosted
    
    steps:
      # ... kroki setupu ...
      
      - name: Install Playwright Browsers
        # Dla starszych, stabilnych gałęzi LTS testujemy najczęściej tylko na jednym, wiodącym silniku, np. Chromium
        run: pnpm -F web exec playwright install --with-deps chromium

      - name: Run Playwright Regression Validation
        run: pnpm -F web test:e2e
```

Dzięki temu minimalizujemy ryzyko, że próbując załatać starą podatność u klienta, przypadkowo zablokujemy mu np. proces logowania, co udowadnia jak cenną rolę pełnią automatyczne skrypty.

### Podsumowanie Całego Cyklu

Dotarliśmy do końca naszej wspólnej drogi! Automatyzacja testów to sztuka inżynieryjna o wielu twarzach. Od wyboru architektury i unikania spaghetti-kodu (Część 1), przez zarządzanie środowiskiem (Część 2), walidację różnorodnych interfejsów i ułomności CSS (Część 3), aż po testy Dostępności, Bezpieczeństwa oraz podejście Adwersaryjne (Część 4). 

Zwieńczeniem tego dzieła jest szybki, równoległy i twardy mur wbudowany prosto w nasze CI/CD. 

Z takim "mindsetem" i narzędziami takimi jak TypeScript i Playwright jesteście w stanie budować niesamowicie stabilne i odważne w utrzymaniu produkty cyfrowe. Powodzenia we wdrożeniach i... zielonych pipeline'ów!
