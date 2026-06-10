---
id: "dependency-sca-devsecops"
title: "🔗 Podatne zależności, SCA i DevSecOps"
sidebar_position: 29
---

# 🔗 Podatne zależności, SCA i DevSecOps

Większość kodu nowoczesnej aplikacji to **cudze biblioteki**. Jedna podatna zależność (jak Log4Shell) potrafi skompromitować całą aplikację, mimo że własny kod jest bezpieczny. To kategoria **A06 – Vulnerable and Outdated Components** w OWASP Top 10. Ten moduł pokazuje, jak wykrywać podatne komponenty i jak wpleść bezpieczeństwo w pipeline CI/CD (**DevSecOps / shift-left**).

---

## 🧠 Dlaczego to ważne dla pentestera?

- Podatność w zależności jest **łatwa do potwierdzenia** (znane CVE + PoC), a wpływ bywa krytyczny (RCE).
- Aplikacje rzadko inwentaryzują, co naprawdę uruchamiają — stąd „zapomniane" stare wersje.
- Łańcuch dostaw to realny wektor ataku (powiązanie z modułem *Analiza incydentów*: SolarWinds, XZ Utils, MOVEit).

---

## 🔍 Software Composition Analysis (SCA)

SCA to wykrywanie znanych podatności w zależnościach. Buduje się je na podstawie **SBOM** (Software Bill of Materials — spis wszystkich komponentów).

### **1️⃣ Skanery wbudowane w menedżery pakietów**
```bash
npm audit --production          # Node.js
pip-audit                       # Python
composer audit                  # PHP
mvn org.owasp:dependency-check-maven:check   # Java/Maven
```

### **2️⃣ Uniwersalne narzędzia SCA**
```bash
# OWASP Dependency-Check — wiele ekosystemów, mapuje na CVE
dependency-check --scan ./projekt --format HTML --out raport

# Trivy — zależności, kontenery, IaC, sekrety (jeden skaner)
trivy fs --scanners vuln,secret,misconfig ./projekt

# Grype — szybkie skanowanie SBOM/obrazów
grype dir:./projekt

# retire.js — podatne biblioteki front-end (jQuery, Angular itp.)
retire --path ./projekt
```

### **3️⃣ Generowanie SBOM**
```bash
# Syft — SBOM w formacie CycloneDX/SPDX
syft dir:./projekt -o cyclonedx-json > sbom.json
```

---

## 🕵️ Wykrywanie sekretów w repozytoriach

Wycieki kluczy API, tokenów i haseł w kodzie/historii Git to częsty initial access.
```bash
# gitleaks — skan repo i całej historii commitów
gitleaks detect --source . --report-format json --report-path gitleaks.json

# trufflehog — weryfikuje, czy znalezione sekrety są aktywne
trufflehog git file://./projekt --only-verified
```
> 💡 Sekret usunięty w nowym commicie **nadal jest w historii Git** — skanuj całą historię, nie tylko `HEAD`.

---

## 🏗️ DevSecOps – bezpieczeństwo w pipeline CI/CD

Idea **shift-left**: wykrywaj podatności jak najwcześniej, automatycznie, na każdym commit/PR.

### **1️⃣ Warstwy testów automatycznych**
| Typ | Co bada | Przykłady narzędzi |
|-----|---------|--------------------|
| **SAST** | kod źródłowy (statycznie) | Semgrep, CodeQL, Bandit |
| **SCA** | zależności / SBOM | Trivy, Dependency-Check, Grype |
| **DAST** | działająca aplikacja | OWASP ZAP, Nuclei |
| **IaC scan** | Terraform/K8s/Dockerfile | Checkov, tfsec, Trivy |
| **Secret scan** | klucze i tokeny | gitleaks, trufflehog |

### **2️⃣ Przykład: SAST w GitHub Actions**
```yaml
name: security
on: [push, pull_request]
jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Semgrep
        run: |
          pip install semgrep
          semgrep --config=auto --error
  sca:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trivy
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: fs
          severity: HIGH,CRITICAL
          exit-code: 1
```
`exit-code: 1` przy znalezieniu podatności **wstrzymuje pipeline** — podatny build nie trafia na produkcję.

### **3️⃣ Skanowanie kontenerów**
```bash
# Podatności w obrazie Docker (warstwy + pakiety systemowe)
trivy image nginx:1.18
grype nginx:1.18
```

---

## 🔐 Jak zarządzać ryzykiem zależności?
✅ **Utrzymuj SBOM** – musisz wiedzieć, co uruchamiasz, by wiedzieć, co łatać.
✅ **Automatyzuj aktualizacje** – Dependabot/Renovate dla łatek bezpieczeństwa.
✅ **Bramki w CI/CD** – blokuj merge przy krytycznych podatnościach.
✅ **Priorytetyzuj realnie** – łącz CVSS z **EPSS** i **CISA KEV** (powiązanie z modułem o raportach), nie łataj wszystkiego na ślepo.
✅ **Pinuj wersje i weryfikuj integralność** – lockfile, podpisy, zaufane rejestry (ochrona łańcucha dostaw).
✅ **Minimalizuj zależności** – mniejsza powierzchnia to mniej ryzyka.

---

Bezpieczeństwo zależności i DevSecOps przenoszą wykrywanie podatności na początek cyklu rozwoju. Kolejnym krokiem będą **Case Studies i ćwiczenia praktyczne**! 🚀
