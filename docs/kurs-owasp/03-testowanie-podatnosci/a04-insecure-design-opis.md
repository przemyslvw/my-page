---
id: "a04-insecure-design-opis"
title: " 3.4.1 – Opis podatności i jej wpływ"
sidebar_position: 16
---

##  Czym jest Insecure Design?

**Insecure Design** odnosi się do błędów projektowych, które prowadzą do podatności **już na etapie architektury systemu**, a nie tylko implementacji. Nawet dobrze zaimplementowany kod może być podatny, jeśli sama logika biznesowa, kontrola dostępu lub przepływ danych są źle zaprojektowane.

---

##  Przykłady błędów projektowych

- Brak uwzględnienia ról i uprawnień w projektowaniu funkcji.
- Zbyt ogólne API bez walidacji dostępu do konkretnych danych.
- Możliwość przewidzenia struktury ID i manipulacji (np. `GET /invoice/1001` ➜ `GET /invoice/1002`).
- Brak mechanizmów rate limiting i throttle dla krytycznych operacji (np. reset hasła).
- Przesadne poleganie na danych z klienta bez dodatkowej weryfikacji.

---

##  Przykład: brak walidacji właściciela zasobu

```http
GET /orders/874
Authorization: Bearer userA-token
```

➡️ Aplikacja zwraca dane zamówienia bez sprawdzenia, czy `userA` rzeczywiście jest właścicielem `orderId=874`.

---

##  Różnica między Insecure Design a Broken Access Control

| Cecha | Insecure Design | Broken Access Control |
|-------|------------------|------------------------|
| Etap | projekt systemu | implementacja / konfiguracja |
| Typ błędu | brak zabezpieczeń w ogóle | niewłaściwa realizacja istniejących reguł |
| Przykład | brak zaplanowanej kontroli właściciela danych | źle zaimplementowana kontrola ról |

---

## Skutki podatności

- Ujawnienie lub zmiana danych innych użytkowników.
- Zmiana stanu systemu niezgodnie z logiką biznesową.
- Przejście przez proces w nieautoryzowany sposób (np. zakup bez płatności).
- Trwała luka w architekturze – często wymaga refaktoryzacji, nie tylko patcha.

---

##  Podsumowanie

Podatności typu **Insecure Design** są trudniejsze do wykrycia automatycznie – wymagają analizy architektury, logiki i wymagań bezpieczeństwa już na etapie projektowania. W kolejnym kroku przejdziemy do metod ich testowania.

---

W następnym punkcie: **3.4.2 – Metody testowania podatności Insecure Design**
