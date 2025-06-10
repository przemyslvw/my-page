---
id: "a02-cryptographic-failures-testowanie"
title: "🧪 3.2.2 – Metody testowania podatności: Cryptographic Failures"
sidebar_position: 7
---

## 🎯 Cel sekcji

Poznać skuteczne techniki testowania podatności związanych z błędami kryptograficznymi – zarówno ręczne, jak i zautomatyzowane.

---

## 🧪 Test 1: Brak HTTPS / nieprawidłowe certyfikaty

### Narzędzia:
- przeglądarka z DevTools
- Burp Suite / ZAP Proxy
- `curl`, `openssl s_client`

### Kroki:
1. Odwiedź aplikację i sprawdź, czy działa przez `HTTP`.
2. Użyj `curl`:
```bash
curl -v http://example.com/login
```
3. Dla HTTPS:
```bash
openssl s_client -connect example.com:443
```

➡️ Brak certyfikatu lub self-signed cert = potencjalna luka MITM.

---

## 🧪 Test 2: JWT – analiza algorytmu i podpisu

### Narzędzia:
- jwt.io
- Burp Suite Decoder
- własne skrypty

### Kroki:
1. Przechwyć JWT (np. z ciasteczka lub nagłówka `Authorization`).
2. Rozkoduj i sprawdź `alg`.
3. Jeśli `alg` to `none` lub `HS256`, spróbuj wygenerować fałszywy token.

```json
{
  "alg": "none",
  "typ": "JWT"
}
```

➡️ Jeśli backend akceptuje taki token – luka krytyczna.

---

## 🧪 Test 3: Przechowywanie haseł – analiza bazy

### Narzędzia:
- dostęp do bazy (dump / SQLi / audit)
- edytor tekstu

### Kroki:
1. Sprawdź zawartość kolumny `password`.
2. Jeśli zawartość wygląda jak `admin123` – hasła są w plaintext.

➡️ Luka wysokiego ryzyka – brak hashowania haseł.

---

## 🧪 Test 4: Szyfrowanie lokalne (klient) – inspekcja kodu JS

### Narzędzia:
- DevTools / lokalne pliki JS
- obsługa CryptoJS / WebCrypto

### Kroki:
1. Sprawdź, czy klucz szyfrujący nie jest zakodowany w JS:
```js
const key = "1234567890abcdef"; // 🔥 krytyczny błąd
```
2. Sprawdź, czy IV jest stały:
```js
const iv = "0000000000000000"; // 🔥
```

➡️ Brak losowości w kryptografii = podatność na ataki deszyfrujące.

---

## 🛠️ Testy automatyczne

### Narzędzia:
- [TestSSL.sh](https://testssl.sh/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)
- [TruffleHog](https://github.com/trufflesecurity/trufflehog)
- [Gitleaks](https://github.com/gitleaks/gitleaks)

**Przykład:**
```bash
./testssl.sh https://example.com
```

➡️ Wykrycie niebezpiecznych protokołów (np. TLS 1.0) lub słabych algorytmów.

---

## 🧠 Wskazówki

- Weryfikuj, czy hasła są haszowane silnym algorytmem (BCrypt, Argon2).
- Sprawdzaj długość kluczy szyfrowania – minimum 128 bitów (symetryczne), 2048 bitów (RSA).
- Upewnij się, że komunikacja odbywa się tylko przez HTTPS z ważnym certyfikatem.

---

W kolejnym kroku przeanalizujemy konfigurację aplikacji i serwera (3.2.3).
