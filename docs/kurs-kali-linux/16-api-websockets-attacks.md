---
id: "api-websockets-attacks"
title: "🌐 Ataki na API i WebSockets"
sidebar_position: 16
---

# 🌐 Ataki na API i WebSockets

API i WebSockets są powszechnie stosowane w nowoczesnych aplikacjach webowych. Ich podatności mogą prowadzić do wycieku danych, eskalacji uprawnień i przejęcia sesji użytkowników.

---

## 🔎 Testowanie API REST i GraphQL
API REST i GraphQL często posiadają błędy związane z uwierzytelnianiem, autoryzacją oraz niewłaściwą walidacją danych wejściowych.

### **1️⃣ Wykrywanie API w aplikacji**
1. Sprawdzenie dokumentacji API (np. `swagger.json` lub `graphql/schema`):
```bash
curl -s https://example.com/swagger.json
curl -s https://example.com/graphql/schema
```
2. Analiza ruchu HTTP w **Burp Suite** lub **mitmproxy**.

---

### **2️⃣ Ataki na API REST**

#### **2.1 IDOR w API**
Niektóre API pozwalają na dostęp do zasobów innych użytkowników poprzez manipulację parametrami:
```http
GET /api/user/123/profile
```
Jeśli zmiana `123` na `124` zwraca dane innego użytkownika, API jest podatne na IDOR.

#### **2.2 Brak ograniczeń w żądaniach (Rate Limiting Bypass)**
Niektóre API nie ograniczają liczby żądań, co umożliwia ataki brute-force.
```bash
hydra -L users.txt -P passwords.txt https://example.com/api/login -t 10
```
Rozwiązanie: **Ograniczenie liczby prób logowania i użycie CAPTCHA.**

#### **2.3 Ataki na nagłówki API (JWT Manipulation)**
Tokeny JWT mogą być zmanipulowane, jeśli używają słabego klucza.
```bash
jwt_tool mytoken.jwt -d
```
Atakujący może podmienić nagłówek JWT:
```json
{
  "alg": "none",
  "typ": "JWT"
}
```
Jeśli serwer akceptuje niepodpisane tokeny, można przejąć konto użytkownika.

---

### **3️⃣ Ataki na GraphQL**
GraphQL pozwala na dynamiczne zapytania, co może prowadzić do nieautoryzowanego dostępu do danych.

#### **3.1 Wykrywanie GraphQL**
Sprawdzenie endpointu:
```bash
curl -X POST https://example.com/graphql -d '{"query":"{__schema{types{name}}}"}'
```
Jeśli zwróci schemat API, aplikacja jest podatna na nadmierne ujawnianie danych.

#### **3.2 Atak DoS na GraphQL (Deep Query Attack)**
Zapytania mogą przeciążać serwer:
```graphql
query {
  user(id: "123") {
    friends {
      friends {
        friends {
          name
        }
      }
    }
  }
}
```
Rozwiązanie: **Ograniczenie głębokości zapytań i wprowadzenie limitów.**

#### **3.3 Brak kontroli uprawnień w GraphQL**
Jeśli GraphQL nie wymaga autoryzacji dla pewnych operacji:
```graphql
query { allUsers { id, email, password } }
```
To oznacza, że dowolny użytkownik może pobrać dane wszystkich kont.

---

## 🔥 Ataki na WebSockets
WebSockets umożliwiają dwukierunkową komunikację w czasie rzeczywistym, ale ich brak walidacji może prowadzić do ataków.

### **4️⃣ Przechwytywanie i manipulacja WebSockets**
Przechwycenie ruchu w Burp Suite:
1. Przejdź do zakładki `WebSockets history`.
2. Przechwyć i zmodyfikuj wiadomość WebSocket.
3. Wysłanie zmienionych danych może ujawnić podatność.

#### **4.1 IDOR w WebSockets**
Podobnie jak w API REST, jeśli WebSocket pozwala na zmianę ID użytkownika:
```json
{"action":"getUser","id":"123"}
```
Zmiana `123` na `124` może ujawnić dane innego użytkownika.

#### **4.2 WebSocket Injection**
Niektóre aplikacje nie walidują poprawnie wejścia:
```json
{"action":"sendMessage","message":"<script>alert('XSS')</script>"}
```
Jeśli wiadomość jest wyświetlana bez sanitacji, możliwy jest atak XSS.

#### **4.3 Brak kontroli autoryzacji w WebSockets**
Jeśli WebSocket nie sprawdza autoryzacji użytkownika, można wykonywać operacje jako inny użytkownik:
```json
{"action":"transferFunds","amount":10000,"to":"hacker"}
```
Rozwiązanie: **Każda wiadomość WebSocket powinna być podpisana tokenem JWT.**

---

## 🔐 Jak zabezpieczyć API i WebSockets?
✅ **Ogranicz uprawnienia użytkowników i stosuj weryfikację ID w API.**
✅ **Waliduj dane wejściowe i nie dopuszczaj do manipulacji tokenami JWT.**
✅ **Monitoruj ruch API pod kątem nietypowych żądań i prób brute-force.**
✅ **Stosuj uwierzytelnianie dla WebSockets i sprawdzaj sesję użytkownika.**
✅ **Wprowadź limity zapytań dla GraphQL i WebSockets.**

---

API i WebSockets są kluczowymi elementami aplikacji webowych, ale ich podatności mogą prowadzić do poważnych ataków. Kolejnym krokiem będzie **Testowanie aplikacji w chmurze (AWS, Azure, GCP)**! 🚀
