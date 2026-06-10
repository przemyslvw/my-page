---
id: "a08-integrity-failures-cwiczenie"
title: "Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 40
---

#  Praktyczne ćwiczenie: Testowanie i mitigacja – Software and Data Integrity Failures (A08:2025)

##  Cel ćwiczenia

Nauczyć się wykrywać i skutecznie przeciwdziałać podatnościom typu *Software and Data Integrity Failures* w środowisku aplikacji webowej poprzez analizę łańcucha dostarczania kodu, użycie podpisów cyfrowych oraz testowanie plików konfiguracyjnych i zależności.

---

## 🛠️ Scenariusz testowy

### Aplikacja:
System CI/CD oparty na GitHub Actions z automatycznym deploymentem aplikacji Node.js na serwerze produkcyjnym.

### Założenia:
- Projekt korzysta z zależności NPM.
- Brak podpisanych commitów ani weryfikacji autorstwa w pipeline.
- Brak sprawdzania integralności zależności.
- Konfiguracja serwera pobierana z pliku `.env` z repozytorium.

---

##  Krok po kroku: testowanie integralności

### 1. Wstrzyknięcie złośliwego pakietu (symulacja)
- Utwórz forka projektu.
- Podmień jedną z zależności w `package.json` na złośliwy fork z tym samym API.
- Zainicjuj pull request.

➡️ Sprawdź, czy CI/CD automatycznie deployuje kod bez walidacji źródeł.

### 2. Sprawdzenie konfiguracji `.env`
- Upewnij się, że `.env` nie zawiera wrażliwych danych.
- Sprawdź, czy plik ten nie jest wersjonowany (np. przez `.gitignore`).
- Sprawdź, czy środowisko produkcyjne nie ładuje `.env` z repozytorium.

### 3. Walidacja podpisów Git (opcjonalnie)
- Sprawdź, czy repo wymaga GPG podpisów commitów.
- Wymuś w ustawieniach GitHub -> Branch Protection -> Require signed commits.

---

## 🧰 Narzędzia pomocnicze

- [Snyk CLI](https://snyk.io) – analiza podatności w zależnościach.
- [Gitleaks](https://github.com/gitleaks/gitleaks) – wyszukiwanie sekretów w historii Git.
- [Trivy](https://aquasecurity.github.io/trivy) – skanowanie obrazów i paczek.
- `npm audit` – szybka analiza zagrożeń w paczkach NPM.

---

## ✅ Mitigacja

1. **Weryfikacja zależności:**
   - Włącz `package-lock.json` w repo.
   - Regularnie używaj `npm audit fix`.

2. **Bezpieczny CI/CD:**
   - Weryfikuj sygnatury commitów (`Require signed commits`).
   - Blokuj pull requesty z nieznanych źródeł bez review.
   - Używaj zaufanych runnerów.

3. **Integralność danych konfiguracyjnych:**
   - Nie wersjonuj `.env`.
   - Korzystaj z managerów sekretów (np. HashiCorp Vault, AWS Secrets Manager).

---

##  Rezultat końcowy

Po ukończeniu ćwiczenia uczestnik:

- Zrozumie zagrożenia związane z brakiem walidacji integralności kodu i zależności.
- Potrafi skonfigurować pipeline CI/CD w sposób bezpieczny.
- Umie wykrywać i usuwać wrażliwe dane z repozytorium.
- Zna sposoby mitigacji dla Software and Data Integrity Failures.
