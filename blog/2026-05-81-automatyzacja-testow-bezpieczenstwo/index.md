---
slug: automatyzacja-testow-bezpieczenstwo
title: "Jak zbudować nowoczesną automatyzację testów: Poza Happy Path – Dostępność i bezpieczeństwo (Część 4)"
authors: [przemyslvw]
tags: [testing, security, a11y, accessibility, adversarial]
date: "2026-05-28"
---

Po zbudowaniu Piramidy Testów, opanowaniu mockowania i wdrożeniu testów wizualnych, mogłoby się wydawać, że nasza praca jest skończona. Niestety, testowanie tzw. "szczęśliwych ścieżek" (Happy Paths) to zaledwie wierzchołek góry lodowej.

W czwartej części naszego cyklu poruszymy obszary najczęściej ignorowane w procesie deweloperskim, aż do momentu krytycznego błędu na produkcji. Skupimy się na **Dostępności (A11y)**, **Bezpieczeństwie (Security)** oraz nieliniowym, hakerskim podejściu do własnej aplikacji, czyli **Testowaniu Adwersaryjnym**.

<!-- truncate -->

## 1. Dostępność (Accessibility) jako standard, nie dodatek

Zgodnie z zasadami inkluzywności, aplikacja powinna być dostępna dla każdego, w tym dla osób używających czytników ekranu (Screen Readers) czy poruszających się po stronach wyłącznie za pomocą klawiatury. Ręczne testowanie standardów **WCAG** jest żmudne, dlatego wplatamy to w naszą automatyzację.

Wykorzystując potęgę narzędzi takich jak `@axe-core/playwright`, w dosłownie kilku linijkach kodu E2E jesteśmy w stanie wykryć setki problemów (brakujące atrybuty `alt`, błędy kontrastu czy źle użyte tagi `aria-`).

Zobaczmy, jak to wygląda w naszym środowisku testowym (plik `accessibility.spec.ts`):

```typescript
import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";

test("Dashboard nie powinien zawierać błędów dostępności", async ({ authenticatedPage: page }) => {
  // Oczekujemy, aż główny kontener aplikacji w pełni się wyrenderuje
  await page.waitForSelector("main", { state: "visible", timeout: 10000 }).catch(() => {});

  // Uruchamiamy audyt axe-core ze standardami WCAG 2.1 AA
  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  // Oczekujemy tablicy pustej od naruszeń!
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

Dzięki podpięciu tego testu pod CI/CD, każda zmiana powodująca chociażby pogorszenie kontrastu przycisku w CSS, zostanie od razu zablokowana.

---

## 2. Security Awareness, czyli testowanie włamań

Automatyzacja E2E pozwala nam zapisać najczęstsze wektory ataków (np. z listy **OWASP Top 10**) i upewnić się, że nasze filtry i sanitizery danych działają bez zarzutu. Sprawdzamy np. podatność na SQL Injection oraz Cross-Site Scripting (XSS).

W naszym projekcie testujemy między innymi wstrzykiwanie szkodliwego kodu JavaScript do odczytywanych zakładek (Stored XSS). Playwright jest do tego idealny – symulujemy złośliwy backend, który wysyła zainfekowany HTML na nasz frontend:

```typescript
// Fragment z security.spec.ts
test("powinien wyczyścić złośliwy kod w trybie Reader (Stored XSS)", async ({ authenticatedPage: page }) => {
  // Przechwytujemy zapytanie o zawartość zakładki i wstrzykujemy skrypt "hakera"
  await page.route("**/bookmarks/*", async (route) => {
    const json = {
      id: "infected_1",
      content: `
        <p>To jest bezpieczny tekst.</p>
        <script>window.XSS_EXECUTED = true;</script>
        <div onmouseover="window.XSS_EXECUTED = true;">Najedź myszką!</div>
      `,
      extractionStatus: "done"
    };
    await route.fulfill({ json });
  });

  // Użytkownik (lub test) wchodzi w tryb czytania
  await page.click(".glass:has-text('Test Article')");

  // Asercja 1: Upewniamy się, że nasz groźny globalny znacznik NIE został ustawiony (skrypt nie zadziałał)
  const xssExecuted = await page.evaluate(() => (globalThis as any).XSS_EXECUTED);
  expect(xssExecuted).toBeUndefined();

  // Asercja 2: Frontend (np. DOMPurify) musiał całkowicie usunąć złośliwy tag <script>
  const scriptCount = await page.locator("#reader-panel script").count();
  expect(scriptCount).toBe(0);
});
```

To potężne podejście (Secure by Design), w którym weryfikujemy bezpieczeństwo aplikacji na żywym organizmie bezpośrednio podczas cyklu życia CI/CD.

---

## 3. Podejście Adwersaryjne i Eksploracja

Nawet najlepsze skrypty nie zastąpią krytycznego myślenia. Automatyzacja tworzy ramy, natomiast **Testowanie Eksploracyjne** to praca "poza skryptem" mająca na celu znalezienie luk w logice biznesowej.

Jego starszym, groźniejszym bratem jest **Testowanie Adwersaryjne** (Adversarial Testing). Przyjmujemy tu mentalność agresora. Celowo doprowadzamy system do błędów stanu (np. przerywamy wysyłanie formularza w połowie) lub modyfikujemy nagłówki w locie, aby wywołać błędne autoryzacje transakcji.

Jak zautomatyzować chociaż część tej hakerskiej zabawy? Znów za pomocą modyfikacji sieci w locie (plik `adversarial.spec.ts`):

```typescript
test("Adversarial: Próba podmieniania żądań API powinna zostać odrzucona (401)", async ({ authenticatedPage: page }) => {
  // Symulujemy zachowanie, w którym napastnik uderza na endpoint z nieważnym tokenem
  await page.route("**/bookmarks", async (route, request) => {
    if (request.method() === "POST") {
      await route.fulfill({
        status: 401,
        body: JSON.stringify({ error: "Unauthorized" }),
      });
      return;
    }
    await route.continue();
  });

  await page.click("#add-article-btn");
  await page.locator('input[name="url"]').fill("https://tampered.test");
  await page.locator('dialog button[type="submit"]').click();

  // Oczekujemy, że system poradzi sobie z nieautoryzowanym strzałem i nie wyświetli nowej zakładki optymistycznie
  const card = page.locator(".glass", { hasText: "Tampered Bookmark" });
  await expect(card).not.toBeVisible();
});
```

To podejście uczy projektowania systemów odpornych na zachowania nieszablonowe i próby oszustwa. Kiedy połączymy Dostępność (A11y), Bezpieczeństwo i Podejście Adwersaryjne, nasza aplikacja staje się niesamowicie dojrzała technicznie.

W następnej, ostatniej części podepniemy te wszystkie wytyczne do infrastruktury i pokażemy, jak to odpalić równolegle na CI/CD!
