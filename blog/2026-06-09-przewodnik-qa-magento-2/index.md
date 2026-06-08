---
slug: przewodnik-qa-magento-2
title: "Specyfika Magento 2 i największe wyzwania testowe: Przewodnik dla QA"
authors: [przemyslvw]
tags: [testing, cicd, devops, playwright, github-actions]
date: "2026-06-09"
---

Magento 2 (obecnie Adobe Commerce) to potężna, modularna platforma e-commerce. Ze względu na swoją architekturę – zaawansowany backend oparty na strukturze EAV oraz dynamiczny frontend wykorzystujący biblioteki takie jak Knockout.js i jQuery – platforma ta stawia przed inżynierami jakości (QA) specyficzne i bardzo wymagające wyzwania. 

Standardowe podejścia do testowania automatycznego często zawodzą w zderzeniu z Magento 2. Poniżej przedstawiamy szczegółową analizę największych wyzwań testowych specyficznych dla tej platformy oraz sprawdzone wzorce radzenia sobie z nimi.

<!-- truncate -->

## 1. Asynchroniczność frontendu (Knockout.js) i problem "Flakiness"

Magento 2 intensywnie wykorzystuje Knockout.js, wprowadzając mechanizm *lazy initialization* (leniwego ładowania) komponentów. Elementy interfejsu mogą być już obecne w drzewie DOM, ale wciąż nie być gotowe na interakcję z użytkownikiem.

**Wyzwanie:** Standardowe frameworki takie jak Playwright czekają, aż element stanie się "visible" (widoczny), co w przypadku Magento 2 nie wystarcza. Próba kliknięcia w element, którego widget jeszcze się nie zainicjował, prowadzi do niestabilnych testów (flaky tests). Dodatkowo, framework ten nakłada własne maski ładowania (np. podczas przeliczania koszyka).

**Przykład / Rozwiązanie:** 
Zamiast korzystać z twardych opóźnień (`sleep`), należy czekać na ewaluację konkretnych funkcji JavaScript w przeglądarce lub na zniknięcie specyficznych klas CSS. W przypadku kroku dostawy (Shipping) w procesie Checkoutu, należy upewnić się, że formularz nie ma już klasy `loading` i został w pełni wyrenderowany:

```javascript
await page.waitForFunction(() => 
  document.querySelector('#shipping') && 
  !document.querySelector('#shipping').classList.contains('loading') 
);
```
Warto również stosować oczekiwanie na zakończenie asynchronicznych żądań sieciowych (Network Interception) zamiast polegać wyłącznie na stanie UI.

**Przykład użycia Network Interception w Playwright:**

```typescript
test('Powinien dodać produkt do koszyka i doczekać się odpowiedzi GraphQL', async ({ page }) => {
  // Promise.all gwarantuje, że nasłuchiwanie rozpocznie się przed kliknięciem
  const [response] = await Promise.all([
    page.waitForResponse(res => 
      res.url().includes('/graphql') && 
      res.request().postDataJSON()?.operationName === 'AddToCart' &&
      res.status() === 200
    ),
    page.locator('button[title="Add to Cart"]').click()
  ]);

  const responseBody = await response.json();
  
  // Weryfikacja czy GraphQL nie zwrócił błędu biznesowego
  expect(responseBody.errors).toBeUndefined();
  expect(responseBody.data.addProductsToCart.cart.items).toHaveLength(1);
  
  // Web-first assertion dla pewności, że stan UI zaktualizował się po odpowiedzi
  await expect(page.locator('.counter-number')).toHaveText('1');
});
```

## 2. Piekło selektorów i "ukrytych" elementów UI

Złożona struktura szablonów Magento (i specyfika Knockout.js) powoduje, że ten sam tekst może być renderowany w wielu miejscach jednocześnie (np. w menu desktopowym, mobilnym, w bocznym koszyku). 

**Wyzwanie:** 
1. **Modale:** Elementy w oknach modalnych (np. popupy wyboru czasu dostawy) znajdują się we własnych kontenerach przewijania (`.modal-popup.modal-slide._inner-scroll`). Metody takie jak `scroll_into_view_if_needed()` w Playwright nie potrafią wejść w ten wewnętrzny scroll, przez co elementy poza domyślnym *viewportem* są nieklikalne.
2. **Niestabilne struktury:** Struktury kart produktów potrafią się drastycznie różnić w zależności od kontekstu (np. wyniki wyszukiwania vs. mini koszyk).

**Przykład / Rozwiązanie:**
Gdy standardowe `click()` zawodzi w modalach Magento, najlepszym wzorcem jest wymuszenie kliknięcia bezpośrednio przez JavaScript:
```javascript
// Ominięcie problemu scrollowania w oknach modalnych Magento
await element.evaluate("el => el.click()");
```
Ponadto, należy unikać wyszukiwania elementów po samym tekście za pomocą `query_selector`, ponieważ często trafimy na element ukryty. Zawsze używaj filtrów widoczności, np. opcji `visible=true` w Locator API.

## 3. Cart Merge (Łączenie koszyków) - Guest vs. Logged-in Customer

