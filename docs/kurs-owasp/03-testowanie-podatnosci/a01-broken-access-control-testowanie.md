---
id: "a01-broken-access-control-testowanie"
title: "Broken Access Control: Metody testowania podatności"
sidebar_position: 2
---

##  Cel rozdziału

Poznasz techniki testowania podatności typu **Broken Access Control**, które możesz stosować zarówno **ręcznie**, jak i z użyciem narzędzi. Testy te są kluczowe, ponieważ automatyczne skanery rzadko wykrywają tego typu błędy skutecznie.

---

##  Metody testowania

### 1.  Testowanie IDOR (Insecure Direct Object Reference)

- Zmień ID użytkownika, rekordu lub zasobu w URL, body lub parametrze.
- Przykład:
  ```http
  GET /invoice/1024
  ➡️ zmień na /invoice/1025
  ```

📌 Jeśli widzisz dane innego użytkownika – masz podatność.

---

### 2. 🎭 Testowanie różnych ról użytkowników

- Zaloguj się jako użytkownik o niższych uprawnieniach.
- Spróbuj wykonać operację lub wejść na zasób przeznaczony dla roli wyższej (np. admin).
- Można też podmienić token JWT, ciasteczko sesji, lub ID roli w body/formularzu.

---

### 3.  Fuzzing metod HTTP

Niektóre zasoby są dostępne tylko dla wybranych metod (np. `GET`, `POST`), ale aplikacja nie weryfikuje poprawnie:

```bash
curl -X PUT https://example.com/profile/123
curl -X DELETE https://example.com/profile/123
```

📌 Sprawdź, czy da się usunąć lub edytować zasób metodą, która nie powinna być dostępna.

---

### 4. 🚫 Testowanie ukrytych endpointów i funkcji

- Zgadywanie nazw endpointów (`/admin`, `/manage`, `/delete`, `/edit-user`).
- Przeszukiwanie kodu JS frontendowego pod kątem nazw API.
- Testowanie funkcji nieobecnych w UI, ale dostępnych po stronie serwera.

---

### 5. ⚠️ Testowanie „przywilejów poziomu dostępu”

- Przykład: użytkownik może **zobaczyć** dane tylko swoje, ale czy może:
  - edytować cudze?
  - zatwierdzić płatność?
  - zmienić status zamówienia?

Sprawdź operacje typu:
```http
PATCH /order/222/status
Body: { "status": "approved" }
```

---

### 6.  Przechodzenie między sesjami

- Otwórz dwie sesje (np. admin i user).
- Przeklej ciasteczko jednego do drugiego.
- Sprawdź, czy backend weryfikuje tożsamość po stronie serwera czy tylko na froncie.

---

##  Dobre praktyki podczas testów

- Zawsze **sprawdzaj odpowiedzi serwera**, nie tylko UI.
- **Dokumentuj różnice w odpowiedzi** na ten sam request z różnymi uprawnieniami.
- Używaj **Burp Suite** do manipulacji żądaniami.
- Testuj zarówno **REST**, jak i **GraphQL**, jeśli występują.

---

## 🧰 Narzędzia pomocne podczas testowania (lista będzie rozwinięta w osobnym podrozdziale)

- Burp Suite (manualne testy, Repeater, Intruder)
- OWASP ZAP (Manual Explore + Fuzzer)
- Autorole / Autorize extension (Burp plugin)
- Postman / Insomnia – ręczne odpytywanie API

---

## 📌 Podsumowanie

> Broken Access Control nie zawsze oznacza “admin panel”. To każda sytuacja, w której użytkownik może uzyskać dostęp do czegoś, czego nie powinien – a takich sytuacji jest **bardzo dużo**.

---

W kolejnym kroku przyjrzymy się **jak weryfikować poprawność konfiguracji aplikacji i serwera** pod kątem tej podatności.
