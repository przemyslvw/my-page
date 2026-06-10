---
id: "a08-integrity-failures-narzedzia"
title: "Narzędzia do testowania"
sidebar_position: 39
---

#  Narzędzia do testowania – Software and Data Integrity Failures (A08:2025)

Podatność typu **Software and Data Integrity Failures** polega na braku mechanizmów zapewniających integralność kodu, komponentów, konfiguracji lub danych przesyłanych i wdrażanych w aplikacji. Testowanie tej podatności skupia się głównie na analizie łańcucha dostarczania oprogramowania (*supply chain*), konfiguracji systemów CI/CD oraz bezpieczeństwie zależności.

---

##  Kategorie narzędzi

### 1. **Skanery podatności zależności**

| Narzędzie | Typ | Opis |
|----------|------|------|
| [Snyk](https://snyk.io) | Płatne/Freemium | Wykrywa podatności w zależnościach projektów (NPM, Maven, Docker). |
| `npm audit` | Bezpłatne | Wbudowane w NPM – analiza znanych luk w zależnościach. |
| [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) | Bezpłatne | Narzędzie OWASP do skanowania bibliotek (Java, .NET, JS). |
| [Trivy](https://aquasecurity.github.io/trivy/) | Bezpłatne | CLI do skanowania obrazów kontenerowych i zależności. |

---

### 2. **Narzędzia do wykrywania sekretów i nieautoryzowanych zmian**

| Narzędzie | Typ | Opis |
|----------|------|------|
| [Gitleaks](https://github.com/gitleaks/gitleaks) | Bezpłatne | Skanuje historię Git w poszukiwaniu sekretów i haseł. |
| [GitGuardian](https://www.gitguardian.com/) | Freemium | Wykrywa wrażliwe dane w repozytoriach – zarówno prywatnych, jak i publicznych. |
| [Talisman](https://github.com/thoughtworks/talisman) | Bezpłatne | Blokuje push commitów zawierających klucze/API/sekrety. |

---

### 3. **Weryfikacja łańcucha dostarczania (Supply Chain Security)**

| Narzędzie | Typ | Opis |
|----------|------|------|
| [Sigstore](https://www.sigstore.dev/) | Bezpłatne | Podpisywanie i weryfikowanie artefaktów open source. |
| [Cosign](https://github.com/sigstore/cosign) | Bezpłatne | Podpisywanie obrazów kontenerowych. |
| [in-toto](https://in-toto.io/) | Bezpłatne | Ochrona łańcucha dostarczania poprzez deklaratywną politykę. |

---

### 4. **CI/CD hardening & monitoring**

| Narzędzie | Typ | Opis |
|----------|------|------|
| GitHub Branch Protection Rules | Bezpłatne | Wymusza podpisy commitów, wymagane recenzje itp. |
| [Scorecards](https://github.com/ossf/scorecard) | Bezpłatne | Ocena bezpieczeństwa repozytorium open source. |
| [Kics](https://kics.io/) | Bezpłatne | Wykrywanie luk w konfiguracji plików IaC (Terraform, Docker, etc.). |

---

##  Wskazówki praktyczne

- Regularnie aktualizuj zależności przy użyciu `npm audit fix` lub `snyk wizard`.
- Wymuszaj podpisy GPG w systemach kontroli wersji.
- Zabezpiecz pipeline’y CI/CD – ogranicz uprawnienia runnerów, unikaj plaintextowych sekretów.
- Korzystaj z managerów sekretów (Vault, AWS Secrets Manager).

---

## ✅ Podsumowanie

Dzięki powyższym narzędziom można skutecznie wykrywać i ograniczać ryzyka związane z integralnością oprogramowania oraz uniknąć kompromitacji środowiska produkcyjnego przez nieautoryzowane zmiany w kodzie, zależnościach lub konfiguracji.
