---
id: "a07-authentication-failures-testowanie"
title: " 3.7.2 – Metody testowania podatności"
sidebar_position: 32
---

##  Metody testowania: Identification and Authentication Failures

W tej części skupimy się na manualnych i automatycznych technikach wykrywania błędów w procesach identyfikacji i uwierzytelniania.

---

### 🔸 1. Testy logowania

- Brak limitu prób logowania ➜ testy brute-force (np. Burp Intruder, Hydra).
- Testowanie kont uprzywilejowanych (`admin`, `root`, `superuser`).
- Test na domyślne hasła (`admin:admin`, `test:test`).
- Sprawdzenie komunikatów błędów (`Invalid username` vs `Invalid password`).

---

### 🔸 2. Testy sesji i tokenów

- Czy po wylogowaniu token JWT nadal działa?
- Czy sesja wygasa po określonym czasie?
- Czy token jest rotowany po zalogowaniu?
- Czy `HttpOnly`, `Secure`, `SameSite` są poprawnie ustawione?

---

### 🔸 3. Reset haseł

- Czy można przejąć konto przez modyfikację linku do resetu (`?token=...`)?
- Czy link resetu wygasa?
- Czy można ustawić łatwe hasło (`12345678`) bez walidacji?

---

### 🔸 4. Analiza JWT / OAuth

- Czy JWT jest podpisany bezpiecznym algorytmem (HS256 / RS256)?
- Czy aplikacja akceptuje JWT bez weryfikacji (`alg: none`)?
- Czy refresh tokeny mają poprawne limity ważności?
- Czy można podmienić `sub` w tokenie?

---

### 🔸 5. 2FA i MFA

- Czy 2FA można ominąć (np. zmiana parametru w żądaniu)?
- Czy po aktywacji 2FA nadal można logować się innym sposobem?
- Czy aplikacja wymusza 2FA dla kont uprzywilejowanych?

---

## ✅ Wskazówki

- Korzystaj z Burp Suite + JWT Editor + ZAP do ręcznych testów.
- Testuj logikę resetu, sesji, 2FA i tokenów.
- Nie zapomnij o mechanizmach rate-limit / brute-force protection.

---

W następnym kroku: **3.7.3 – Weryfikacja konfiguracji aplikacji i serwera**
