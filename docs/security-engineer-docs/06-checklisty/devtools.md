---
id: "devtools"
title: "Devtools"
sidebar_position: 1
---

Checklisty to praktyczne narzędzie, które pomaga zachować spójność, dokładność i nie przeoczyć kluczowych aspektów w czasie testów, przeglądów lub analiz. DevTools w przeglądarce to pierwsza linia kontaktu z aplikacją webową — poniżej znajdziesz checklistę do wykorzystania przy analizie bezpieczeństwa aplikacji frontendowych.

## ✅ DevTools – checklista bezpieczeństwa

### 🔐 Nagłówki bezpieczeństwa

- [ ] Czy strona ustawia poprawnie **Content-Security-Policy (CSP)**?
- [ ] Czy włączony jest **HTTP Strict Transport Security (HSTS)**?
- [ ] Czy ustawiony jest nagłówek **X-Content-Type-Options: nosniff**?
- [ ] Czy działa **X-Frame-Options** (np. DENY, SAMEORIGIN)?
- [ ] Czy aktywne są nagłówki **Referrer-Policy** i **Permissions-Policy**?

### 📤 Przechwytywanie danych

- [ ] Czy dane logowania są przesyłane tylko przez HTTPS?
- [ ] Czy hasła nie pojawiają się w URL (GET)?
- [ ] Czy formularze mają poprawnie ustawione atrybuty `autocomplete="off"`?
- [ ] Czy cookies mają flagi `HttpOnly`, `Secure`, `SameSite`?

### ⚠️ Testy podatności

- [ ] Czy wejścia użytkownika są walidowane po stronie klienta i serwera?
- [ ] Czy da się wstrzyknąć kod HTML/JS (test na **XSS**)?
- [ ] Czy aplikacja korzysta z CSRF tokenów?
- [ ] Czy można zmieniać ID zasobów i uzyskiwać dostęp do cudzych danych (test na **IDOR**)?
- [ ] Czy endpointy są dostępne po stronie frontendu, mimo że nie powinny?

### 🧪 Testowanie autoryzacji

- [ ] Czy po zalogowaniu jako inna rola (np. zwykły użytkownik vs admin) frontend ukrywa dane, ale backend je nadal zwraca?
- [ ] Czy można zmienić `Authorization` header w requestach?
- [ ] Czy usunięcie lub modyfikacja tokena skutkuje odrzuceniem zapytania?

### 🔍 Debug i metadane

- [ ] Czy console.log nie ujawnia wrażliwych informacji (np. tokeny, dane użytkownika)?
- [ ] Czy w DevTools nie ma dostępnych ukrytych endpointów, np. w zakładce „Network”?
- [ ] Czy nie wyciekają dane środowiskowe w `window.__env`, `window.config`, itp.?

### 💡 Inne

- [ ] Czy aplikacja posiada wersjonowanie plików JS/CSS (cache busting)?
- [ ] Czy brakujące zasoby zwracają poprawnie błąd 404 (nie np. 200 z pustą stroną)?
- [ ] Czy skrypty z zewnętrznych źródeł są ograniczone (np. tylko zaufane domeny)?

## 🔧 Przydatne narzędzia i dodatki

- **Lighthouse (wbudowane w Chrome)** – audyt bezpieczeństwa i wydajności
- **Wappalyzer / BuiltWith** – identyfikacja używanych technologii
- **EditThisCookie** – edycja i analiza cookies
- **HackTools** – gotowe payloady i helpery do testów

> DevTools to nie tylko narzędzie dla frontendowców — to szybki sposób na weryfikację podstawowych aspektów bezpieczeństwa aplikacji jeszcze zanim sięgniesz po ciężką artylerię jak Burp Suite.
