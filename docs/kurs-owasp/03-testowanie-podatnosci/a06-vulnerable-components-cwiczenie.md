---
id: "a06-vulnerable-components-cwiczenie"
title: " 3.6.5 – Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 30
---

##  Cel ćwiczenia

W tym ćwiczeniu:
- przeskanujesz zależności aplikacji pod kątem znanych podatności,
- zidentyfikujesz komponenty wymagające aktualizacji,
- zaproponujesz mitgacje i aktualizacje.

---

##  Scenariusz testowy

**Aplikacja:** Prosty backend Node.js z plikiem `package.json`.

**Zawartość pliku:**
```json
{
  "dependencies": {
    "express": "4.16.0",
    "lodash": "4.17.10"
  }
}
```

---

##  Krok 1: Uruchom test `npm audit`

```bash
npm audit
```

➡️ Wynik:

```
found 2 vulnerabilities (1 moderate, 1 high)
```

---

##  Krok 2: Test przy pomocy `Snyk`

```bash
snyk test
```

➡️ Wynik:
- `lodash@4.17.10` – podatność typu Prototype Pollution
- `express@4.16.0` – podatność XSS (CVE)

---

##  Krok 3: Analiza z `Grype`

Jeśli aplikacja jest w kontenerze:

```bash
grype docker:myapp:latest
```

---

## ✅ Oczekiwane zachowanie po naprawie

- Aktualizacja `lodash` do `4.17.21`
- Aktualizacja `express` do `4.18.2`
- Dodanie `audit` do pipeline CI/CD

---

##  Mitigacja

Zaktualizowany `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "lodash": "^4.17.21"
  }
}
```

Dodanie do `CI`:

```bash
npm audit || exit 1
```

---

##  Dodatkowe scenariusze

- Przetestuj obraz Docker (`trivy`, `dockle`, `grype`)
- Przeskanuj zależności Python: `pip-audit`
- Uruchom `Syft` do wygenerowania SBOM
- Zidentyfikuj zależności transitive podatne na CVE

---

## ✅ Zadania do wykonania

- [ ] Wykonaj audyt zależności frontend/backend.
- [ ] Wygeneruj listę podatnych komponentów.
- [ ] Zaktualizuj paczki i przetestuj działanie aplikacji.
- [ ] Opisz problem i rozwiązanie w raporcie końcowym.

---

## ✅ Zadania do wykonania – wykonane

---

### 🔹 1. Audyt zależności frontend/backend

Przeprowadzono audyt dla aplikacji Node.js (backend) oraz Angular (frontend):

- `npm audit` – wykryto 3 znane podatności (`lodash`, `express`, `minimist`)
- `yarn audit` – dodatkowo wykryto podatność w `axios`

---

### 🔹 2. Wygenerowana lista podatnych komponentów

```json
{
  "lodash": "4.17.10",
  "express": "4.16.0",
  "axios": "0.19.0"
}
```

Źródło: `snyk test`, `npm audit`, `yarn audit`, `grype`

---

### 🔹 3. Aktualizacja paczek i testy aplikacji

- `lodash` → 4.17.21 ✅
- `express` → 4.18.2 ✅
- `axios` → 1.6.0 ✅

Testy aplikacji zakończone sukcesem. Nie stwierdzono regresji.

---

### 🔹 4. Opis w raporcie końcowym

W raporcie zawarto:

- listę CVE oraz komponentów
- przykłady payloadów ataków (dla `lodash` – prototype pollution)
- rekomendację automatycznego audytu w CI
- zaktualizowane zależności w załącznikach

---

Zadanie zakończone i uwzględnione w końcowym raporcie bezpieczeństwa OWASP Top 10.

---

W następnym rozdziale: **3.7 – Identification and Authentication Failures**
