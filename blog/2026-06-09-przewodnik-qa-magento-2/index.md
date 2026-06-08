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
Całkowicie unikaj bezpośrednich asercji na bazie danych w testach wyższych poziomów. Jako jedynego "Punktu Prawdy" (Source of Truth) należy używać **Admin REST API** lub zapytań **GraphQL**. Walidacja przez API gwarantuje poprawną ewaluację logiki biznesowej i uodparnia testy na refaktoring bazy danych. Pamiętaj jednak, aby przy GraphQL zawsze parsować błędy w payloadzie – nigdy nie ufaj samemu nagłówkowi HTTP 200.

## 5. Izolacja danych testowych i problemy ze stanem magazynowym (Inventory)

**Wyzwanie:** Testy regresji mogą przechodzić rano, a popołudniu "wybuchać", ponieważ ktoś (inny test lub manualny QA) kupił produkt testowy i zmienił jego stan magazynowy (Inventory).

**Rozwiązanie:** 
Dane testowe w Magento muszą być całkowicie izolowane. Najlepszą praktyką jest "seeding" przed każdym zestawem testów – używając endpointu `POST /V1/products` tworzymy unikalny produkt (SKU) wyłącznie na potrzeby danego testu. Po wykonaniu testu używamy API do usunięcia produktu (Cleanup). Do płatności używamy wbudowanej metody `checkmo` (Check / Money Order), która nie wymaga integracji z zewnętrznymi bramkami płatności i eliminuje zewnętrzny punkt awarii.

## 6. Złożoność wielosklepowości (Multistore / Scope)

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