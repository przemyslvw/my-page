---
slug: playwright-e2e-cicd-reads
title: "Od Zera do CI/CD: Jak ujarzmiliśmy testy E2E z Playwright w projekcie Reads"
authors: [przemyslvw]
tags: [testing, playwright, cicd, devops, github-actions]
date: "2026-05-14"
---

W dzisiejszym świecie tworzenia oprogramowania (szczególnie aplikacji Fullstack), testowanie to nie tylko "dodatek", ale absolutny fundament utrzymania zdrowego cyklu życia projektu. W projekcie reads od początku postawiliśmy na wysoką jakość i zautomatyzowane procesy. Chciałbym podzielić się z Wami, dlaczego wybraliśmy Playwrighta do testów End-to-End (E2E), jak to narzędzie sprawdza się w praktyce oraz w jaki sposób wpięliśmy je w naszą "piramidę testów" na CI/CD.

<!-- truncate --> 

## Dlaczego Playwright?

Wybór frameworka do testów E2E często sprowadza się do wyścigu między Cypress, Selenium i Playwright. W naszym projekcie wygrał ten ostatni. Oto dlaczego:

1. **Wbudowane "Auto-waiting"**: Zapomnij o ręcznym dodawaniu `sleep()` czy `waitForTimeout()`. Playwright sam wie, kiedy element na stronie staje się klikalny, widoczny lub gotowy do interakcji. Znacząco redukuje to zjawisko tzw. "flaky tests" (testów, które przechodzą lub padają losowo).
2. **Pełna izolacja**: Każdy test w Playwright uruchamia się we własnym, odizolowanym kontekście przeglądarki (Browser Context). Dzięki temu testy nie wpływają na siebie nawzajem i mogą działać równolegle z pełną prędkością.
3. **TypeScript jako First-Class Citizen**: Cały nasz projekt **reads** (zarówno API w Fastify, jak i frontend w Next.js) jest napisany w TypeScript. Playwright natywnie go wspiera, co pozwala nam na współdzielenie typów i korzystanie ze świetnego podpowiadania składni.
4. **Narzędzia developerskie**: Tryb UI (`playwright test --ui`) czy wbudowany *Trace Viewer* to absolutne mistrzostwo podczas debugowania, zwłaszcza gdy test ulegnie awarii na serwerze CI.

## Architektura testów E2E: Czysty kod z POM

Zamiast pisać spaghetti kod bezpośrednio w plikach z testami, wykorzystujemy wzorzec **Page Object Model (POM)**. Dzięki temu logika interakcji ze stroną (np. wypełnianie formularzy, nawigacja) jest odseparowana od logiki asercji w teście.

W plikach takich jak `happy-path-pom.spec.ts` testy czyta się niemal jak scenariusz biznesowy:

```typescript
test("Happy Path - rejestracja, dodanie zakładki, odczyt i wylogowanie", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  
  await loginPage.goto();
  await loginPage.login(userCredentials);
  
  await homePage.addBookmark("https://example.com/playwright");
  await homePage.expectBookmarkToExist("Playwright Tutorial");
});
```

Korzystamy też intensywnie z tzw. **Fixtures** (wzorzec Factory), które dynamicznie generują stan bazy danych niezbędny do konkretnego testu, dzięki czemu nasze testy są maksymalnie niezależne.

## CI/CD: Nasza Piramida Testów w GitHub Actions

Posiadanie świetnych testów lokalnie to jedno, ale prawdziwa magia dzieje się dopiero w CI/CD. Nasz pipeline został zaprojektowany z myślą o szybkości dostarczania feedbacku i bezpieczeństwie wdrażania.

Nie uruchamiamy wszystkich testów za każdym razem, gdy ktoś zrobi nową gałąź. Wprowadziliśmy jasny podział testów Playwrighta za pomocą tagów.

### 1. Bramka jakości (Quality Gate) i Smoke Tests
Każdy nowy Pull Request (PR) uruchamia na naszym self-hosted runnerze workflow `quality.yml`. Aby developer nie czekał godzinami na wyniki (oraz aby nie obciążać infrastruktury), odpalamy tutaj tylko tzw. **Smoke Tests**.

Testy oznaczone są w kodzie specjalnym tagiem:
```typescript
test("Logowanie powinno działać @smoke", async () => { ... })
```

Workflow GitHub Actions używa komendy `pnpm -F web test:e2e --grep @smoke`. W locie:
- Podnoszona jest baza Postgres (`service container` w Actions).
- Uruchamiane są migracje bazy z użyciem zmiennych testowych.
- Odpalane są API oraz Webapp.
- Playwright wykonuje krytyczne ścieżki w aplikacji.

Jeśli jakikolwiek "Smoke test" (lub linters / unit testy z Vitest) upadnie, PR zostaje zablokowany i nie może trafić do gałęzi `develop`.

### 2. Full Regression na środowisku Staging
Kiedy PR pomyślnie przejdzie weryfikację i trafi do gałęzi `develop`, uruchamia się `deploy-staging.yml`. W tym momencie aplikacja fizycznie trafia na nasz VPS (na określone porty: 3101 dla API i 3100 dla Web).

Dopiero wtedy na realnym środowisku testowym uruchamiamy pełen pakiet regresji E2E w Playwright. Daje nam to pewność, że wdrożony kod radzi sobie z najdrobniejszymi przypadkami brzegowymi na infrastrukturze bardzo zbliżonej do produkcyjnej. Awaria na tym etapie alarmuje nas od razu, ale nie wpływa już bezpośrednio na główną linię kodu.

## Podsumowanie

Wdrożenie Playwrighta wraz ze zorganizowanym podejściem do środowisk testowych w GitHub Actions dało nam niesamowitą pewność podczas wdrażania nowych zmian. Koncepcja podziału na **Smoke Tests** przy PR-ach i **Pełną Regresję** po deployu pozwala utrzymać wysoką dynamikę pracy, jednocześnie zabezpieczając nas przed wdrożeniem zepsutego kodu.

Jeśli szukasz stabilnego, nowoczesnego frameworka do automatyzacji E2E, który świetnie dogaduje się z Typescriptem i współczesnym CI/CD, zdecydowanie polecam dać Playwrightowi szansę!