W Magento 2 istnieją kompletnie różne ścieżki w kodzie dla koszyka gościa (Guest Quote, powiązanego z ciasteczkiem sesyjnym) oraz koszyka zalogowanego klienta (Customer Quote, powiązanego z ID klienta).

**Wyzwanie:** Użytkownik (gość) dodaje towary do koszyka, przechodzi do kasy (checkout) i tam decyduje się na zalogowanie. Jest to newralgiczny moment, w którym bardzo często pojawiają się błędy biznesowe. 

**Rozwiązanie (Na co zwracać uwagę w testach):**
Test musi walidować proces "Cart Merge". Należy sprawdzić czy:
* Elementy z koszyka gościa nie zostały utracone ani nie nadpisały wcześniejszego koszyka przypisanego do konta klienta.
* Poprawnie nastąpiła translacja Guest Quote ID na Customer Quote ID.
* Produkty się zsumowały (bez tworzenia błędnych duplikatów wariantów).
* **Najważniejsze:** Czy po zalogowaniu system poprawnie zaaplikował reguły cenowe (Cart Price Rules) przypisane wyłącznie do grupy zalogowanych klientów.

## 4. Architektura EAV a Asercje na Bazie Danych (Database Testing)

Magento wykorzystuje model bazy danych EAV (Entity-Attribute-Value). Oznacza to, że informacje o jednym produkcie czy kliencie nie znajdują się w jednej tabeli, ale są rozproszone po dziesiątkach powiązanych tabel.

**Wyzwanie:** Pisanie zapytań SQL w celu weryfikacji stanu po teście (np. czy zamówienie zapisało się poprawnie z odpowiednimi atrybutami) jest niezwykle skomplikowane i trudne w utrzymaniu. Zmiany w silniku Magento lub dodanie nowych atrybutów łatwo psują takie testy.

**Rozwiązanie:**
Całkowicie unikaj bezpośrednich asercji na bazie danych w testach wyższych poziomów. Jako jedynego "Punktu Prawdy" (Source of Truth) należy używać **Admin REST API** lub zapytań **GraphQL**. Walidacja przez API gwarantuje poprawną ewaluację logiki biznesowej i uodparnia testy na refaktoring bazy danych. Pamiętaj jednak, aby przy GraphQL zawsze parsować błędy w payloadzie – nigdy nie ufamy samemu nagłówkowi HTTP 200.

**Przykład walidacji odpowiedzi GraphQL w Playwright:**

```typescript
test('Walidacja struktury odpowiedzi dla zapytania o stan magazynowy', async ({ request }) => {
  const query = `
    query getProductStock($sku: String!) {
      products(filter: { sku: { eq: $sku } }) {
        items {
          stock_status
        }
      }
    }
  `;

  const response = await request.post('/graphql', {
    data: {
      query,
      variables: { sku: '24-MB01' }
    }
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();

  // Zawsze sprawdzaj istnienie tablicy errors
  expect(body.errors, `GraphQL zwrócił błędy: ${JSON.stringify(body.errors)}`).toBeUndefined();
  expect(body.data.products.items[0].stock_status).toBe('IN_STOCK');
});
```

## 5. Izolacja danych testowych i problemy ze stanem magazynowym (Inventory)

**Wyzwanie:** Testy regresji mogą przechodzić rano, a popołudniu "wybuchać", ponieważ ktoś (inny test lub manualny QA) kupił produkt testowy i zmienił jego stan magazynowy (Inventory).

**Rozwiązanie:** 
Dane testowe w Magento muszą być całkowicie izolowane. Najlepszą praktyką jest "seeding" przed każdym zestawem testów – używając endpointu `POST /V1/products` tworzymy unikalny produkt (SKU) wyłącznie na potrzeby danego testu. Po wykonaniu testu używamy API do usunięcia produktu (Cleanup). Do płatności używamy wbudowanej metody `checkmo` (Check / Money Order), która nie wymaga integracji z zewnętrznymi bramkami płatności i eliminuje zewnętrzny punkt awarii.

Do izolacji bardziej złożonego stanu (np. koszyka zakupowego dla każdego testu) warto wykorzystać mechanizm Custom Fixtures w Playwright. Pozwala to na automatyczne przygotowanie unikalnego koszyka przez API przed uruchomieniem testu i przekazanie go jako parametru.

**Przykład użycia Custom Fixtures do izolacji koszyka:**

```typescript
// fixtures.ts
import { test as base, expect } from '@playwright/test';

type E2EFixtures = {
  guestCartId: string;
};

export const test = base.extend<E2EFixtures>({
  guestCartId: async ({ request }, use) => {
    // Setup: Utworzenie koszyka przez GraphQL API
    const response = await request.post('/graphql', {
      data: { query: `mutation { createEmptyCart }` }
    });
    const body = await response.json();
    const cartId = body.data.createEmptyCart;

    // Przekazanie koszyka do testu
    await use(cartId);

    // Teardown: Ewentualne sprzątanie po teście (w e-commerce koszyki gości zazwyczaj czyści cron)
  },
});

// cart.spec.ts
import { test } from './fixtures';

test('Dodanie produktu do unikalnego koszyka', async ({ page, guestCartId }) => {
  // Test może bezpiecznie używać guestCartId bez kolizji z równoległymi procesami
  await page.goto(`/checkout/cart?cart_id=${guestCartId}`);
  // ... dalsze kroki UI
});
```

