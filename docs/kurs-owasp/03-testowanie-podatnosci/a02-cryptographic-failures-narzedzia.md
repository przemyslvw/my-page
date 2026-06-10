---
id: "a02-cryptographic-failures-narzedzia"
title: "🧰 3.2.4 – Narzędzia do testowania: Cryptographic Failures"
sidebar_position: 9
---

##  Cel sekcji

Poznać narzędzia (płatne i bezpłatne), które umożliwiają wykrywanie błędów związanych z **Cryptographic Failures** – w konfiguracji serwera, API, aplikacji frontendowej i backendowej.

---

## 🧰 Bezpłatne narzędzia

### 🔎 1. [TestSSL.sh](https://github.com/drwetter/testssl.sh)

- Audyt protokołów TLS, certyfikatów i cipherów.
- Sprawdza HSTS, Perfect Forward Secrecy, TLS downgrade.

```bash
./testssl.sh https://example.com
```

---

###  2. [SSL Labs Server Test](https://www.ssllabs.com/ssltest/)

- Analiza HTTPS, certyfikatów i bezpieczeństwa TLS.
- Wystawia ocenę A+...F.
- Wykrywa znane błędy i podatne cipher suites.

---

### 🔑 3. [TruffleHog](https://github.com/trufflesecurity/trufflehog)

- Wyszukiwanie sekretów (kluczy API, tokenów, haseł) w kodzie źródłowym i repozytoriach Git.

```bash
trufflehog github --repo=https://github.com/example/repo.git
```

---

###  4. [Gitleaks](https://github.com/gitleaks/gitleaks)

- Lekkie narzędzie do skanowania repozytoriów pod kątem ujawnionych sekretów.

---

###  5. [jwt.io](https://jwt.io)

- Narzędzie online do dekodowania i weryfikacji tokenów JWT.
- Pomocne w analizie algorytmu i podpisu JWT.

---

###  6. `openssl`

- Analiza połączeń TLS/SSL i certyfikatów:

```bash
openssl s_client -connect example.com:443
```

---

## 💼 Płatne narzędzia

###  1. Burp Suite Professional

- Moduły do testowania JWT, ciasteczek, HTTPS.
- Wtyczki typu **JWT Editor**, **Autorize**, **CryptoTester**.
- Może wspierać testy bezpieczeństwa TLS, fuzzowanie certyfikatów, analiza błędów podpisów.

---

###  2. Qualys SSL Labs API (Enterprise)

- Automatyzacja testów TLS/SSL dla wielu domen.
- Integracja z pipeline CI/CD.

---

###  3. Detectify / Intruder.io

- Testy TLS, JWT, headerów bezpieczeństwa.
- Sprawdzenie implementacji CSP, HSTS, certyfikatów, ciasteczek `Secure`/`HttpOnly`.

---

##  Wskazówki

- Łącz testy automatyczne (CI/CD) z analizą manualną.
- Testuj zarówno **serwer**, **frontend** (JS/tokeny), jak i **API backendowe**.
- Regularnie skanuj repozytoria pod kątem **ujawnionych sekretów**.

---

W kolejnym kroku przeprowadzimy praktyczne ćwiczenie (3.2.5).
