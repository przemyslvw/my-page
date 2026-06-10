---
id: "znaczenie-stosu"
title: "Znaczenie stosu technologicznego dla bezpieczeństwa"
sidebar_position: 3
---

##  Cel rozdziału

Zrozumienie, jak **wybór technologii frontendowych i backendowych** wpływa na bezpieczeństwo aplikacji. Każdy komponent stacku niesie za sobą potencjalne ryzyka, znane podatności i specyficzne mechanizmy ataku.

---

## Dlaczego stack ma znaczenie?

1. **Każda technologia ma historię luk bezpieczeństwa (CVE)**.
2. Niektóre technologie wymagają **ręcznej konfiguracji zabezpieczeń**.
3. Nieaktualne biblioteki i frameworki = gotowy cel.
4. Stack wpływa na:
   - sposób uwierzytelniania,
   - zarządzanie sesją,
   - domyślne nagłówki,
   - polityki CORS, CSP, itp.

---

##  Typowe profile ryzyka – przykłady

| Technologia | Potencjalne zagrożenia |
|-------------|-------------------------|
| **WordPress (PHP)** | Znane CVE w pluginach, brak kontroli dostępu, podatne API. |
| **React** | Ataki typu XSS w JSX bez `dangerouslySetInnerHTML`, błędne walidacje. |
| **Angular** | Domyślne mechanizmy chronią przed XSS, ale podatność na błędne CORS. |
| **Node.js** | SSRF, deserialization, brak ograniczeń pamięci, npm supply chain. |
| **Spring Boot (Java)** | Problemy z exposowanymi endpointami actuator, RCE. |

---

##  Stack vs typy ataków

| Typ ataku | Gdzie występuje najczęściej |
|-----------|------------------------------|
| XSS | Frameworki frontendowe i CMS-y |
| CSRF | Backend bez tokenów CSRF, API bez CORS |
| SSRF | Aplikacje z możliwością wczytywania URLi (Node, Python) |
| IDOR / Bypass ACL | API RESTowe bez kontroli poziomu zasobów |
| Insecure Deserialization | Java, PHP, .NET, Python (pickle, YAML) |

---

##  Jak analizować ryzyko stacku?

1. Sprawdź wersje komponentów (`/package.json`, `composer.json`, nagłówki).
2. Przeskanuj zależności (`npm audit`, `pip-audit`, `OWASP Dependency-Check`).
3. Zidentyfikuj domyślne zachowania i skonfiguruj je bezpiecznie.
4. Przejrzyj listę znanych podatności (CVE, GitHub Security Advisories).
5. Zastosuj zasadę **hardeningu**:
   - wyłącz debug mode,
   - zablokuj endpointy testowe,
   - ustaw bezpieczne nagłówki.

---

## 📌 Podsumowanie

> Nie ma czegoś takiego jak "neutralny stack". Każda technologia wymaga znajomości jej słabości i świadomego zabezpieczenia. **Znajomość stacku to Twój radar zagrożeń.**

---

W następnym rozdziale przejdziemy do **testowania konkretnych podatności OWASP Top 10 2025**, zaczynając od **Broken Access Control**.
