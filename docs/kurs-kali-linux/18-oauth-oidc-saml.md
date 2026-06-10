---
id: "oauth-oidc-saml"
title: "Ataki na OAuth 2.0, OIDC i SAML"
sidebar_position: 18
---

# Ataki na OAuth 2.0, OIDC i SAML

Nowoczesne aplikacje rzadko zarządzają hasłami samodzielnie — delegują uwierzytelnianie do dostawców tożsamości przez **OAuth 2.0**, **OpenID Connect (OIDC)** i **SAML** (logowanie „Zaloguj się przez Google/Microsoft", SSO firmowe). Błędy w implementacji tych protokołów prowadzą do **przejęcia kont (Account Takeover)** bez znajomości hasła ofiary.

---

##  Szybkie wprowadzenie

- **OAuth 2.0** – protokół **autoryzacji** (delegowanie dostępu do zasobów). Nie jest protokołem logowania, choć bywa do tego nadużywany.
- **OIDC** – warstwa **uwierzytelniania** nad OAuth 2.0; dodaje `id_token` (JWT) z tożsamością użytkownika.
- **SAML** – starszy, oparty na XML standard SSO, popularny w środowiskach korporacyjnych.

Kluczowe pojęcia OAuth: `client_id`, `redirect_uri`, `state`, `scope`, `code`, `access_token`. Najczęstszy przepływ to **Authorization Code Flow**.

---

## 💥 Ataki na OAuth 2.0 / OIDC

### **1️⃣ Manipulacja `redirect_uri` (kradzież kodu/tokenu)**
Jeśli serwer autoryzacji nie waliduje ściśle `redirect_uri`, atakujący przekieruje kod autoryzacyjny na swój serwer:
```http
GET /authorize?client_id=app&response_type=code&redirect_uri=https://attacker.com/callback&state=xyz
```
Słabości do przetestowania:
- akceptacja dowolnej **subdomeny** lub **ścieżki** (`https://app.com.attacker.com`, `https://app.com/../callback`),
- dopasowanie po prefiksie zamiast pełnego URL,
- otwarte przekierowanie (open redirect) w obrębie zaufanej domeny, użyte jako odbicie kodu.

### **2️⃣ Brak/niepoprawna walidacja parametru `state` (CSRF na OAuth)**
`state` chroni przed CSRF w przepływie logowania. Jeśli aplikacja go nie weryfikuje, atakujący może **podpiąć swoje konto dostawcy do sesji ofiary** (account linking CSRF) lub zalogować ofiarę na konto atakującego.

### **3️⃣ Wyciek tokenu przez Referer**
Gdy kod/token trafia do URL (np. Implicit Flow z `access_token` we fragmencie), a strona ładuje zasoby zewnętrzne — token wycieka w nagłówku `Referer`.

### **4️⃣ Nadużycie Implicit Flow i podmiana tokenu**
Implicit Flow (`response_type=token`) jest uznany za przestarzały. Token w URL łatwo przechwycić; brak powiązania tokenu z klientem umożliwia **token injection** (wstrzyknięcie tokenu wydanego dla innej aplikacji).

### **5️⃣ Account Takeover przez niezweryfikowany e-mail**
Klasyczny błąd: aplikacja kojarzy konto OAuth z lokalnym **po adresie e-mail bez weryfikacji**. Jeśli dostawca pozwala ustawić dowolny, niezweryfikowany e-mail, atakujący loguje się jako ofiara.

### **6️⃣ Ataki na `id_token` (JWT)**
`id_token` to JWT — dotyczą go wszystkie ataki z modułu *Broken Authentication*:
- `alg: none`,
- słaby klucz HS256 (brute-force),
- pomylenie algorytmów (RS256→HS256 z kluczem publicznym jako sekretem),
- `kid` injection / podstawienie `jwks_uri` na kontrolowany przez atakującego.

---

## 🛠️ SSRF przez OpenID Connect

Niektóre serwery pobierają konfigurację dostawcy z `.well-known/openid-configuration` lub klucze z `jwks_uri`. Jeśli te adresy są kontrolowane przez wejście użytkownika (np. dynamiczny `issuer`), powstaje **SSRF** — powiązanie z modułem SSRF/RCE.

---

## 📄 Ataki na SAML

SAML opiera się na podpisanych asercjach XML — błędy w weryfikacji podpisu są krytyczne.

### **1️⃣ XML Signature Wrapping (XSW)**
Atakujący przemyca dodatkową, niepodpisaną asercję obok poprawnie podpisanej, licząc na to, że parser **weryfikuje jedną część, a przetwarza inną**. Pozwala podmienić tożsamość (`NameID`) na dowolnego użytkownika, np. `admin`.

### **2️⃣ Brak walidacji podpisu**
Test: usuń element `<ds:Signature>` z asercji. Jeśli logowanie nadal działa — Service Provider nie weryfikuje podpisu.

### **3️⃣ XXE w parserze SAML**
Asercja to XML — wstrzyknięcie encji zewnętrznej może dać file disclosure/SSRF (powiązanie z modułem XXE).

### **4️⃣ Narzędzia**
- **SAML Raider** (rozszerzenie Burp) – edycja asercji, automatyczne ataki XSW, podmiana podpisów.
- **Burp Suite** – dekodowanie Base64/inflate komunikatów SAML.

---

## 🔎 Metodyka testowania

1. **Zmapuj przepływ** – przechwyć cały handshake w Burp (`/authorize`, `/callback`, `/token`).
2. **Atakuj `redirect_uri`** – testuj subdomeny, ścieżki, open redirect.
3. **Sprawdź `state` i powiązanie z sesją.**
4. **Przeanalizuj tokeny** – zdekoduj JWT (jwt_tool), sprawdź algorytm i walidację.
5. **Dla SAML** – przechwyć asercję, testuj brak podpisu i XSW (SAML Raider).

---

##  Jak zabezpieczyć implementację?
✅ **Ścisła walidacja `redirect_uri`** – pełne, dokładne dopasowanie z allowlisty.
✅ **Wymuszaj i weryfikuj `state`** (oraz `nonce` w OIDC).
✅ **Używaj Authorization Code Flow z PKCE**; porzuć Implicit Flow.
✅ **Weryfikuj `id_token`** – algorytm, `iss`, `aud`, `exp`, sygnaturę względem zaufanego JWKS.
✅ **Nie kojarz kont po niezweryfikowanym e-mailu.**
✅ **W SAML** – waliduj podpis całej asercji, używaj odpornych na XSW bibliotek, wyłącz DTD/encje w parserze.

---

Błędy w OAuth/OIDC/SAML to jedna z najczęstszych dróg do Account Takeover w nowoczesnych aplikacjach. Kolejnym krokiem będzie analiza **Logiki biznesowej i Race Conditions**! 🚀
