---
id: "a02-cryptographic-failures-cwiczenie"
title: "Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 10
---

##  Cel ćwiczenia

Przetestować aplikację pod kątem błędów kryptograficznych:
- przechowywania haseł w plaintext,
- akceptacji JWT bez podpisu,
- braku HTTPS,
- twardo zakodowanych kluczy szyfrujących.

---

##  Scenariusz testowy 1: JWT bez podpisu (`alg: none`)

**Aplikacja:** REST API z JWT (symulowane lub Juice Shop + Burp Suite)

### Krok 1: Przechwyć token JWT
Zaloguj się jako zwykły użytkownik i zapisz token z nagłówka `Authorization`.

### Krok 2: Zmień algorytm
Za pomocą jwt.io lub Burp Suite Decoder zmodyfikuj nagłówek JWT:

```json
{
  "alg": "none",
  "typ": "JWT"
}
```

Dodaj dowolny payload, np.:

```json
{
  "username": "admin",
  "role": "admin"
}
```

Usuń podpis i wyślij żądanie z takim tokenem.

➡️ Jeśli serwer go akceptuje: **krytyczna luka**.

---

## 🛠️ Mitigacja (Node.js example)

```javascript
jwt.verify(token, secret, { algorithms: ['HS256'] });
```

---

##  Scenariusz testowy 2: Hasła w plaintext

**Aplikacja:** Dump bazy danych z tabelą `users`

### Krok 1: Zbadaj kolumnę `password`

Jeśli zawartość to np. `admin123`, a nie hash (np. `$2b$12$...`) – hasła są przechowywane w formie jawnej.

---

## 🛠️ Mitigacja – Hashowanie haseł

```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('admin123', 12);
```

---

##  Scenariusz testowy 3: Brak HTTPS

### Krok 1: Otwórz aplikację bez HTTPS

Użyj `curl`:

```bash
curl -v http://example.com/login
```

Jeśli przesyłane są dane logowania – aplikacja narażona na MITM.

---

## 🛠️ Mitigacja

- Wymusić HTTPS w aplikacji i serwerze.
- Dodać `HSTS` w nagłówkach:
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

##  Scenariusz testowy 4: Twardo zakodowany klucz szyfrujący

**Aplikacja:** JavaScript w frontendzie

### Krok 1: Znajdź hardcoded klucz

```js
const key = "my-secret-key"; // ❌ zły przykład
```

➡️ Atakujący może go użyć do deszyfrowania danych użytkownika.

---

## ✅ Zadania do wykonania

- [ ] Zidentyfikuj i wykorzystaj co najmniej jedną lukę kryptograficzną.
- [ ] Udokumentuj dowody (screeny, żądania/odpowiedzi).
- [ ] Zaproponuj poprawkę (mitigacja).
- [ ] Uwzględnij wynik w raporcie końcowym.

---

##  Dodatkowe ćwiczenia

###  1. Przeanalizuj JWT z aplikacji mobilnej

1. Zainstaluj emulator (np. Android Studio / Genymotion).
2. Uruchom aplikację mobilną i przechwyć ruch sieciowy za pomocą Burp Suite lub mitmproxy.
3. Znajdź token JWT przesyłany przez aplikację.
4. Skopiuj token i przeanalizuj go na stronie [jwt.io](https://jwt.io).
5. Sprawdź:
   - Czy JWT ma `alg: none`?
   - Czy payload zawiera informacje użytkownika?
   - Czy można go zmodyfikować bez błędu po stronie serwera?

---

###  2. Sprawdź konfigurację TLS/SSL aplikacji

1. Zainstaluj [testssl.sh](https://github.com/drwetter/testssl.sh).
2. Uruchom test dla aplikacji:

```bash
./testssl.sh https://twoja-aplikacja.pl
```

3. Przeanalizuj:
   - Dostępne wersje protokołów TLS.
   - Cipher Suites.
   - Certyfikat i jego ważność.
   - Obecność HSTS.

4. Alternatywnie, użyj [SSL Labs](https://www.ssllabs.com/ssltest/).

---

### 🧬 3. Zidentyfikuj sekrety w repozytorium kodu

#### Opcja A: TruffleHog

```bash
trufflehog github --repo=https://github.com/twoj-org/twoj-repo
```

- Szuka zakodowanych kluczy API, tokenów, haseł.

#### Opcja B: Gitleaks

```bash
gitleaks detect --source=.
```

- Lekka alternatywa, możliwa do integracji z CI/CD.

📌 Sprawdź, czy repozytorium nie zawiera:
- `AWS_SECRET_KEY`
- `JWT_SECRET`
- Twardo zakodowanych haseł lub kluczy prywatnych

---

W następnym rozdziale: **3.3 – Injection**
