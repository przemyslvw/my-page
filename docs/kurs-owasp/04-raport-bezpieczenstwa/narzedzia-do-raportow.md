---
id: "narzedzia-do-raportow"
title: "Narzędzia do generowania raportów"
sidebar_position: 4
---

## 🧰 Narzędzia do generowania raportów

Efektywne raportowanie wyników testów bezpieczeństwa wymaga nie tylko rzetelnej analizy, ale także odpowiednich narzędzi, które ułatwiają prezentację danych w sposób przejrzysty, profesjonalny i nadający się do dalszego przetwarzania.

Poniżej zestawienie polecanych narzędzi – zarówno bezpłatnych, jak i komercyjnych.

---

### 🆓 Narzędzia bezpłatne

#### 📝 **Markdown + Docusaurus / MkDocs / Hugo**

- **Opis**: Tworzenie raportów w formacie Markdown z eksportem do HTML lub PDF.
- **Zalety**: Lekkość, wersjonowanie w Git, integracja z CI/CD.
- **Przydatne w kursie**: Możliwość generowania statycznych raportów zgodnych z OWASP Top 10.

#### 📊 **OWASP DefectDojo**

- **Opis**: Platforma do zarządzania podatnościami z funkcją raportowania.
- **Funkcje**: Import z Burp, ZAP, Nessus; eksport PDF/JSON; integracje z JIRA.
- **Zalety**: Widok trendów, wsparcie dla wielu projektów.

#### 📄 **Dradis Framework**

- **Opis**: Narzędzie do agregacji wyników z różnych skanerów.
- **Zalety**: Szablony raportów, eksport PDF/HTML, współpraca zespołowa.
- **Licencja**: Community Edition dostępna za darmo.

#### 🐙 **Security Report Builder (GitHub)**

- **Opis**: Narzędzia open-source do automatyzacji generowania raportów.
- **Zalety**: Możliwość dostosowania layoutu, integracja CLI.

---

### 💼 Narzędzia komercyjne

#### 💡 **Burp Suite Professional**

- **Funkcje**: Generowanie półautomatycznych raportów HTML i PDF.
- **Zalety**: Segmentacja podatności wg OWASP, możliwość eksportu dowodów.

#### 🧠 **Nessus Professional**

- **Opis**: Skaner z wbudowanymi szablonami raportów.
- **Formaty wyjściowe**: PDF, HTML, CSV.
- **Zalety**: Raporty z oceną ryzyka, śledzenie zmian między skanami.

#### 📌 **Pentest Tools Reporting Engine**

- **Opis**: Narzędzie online do tworzenia raportów z testów penetracyjnych.
- **Zalety**: Szablony, obsługa wielu klientów, generowanie wykresów i podsumowań.

#### 🛠️ **Outpost24 / ImmuniWeb / Acunetix**

- **Opis**: Platformy komercyjne oferujące automatyczne generowanie profesjonalnych raportów.
- **Zalety**: Raporty zgodne z OWASP, PCI-DSS, ISO 27001.

---

### 🔄 Integracja z CI/CD i Git

Raporty mogą być automatycznie generowane po zakończeniu testów z wykorzystaniem:

- **GitHub Actions / GitLab CI** – generowanie HTML/PDF i publikacja artefaktów
- **Pandoc** – konwersja Markdown → PDF (LaTeX), HTML, DOCX
- **Headless Chrome** – zrzut HTML do PDF z wykorzystaniem Puppeteer

---

Dobrze dobrane narzędzia usprawniają proces raportowania i ułatwiają współpracę z zespołem dev/secops, menedżerami oraz audytorami.

