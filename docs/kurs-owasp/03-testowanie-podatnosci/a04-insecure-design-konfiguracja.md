---
id: "a04-insecure-design-konfiguracja"
title: "⚙️ 3.4.3 – Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 18
---

## 🎯 Cel sekcji

Zweryfikować, czy konfiguracja aplikacji i serwera wspiera bezpieczne projektowanie systemu oraz czy zabezpiecza przed skutkami **Insecure Design**.

---

## 🔍 Obszary do analizy

### 1. 🔐 Wymuszanie kontroli dostępu

- Czy aplikacja stosuje globalny middleware do autoryzacji?
- Czy każdy endpoint ma przypisany poziom uprawnień?
- Czy system ogranicza możliwość manipulacji tokenem JWT lub sesją?

---

### 2. 🔁 Rate limiting i throttle

- Czy endpointy typu reset hasła, logowanie, aktywacja konta mają ograniczenia liczby prób?
- Czy w aplikacji są zasady typu „cooldown” lub „lockout”?

Przykład (ASP.NET):

```csharp
services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("login", config =>
    {
        config.Window = TimeSpan.FromMinutes(1);
        config.PermitLimit = 5;
    });
});
```

---

### 3. 📦 Walidacja danych po stronie serwera

- Czy serwer weryfikuje dane wejściowe niezależnie od frontendu?
- Czy stosowane są schematy danych (`DTO`, `Model Validation`, `JSON Schema`)?
- Czy istnieją zabezpieczenia przed nadmiarowymi polami w JSON (np. `isAdmin: true`)?

---

### 4. 🔍 Ograniczenia logiki w konfiguracji API

- Czy Swagger/REST API opisuje autoryzację?
- Czy metody `DELETE`, `PUT`, `PATCH` są zablokowane tam, gdzie niepotrzebne?
- Czy istnieje kontrola widoczności i zakresu danych na poziomie modelu?

---

### 5. 🛡️ Ochrona przed przewidywalnością identyfikatorów

- Czy system korzysta z GUID/UUID zamiast prostych ID (np. `123`)?
- Czy w URL występują dane wrażliwe (email, login, ID klienta)?
- Czy endpointy zawierają reguły sprawdzania właściciela zasobu?

---

## 🧠 Wskazówki

- Dobrze zaprojektowane API nie powinno pozwalać użytkownikowi "zgadywać" danych.
- Architektura aplikacji powinna wymuszać walidację i autoryzację na każdym etapie.
- Konfiguracja powinna zapobiegać obchodzeniu logiki biznesowej, nawet gdy frontend zawiedzie.

---

W następnym kroku: **3.4.4 – Narzędzia do testowania podatności Insecure Design**
