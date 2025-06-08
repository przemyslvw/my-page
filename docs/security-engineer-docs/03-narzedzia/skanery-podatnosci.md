---
id: "skanery-podatnosci"
title: "Skanery podatnosci"
sidebar_position: 1
---

Skanery podatności (vulnerability scanners) to zautomatyzowane narzędzia służące do identyfikacji luk bezpieczeństwa w systemach, aplikacjach i konfiguracjach. Są podstawą w procesie zarządzania podatnościami (vulnerability management).

## 🔍 Do czego służą skanery?

- Wykrywają znane podatności (na podstawie baz CVE/CWE)
- Analizują błędy konfiguracji, nieaktualne wersje oprogramowania
- Wskazują podatne komponenty (np. biblioteki JS, serwery webowe)
- Automatycznie oceniają poziom ryzyka (np. CVSS score)
- Raportują i śledzą status naprawy

## 🛠️ Popularne skanery podatności

### ✅ Komercyjne

- **Tenable Nessus** – jeden z najdokładniejszych, szeroko używany
- **Qualys** – platforma chmurowa z integracją z zarządzaniem zasobami
- **Rapid7 InsightVM (dawniej Nexpose)** – dobry do dużych środowisk
- **Acunetix / Invicti** – specjalizacja w aplikacjach webowych

### ✅ Open Source / darmowe

- **OpenVAS** – popularny, elastyczny, szeroki zakres testów
- **Nikto** – prosty skaner HTTP (nagłówki, błędy serwera, błędna konfiguracja)
- **Nmap + NSE scripts** – podstawowy portscanner z możliwością skanowania podatności
- **ZAP (OWASP)** – dynamiczne testy aplikacji webowych (DAST)

## 🧩 Integracje z pipeline CI/CD

- Automatyczne uruchamianie skanów w GitLab CI / GitHub Actions
- Warunki zatrzymujące wdrożenie przy wykryciu podatności krytycznych
- Eksport wyników do SIEM, JIRA, ticketing lub alerting
- Powiązanie podatności z komponentem / właścicielem kodu

## 📊 Interpretacja wyników

- **False positives** – weryfikacja manualna jest nadal konieczna
- **CVSS** – ustandaryzowana miara ryzyka (0–10)
- **Exploit available** – niektóre skanery pokazują, czy istnieje gotowy exploit
- **Patch availability** – informacje o aktualizacjach lub obejściach

## ✅ Dobre praktyki

- Skanuj cyklicznie i po każdej większej zmianie w środowisku
- Skanuj także wewnętrzne systemy i staging, nie tylko produkcję
- Wyznacz osoby odpowiedzialne za remediację – nie wystarczy tylko raport
- Nie polegaj wyłącznie na skanerach – łącz z testami manualnymi i threat modelingiem

> Dobry skaner nie tylko wykrywa – dobry zespół wie, jak z tymi informacjami pracować.
