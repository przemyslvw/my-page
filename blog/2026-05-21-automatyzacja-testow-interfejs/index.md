---
slug: automatyzacja-testow-interfejs
title: "Jak zbudować nowoczesną automatyzację testów: Kompleksowe testowanie interfejsu (Część 3)"
authors: [przemyslvw]
tags: [testing, playwright, cicd, devops, github-actions]
date: "2026-05-21"
---

Po ustabilizowaniu fundamentów strategii testowej i zapanowaniu nad środowiskiem (sieć oraz dane), czas spojrzeć na warstwę, z którą nasz użytkownik styka się bezpośrednio – interfejs.

W trzeciej części cyklu skupimy się na połączonych konceptach **Testowania Wielopłaszczyznowego (Cross-X)** oraz **Testowania Wizualnego**. Dlaczego warto o nich mówić razem? Ponieważ oba skupiają się na zagwarantowaniu, że niezależnie od urządzenia, silnika czy najmniejszej zmiany w CSS, nasza aplikacja wygląda i zachowuje się wzorowo.

<!-- truncate -->

## 1. Testowanie Wielopłaszczyznowe (Cross-X)

Aplikacja webowa to żywy organizm uruchamiany w setkach różnych środowisk. Nasze testy muszą udowadniać spójność aplikacji na wielu płaszczyznach.

* **Cross-framework Testing:** Zdolność frameworka do interakcji z różnymi cyklami życia komponentów. W naszym projekcie oparliśmy się na React (Next.js).
* **Cross-environment Testing:** Kod zachowuje stabilność w locie przez środowiska: *Local -> Staging -> Production*, co osiągamy dzięki sprytnej parametryzacji po stronie CI/CD.
* **Headless Testing:** Na serwerach CI uruchamiamy testy "bezgłowo" (bez rysowania pełnego UI), drastycznie zmniejszając użycie RAMu/CPU.

### Konfiguracja Wieloprzeglądarkowa (Cross-browser)

Błędy specyficzne dla Safari czy FireFoxa potrafią mocno uderzyć w biznes. Dlatego nasz zestaw E2E uruchamia pełne ścieżki na kluczowych silnikach (Chromium, WebKit, Firefox). Poniżej fragment konfiguracji z naszego `playwright.config.ts`, demonstrujący jak prosto zdefiniować "projekty" przypisane do różnych przeglądarek:

```typescript
// playwright.config.ts
export default defineConfig({
  // ... inne ustawienia globalne
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: { args: ["--disable-seccomp-filter-sandbox"] },
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
```

---

## 2. Testowanie Wizualne (Visual & Snapshot Testing)

Samo sprawdzanie, czy przycisk istnieje i działa pod kątem logiki (`click()`), to zbyt mało. Klasyczna asercja DOM nie powie nam, że przycisk wylądował całkowicie poza widokiem ekranu z powodu zepsutego paddingu, stając się nieużywalnym.

### UI Snapshot Testing

Najniższą warstwą weryfikacji prezentacji są testy migawkowe. Polegają na serializacji drzewa HTML/DOM wyrenderowanego komponentu i zapisaniu go w postaci tekstowej w pliku `.snap`. Jakiekolwiek przesunięcie w propsach, brak klas CSS czy błędy w warunkach renderowania natychmiast "obleją" test. To idealne na etap Code Review!

Spójrzmy na test jednostkowy dla naszego komponentu sprawdzającego status API (z użyciem Vitest i Testing Library, plik `ApiStatus.test.tsx`):

```typescript
// ApiStatus.test.tsx
import { render, screen } from "@testing-library/react";

it("renders loading state initially and matches snapshot", async () => {
  mockFetchApi.mockResolvedValue({ data: { status: "ok" } });
  
  const { container } = render(<ApiStatus />);
  expect(screen.getByText(/API: loading/i)).toBeInTheDocument();

  // Test migawkowy struktury DOM komponentu 
  expect(container).toMatchSnapshot();
});
```

### Visual Regression Testing (Pixel-by-Pixel)

Dopełnieniem migawek kodu jest testowanie faktycznie wyrenderowanych pikseli. Test polega na automatycznym wykonaniu zrzutu ekranu i zestawieniu go ze wzorcem (*Baseline*). Pozwala to wyłapać przesunięcia układu o kilka pikseli, problemy z kontrastem, nakładający się tekst na przyciskach czy wpadki RWD na urządzeniach mobilnych.

W naszym repozytorium (wewnątrz `visual.spec.ts`) korzystamy ze wbudowanych mechanizmów Playwrighta ustawiając rygorystyczny maksymalny próg odchyłu błędu:

```typescript
// visual.spec.ts
test.describe("Visual Regression Testing", () => {
  test("login page visual snapshot", async ({ page }) => {
    await page.goto("/login");

    // Zawsze jawnie czekamy na stabilny stan elementu, by uniknąć fałszywych błędów
    await expect(page.locator("form")).toBeVisible();

    // Weryfikacja wizualna piksel po pikselu
    await expect(page).toHaveScreenshot("login-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.05, // Bardzo rygorystyczna tolerancja
    });
  });
});
```

Chociaż Playwright potrafi robić to "lokalnie", w profesjonalnych projektach na skalę Enterprise te procesy najczęściej podpinane są do zaawansowanych platform. Narzędzia takie jak **Percy**, **Chromatic** lub oparte o AI **Applitools**, wpinają się bezpośrednio w GitHub Actions, tworząc piękny raport wizualny (z overlayami typu diff) prosto w Pull Requeście.

Podsumowując – stabilne testowanie to testowanie wielowarstwowe. Upewniamy się, że aplikacja nie psuje się logicznie w żadnej przeglądarce, a jej struktura i wygląd pozostają idealnie dopasowane (Pixel-Perfect) przy najmniejszej nowej zmianie. W kolejnym wpisie przejdziemy do kwestii absolutnie niefunkcjonalnych: Bezpieczeństwa oraz Dostępności!
