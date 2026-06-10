---
id: "a06-vulnerable-components-narzedzia"
title: "🧰 3.6.4 – Narzędzia do testowania"
sidebar_position: 29
---

## 🧰 Narzędzia do testowania: Vulnerable and Outdated Components

Poniżej lista popularnych narzędzi (bezpłatnych i komercyjnych) do identyfikacji podatnych lub przestarzałych komponentów.

---

### 🛠️ Bezpłatne narzędzia

| Narzędzie | Opis | Języki/Technologie |
|----------|------|--------------------|
| **OWASP Dependency-Check** | Skanowanie zależności i CVE. | Java, .NET, Node.js |
| **Syft + Grype** | Generowanie SBOM + skan podatności. | Obrazy, pakiety, kontenery |
| **Trivy** | All-in-one SCA i analiza obrazów Docker. | Docker, Git, pakiety |
| **npm audit / yarn audit** | Wbudowany audyt podatności. | Node.js |
| **pnpm audit** | Alternatywny audyt dla pnpm. | Node.js |
| **pip-audit** | Skaner podatności Python. | Python |
| **composer audit** | Audyt zależności PHP. | PHP |
| **cargo-audit** | Audyt zależności Rust. | Rust |
| **govulncheck** | Skaner bezpieczeństwa Go. | Golang |
| **Dotnet CLI (list / audit)** | Audyt dla .NET. | C# / .NET |

---

### 💼 Komercyjne narzędzia

| Narzędzie | Opis | Uwagi |
|----------|------|-------|
| **Snyk** | Popularna platforma do SCA, integracja CI/CD. | Darmowy tier z ograniczeniami |
| **WhiteSource (Mend)** | Pełne zarządzanie zależnościami i licencjami. | Dla firm |
| **JFrog Xray** | Integracja z repozytoriami i CI/CD. | Płatne |
| **GitHub Advanced Security** | Automatyczny SCA i alerty w repo. | GitHub Enterprise |
| **Sonatype Nexus IQ** | Analiza zależności i zgodności. | Komercyjny |

---

###  Usługi API i CI/CD

- GitHub Dependabot – automatyczne PR z aktualizacjami.
- GitLab Dependency Scanning – skaner zależności w pipeline.
- Renovate – automatyczne update’y zależności.

---

## ✅ Wskazówki

- Regularnie uruchamiaj narzędzia SCA w CI/CD.
- Monitoruj CVE, np. przez `cve.org`, `nvd.nist.gov`, RSS.
- Zautomatyzuj alerty i aktualizacje przy pomocy Dependabot, Renovate lub Trivy.

---

W następnym kroku: **3.6.5 – Praktyczne ćwiczenie: Testowanie i mitigacja**
