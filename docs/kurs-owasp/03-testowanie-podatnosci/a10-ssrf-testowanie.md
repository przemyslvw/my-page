---
id: "a10-ssrf-testowanie"
title: "Metody testowania podatności"
sidebar_position: 47
---

# 🔬 Metody testowania podatności – Server-Side Request Forgery (SSRF) (A10:2025)

## 🎯 Cel testowania

Celem testowania SSRF jest wykrycie sytuacji, w której aplikacja wykonuje nieautoryzowane żądania HTTP do innych systemów – zarówno zewnętrznych, jak i wewnętrznych – w odpowiedzi na dane wejściowe od użytkownika.

---

## 🛠️ Krok po kroku: testowanie SSRF

### 1. 🔎 Zidentyfikuj punkty podatne na SSRF
- Wyszukaj funkcje typu:
  - pobieranie zasobów z URL (np. `?url=`),
  - generowanie zrzutów PDF z podanych stron,
  - „preview link” lub „fetch image from URL”,
  - webhooks i integracje z zewnętrznymi serwisami.

---

### 2. 💉 Testuj podstawowe payloady

Wypróbuj typowe adresy URL:

```
http://localhost/
http://127.0.0.1:80/
http://169.254.169.254/       # metadane AWS
http://[::1]/                 # IPv6 localhost
```

➡️ Obserwuj odpowiedź aplikacji:  
- Czy pobrano zawartość?
- Czy zwrócono timeout/błąd?

---

### 3. 🧪 Payloady zaawansowane

- SSRF przez DNS rebind:
  ```
  http://your-custom-domain.burpcollaborator.net/
  ```
- Schematy inne niż HTTP:
  ```
  file://
  gopher://
  ftp://
  ```

➡️ Użyj narzędzi takich jak [Burp Collaborator](https://portswigger.net/burp/documentation/collaborator) do detekcji żądań wychodzących.

---

### 4. 📜 Analiza logów i monitorowanie ruchu

- Użyj narzędzi takich jak `tcpdump`, `Wireshark` lub `ngrep` do monitorowania ruchu wychodzącego z serwera.
- Sprawdź logi backendu – czy aplikacja próbowała uzyskać dostęp do nieautoryzowanych zasobów.

---

## 🧰 Przykładowe narzędzia do testowania SSRF

| Narzędzie | Typ | Opis |
|----------|------|------|
| Burp Suite | Płatne/Freemium | Fuzzing i Collaborator do wykrywania SSRF. |
| SSRFmap | Bezpłatne | Automatyczne testowanie endpointów pod kątem SSRF. |
| OWASP ZAP | Bezpłatne | Proxy + scanner do testów aplikacji webowych. |
| Interactsh | Bezpłatne | Alternatywa dla Burp Collaborator – logowanie żądań SSRF/DNS. |

---

## ✅ Wskazówki

- Testuj różne schematy i nietypowe nagłówki (`Host`, `X-Forwarded-For`).
- Monitoruj reakcje serwera (czas, kody HTTP).
- W aplikacjach chmurowych zawsze sprawdzaj dostępność do `169.254.169.254`.

---

Testowanie SSRF wymaga cierpliwości i dobrej obserwacji – wiele przypadków jest cichych i nie generuje jawnych błędów.
