---
id: "a06-vulnerable-components-testowanie"
title: " 3.6.2 – Metody testowania podatności"
sidebar_position: 27
---

##  Metody testowania podatności: Vulnerable and Outdated Components

---

### 1. 📦 Analiza plików zależności

- Przeskanuj:
  - `package.json`, `yarn.lock` (JavaScript)
  - `pom.xml`, `build.gradle` (Java)
  - `requirements.txt`, `Pipfile.lock` (Python)
  - `composer.json`, `composer.lock` (PHP)
  - `packages.config`, `.csproj` (C#/.NET)
- Sprawdź wersje bibliotek i frameworków – ręcznie lub automatycznie.

---

### 2.  Wykorzystanie narzędzi SCA (Software Composition Analysis)

Narzędzia te identyfikują znane podatności CVE w zależnościach aplikacji.

- Przykładowe narzędzia:
  - **OWASP Dependency-Check**
  - **Syft + Grype**
  - **Snyk**
  - **GitHub Dependabot**
  - **Trivy**
  - **npm audit / yarn audit**
  - **pnpm audit**

---

### 3. 🔗 Testowanie zależności transitive

- Sprawdź, czy aplikacja używa zależności, które same w sobie mają zależności (tzw. *transitive dependencies*).
- Przykład: `express` ➝ `body-parser` ➝ `qs` ➝ podatna wersja `qs`.

---

### 4.  Weryfikacja obrazów kontenerowych

- Testuj bazowe obrazy Docker:
  - `FROM node:12` (EOL)
  - `FROM ubuntu:18.04` (brak wsparcia)
- Używaj `trivy`, `dockle`, `grype` do audytu kontenerów.

---

### 5.  Ręczna inspekcja bibliotek frontendowych

- Otwórz `devtools → sources/scripts` i sprawdź wersje bibliotek np. `jQuery`, `Bootstrap`, `Angular`.
- Sprawdź publicznie dostępne paczki CDN i ich wersje.

---

## ✅ Tipy testerskie

- Skorzystaj z narzędzi CI/CD (np. GitHub Actions, GitLab CI) do zautomatyzowanego skanowania zależności.
- Sprawdzaj daty publikacji ostatnich wersji – jeśli brak update’ów >12 miesięcy, rozważ zmianę komponentu.
- Zgłaszaj błędy do zespołu dev i proponuj update z changelogiem.

---

W kolejnym podrozdziale: **3.6.3 – Weryfikacja konfiguracji aplikacji i serwera**
