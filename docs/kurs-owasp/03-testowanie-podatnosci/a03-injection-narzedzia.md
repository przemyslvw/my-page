---
id: "a03-injection-narzedzia"
title: "🧰 3.3.4 – Narzędzia do testowania"
sidebar_position: 14
---

##  Cel sekcji

Poznać narzędzia – darmowe i komercyjne – wykorzystywane do wykrywania i analizy podatności typu **Injection**, w tym SQLi, Command Injection, NoSQLi i innych.

---

## 🧰 Narzędzia bezpłatne

###  1. **sqlmap**
Automatyczne wykrywanie i eksploatacja podatności SQL Injection.

```bash
sqlmap -u "http://example.com/item?id=1" --batch --dbs
```

✅ Wykrywa: bazy danych, tabele, kolumny, możliwość RCE.

---

###  2. **Burp Suite Community Edition**

- Ręczne testowanie injection (Repeater, Intruder, Decoder).
- Możliwość przechwytywania i modyfikacji zapytań HTTP.
- Pluginy typu: SQLiPy, Hackvertor, Autorize.

---

### 🕷 3. **OWASP ZAP**

- Zautomatyzowane skanowanie aplikacji.
- Fuzzing, Passive Scanner, Scripting.
- Wtyczki do testów injection i filtrów XSS/SQLi.

---

### 📦 4. **Commix**

Wykrywanie i wykorzystanie **Command Injection**.

```bash
commix --url="http://example.com/vuln?input=xyz"
```

---

### 🧬 5. **NoSQLMap**

Specjalistyczne narzędzie do testów MongoDB Injection.

```bash
python nosqlmap.py -u "http://example.com/api/login"
```

---

###  6. **Postman / Insomnia**

- Ręczne testowanie API.
- Iniekcja payloadów do nagłówków, ciał JSON, parametrów URL.

---

## 💼 Narzędzia płatne

### 💎 1. **Burp Suite Professional**

- Zaawansowany skaner podatności Injection.
- Automatyczna detekcja + inteligentny fuzzing.
- Pluginy wspierające testy SQLi, Command Injection, GraphQL injection.

---

###  2. **Acunetix / Invicti**

- Skanery dynamiczne (DAST) z silnym silnikiem SQLi/XXE/Commandi.
- Wykrywanie + PoC (proof-of-concept) dla wielu rodzajów injection.

---

###  3. **Checkmarx / Snyk Code / SonarQube (komercyjny)**

- SAST: statyczna analiza kodu pod kątem potencjalnych podatności injection.

---

##  Wskazówki

- Łącz skanowanie dynamiczne (DAST) i statyczne (SAST).
- W przypadku aplikacji API-first – korzystaj z **Postman + Burp**.
- Regularnie przeglądaj zależności – injection może występować także w komponentach zewnętrznych.

---

W kolejnym kroku: **3.3.5 – Praktyczne ćwiczenie: Testowanie i mitigacja Injection**
