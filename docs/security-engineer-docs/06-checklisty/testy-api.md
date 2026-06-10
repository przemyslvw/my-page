---
id: "testy-api"
title: "Testy api"
sidebar_position: 1
---

Testowanie bezpieczeństwa API to jeden z najważniejszych elementów zabezpieczania nowoczesnych aplikacji. Poniższa checklista pomaga przeprowadzić skuteczną ocenę podatności interfejsów API – zarówno REST, jak i GraphQL.

## ✅ Checklista testów API

### 🔑 Uwierzytelnianie i autoryzacja

- [ ] Czy API wymaga uwierzytelnienia (token JWT, OAuth)?
- [ ] Czy istnieje ochrona przed brute-force (rate limiting, CAPTCHA)?
- [ ] Czy dostęp do zasobów jest zgodny z poziomem uprawnień (RBAC/ABAC)?
- [ ] Czy użytkownik może zmodyfikować token, by uzyskać dostęp do cudzych danych (test IDOR)?
- [ ] Czy token JWT wygasa i ma poprawnie ustawiony algorytm (np. RS256 zamiast none)?

### 📦 Dane wejściowe i walidacja

- [ ] Czy dane są walidowane po stronie serwera (typy, długość, wzorce)?
- [ ] Czy można wstrzyknąć kod (XSS, SQLi, command injection)?
- [ ] Czy API akceptuje tylko oczekiwane metody (GET, POST, PUT, DELETE)?
- [ ] Czy endpointy są zabezpieczone przed nadużyciem metod `OPTIONS`, `TRACE`?

###  Filtrowanie danych i ujawnienia

- [ ] Czy można pobrać dane innych użytkowników modyfikując identyfikator?
- [ ] Czy odpowiedzi nie zawierają wrażliwych informacji (e-maile, tokeny, stacktrace)?
- [ ] Czy błędy są obsługiwane bez wycieku informacji (np. kod 500 bez detali)?
- [ ] Czy GraphQL introspection jest wyłączone w środowisku produkcyjnym?

###  Bezpieczeństwo transportu

- [ ] Czy komunikacja odbywa się wyłącznie po HTTPS?
- [ ] Czy certyfikat SSL jest ważny i poprawnie skonfigurowany?
- [ ] Czy HSTS jest aktywny dla subdomen?

### 📉 Rate limiting i nadużycia

- [ ] Czy API posiada ograniczenia zapytań (Rate Limit)?
- [ ] Czy odpowiedź zawiera nagłówki `Retry-After`, `X-RateLimit-Limit`?
- [ ] Czy istnieją mechanizmy ochrony przed automatyzacją (np. ReCAPTCHA dla wrażliwych akcji)?

###  Narzędzia do testowania API

- **Postman** – manualne testy, kolekcje testowe, testy autoryzacji
- **Burp Suite / ZAP** – proxy + analiza żądań API
- **Insomnia** – alternatywa dla Postmana z integracją JWT/OAuth
- **nmap / nuclei / ffuf** – testy endpointów i fuzzing
- **GraphQL Voyager / InQL** – do testów API GraphQL

###  Dodatkowe punkty

- [ ] Czy endpointy wewnętrzne są oddzielone od publicznych?
- [ ] Czy API ma wersjonowanie (np. /api/v1/)?
- [ ] Czy jest dokumentacja (Swagger/OpenAPI) i czy nie ujawnia zbyt wiele?
- [ ] Czy logowane są wszystkie nieautoryzowane próby dostępu?

> API jest często tylnymi drzwiami aplikacji. Jeśli nie są odpowiednio zabezpieczone – są pierwszym celem atakującego.
