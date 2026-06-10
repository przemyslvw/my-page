---
id: "csrf"
title: "Cross-Site Request Forgery (CSRF)"
sidebar_label: "🎣 Cross-Site Request Forgery (CSRF)"
sidebar_position: 14
---

# 🎣 Cross-Site Request Forgery (CSRF)

CSRF (Cross-Site Request Forgery) to atak, w którym napastnik zmusza zalogowanego użytkownika do wykonania niezamierzonej akcji w aplikacji, której ten użytkownik ufa. Aplikacja wykonuje żądanie, bo przeglądarka automatycznie dołącza ciasteczka sesyjne — nawet jeśli żądanie pochodzi z obcej domeny.

---

## 🧠 Jak działa CSRF?

Warunki konieczne, by atak był możliwy:

1. **Akcja warta przejęcia** – zmiana e-maila, hasła, transfer środków, zmiana uprawnień.
2. **Uwierzytelnianie oparte wyłącznie o ciasteczka** – sesja jest identyfikowana przez cookie dołączane automatycznie.
3. **Przewidywalne parametry żądania** – atakujący zna lub odgaduje strukturę żądania.
4. **Brak nieprzewidywalnego tokenu** – żądanie nie wymaga wartości, której atakujący nie może poznać (anty-CSRF token).

Przykładowe podatne żądanie zmiany e-maila:
```http
POST /account/email HTTP/1.1
Host: example.com
Cookie: session=eyJhbGc...
Content-Type: application/x-www-form-urlencoded

email=ofiara@example.com
```

Jeśli to wszystko, czego wymaga serwer — żądanie da się sfałszować z dowolnej strony.

---

## 💥 Eksploatacja CSRF

### **1️⃣ CSRF przez formularz HTML (POST)**
Atakujący umieszcza na swojej stronie ukryty formularz, który wysyła się automatycznie:
```html
<html>
  <body onload="document.forms[0].submit()">
    <form action="https://example.com/account/email" method="POST">
      <input type="hidden" name="email" value="atakujacy@evil.com">
    </form>
  </body>
</html>
```
Gdy zalogowana ofiara odwiedzi tę stronę, jej e-mail konta zostanie podmieniony.

### **2️⃣ CSRF przez żądanie GET**
Jeśli akcja zmieniająca stan jest dostępna przez GET (zły wzorzec) — wystarczy znacznik obrazka:
```html
<img src="https://example.com/account/delete?confirm=true">
```

### **3️⃣ Generowanie PoC w Burp Suite**
1. Przechwyć podatne żądanie w **Burp Proxy**.
2. Kliknij prawym → `Engagement tools` → `Generate CSRF PoC`.
3. Burp wygeneruje gotowy formularz HTML do testu.
4. Zapisz jako `.html` i otwórz w sesji zalogowanej ofiary.

---

## 🛡️ Obejście zabezpieczeń CSRF

### **1️⃣ Token przesyłany, ale nieweryfikowany**
Niektóre aplikacje generują token, ale go nie sprawdzają. Test: usuń parametr tokenu z żądania — jeśli akcja się powiedzie, ochrona jest pozorna.

### **2️⃣ Token weryfikowany tylko, gdy obecny**
Jeśli usunięcie całego parametru tokenu omija walidację (a tylko zła wartość ją uruchamia) — atak jest możliwy bez znajomości tokenu.

### **3️⃣ Token powiązany z pulą, nie z użytkownikiem**
Czasem token jest poprawny dla dowolnego konta. Atakujący pobiera własny token i wkleja go w żądaniu ofiary.

### **4️⃣ Token w ciasteczku zamiast w stanie serwera (Double-Submit bypass)**
Jeśli token jest porównywany między ciasteczkiem a parametrem, a atakujący potrafi ustawić ciasteczko (np. przez subdomenę lub podatność na cookie injection) — może dopasować obie wartości.

### **5️⃣ Obejście walidacji nagłówka Referer**
Gdy ochrona opiera się o `Referer`:
```html
<meta name="referrer" content="no-referrer">
```
Usunięcie nagłówka Referer może obejść walidację, jeśli serwer akceptuje żądania bez Referera.

---

## 🔗 CSRF a SameSite i CORS

- **SameSite=Lax** (domyślne w nowoczesnych przeglądarkach) blokuje wysyłanie ciasteczek przy cross-site POST, ale **nie** przy nawigacji GET top-level — dlatego akcje zmieniające stan przez GET nadal bywają podatne.
- **SameSite=None** (wymagane dla flow cross-site) przywraca pełną podatność, jeśli brak tokenu.
- CSRF na endpointach **JSON** bywa trudniejszy: `Content-Type: application/json` wymusza preflight CORS. Test: czy serwer akceptuje `text/plain` lub `application/x-www-form-urlencoded` z payloadem JSON-podobnym.

```html
<form action="https://example.com/api/transfer" method="POST" enctype="text/plain">
  <input name='{"amount":10000,"to":"evil","ignore":"' value='"}'>
</form>
```

---

## 🔐 Jak zabezpieczyć aplikację przed CSRF?
✅ **Stosuj anty-CSRF tokeny** (synchronizer token pattern) – unikalne per sesja/żądanie i weryfikowane po stronie serwera.
✅ **Ustaw `SameSite=Lax` lub `Strict`** dla ciasteczek sesyjnych.
✅ **Nie zmieniaj stanu przez żądania GET.**
✅ **Wymagaj ponownego uwierzytelnienia** dla operacji krytycznych (zmiana hasła, e-maila, płatności).
✅ **Weryfikuj nagłówki `Origin`/`Referer`** jako warstwę dodatkową, nie jedyną.

---

CSRF wykorzystuje zaufanie aplikacji do przeglądarki użytkownika. Kolejnym krokiem będzie analiza podatności **XML External Entity (XXE)**! 🚀
