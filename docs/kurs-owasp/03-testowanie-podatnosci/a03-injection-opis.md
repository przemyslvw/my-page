---
id: "a03-injection-opis"
title: "💉 3.3.1 – Opis podatności i jej wpływ"
sidebar_position: 11
---

## 💉 Czym jest Injection?

**Injection** to grupa podatności, w której dane wejściowe kontrolowane przez użytkownika są nieprawidłowo interpretowane jako kod lub polecenie przez backend aplikacji. Najczęściej spotykane typy to:

- SQL Injection
- Command Injection
- LDAP Injection
- NoSQL Injection
- XML/XXE Injection
- HTML/JS Injection (XSS – omawiane osobno)

---

## 💥 Przykłady skutków ataku Injection

| Typ ataku        | Możliwe skutki                                      |
|------------------|------------------------------------------------------|
| SQL Injection    | Odczyt danych z bazy, obejście logowania, modyfikacja lub usunięcie danych |
| Command Injection| Wykonanie poleceń systemowych (np. `rm -rf /`)       |
| NoSQL Injection  | Uzyskanie nieautoryzowanego dostępu do dokumentów MongoDB |
| LDAP Injection   | Ominięcie uwierzytelniania w katalogu LDAP           |
| XXE Injection    | Odczyt plików z serwera, SSRF, DoS przez XML parser  |

---

## 🧪 Typowe źródła podatności

- Dynamiczne konstruowanie zapytań bez sanitizacji danych.
- Wstrzykiwanie danych wejściowych bez użycia parametrów (`prepared statements`).
- Nieprawidłowe użycie eval(), exec() lub shell_exec().
- Brak ograniczeń na dane wejściowe (np. w formularzach, API, URL).

---

## 🧱 Przykład – SQL Injection (klasyczny)

```sql
SELECT * FROM users WHERE username = 'admin' AND password = 'admin123';
```

Po wstrzyknięciu:

```sql
' OR '1'='1
```

Query staje się:

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '';
```

➡️ Skutek: logowanie bez znajomości hasła.

---

## 📉 Wpływ na bezpieczeństwo

Injection znajduje się w OWASP Top 10 od początku jego istnienia – ze względu na **prostotę wykonania i krytyczne skutki**.

- Może prowadzić do całkowitego przejęcia systemu.
- Może skutkować trwałą utratą danych.
- Jest często możliwy bez uwierzytelnienia (np. w publicznych formularzach).

---

## 🧠 Podsumowanie

Injection to krytyczna podatność, której można łatwo uniknąć przy użyciu:
- przygotowanych zapytań (prepared statements),
- odpowiednich bibliotek do walidacji danych,
- ograniczania dostępnych funkcji backendu (sandboxing),
- mechanizmów WAF.

W następnym kroku: **3.3.2 – Metody testowania podatności Injection**.
