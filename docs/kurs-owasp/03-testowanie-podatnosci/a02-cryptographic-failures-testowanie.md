---
id: "a02-cryptographic-failures-opis"
title: "🔐 3.2.1 – Cryptographic Failures: Opis podatności i jej wpływ"
sidebar_position: 1
---

## 🧩 Czym są Cryptographic Failures?

**Cryptographic Failures** to klasa podatności wynikających z nieprawidłowego stosowania mechanizmów kryptograficznych – zarówno w kontekście szyfrowania danych, jak i ich ochrony przed nieautoryzowanym dostępem, modyfikacją lub ujawnieniem.

---

## 📉 Przykłady nieprawidłowości

- Przechowywanie haseł w formie czystego tekstu.
- Brak szyfrowania danych wrażliwych (np. numerów kart kredytowych).
- Użycie przestarzałych lub podatnych algorytmów (np. MD5, SHA1).
- Brak weryfikacji certyfikatów TLS/SSL (np. akceptacja self-signed cert bez ostrzeżenia).
- Nieprawidłowa implementacja kryptografii symetrycznej lub asymetrycznej.
- Brak rotacji kluczy kryptograficznych.

---

## 💥 Potencjalne skutki

- Utrata poufności danych (np. kradzież danych osobowych).
- Ataki typu **credential stuffing** (gdy hasła są przechowywane jawnie).
- Podszywanie się pod serwer (brak walidacji certyfikatu).
- Możliwość deszyfrowania przechwyconego ruchu (np. TLS downgrade).

---

## 🧪 Praktyczne przypadki użycia

### 1. Przechowywanie haseł w plaintext

**Błąd:**
```sql
INSERT INTO users (username, password) VALUES ('admin', 'admin123');
```

**Skutek:**  
Każdy, kto uzyska dostęp do bazy danych, widzi hasła użytkowników.

**Poprawne podejście (Node.js + bcrypt):**
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('admin123', 12);
```

---

### 2. JWT z algorytmem `none`

**Błąd:**
Token JWT bez podpisu (`alg: none`) akceptowany przez backend.

```json
{
  "alg": "none",
  "typ": "JWT"
}
```

**Skutek:**  
Możliwość utworzenia własnego tokena z dowolną rolą, np. `admin`.

**Poprawne podejście:**
Wymuszaj silne algorytmy (`HS256`, `RS256`) i weryfikuj podpis tokena.

---

### 3. Brak HTTPS – dane logowania w sieci

**Błąd:**
Aplikacja mobilna lub API przesyła login/hasło przez `http://`.

**Skutek:**  
Podsłuch przez MITM (np. na publicznym Wi-Fi).

**Poprawne podejście:**
Wymuszaj `HTTPS` i stosuj HSTS.

---

### 4. Szyfrowanie lokalne bez salt/IV

**Błąd:**
```python
cipher = AES.new(key, AES.MODE_CBC)
ct = cipher.encrypt(data)
```

**Skutek:**  
Szyfrowanie deterministyczne – dwa takie same ciągi zaszyfrowane identycznie.

**Poprawne podejście:**
Używaj losowego IV i saltingu:
```python
iv = get_random_bytes(16)
cipher = AES.new(key, AES.MODE_CBC, iv=iv)
```

---

## 📦 Przykładowe podatności CVE

- [CVE-2020-0601 (CurveBall)](https://nvd.nist.gov/vuln/detail/CVE-2020-0601) – Błąd w obsłudze certyfikatów EC przez Windows.
- [CVE-2021-3449](https://nvd.nist.gov/vuln/detail/CVE-2021-3449) – DoS w OpenSSL.
- [CVE-2022-0778](https://nvd.nist.gov/vuln/detail/CVE-2022-0778) – Infinite loop przy analizie certyfikatu w OpenSSL.

---

## 🧠 Podsumowanie

Podatności kryptograficzne rzadko wynikają z błędów w samych algorytmach – częściej są efektem ich **niewłaściwego użycia lub konfiguracji**. Nawet silny algorytm może być bezużyteczny, jeśli zastosowany bez odpowiednich praktyk bezpieczeństwa.

---

W kolejnym kroku przejdziemy do testowania tych podatności w praktyce (3.2.2).