## 6. Mockowanie usług zewnętrznych (Bramka Płatności)

Odcięcie środowiska testowego od limitów i opóźnień zewnętrznych providerów (np. PayU, Przelewy24). W ten sposób testy są niezależne od awarii zewnętrznych systemów i nie generują sztucznego ruchu na bramkach testowych.

**Przykład mockowania bramki płatności za pomocą `page.route`:**

```typescript
test('Symulacja pozytywnego przejścia płatności bez uderzania do rzeczywistego API', async ({ page }) => {
  // Przechwycenie ruchu i zwrócenie sztucznego payloadu (HTTP 200 i mockowany JSON)
  await page.route('**/api/v2/transactions/charge', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: 'SUCCESS',
        transactionId: 'MOCK_TX_999123',
        amount: 199.99
      })
    });
  });

  await page.locator('button:has-text("Place Order")').click();

  // Test weryfikuje tylko reakcję systemu Magento na otrzymany pozytywny status z bramki
  await expect(page.locator('.checkout-success')).toBeVisible();
  await expect(page.locator('.order-number')).toContainText('000');
});
```

## 7. Złożoność wielosklepowości (Multistore / Scope)

Konfiguracja w Magento 2 opiera się na hierarchii: *Global -> Website -> Store -> Store View*. 

**Wyzwanie:** Bug, który występuje na niemieckim *Store View*, może nie pojawiać się na polskim, ponieważ inna jest waluta, podatek, a nawet zastosowany szablon czy tłumaczenia. Jeśli testy nie pokrywają wielowalutowości lub wielu języków, krytyczne błędy mogą uciec na produkcję. Testy E2E muszą umieć przełączać się między różnymi widokami i weryfikować specyficzne formaty np. format wyświetlania cen czy symboli dostępności.

---

## Praktyczny Przykład: Wzorcowy test E2E w Playwright dla Magento 2

Jak połączyć powyższe zasady w praktyce? Poniżej znajduje się wzorcowy szkielet testu "Guest Checkout", który omija pułapki Magento:

```javascript
test('Magento 2: Guest checkout — full flow', async ({ page, request }) => {
    // 1. Izolacja danych: Seedowanie przez API, żeby nie zależeć od zmiennych danych w UI
    const product = await createTestProduct(request); 

    // 2. Nawigacja do wygenerowanego produktu i dodanie do koszyka
    await page.goto(`/${product.urlKey}.html`); 
    await page.locator('#product-addtocart-button').click();

    // 3. Specyfika M2: Czekamy na pojawienie się asynchronicznej wiadomości sukcesu (Knockout.js), 
    // a nie na przeładowanie strony
    await page.waitForSelector('.message-success', { state: 'visible' });

    // 4. Przejście do Checkoutu
    await page.goto('/checkout');

    // 5. Krok dostawy: Czekamy, aż moduł shippingu zakończy inicjalizację
    await page.waitForFunction(() => 
        document.querySelector('#shipping') && 
        !document.querySelector('#shipping').classList.contains('loading') 
    );

    // Używamy unikalnego emaila z timestampem, by uniknąć konfliktów sesji
    await page.fill('[name="email"]', `test+${Date.now()}@example.com`); 
    // ... wypełnianie reszty adresu ...
    
    await page.locator('.button.action.continue').click();

    // 6. Krok płatności: Czekamy na wyrenderowanie sekcji płatności
    await page.waitForSelector('#checkout-payment-method-load', { state: 'visible' }); 
    // Wybieramy Check / Money Order ('checkmo') - brak zależności od bramek płatniczych (PayU, itp.)
    await page.locator('[value="checkmo"]').click(); 
    await page.locator('.action.primary.checkout').click();

    // 7. Asercje końcowe na UI
    await expect(page).toHaveURL(/checkout\/success/); 
    await expect(page.locator('.checkout-success')).toContainText('Your order number is');

    // 8. Cleanup: Usunięcie produktu z bazy (przez API)
    await deleteTestProduct(request, product.id); 
});
```
*[Kod referencyjny na podstawie zaleceń eksperckich]*

## Podsumowanie

Testowanie Magento 2 wymaga porzucenia standardowego podejścia "kliknij i poczekaj". Automatyzacja E2E przynosi w tym systemie ogromne zyski (określa się, że pokrywają one 90% potrzeb biznesowych), a testy integracyjne są zazwyczaj najbardziej wiarygodne. Testy jednostkowe często sprowadzają się do testowania natywnego kodu Magento i wymagają nadmiernej ilości *mocków*, co czyni je kruchymi. Kluczem do stabilności (braku "flakiness") na tej platformie jest tworzenie izolowanych danych testowych przez API, omijanie specyficznych warstw UI dla modalów oraz budowanie asercji oczekujących na pełną ewaluację skryptów Knockout.js i jQuery.