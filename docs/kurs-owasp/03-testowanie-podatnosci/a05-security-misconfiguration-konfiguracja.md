---
id: "a05-security-misconfiguration-konfiguracja"
title: " 3.5.3 – Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 23
---

##  Obszary konfiguracji do weryfikacji

Weryfikacja powinna obejmować **pełen stack aplikacji**: backend, frontend, serwer, sieć, chmurę. Poniżej lista kluczowych obszarów:

---

### 1.  Ustawienia debugowania

- Czy `debug=true` jest wyłączone na produkcji?
- Czy konfiguracja loggerów nie ujawnia zbyt wielu informacji?

---

### 2.  Nagłówki bezpieczeństwa HTTP

- Czy aplikacja ustawia nagłówki:
  - `X-Frame-Options: DENY / SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Strict-Transport-Security: max-age=...`
  - `Content-Security-Policy: ...`
- Sprawdź konfigurację serwera (nginx, Apache, Kestrel).

---

### 3. 🔑 Dostęp do paneli administracyjnych

- Czy `/admin`, `/manage`, `/dashboard` są zabezpieczone hasłem i autoryzacją?
- Czy wymagają 2FA, jeśli dostępne z Internetu?

---

### 4. 🗄️ Dostęp do zasobów aplikacji

- Czy dostęp do plików `.env`, `.git`, `appsettings.json` jest zablokowany?
- Czy katalogi nie mają włączonego indeksowania (`autoindex off`)?

---

### 5.  Konfiguracja środowisk

- Czy aplikacja nie ujawnia zmiennych środowiskowych?
- Czy środowiska staging/dev nie są dostępne publicznie?

---

### 6.  Hasła, konta, poświadczenia

- Czy aplikacja nie używa domyślnych danych logowania (`admin:admin`)?
- Czy poświadczenia nie są hardkodowane w plikach?

---

### 7. 📦 Serwer i usługi backendowe

- Czy Redis, MongoDB, Elasticsearch są dostępne wyłącznie lokalnie lub po VPN?
- Czy backendy REST nie wystawiają testowych endpointów (`/test`, `/metrics`, `/swagger` bez autoryzacji)?

---

## ✅ Wskazówki

- Skorzystaj z list kontrolnych OWASP (np. [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)).
- Sprawdź konfigurację automatycznie przy pomocy skanerów (ZAP, Nikto, testssl.sh).
- Stwórz własną checklistę uwzględniającą stack technologiczny projektu.

---

W kolejnym podrozdziale: **3.5.4 – Narzędzia do testowania błędów konfiguracji**
