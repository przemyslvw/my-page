---
id: "a02-cryptographic-failures-konfiguracja"
title: " 3.2.3 – Weryfikacja konfiguracji aplikacji i serwera: Cryptographic Failures"
sidebar_position: 8
---

##  Cel sekcji

Zidentyfikować błędy konfiguracyjne w aplikacji i na serwerze, które mogą prowadzić do **Cryptographic Failures**.

---

##  Co weryfikować?

### 1. HTTPS / TLS

✅ Czy aplikacja działa wyłącznie przez HTTPS?  
✅ Czy wymuszony jest **HSTS**?  
✅ Czy wyłączone są przestarzałe protokoły (TLS 1.0/1.1)?  
✅ Czy certyfikat jest ważny i wystawiony przez zaufany CA?

### 2. Algorytmy i klucze

✅ Czy używane są silne algorytmy (`AES-256`, `RSA-2048+`, `SHA-256+`)?  
✅ Czy tokeny JWT mają odpowiedni `alg` (`HS256`, `RS256`) i są podpisywane?  
✅ Czy istnieje rotacja kluczy szyfrowania?

### 3. Hasła użytkowników

✅ Czy hasła są haszowane przy użyciu `BCrypt`, `Argon2`?  
✅ Czy stosowany jest `salt` i odpowiedni koszt (`work factor`)?  
✅ Czy nie przechowuje się haseł w plaintext?

### 4. Certyfikaty i komunikacja z API

✅ Czy aplikacja weryfikuje certyfikaty SSL API zewnętrznych?  
✅ Czy nie akceptuje połączeń z self-signed cert bez walidacji?  
✅ Czy serwer odrzuca słabe cyphery (sprawdzić `ssl_ciphers` w Nginx/Apache)?

---

##  Przykład sprawdzenia TLS na serwerze (z linii poleceń)

```bash
openssl s_client -connect example.com:443
```

Zwróć uwagę na:
- wersję TLS,
- certyfikat (issuer, ważność),
- cipher suite (`Cipher`).

---

##  Przykład z nginx.conf

```nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers 'HIGH:!aNULL:!MD5';
add_header Strict-Transport-Security "max-age=31536000" always;
```

---

##  Zła konfiguracja = podatność

Jeśli aplikacja:

❌ działa przez HTTP,  
❌ akceptuje JWT bez podpisu,  
❌ nie waliduje certyfikatów API,  
❌ trzyma hasła w plaintext,

to jesteśmy narażeni na **ujawnienie danych wrażliwych**, **podszywanie się pod użytkowników**, a nawet **masowe przejęcie kont**.

---

W kolejnym kroku przejdziemy do narzędzi do testowania tych podatności (3.2.4).
