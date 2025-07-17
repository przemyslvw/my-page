---
id: "a08-integrity-failures-testowanie"
title: "🔍 3.8.2 – Metody testowania podatności"
sidebar_position: 37
---

## 🔍 Metody testowania podatności: Software and Data Integrity Failures

Testowanie tej klasy podatności wymaga weryfikacji przepływu danych, konfiguracji CI/CD oraz pochodzenia i kontroli nad kodem i zależnościami.

---

### 🔸 1. Analiza łańcucha dostarczania oprogramowania

- Czy aplikacja wykorzystuje proces CI/CD? Jak wygląda pipeline?
- Czy pipeline weryfikuje, co jest wdrażane (np. podpisy, hashe, tagi release)?
- Czy możliwe jest wstrzyknięcie kodu do builda (np. przez podatne zależności, zmienne środowiskowe, złe uprawnienia)?

✅ Narzędzia:
- [OWASP CycloneDX](https://cyclonedx.org/)
- [Syft](https://github.com/anchore/syft)
- [grype](https://github.com/anchore/grype)

---

### 🔸 2. Analiza zależności i bibliotek

- Czy zależności są przypięte do wersji (`package-lock.json`, `requirements.txt`)?
- Czy używane są hashe, podpisy PGP lub checksumy (np. SHA256) do weryfikacji paczek?
- Czy są używane zewnętrzne CDN-y bez integrity hash?

✅ Narzędzia:
- `npm audit`, `yarn audit`, `pip-audit`
- `trivy`, `snyk`, `OWASP Dependency-Check`

---

### 🔸 3. Testowanie plików konfiguracyjnych

- Czy `.env`, `config.yaml`, `web.config`, `docker-compose.yml` są odpowiednio chronione?
- Czy zawierają poufne dane lub dostęp do środowiska produkcyjnego?
- Czy pipeline nie nadpisuje ich podczas wdrażania (np. wrażliwe dane trafiają na prod)?

---

### 🔸 4. Analiza zewnętrznych źródeł kodu

- Czy aplikacja pobiera i uruchamia kod dynamicznie z zewnętrznych źródeł (np. `eval(fetch(...))`)?
- Czy CDN-y są stosowane z atrybutem `integrity` i `crossorigin`?

---

## ✅ Wskazówki

- Zacznij od mapowania łańcucha dostarczania (CI/CD → artefakt → środowisko).
- Zautomatyzuj skanowanie zależności.
- Audytuj dostęp do systemów build/test/deploy (np. GitHub Actions, GitLab CI, Jenkins).

---

W kolejnym podrozdziale: **3.8.3 – Weryfikacja konfiguracji aplikacji i serwera**
