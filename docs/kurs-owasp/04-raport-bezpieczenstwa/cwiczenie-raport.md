---
id: "cwiczenie-raport"
title: "Praktyczne ćwiczenie: Tworzenie finalnego raportu"
sidebar_position: 5
---

## 🧪 Praktyczne ćwiczenie: Tworzenie finalnego raportu

Celem tego ćwiczenia jest przejście przez cały proces tworzenia **kompletnego raportu bezpieczeństwa** aplikacji webowej zgodnego z OWASP Top 10 2025.

---

### 🎯 Cel ćwiczenia

Na podstawie wcześniej przeprowadzonych testów, uczestnik:

- Skonsoliduje wyniki testów (manualnych i automatycznych)
- Dokona analizy i oceny ryzyka
- Zastosuje strukturę raportu z poprzednich rozdziałów
- Wygeneruje końcowy dokument (preferowane: PDF/HTML/Markdown)

---

### 🛠️ Wymagania

1. Dostęp do wyników testów (np. raporty ZAP, Burp, notatki z testów manualnych)
2. Edytor Markdown lub narzędzie raportujące (np. DefectDojo, Dradis, Pandoc, GitHub Pages)
3. Szablon raportu OWASP Top 10 2025 (do pobrania z repozytorium kursu)

---

### 📋 Etapy ćwiczenia

#### 1. Przygotowanie danych wejściowych

- Zbierz wszystkie wykryte podatności (nazwy, lokalizacje, payloady, CVSS).
- Skategoryzuj je według OWASP Top 10 2025.
- Oceń ryzyko i status każdej podatności.

#### 2. Wypełnienie struktury raportu

Uzupełnij sekcje raportu:

- Informacje ogólne (nazwa projektu, data, zespół)
- Tabela podsumowująca podatności
- Szczegóły każdej podatności (opis, kroki, dowody, rekomendacje)
- Konfiguracja i wnioski końcowe

#### 3. Generowanie raportu

- Jeśli używasz Markdown: wyeksportuj do PDF (np. przy pomocy Pandoc)
- Jeśli używasz GUI (np. Dradis, DefectDojo): użyj opcji „Export → PDF/HTML”
- Możesz też wygenerować statyczną wersję online przy użyciu Docusaurus/MkDocs

#### 4. Walidacja i retest

- Zweryfikuj poprawność danych i struktury raportu
- (Opcjonalnie) poproś innego uczestnika o review lub feedback

---

### 🧾 Efekt końcowy

Uczestnik powinien posiadać **kompletny, profesjonalny raport bezpieczeństwa** aplikacji webowej, gotowy do przekazania zespołowi dev/secops lub zarządowi.

Raport ten będzie stanowił punkt wyjścia do poprawy bezpieczeństwa systemu oraz dowód przeprowadzenia audytu.

---

### 📁 Przykład

> W repozytorium kursu znajdziesz przykładowy raport w formacie `.md` oraz `.pdf`, opracowany na podstawie testu aplikacji demonstracyjnej.

---

# 🛡️ Raport bezpieczeństwa aplikacji webowej  
**Zgodny z OWASP Top 10 – 2025**

---

## 📌 1. Informacje ogólne

- **Nazwa aplikacji:** `MyApp Web Portal`
- **Data testów:** `2025-07-17`
- **Audytorzy:** `Zespół Majdak Think Tank Security`
- **Zakres testów:**
  - Frontend (Angular)
  - API REST
  - Backend (Node.js + Firebase)
- **Metodologia:**  
  OWASP Testing Guide v5, Manual Pentest, ZAP + Burp Suite

---

## 📊 2. Podsumowanie testów

| Metryka | Wartość |
|--------|---------|
| Liczba wykrytych podatności | 6 |
| Poziom ryzyka ogólnego | Wysokie |
| Zgłoszenia krytyczne | 1 |
| Zgłoszenia wysokie | 2 |
| Zgłoszenia średnie | 2 |
| Zgłoszenia niskie | 1 |

**Główne zalecenia:**  
- Poprawić kontrolę dostępu
- Wdrożyć CSP i bezpieczne nagłówki
- Zaktualizować zależności frontendowe

---

## 🔍 3. Szczegółowa analiza podatności

### 🟥 A01:2025 – Broken Access Control

- **Lokalizacja:** `/admin/users`
- **Opis:** Nieautoryzowani użytkownicy mogą uzyskać dostęp do listy użytkowników.
- **Dowód:** Użytkownik z rolą "viewer" może uzyskać dane z `/admin/users`.
- **Payload:** `GET /admin/users`
- **Ryzyko:** High (CVSS 8.6)
- **Rekomendacja:** Wdrożyć RBAC i walidację sesji po stronie serwera.
- **Status:** Potwierdzona

---

### 🟧 A06:2025 – Vulnerable and Outdated Components

- **Lokalizacja:** Frontend – `package.json`
- **Opis:** Wersja `axios@0.21.1` podatna na SSRF.
- **Dowód:** Zidentyfikowano znane CVE-2021-XXXX.
- **Ryzyko:** Medium
- **Rekomendacja:** Zaktualizować do wersji 1.6+.
- **Status:** Wymaga weryfikacji

---

### (Dodaj pozostałe podatności według schematu)

---

## ⚙️ 4. Weryfikacja konfiguracji

| Obszar | Wynik | Opis |
|-------|------|------|
| HTTPS | ✅ | Certyfikat Let's Encrypt, wymuszony redirect |
| HSTS | ❌ | Brak nagłówka `Strict-Transport-Security` |
| CSP | ❌ | Brak nagłówka `Content-Security-Policy` |
| X-Frame-Options | ✅ | `SAMEORIGIN` obecny |

---

## 🧰 5. Użyte narzędzia

**Bezpłatne:**

- OWASP ZAP (automatyczne skanowanie)
- Nikto (enumeracja HTTP)
- Nmap (port scanning)
- GitLeaks (secrets scanning)

**Płatne:**

- Burp Suite Pro (manualne testy + raporty)
- Snyk (analiza zależności JS)
- Nessus (skan podatności hosta)

---

## ✅ 6. Rekomendacje końcowe

1. Wdrożyć mechanizmy RBAC i zamknąć endpointy administracyjne
2. Dodać nagłówki: CSP, HSTS, X-Content-Type-Options
3. Zaktualizować biblioteki frontendowe
4. Wprowadzić testy bezpieczeństwa do pipeline CI
5. Zaplanować re-test po wdrożeniu poprawek

---

## 🗂️ 7. Załączniki

- `zrzut-broken-access-control.png`
- `scan-results-zap.html`
- `export-burp-suite.pdf`
- `logi-nmap.txt`

---

Raport przygotowany przez:  
**Majdak Think Tank – Zespół Bezpieczeństwa Aplikacji**

