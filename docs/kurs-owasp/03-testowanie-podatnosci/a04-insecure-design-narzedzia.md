---
id: "a04-insecure-design-narzedzia"
title: "🧰 3.4.4 – Narzędzia do testowania"
sidebar_position: 19
---

## 🎯 Cel sekcji

Poznać narzędzia, które pomagają identyfikować **Insecure Design** – mimo że wykrycie tego typu podatności **często wymaga analizy manualnej i wiedzy eksperckiej**.

---

## 🧠 Charakterystyka narzędzi

Podatności typu **Insecure Design** najczęściej **nie są wykrywane przez automatyczne skanery**, dlatego kluczowe znaczenie mają:

- narzędzia wspomagające analizę architektury,
- przeglądy kodu i modeli uprawnień,
- testy manualne logiki biznesowej.

---

## 🧰 Narzędzia bezpłatne

### 🧾 1. **Threat Dragon (OWASP)**

- Tworzenie modeli zagrożeń (Threat Modeling).
- Identyfikacja logicznych luk projektowych w architekturze aplikacji.

---

### 🔍 2. **Burp Suite (Community/Pro)**

- Manualne testowanie logiki aplikacji (np. przechodzenie przez proces zakupowy, rejestracji, resetu hasła).
- Zmiana kolejności kroków, modyfikacja tokenów, ID, stanu sesji.

---

### 🧠 3. **ZAP Browser Plug-in / Manual Explore**

- Testowanie logiki aplikacji przez przeglądarkę z przechwytywaniem żądań.
- Możliwość ręcznego przechodzenia scenariuszy i rejestrowania błędów projektowych.

---

### 📋 4. **Draw.io / Whimsical / Lucidchart**

- Tworzenie diagramów przepływu danych i użytkownika.
- Ułatwiają identyfikację brakujących punktów kontroli bezpieczeństwa.

---

## 💼 Narzędzia komercyjne

### 🔐 1. **IriusRisk**

- Automatyzacja modelowania zagrożeń na etapie projektowania.
- Integracja z Jira, repozytoriami kodu, pipeline CI/CD.

---

### 🔍 2. **Burp Suite Professional**

- Zaawansowane testy logiki, makra, sekwencje kroków (np. logowanie + reset + edycja konta).
- Pluginy typu **Autorize**, **Flow**, **Session Handling Rules**.

---

### 📊 3. **Snyk / Checkmarx / SonarQube**

- Wspierają wykrywanie wzorców anty-pattern w kodzie, np. brak autoryzacji, brak walidacji ID.

---

## 🧠 Wskazówki

- Połącz narzędzia graficzne z analizą logiki użytkownika.
- Testuj procesy aplikacji od końca do początku – szukaj luk projektowych.
- Nie zakładaj, że jeśli endpoint działa, to działa bezpiecznie – sprawdzaj **sensowność projektu**.

---

W kolejnym kroku: **3.4.5 – Praktyczne ćwiczenie: Testowanie i mitigacja Insecure Design**
