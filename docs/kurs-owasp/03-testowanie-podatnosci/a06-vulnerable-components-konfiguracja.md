---
id: "a06-vulnerable-components-konfiguracja"
title: " 3.6.3 – Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 28
---

##  Weryfikacja konfiguracji aplikacji i serwera

Skupiamy się na ustawieniach, które mogą prowadzić do wykorzystania nieaktualnych lub podatnych komponentów. 

---

### 🔹 1. Backend / aplikacja

- Czy aplikacja **automatycznie aktualizuje** zależności bez walidacji?
- Czy zablokowano możliwość **dynamicznego `require()` / `eval()`**?
- Czy użyto **określonych wersji zależności**, zamiast `*`, `latest`, `^`?
- Czy są środowiskowe alerty o znanych lukach CVE (np. GitHub Dependabot)?
- Czy system CI/CD wymusza audyty (`npm audit`, `snyk test`, `trivy`)?

---

### 🔹 2. Serwer i środowisko

- Czy system operacyjny jest wspierany (np. Ubuntu LTS, RHEL)?
- Czy aktualizacje bezpieczeństwa są włączone (`unattended-upgrades`, `yum-cron`)?
- Czy Docker host używa aktualnego kernela?
- Czy zaplanowano okresowe skanowanie podatności (cron + Trivy/Grype)?
- Czy obrazy bazowe w Dockerfile są wersjonowane?

---

### 🔹 3. DevOps i pipeline

- Czy masz wdrożony proces `Software Composition Analysis (SCA)`?
- Czy zależności są cache’owane i kontrolowane przez `lockfile`?
- Czy repozytorium ma wyłączone `pull requests` z nieautoryzowanych źródeł?
- Czy masz `policy enforcement` na użycie sprawdzonych wersji?

---

### 🔹 4. Przegląd manualny

- Sprawdź `package.json`, `requirements.txt`, `pom.xml` – czy są biblioteki porzucone?
- Upewnij się, że w `package-lock.json` lub `yarn.lock` nie ma zależności z CVE.
- Sprawdź, czy zespół usuwa przestarzałe pakiety zależne (dead code).

---

### ✅ Rekomendacje

- Regularnie przeprowadzaj **code review zależności**.
- Wprowadź **alerty i CI linting** dla podatnych wersji.
- Automatyzuj testy SCA i konfiguracji w pipeline CI/CD.

---

W kolejnym kroku: **3.6.4 – Narzędzia do testowania**
