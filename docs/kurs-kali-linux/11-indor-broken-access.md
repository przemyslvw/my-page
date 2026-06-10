---
id: "idor-broken-access"
title: "🔐 Insecure Direct Object References (IDOR) & Broken Access Control"
sidebar_position: 11
---

# 🔐 Insecure Direct Object References (IDOR) & Broken Access Control

IDOR (Insecure Direct Object References) i Broken Access Control to jedne z najpoważniejszych podatności w aplikacjach webowych, umożliwiające nieautoryzowany dostęp do danych innych użytkowników poprzez manipulację parametrami.

---

## 🎯 Ataki na IDOR i manipulacja parametrami

### **1️⃣ Na czym polega IDOR?**
IDOR występuje, gdy aplikacja udostępnia zasoby na podstawie identyfikatora (np. `user_id`), ale nie sprawdza, czy użytkownik ma do nich uprawnienia.

#### **Przykładowy podatny endpoint**
```http
GET /api/user/profile?user_id=123
```
Atakujący zmienia wartość `user_id` na inną:
```http
GET /api/user/profile?user_id=456
```
Jeśli serwer zwraca profil innego użytkownika, to aplikacja jest podatna na IDOR.

### **2️⃣ Manipulacja parametrami ID w Burp Suite**
1. Przechwyć żądanie w Burp Suite.
2. Zmień wartość `user_id` na inną.
3. Sprawdź, czy aplikacja zwraca dane innego użytkownika.

### **3️⃣ IDOR w operacjach zapisu**
Niektóre aplikacje pozwalają na edycję lub usuwanie cudzych danych:
```http
POST /api/user/update?user_id=123&email=hacker@example.com
```
Jeśli można zmienić dane innego użytkownika, aplikacja jest podatna.

---

## 🛠️ Narzędzia do wykrywania IDOR (Burp Suite, Autorize)

### **1️⃣ Burp Suite – manualne testowanie IDOR**
Burp Suite umożliwia przechwytywanie i edytowanie żądań HTTP.

#### **Kroki testowania:**
1. Otwórz **Burp Suite** i przejdź do **Proxy > Intercept**.
2. Przechwyć żądanie do API z identyfikatorem użytkownika.
3. Zmień ID na inny i ponów żądanie.
4. Sprawdź, czy aplikacja zwraca dane innego użytkownika.

### **2️⃣ Autorize – automatyczne wykrywanie IDOR**
Autorize to rozszerzenie do Burp Suite, które automatycznie testuje, czy użytkownik ma dostęp do nieautoryzowanych zasobów.

#### **Jak używać Autorize?**
1. Zainstaluj **Autorize** w **Burp Suite**.
2. Przechwyć żądania autoryzowanego użytkownika.
3. Uruchom testowanie z uprawnieniami gościa.
4. Sprawdź, czy aplikacja nie zwraca wrażliwych danych.

### **3️⃣ Ffuf – automatyczne fuzzowanie IDOR**
Jeśli aplikacja używa sekwencyjnych ID:
```bash
ffuf -u "http://example.com/api/user/profile?user_id=FUZZ" -w id_list.txt
```
Sprawdza, które ID zwracają odpowiedzi.

---

## 🔐 Jak zabezpieczyć aplikację przed IDOR?
✅ **Weryfikacja uprawnień użytkownika na serwerze** – nigdy nie ufaj parametrom z żądania.
✅ **Używanie UUID zamiast sekwencyjnych ID** – trudniejsze do odgadnięcia.
✅ **Ograniczenie dostępu do API na poziomie backendu** – kontrola autoryzacji.
✅ **Logowanie i monitorowanie podejrzanych zmian w parametrach** – wykrywanie manipulacji.

---

Ataki IDOR mogą prowadzić do wycieku wrażliwych danych i przejęcia kont użytkowników. Kolejnym krokiem będzie analiza podatności **Security Misconfigurations i ataki na pliki**! 🚀
