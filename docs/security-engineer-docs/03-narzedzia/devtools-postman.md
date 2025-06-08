---
id: "devtools-postman"
title: "DevTools i Postman"
sidebar_position: 1
---

DevTools i Postman to podstawowe narzędzia pracy specjalisty ds. bezpieczeństwa aplikacji webowych i API. Umożliwiają one nie tylko analizę działania aplikacji, ale również testowanie pod kątem najczęstszych podatności.

## 🌐 DevTools (narzędzia deweloperskie przeglądarki)

DevTools w Chrome, Firefox czy Edge to nie tylko debuger JavaScriptu – to potężne narzędzie do analizy bezpieczeństwa frontendu, komunikacji HTTP oraz zachowania aplikacji w czasie rzeczywistym.

### 🛡️ Weryfikacja nagłówków bezpieczeństwa

W zakładce **Network**, po kliknięciu dowolnego żądania można zobaczyć odpowiedź HTTP wraz z nagłówkami. Kluczowe do weryfikacji:

- **Content-Security-Policy (CSP)** – ogranicza możliwe źródła skryptów, stylów, itp.
- **Strict-Transport-Security (HSTS)** – wymusza HTTPS i zapobiega downgrade attacks
- **X-Content-Type-Options** – chroni przed MIME-sniffingiem
- **X-Frame-Options / CSP frame-ancestors** – zapobiega clickjackingowi
- **Access-Control-Allow-Origin (CORS)** – kontroluje dostęp do zasobów między domenami

Analiza obecności, poprawności i wartości tych nagłówków to jeden z pierwszych kroków w pentestach webowych.

### 🧪 Symulowanie ataków XSS, CSRF, IDOR

- **XSS** – w zakładce Elements lub Console można testować payloady np. `<script>alert(1)</script>` w polach formularzy, komentarzach itp.
- **CSRF** – można próbować odtworzyć żądanie (np. POST z formularza) bez tokena CSRF lub z nieautoryzowanego źródła
- **IDOR** – zmieniając parametry w URL (np. `/user/12345` na `/user/1`) i obserwując odpowiedzi serwera można wykryć brak autoryzacji
- **Zakładka Network** pozwala podejrzeć dokładnie, jak wyglądają payloady i odpowiedzi serwera, co ułatwia analizę

### 🔑 Testowanie autoryzacji i uprawnień

- Wyloguj się z aplikacji, ale spróbuj wykonać żądanie API z poziomu zakładki Network (brak tokenu)
- Zaloguj się jako inny użytkownik i wykonaj zapytania zmieniając identyfikatory zasobów (np. `id=5`)
- Sprawdź, czy dane nie są ukryte tylko po stronie frontendowej (np. pola hidden, disabled)
- Użyj zakładki Application → Storage → Tokens, aby manipulować JWT lub tokenami sesyjnymi

### 🔓 Sprawdzanie transmisji danych i ich poufności

- Czy login, hasło lub dane osobowe są przesyłane jako `GET`, w URL lub jako nieszyfrowany `POST`
- Weryfikacja braku tokenów w URL (np. `?token=...`) – powinny być w nagłówkach
- Sprawdzanie, czy cookies są oznaczone jako **Secure** i **HttpOnly**
- Czy dane przesyłane przez formularze są walidowane również po stronie serwera

> DevTools pozwala spojrzeć aplikacji w trzewia – ale tylko wtedy, gdy wiesz, gdzie patrzeć.

## 📬 Postman – testowanie API

- Tworzenie i wysyłanie zapytań REST/GraphQL/Soap
- Automatyczne testy odpowiedzi (status, czas, zawartość)
- Praca z tokenami: Bearer, OAuth, JWT
- Kolekcje testowe i mockowanie odpowiedzi
- Monitorowanie API i testowanie odporności na nieprawidłowe dane

Postman świetnie sprawdza się do:

- Testowania autoryzacji (brak, nieprawidłowe tokeny)
- Wysyłania payloadów XSS/SQLi do API
- Weryfikacji odpowiedzi błędów (czy nie zawierają informacji technicznych)
- Analizy struktury odpowiedzi, nagłówków i kodów statusu

> Postman i DevTools to podstawowe narzędzia manualnego pentestera webowego – lekkie, szybkie i potężne.
