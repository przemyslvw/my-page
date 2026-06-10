---
id: "a03-injection-konfiguracja"
title: " 3.3.3 – Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 13
---

##  Cel sekcji

Zidentyfikować słabe punkty w konfiguracji aplikacji i serwera, które umożliwiają lub zwiększają ryzyko wystąpienia podatności typu **Injection**.

---

##  Obszary do weryfikacji

### 🔸 1. Obsługa danych wejściowych

- Czy dane wejściowe są walidowane po stronie serwera?
- Czy stosowane są białe listy dozwolonych wartości?
- Czy aplikacja odrzuca nieoczekiwane znaki (`'`, `"`, `;`, `--`, `|`, `$`, `<`, `>` itd.)?

---

### 🔸 2. Sposób wykonywania zapytań

- Czy w backendzie stosowane są **prepared statements** (np. `?` lub named parameters)?
- Czy unika się składania zapytań SQL/LDAP/XML za pomocą `+`, `concat`, `eval`, `exec`, `system()`?

---

### 🔸 3. Uprawnienia bazy danych

- Czy aplikacja korzysta z konta DB z minimalnymi uprawnieniami (`SELECT` tylko jeśli nie ma potrzeby `INSERT`/`UPDATE`)?  
- Czy konto nie ma dostępu do poleceń `DROP`, `DELETE`, `ALTER`?

---

### 🔸 4. Logowanie i obsługa błędów

- Czy aplikacja NIE wyświetla błędów SQL/LDAP/command w odpowiedzi HTTP?  
- Czy błędy są logowane bez ujawniania stosu lub szczegółów użytkownikowi?

---

### 🔸 5. Middleware i serwer

Bezpieczna konfiguracja środowiska uruchomieniowego i middleware aplikacji .NET ma kluczowe znaczenie dla ochrony przed atakami typu injection.

---

#### ✅ Przykłady zabezpieczeń w ASP.NET Core (Kestrel / IIS)

```csharp
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.Limits.MaxRequestBodySize = 1048576; // 1 MB
    serverOptions.Limits.KeepAliveTimeout = TimeSpan.FromSeconds(10);
    serverOptions.Limits.RequestHeadersTimeout = TimeSpan.FromSeconds(10);
});
```

✅ Ograniczenie rozmiaru żądania i czasu na nagłówki chroni przed atakami typu **Slowloris** i próbą przesłania złośliwego payloadu o dużej objętości.

---

#### ✅ Ochrona przed Remote Code Execution (RCE)

Unikaj niekontrolowanego użycia:

```csharp
Process.Start(input); // ❌ podatne
```

Zamiast tego:

- Nigdy nie wykonuj komend bazujących na danych użytkownika.
- Weryfikuj dopuszczalne wartości (np. tylko `ping`, `nslookup` z whitelisty).
- Używaj `switch`/`enum` i tylko z góry określonych wartości.

---

#### ❌ Przykład niebezpieczny

```csharp
string cmd = Request.Query["cmd"];
Process.Start("cmd.exe", $"/C {cmd}");
```

➡️ `http://app.local/?cmd=del C:\Users` może skutkować RCE!

---

#### ✅ Przykład bezpieczny (whitelistowane komendy)

```csharp
var allowedCommands = new Dictionary<string, string>
{
    { "status", "systemctl status app" },
    { "uptime", "uptime" }
};

if (allowedCommands.ContainsKey(input))
{
    Process.Start("/bin/bash", $"-c "{allowedCommands[input]}"");
}
```

---

##  Dodatkowe środki bezpieczeństwa

- Używaj `UseAuthorization()` i `UseAuthentication()` we właściwej kolejności.
- Filtruj wejście nawet jeśli middleware uprzednio je przetworzył (defense in depth).
- Upewnij się, że `app.UseDeveloperExceptionPage()` NIE jest włączony w środowisku produkcyjnym.

---

##  Przykłady dla aplikacji .NET (C# / ASP.NET Core)

### ✅ Poprawne podejście: parametryzowane zapytania

```csharp
using (var command = new SqlCommand("SELECT * FROM Users WHERE Username = @username", connection))
{
    command.Parameters.AddWithValue("@username", username);
    var reader = command.ExecuteReader();
}
```

---

### ❌ Złe podejście: dynamiczne zapytania SQL

```csharp
var query = "SELECT * FROM Users WHERE Username = '" + username + "'";
```

➡️ Wstrzyknięcie `admin' --` pozwoli zalogować się bez hasła.

---

### ✅ Bezpieczne użycie Entity Framework (LINQ)

```csharp
var user = dbContext.Users.FirstOrDefault(u => u.Username == inputUsername);
```

✅ LINQ automatycznie chroni przed injection.

---

### ❌ Niebezpieczne użycie FromSqlRaw

```csharp
var sql = $"SELECT * FROM Users WHERE Username = '{inputUsername}'";
var users = dbContext.Users.FromSqlRaw(sql).ToList();
```

➡️ Zawsze używaj `FromSqlInterpolated`:

```csharp
var users = dbContext.Users
    .FromSqlInterpolated($"SELECT * FROM Users WHERE Username = {inputUsername}")
    .ToList();
```

---

##  Przykład konfiguracji ASP.NET Core

```csharp
app.UseExceptionHandler("/Error"); // Ukrywanie stack trace'ów
app.UseHsts(); // Wymuszanie HTTPS
services.AddControllersWithViews()
        .AddDataAnnotationsLocalization(); // Walidacja wejścia
```

---

##  Przykład poprawnej konfiguracji – Node.js + PostgreSQL

```javascript
const result = await db.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
```

✅ Użycie parametryzacji zamiast `string interpolation`.

---

## ❌ Przykład złej praktyki

```javascript
const result = await db.query("SELECT * FROM users WHERE id = " + req.params.id);
```

❗ Ryzyko SQL Injection, jeśli `req.params.id` pochodzi od użytkownika.

---

##  Wskazówki

- Przejrzyj kod aplikacji pod kątem dynamicznych zapytań.
- Sprawdź konfigurację bazy i serwera dla każdego środowiska (dev/test/prod).
- Automatyzuj skanowanie kodu i konfiguracji przy pomocy linters / SAST.

---

W kolejnym kroku: **3.3.4 – Narzędzia do testowania Injection**
