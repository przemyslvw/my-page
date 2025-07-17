---
id: "a08-integrity-failures-konfiguracja"
title: "🛠️ 3.8.3 – Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 38
---

## 🛠️ Weryfikacja konfiguracji aplikacji i serwera

Weryfikacja zabezpieczeń integralności danych i kodu wymaga przeanalizowania pipeline'ów, zależności oraz konfiguracji środowisk produkcyjnych i developerskich.

---

### 🔸 1. CI/CD i procesy deploymentu

- Czy używane są tylko zaufane i podpisane artefakty?
- Czy pipeline CI/CD wymaga zatwierdzeń (np. merge review)?
- Czy środowiska build/test/prod są rozdzielone?
- Czy możliwe jest deployowanie bezpośrednio z gałęzi deweloperskiej?

---

### 🔸 2. Weryfikacja zależności

- Czy używany jest `package-lock.json`, `yarn.lock`, `requirements.txt`?
- Czy wersje bibliotek są przypięte i nieaktualizowane automatycznie bez przeglądu?
- Czy używane paczki mają podpisy lub sumy kontrolne (SHA256, PGP)?

---

### 🔸 3. Zewnętrzne źródła i dynamiczne zasoby

- Czy pobierane skrypty (JS, CSS) z CDN mają ustawiony `integrity` i `crossorigin`?
- Czy backend nie wykonuje kodu dynamicznie pobieranego z zewnątrz (`eval`, `require(url)`)?

---

### 🔸 4. Pliki konfiguracyjne

- Czy pliki `.env`, `config.yaml`, `docker-compose.yml`, `web.config` nie zawierają danych produkcyjnych w środowisku testowym?
- Czy są wersjonowane i zabezpieczone (np. w `secrets manager`, HashiCorp Vault)?

---

### 🔸 5. Backupy i wersjonowanie

- Czy backupy zawierają tylko dane, a nie kod lub zależności?
- Czy aplikacja ma możliwość rollbacku do bezpiecznej wersji?

---

## ✅ Rekomendacje

- Używaj narzędzi typu SCA (Software Composition Analysis).
- Ogranicz liczbę zewnętrznych źródeł kodu.
- Monitoruj zmiany w zależnościach (np. Dependabot, Renovate).

---

W kolejnym podrozdziale: **3.8.4 – Narzędzia do testowania**
