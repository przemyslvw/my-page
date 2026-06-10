---
id: "a07-authentication-failures-konfiguracja"
title: " 3.7.3 – Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 33
---

##  Weryfikacja konfiguracji aplikacji i serwera

Sprawdzenie konfiguracji aplikacji pod kątem zabezpieczeń to kluczowy krok w zapobieganiu podatnościom związanym z uwierzytelnianiem i identyfikacją.

---

### 🔸 1. Konfiguracja sesji i tokenów

- Czy ciasteczka sesyjne mają ustawione flagi:
  - `HttpOnly`
  - `Secure` (HTTPS)
  - `SameSite=Strict` lub `Lax`
- Czy sesje mają poprawnie ustawiony timeout (np. 15–30 minut)?
- Czy sesje są unieważniane po wylogowaniu?
- Czy JWT są przechowywane w `httpOnly` cookies zamiast `localStorage`?

---

### 🔸 2. Konfiguracja logowania i blokad konta

- Czy aplikacja ma limit prób logowania (rate-limiting)?
- Czy konto jest blokowane po X nieudanych próbach?
- Czy hasła użytkowników są przechowywane w postaci haszowanej (np. `bcrypt`, `argon2`)?

---

### 🔸 3. Reset haseł i MFA

- Czy linki do resetowania haseł są:
  - Jednorazowe,
  - Czasowo ograniczone (np. 15 minut)?
- Czy aplikacja obsługuje MFA?
- Czy aktywacja MFA jest obowiązkowa dla kont uprzywilejowanych?

---

### 🔸 4. Nagłówki bezpieczeństwa

- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Content-Security-Policy`

---

### 🔸 5. Inne aspekty

- Czy logi logowania zawierają adresy IP i urządzenia?
- Czy podczas rejestracji można ustawić słabe hasła?
- Czy weryfikowane są dane z formularzy (np. `email`, `phone`)?

---

## ✅ Wskazówki

- Weryfikuj konfigurację zarówno w kodzie, jak i plikach `.env`, `.htaccess`, `web.config`, `appsettings.json`.
- Skorzystaj z testów automatycznych (np. ZAP, testssl.sh, JWT.io).
- Sprawdź ustawienia CORS i originów w API.

---

W kolejnym kroku: **3.7.4 – Narzędzia do testowania**
