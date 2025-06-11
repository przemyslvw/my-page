---
id: "a03-injection-cwiczenie"
title: "🧪 3.3.5 – Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 15
---

## 🎯 Cel ćwiczenia

Nauczyć się identyfikować, wykorzystywać i łagodzić podatności **Injection**, w szczególności **SQL Injection** i **Command Injection**, w realistycznym środowisku.

---

## 🧪 Scenariusz testowy 1: SQL Injection (klasyczny)

**Aplikacja:** Formularz logowania lub wyszukiwania w aplikacji webowej (np. DVWA, Juice Shop, testowa aplikacja ASP.NET/PHP)

### Krok 1: Prześlij klasyczne payloady w polu loginu lub parametrze URL:

```
admin' --
' OR '1'='1
1' OR 1=1 --
```

➡️ Jeśli widzisz dane innych użytkowników lub możesz się zalogować bez hasła – luka potwierdzona.

---

### Krok 2: Potwierdzenie podatności

Użyj `sqlmap`:

```bash
sqlmap -u "http://localhost/app.php?id=1" --dbs
```

✅ sqlmap wykaże listę dostępnych baz danych.

---

### Mitigacja

- Stosuj **parametryzowane zapytania** (np. `@param`, `$1`).
- Unikaj łączenia danych wejściowych z SQL w `+` lub `concat`.

---

## 🧪 Scenariusz testowy 2: Command Injection

**Aplikacja:** Formularz pingowania IP w panelu admina

### Krok 1: Wprowadź wartość:

```
127.0.0.1; whoami
```

lub

```
127.0.0.1 && id
```

➡️ Jeśli wynik polecenia pojawi się w odpowiedzi – luka potwierdzona.

---

### Mitigacja

- Nigdy nie wykonuj komend systemowych na podstawie danych użytkownika.
- Stosuj whitelisty dopuszczalnych wartości.
- Używaj bezpiecznych wrapperów (np. `ProcessBuilder`, `execFile` zamiast `exec`).

---

## 🛠️ Zadanie: testuj formularz z back-endem C#

### Krok 1: Spróbuj wywołać:

```
' OR 1=1 --
```

w polu loginu lub zapytaniu GET.

### Krok 2: Przejrzyj backend aplikacji

Znajdź zapytania SQL konstruowane jako:

```csharp
"SELECT * FROM Users WHERE Username = '" + username + "'"
```

➡️ Zamień na:

```csharp
new SqlCommand("SELECT * FROM Users WHERE Username = @username", connection)
```

---

## 📋 Zadania do wykonania

- [ ] Zidentyfikuj co najmniej jedną lukę Injection (SQLi lub Command).
- [ ] Udokumentuj testy i payloady.
- [ ] Przedstaw rekomendację mitigacji.
- [ ] Uwzględnij testy w raporcie końcowym.

---


## 🧠 Dodatkowe scenariusze

### 1. 🧬 NoSQL Injection (MongoDB)

**Aplikacja:** REST API z MongoDB

**Payloady:**

```json
{ "username": { "$ne": null }, "password": { "$ne": null } }
```

lub (w URL):

```
username[$ne]=1&password[$ne]=1
```

➡️ Jeśli logowanie się powiedzie bez poprawnych danych, aplikacja jest podatna.

**Mitigacja:** Waliduj schemat JSON, używaj ORMy (np. Mongoose z włączoną walidacją).

---

### 2. 🧾 LDAP Injection

**Payload:**

```
*)(uid=*))(|(uid=*
```

**Scenariusz:** Jeśli użytkownik może zalogować się przy użyciu takiego loginu, aplikacja może być podatna.

**Mitigacja:** Używaj `DirectorySearcher.Filter` z escapingiem znaków specjalnych. W .NET:

```csharp
string safeFilter = $"(uid={EscapeLdap(userInput)})";
```

---

### 3. 🧪 eval() / exec() w backendzie Node.js lub Python

#### Node.js

```javascript
eval(userInput); // ❌ RCE
```

**Mitigacja:** Nigdy nie używaj `eval()` do przetwarzania danych użytkownika. Stosuj `JSON.parse` tylko po uprzedniej walidacji.

#### Python

```python
exec(user_input)  # ❌ podatne
```

**Mitigacja:** Stosuj `literal_eval` z `ast`, waliduj wszystkie dane wejściowe.

---

### 4. 💻 .NET – dynamiczna kompilacja i wykonywanie kodu

**Przykład zagrożenia:**

```csharp
var result = CSharpScript.EvaluateAsync(userInput).Result;
```

➡️ Umożliwia uruchomienie dowolnego kodu C# przez użytkownika – krytyczna luka.

**Mitigacja:**

- Nigdy nie wykonuj kodu z danych użytkownika.
- Jeśli musisz – używaj sandboxów, np. z `ScriptOptions` i whitelistą `references`.

---

W kolejnym rozdziale: **3.4 – Insecure Design**
