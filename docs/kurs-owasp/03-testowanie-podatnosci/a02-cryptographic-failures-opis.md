---
id: "a02-cryptographic-failures-opis"
title: "🔐 3.2.1 – Cryptographic Failures: Opis podatności i jej wpływ"
sidebar_position: 6
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

## 📦 Przykładowe podatności CVE

- [CVE-2020-0601 (CurveBall)](https://nvd.nist.gov/vuln/detail/CVE-2020-0601) – Błąd w obsłudze certyfikatów EC przez Windows.
- [CVE-2021-3449](https://nvd.nist.gov/vuln/detail/CVE-2021-3449) – DoS w OpenSSL.
- [CVE-2022-0778](https://nvd.nist.gov/vuln/detail/CVE-2022-0778) – Infinite loop przy analizie certyfikatu w OpenSSL.

---

## 📘 Przypadki użycia

| Scenariusz | Opis | Poziom ryzyka |
|------------|------|----------------|
| Przechowywanie haseł w `plaintext` | Atakujący uzyskuje pełny dostęp do kont | 🔥 Wysokie |
| Brak HTTPS | Możliwość MITM i kradzieży danych | 🔥 Wysokie |
| Użycie SHA1 do podpisu JWT | Możliwość sfałszowania tokenu | ⚠️ Średnie |
| Brak saltingu przy haszowaniu | Zwiększona podatność na rainbow tables | ⚠️ Średnie |

---

## 🧠 Podsumowanie

Podatności kryptograficzne rzadko wynikają z błędów w samych algorytmach – częściej są efektem ich **niewłaściwego użycia lub konfiguracji**. Nawet silny algorytm może być bezużyteczny, jeśli zastosowany bez odpowiednich praktyk bezpieczeństwa.

---

W kolejnym kroku przejdziemy do testowania tych podatności w praktyce (3.2.2)