---
slug: automatyzacja-testow-fundamenty
title: "Jak zbudować nowoczesną automatyzację testów: Od piramidy po czysty kod (Część 1)"
authors: [przemyslvw]
tags: [testing, playwright, cicd, devops, github-actions]
date: "2026-05-19"
---

Zanim zaczniemy pisać o konkretnych narzędziach, konfigurować pipeline'y CI/CD i uruchamiać testy w środowiskach wirtualnych, musimy odpowiednio ustawić nasz "mindset". Budowanie stabilnego frameworka testowego zaczyna się od obranej strategii (Piramidy Testów), a kończy na uświadomieniu sobie kluczowej zasady: **kod testów to kod produkcyjny**. 

<!-- truncate --> 

W tej pierwszej części przyjrzymy się fundamentom nowoczesnej automatyzacji testów na podstawie prawdziwych przykładów z repozytorium.

## 1. Architektura i Strategia Testów (Test Pyramid)

Podstawą stabilności i efektywności kosztowej całego projektu jest zachowanie odpowiednich proporcji w strukturze testów. Stanowczo unikamy antywzorca "odwróconej piramidy" (tzw. lodowego stożka) na rzecz optymalnego rozłożenia warstw:

```text
      /\      
     /  \     E2E / UI (Najmniej - tylko krytyczne ścieżki)
    /----\    
   /      \   API / Integration (Średnia ilość - walidacja logiki)
  /--------\  
 /          \ Component / Unit (Najwięcej - szybka, izolowana weryfikacja)
------------
```

* **Component / Unit Testing:** Testowanie pojedynczych funkcji, klas oraz komponentów UI w izolacji (np. React, Vue, Angular). To daje najszybszą informację zwrotną.
* **Integration & API Testing:** Weryfikacja integracji między modułami oraz poprawności działania punktów końcowych API.
* **E2E / UI Testing:** Zaledwie wierzchołek góry. Testowanie pełnych, krytycznych ścieżek biznesowych z perspektywy użytkownika końcowego. Zapobiega regresji reguł biznesowych bez nadmiernego obciążania czasu wykonania.

---

## 2. Standardy Kodowania i Debugowania (Programming & Debugging)

Traktowanie automatyzacji po macoszemu to prosta droga do niestabilnych i trudnych w utrzymaniu testów. Kod testowy musi spełniać standardy kodu produkcyjnego.

### Dobre Praktyki: Wzorce Projektowe i TypeScript

Aby uniknąć kodu typu "spaghetti" i powtarzających się wielokrotnie tych samych selektorów, obligatoryjne jest stosowanie wzorców strukturyzujących, takich jak **Page Object Model (POM)** lub *Screenplay Pattern*. Dzięki temu zamykamy logikę interakcji z daną stroną lub komponentem w dedykowanej klasie. Dodatkowo opieramy się na silnym typowaniu (np. za pomocą **TypeScript**), by wyłapywać błędy na etapie kompilacji.

**Jak wygląda to w praktyce?**

*Antywzorzec ("Spaghetti kod" testu):*
```typescript
test("dodanie zakładki", async ({ page }) => {
  // Akcje i selektory hardkodowane bezpośrednio w teście
  await page.locator("#add-article-btn").click();
  await page.locator('input[name="url"]').fill("https://example.com");
  await page.locator('input[name="title"]').fill("Example");
  await page.locator('dialog button[type="submit"]:has-text("Add Bookmark")').click();
  await expect(page.locator("#add-bookmark-modal")).toBeHidden();
});
```

*Dobra praktyka (Page Object Model w Playwright):*
```typescript
// Klasa Page Object (np. BookmarksPage.ts)
export class BookmarksPage {
  readonly page: Page;
  readonly addBookmarkBtn: Locator;
  readonly urlInput: Locator;
  readonly titleInput: Locator;
  readonly submitAddBtn: Locator;
  readonly addModal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addBookmarkBtn = page.locator("#add-article-btn");
    this.urlInput = page.locator('input[name="url"]');
    this.titleInput = page.locator('input[name="title"]');
    this.submitAddBtn = page.locator('dialog button[type="submit"]:has-text("Add Bookmark")');
    this.addModal = page.locator("#add-bookmark-modal");
  }

  async addBookmark(url: string, title: string) {
    await this.addBookmarkBtn.click();
    await this.urlInput.fill(url);
    await this.titleInput.fill(title);
    await this.submitAddBtn.click();
    await expect(this.addModal).toBeHidden();
  }
}

// Użycie POM w samym pliku testowym jest niezwykle czytelne:
test("dodanie zakładki", async ({ authenticatedPage: page }) => {
  const bookmarksPage = new BookmarksPage(page);
  await bookmarksPage.addBookmark("https://example.com", "Example");
});
```
Dzięki wzorcom takim jak POM, utrzymanie (maintenance) staje się prostsze. Kiedy zmieni się selektor w aplikacji, zmieniamy go tylko w jednym miejscu – wewnątrz klasy `BookmarksPage`.

### Asynchroniczność i Explicit Waits

Częstym grzechem jest używanie sztywnych timeoutów (np. `sleep(5000)`), co sztucznie wydłuża testy i prowokuje fałszywe błędy (flakiness). W nowoczesnych testach obsługujemy asynchroniczność jawnie i mądrze. Nowoczesne frameworki takie jak Playwright same wdrażają automatyczne oczekiwanie (auto-waiting). Gdy to nie wystarcza, stosujemy oczekiwania jawne (*Explicit Waits*).

Zamiast usypiać wątek, czekamy na konkretne zdarzenie – np. na zakończenie requestu sieciowego typu `PATCH` do API:

```typescript
// Przykład użycia asynchroniczności i Explicit Waits w Playwright
async toggleReadStatus(title: string) {
  const id = await this.getBookmarkId(title);
  
  // Explicit Wait: czatujemy na odpowiedź serwera dla konkretnego requestu PATCH
  const patchResponse = this.page.waitForResponse(
    (r) => r.url().includes("/bookmarks") && r.request().method() === "PATCH",
  );
  
  // Wywołanie akcji w UI
  await this.page.click(`#action-toggle-read-${id}`);
  
  // Jawnie czekamy na obsłużenie requestu zanim test przejdzie dalej
  await patchResponse;
}
```

### Zaawansowane Debugowanie (Working Within Codebases)

Dobre testy oznaczają też dobre diagnozowanie błędów. Zrywamy z podejściem testowania aplikacji jako "czarnej skrzynki". Tester Automatyzujący lub Developer pracuje bezpośrednio wewnątrz repozytorium aplikacji.
Zamiast zgadywać powód niepowodzenia testu, wykorzystujemy pełen wachlarz narzędzi:
* **Punkty wstrzymania (Breakpoints)** do śledzenia kroku po kroku,
* Analizę stosu wywołań (Stack Trace),
* Inspekcję logów kontenerów,
* Narzędzia deweloperskie w przeglądarce: zakładki *Network* oraz *Console* w DevTools.

Dzięki temu precyzyjnie lokalizujemy źródło błędu przed jego zgłoszeniem.

Z takim podejściem – solidną Piramidą Testów, TypeScriptem, Page Object Model oraz inteligentnym podejściem do asynchroniczności i debugowania – jesteśmy gotowi na stabilny, nowoczesny proces dostarczania oprogramowania.
