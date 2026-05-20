---
slug: automatyzacja-testow-dane-i-siec
title: "Jak zbudować nowoczesną automatyzację testów: Pełna kontrola nad środowiskiem (Część 2)"
authors: [przemyslvw]
tags: [testing, playwright, cicd, devops, github-actions]
date: "2026-05-20"
---

W poprzedniej części cyklu o automatyzacji testów omówiliśmy fundamenty: Piramidę Testów i traktowanie testów jako pełnoprawnego kodu produkcyjnego (Page Object Model, TypeScript). Jednak nawet najlepiej napisany kod testowy będzie bezużyteczny, jeśli będzie działał na niestabilnym środowisku z nieprzewidywalnymi danymi.

Dlatego w tym bardzo "mięsistym" technicznie wpisie skupimy się na wyzwaniu, które spędza sen z powiek wielu testerom: **Izolacja Danych i Zarządzanie Ruchem Sieciowym**. 

<!-- truncate -->

Aby zapewnić pełną niezależność, powtarzalność i wysoką stabilność, musimy przejąć absolutną kontrolę nad dwiema kluczowymi warstwami: Siecią (Network) oraz Bazą Danych (Database).

## 1. Kontrola Warstwy Sieciowej w Playwright

Tradycyjne testy End-to-End bywają wrażliwe na awarie infrastruktury. Jeśli backend zwróci niespodziewany błąd lub całkowicie przestanie odpowiadać, testy frontendu zaczną sypać się na potęgę. Dlatego mądra automatyzacja polega na odizolowaniu stabilności frontendu od zewnętrznych zależności, gdy testujemy tylko UI.

### Przechwytywanie i Mockowanie (Request Intercepting & Stubbing)

Dzięki narzędziom takim jak Playwright, możemy wpiąć się bezpośrednio w ruch sieciowy z poziomu przeglądarki, podmieniając odpowiedzi API na pożądane przez nas, fałszywe payloady JSON. Pozwala to na:
* Błyskawiczną weryfikację skomplikowanych stanów interfejsu.
* Testowanie rzadkich i bardzo trudnych do wygenerowania "naturalnie" stanów danych (np. tysiące rekordów).
* Symulowanie awarii backendu (tzw. Negative Testing), co w prawdziwym świecie bywa wręcz niemożliwe na żądanie.

**Przykład z życia: Mockowanie HTTP 500**

Jak sprawdzić, czy nasza aplikacja poprawnie obsłuży i zakomunikuje użytkownikowi błąd wewnętrzny serwera? Zamiast psuć prawdziwy backend, podmieniamy jego odpowiedź w locie za pomocą metody `route.fulfill()` z API Playwrighta. Poniżej snippet pochodzący bezpośrednio z naszych testów (plik `api-mocking.spec.ts`):

```typescript
test("powinien wyświetlić błąd, gdy API zwróci HTTP 500", async ({ authenticatedPage: page }) => {
  // Przechwytujemy zapytania do endpointu zakładki
  await page.route("**/api-proxy/bookmarks", async (route) => {
    if (route.request().method() === "POST") {
      // Wymuszamy błąd 500 (Internal Server Error)
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ message: "Internal Server Error" }),
      });
    } else {
      // Przepuszczamy pozostały ruch normalnie
      await route.continue();
    }
  });

  // Użytkownik wykonuje akcję w UI
  await page.click("#add-article-btn");
  await page.locator('input[name="url"]').fill("https://error-test.com");
  await page.locator('dialog button[type="submit"]:has-text("Add Bookmark")').click();

  // Weryfikujemy, czy frontend odpowiednio zareagował na wymuszony błąd z backendu
  const errorMessage = page.locator("text=Failed to add bookmark. Please try again.");
  await expect(errorMessage).toBeVisible();
  await expect(errorMessage).toHaveClass(/text-red-400/);
});
```

Dzięki temu test jest odporny na wahania prawdziwego środowiska testowego – my jesteśmy absolutnym władcą warstwy sieciowej!

---

## 2. Walidacja i Zarządzanie Bazą Danych

O ile mockowanie jest genialne na warstwie UI, o tyle w prawdziwych testach Integracyjnych czy E2E potrzebujemy pełnego przepływu przez bazę danych. Antywzorcem, który wciąż widzi się w wielu firmach, jest przygotowywanie danych przez... wyklikiwanie ich w interfejsie. Zajmuje to ułamki minut na każdy test, drastycznie spowalniając pipeline CI/CD.

### Data Seeding i Teardown

Zamiast wypełniać formularze by stworzyć użytkownika i przypisać mu role – strzelamy bezpośrednio pod maskę, korzystając ze wstrzykiwania danych do bazy (**Data Seeding**) jeszcze przed startem testów (hook `beforeAll`). Następnie pamiętamy o kluczowym elemencie – higienie środowiska. Po teście musimy bezwzględnie usunąć śmieci (tzw. **Teardown** w `afterAll`).

Oto przykład omijania UI i wstrzykiwania warunków wstępnych:

```typescript
import { test, expect } from '@playwright/test';
import { db } from '../../src/db'; // Bezpośredni import klienta bazy

test.describe("Zarządzanie zakładkami użytkownika", () => {
  const seedUserId = 'test_user_999';
  const seedBookmarkId = 'test_bookmark_1';

  // 1. SEEDING: Wstrzyknięcie danych przed rozpoczęciem zestawu testów
  test.beforeAll(async () => {
    await db.insert('users').values({ id: seedUserId, name: 'Tester' });
    await db.insert('bookmarks').values({
      id: seedBookmarkId,
      url: 'https://example.com/playwright',
      title: 'Zrozumieć Playwrighta',
      userId: seedUserId
    });
  });

  // 2. TEARDOWN: Automatyczne czyszczenie po zakończeniu, zachowujemy czyste środowisko!
  test.afterAll(async () => {
    await db.delete('bookmarks').where({ id: seedBookmarkId });
    await db.delete('users').where({ id: seedUserId });
  });

  // 3. Właściwy test, który od razu startuje z gotowymi danymi
  test("użytkownik widzi wcześniej dodaną zakładkę w swoim profilu", async ({ page }) => {
    await page.goto(`/profile/${seedUserId}`);
    // Zakładka tam jest, bez konieczności kilkunastu kroków przechodzenia przez kreatory w UI!
    await expect(page.getByRole("heading", { name: "Zrozumieć Playwrighta" })).toBeVisible();
  });
});
```

### Data Assertions

Wstrzykiwanie danych to tylko połowa sukcesu. Jeśli test ma zweryfikować czy usunięcie konta przez aplikację webową (UI) "skasowało wszystko", asercja na brak widoczności elementu (`not.toBeVisible()`) to za mało.

Często uciekamy się do bezpośrednich kwerend do bazy danych po wykonaniu akcji (np. z JOIN-ami), aby fizycznie potwierdzić, że nasza aplikacja nie pozostawiła sierot (tzw. "orphan records") i logicznie zmodyfikowała stan danych.

Podsumowując – nowoczesne testy nie mogą być tylko ślepym przeklikiwaniem widoków. Posiadanie narzędzi i "know-how" do odcinania backendu w locie (`route.fulfill()`) oraz dbania o stan testowej bazy danych sprawi, że Wasze pipeline'y nabiorą pożądanej stabilności, a "flaky tests" będą przeszłością.

W następnej części przyjrzymy się architekturze samego systemu E2E w CI/CD!
