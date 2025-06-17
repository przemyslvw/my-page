---
id: "a05-security-misconfiguration-testowanie"
title: "🧪 3.5.2 – Metody testowania podatności"
sidebar_position: 22
---

## 🧪 Jak testować Security Misconfiguration?

Testowanie błędów konfiguracji polega na identyfikowaniu **nieprawidłowych ustawień środowiska**, które mogą prowadzić do podatności – od backendu po frontend i sieć.

---

## 🔍 Przykładowe obszary testowe

### 1. 🔓 Sprawdzenie dostępności endpointów administracyjnych

- `/admin`, `/phpmyadmin`, `/console`, `/actuator`
- Czy są zabezpieczone hasłem? Czy działają w środowisku produkcyjnym?

### 2. 🛑 Testowanie nagłówków bezpieczeństwa

- `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Content-Security-Policy`
- Czy są obecne i poprawnie skonfigurowane?

### 3. 🧪 Sprawdzenie dostępu do katalogów i plików serwera

- Czy katalogi są indeksowane (`Index Of`)?
- Czy pliki `.env`, `config.yaml`, `appsettings.json` są dostępne?

### 4. 🔁 Publiczne endpointy i błędy CORS

- Czy API pozwala na żądania z dowolnej domeny (`Access-Control-Allow-Origin: *`)?
- Czy można wykonywać zapytania metodą `PUT`, `DELETE`, `OPTIONS` bez autoryzacji?

### 5. 🐞 Sprawdzenie trybu debugowania i stack trace

- Czy `/error` lub błędne zapytanie ujawnia szczegóły stosu?
- Czy `debug=true` lub `trace=true` są aktywne?

### 6. 🕵️ Testowanie dostępnych portów / usług

- Czy Redis, Elasticsearch, MongoDB, Jenkins są publicznie dostępne?
- Weryfikacja nmap/empyre/openvas.

---

## ✅ Rekomendacje do testów

- Testuj środowisko staging oraz produkcyjne.
- Porównaj konfiguracje serwera z dobrymi praktykami bezpieczeństwa.
- Używaj skanerów oraz testów manualnych – nie wszystkie błędy są automatycznie wykrywane.

---

W kolejnym kroku: **3.5.3 – Weryfikacja konfiguracji aplikacji i serwera**
