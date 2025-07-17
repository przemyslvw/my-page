---
id: "a07-authentication-failures-narzedzia"
title: "🛠️ 3.7.4 – Narzędzia do testowania"
sidebar_position: 34
---

## 🛠️ Narzędzia do testowania: Identification and Authentication Failures

Lista darmowych i komercyjnych narzędzi pomocnych przy testowaniu podatności związanych z uwierzytelnianiem.

---

### 🔹 Burp Suite (Community / Pro)

- Moduł Intruder – testy brute-force.
- Rozszerzenia: JWT Editor, AuthMatrix, SSO testing toolkit.
- Analiza przepływu sesji, cookies, redirectów.

🔗 https://portswigger.net/burp

---

### 🔹 OWASP ZAP

- Skryptowanie testów logowania.
- Skaner pasywny sesji, cookies, ciasteczek.
- Fuzzing endpointów logowania i resetu hasła.

🔗 https://www.zaproxy.org/

---

### 🔹 Hydra / Medusa / Ncrack

- Testy brute-force na loginach (HTTP, FTP, SSH, RDP).
- Skuteczny do sprawdzania rate-limit i mechanizmów blokady.

```bash
hydra -L users.txt -P passwords.txt mysite.com http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"
```

---

### 🔹 JWT.io & jwt-tool

- Analiza tokenów JWT (payload, signature).
- Testy: brak podpisu, alg=none, manipulacje `sub`, `exp`.

🔗 https://jwt.io  
🔗 https://github.com/ticarpi/jwt_tool

---

### 🔹 testssl.sh

- Test konfiguracji TLS/SSL i nagłówków bezpieczeństwa.
- Weryfikacja flag: `HttpOnly`, `Secure`, `SameSite`.

🔗 https://testssl.sh/

---

### 🔹 ADFS/OAuth Testing Tools

- Testy SSO, federacji i tokenów ID/Access.
- `oathtool`, `authentik`, `SAML Raider` (dla Burp).

---

## ✅ Wskazówki

- Skryptuj ataki brute-force i analizuj odpowiedzi (HTTP kody, redirecty).
- Sprawdzaj różnice między komunikatami o błędzie.
- Weryfikuj timeouty sesji i poprawność MFA/2FA.

---

W kolejnym kroku: **3.7.5 – Praktyczne ćwiczenie: Testowanie i mitigacja**
