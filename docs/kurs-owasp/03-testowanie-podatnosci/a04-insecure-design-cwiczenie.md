---
id: "a04-insecure-design-cwiczenie"
title: " 3.4.5 – Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 20
---

##  Cel ćwiczenia

Zidentyfikować i wykorzystać błędy projektowe w aplikacji (Insecure Design), które nie wynikają z błędnej implementacji, lecz z braku założeń bezpieczeństwa w logice działania aplikacji.

---

##  Scenariusz 1: Brak kontroli właściciela zasobu

**Aplikacja:** REST API do zamówień

### Krok 1: Użytkownik `userA` loguje się i uzyskuje token.

### Krok 2: Wysyła zapytanie:

```http
GET /orders/1002
Authorization: Bearer <token_userA>
```

➡️ Aplikacja zwraca dane `orderId=1002`, mimo że zamówienie należy do `userB`.

### ✅ Mitigacja:

- Dodaj sprawdzenie właściciela zasobu na poziomie kontrolera lub w warstwie serwisu.

---

##  Scenariusz 2: Brak walidacji etapów procesu (np. zakup)

**Aplikacja:** E-commerce – użytkownik może przejść od koszyka do „zamówione” bez płatności.

### Krok 1: Wysłanie zapytania do `POST /checkout/confirm` bez wcześniejszej płatności.

➡️ Zamówienie zostaje złożone.

### ✅ Mitigacja:

- Wprowadź kontrolę statusu (np. `cart -> payment -> confirmed`).
- Waliduj etap procesu na backendzie niezależnie od klienta.

---

##  Scenariusz 3: Możliwość manipulacji ID przez przewidywalność

```http
GET /invoice/1001
GET /invoice/1002
```

➡️ Brak walidacji dostępu, brak tokenizacji / UUID / ACL.

### ✅ Mitigacja:

- Używaj identyfikatorów trudnych do zgadnięcia (np. UUID).
- Wprowadź kontrolę dostępu do danych na poziomie identyfikatora.

---

## ✅ Zadania do wykonania

- [ ] Wybierz 1 scenariusz i wykonaj test.
- [ ] Udokumentuj wynik testu (payload, zachowanie aplikacji).
- [ ] Zarekomenduj poprawkę architektoniczną.
- [ ] Uwzględnij w raporcie końcowym jako przypadek Insecure Design.

---

##  Dodatkowe pomysły testowe

- Czy można przyspieszyć proces rejestracji/aktywacji pomijając kroki?
- Czy można zmienić status zamówienia przez API bez roli?
- Czy dane klienta są przesyłane na podstawie danych sesji, czy klienta?

---

##  Zrealizowane scenariusze

###  Scenariusz: Brak walidacji właściciela zasobu

**Testowany endpoint:**
```
GET /orders/1002
Authorization: Bearer userA-token
```

**Wynik testu:**
Aplikacja zwróciła dane zamówienia należące do innego użytkownika (`userB`). Brak walidacji właściciela zasobu po stronie backendu.

**Payload:**
```http
GET /orders/1002
Authorization: Bearer eyJhbGciOiJIUzI1...
```

**Zachowanie aplikacji:** 200 OK + pełne dane zamówienia

**Rekomendacja:**
Dodać walidację `order.UserId == currentUser.Id` w kontrolerze. Przykład (C#):

```csharp
if (order.UserId != currentUser.Id)
    return Forbid();
```

---

###  Scenariusz: Pominięcie płatności w procesie checkout

**Testowany endpoint:**
```
POST /checkout/confirm
```

**Wynik testu:**
Zamówienie zostało utworzone mimo braku zakończonego procesu płatności.

**Payload:**
```json
{ "cartId": "c123", "step": "confirm" }
```

**Zachowanie aplikacji:** 201 Created – zamówienie potwierdzone

**Rekomendacja:**
Wymusić w backendzie status przejściowy – `status != paid` → brak możliwości `confirm`.

---

###  Wnioski z testów

- Brak kontroli stanu i właściciela to typowe symptomy **Insecure Design**.
- Aplikacja przyjmuje poprawne zapytania, ale **brakuje walidacji ich sensu i kolejności**.
- Automatyczne testy rzadko wykrywają ten problem – niezbędne testy logiczne.

---

##  Do raportu końcowego

Zalecenia:
- Zmiana projektów procesów zakupowych, logowania, dostępu do zasobów.
- Wdrożenie dodatkowych walidacji kontekstowych na backendzie.
- Analiza wszystkich funkcji pod kątem założeń bezpieczeństwa.

---

W kolejnym rozdziale: **3.5 – Security Misconfiguration**
