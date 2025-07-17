---
id: "a07-authentication-failures-cwiczenie"
title: "Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 35
---

## 🎯 Cel ćwiczenia

W tym ćwiczeniu:

- Sprawdzimy odporność aplikacji na ataki brute-force.
- Przeanalizujemy bezpieczeństwo tokenów JWT.
- Przetestujemy zachowanie aplikacji przy logowaniu i po wylogowaniu.

---

## 🧪 Scenariusz testowy

**Aplikacja**: Panel logowania użytkownika (REST API)

**Endpoint**:  
POST `/api/login`  
GET `/api/profile`

---

### 🧪 Krok 1: Próba brute-force logowania

Użyj Burp Intruder lub Hydra:

```bash
hydra -L users.txt -P passwords.txt myapp.com http-post-form "/api/login:username=^USER^&password=^PASS^:F=invalid"
```

➡️ Sprawdź, czy aplikacja blokuje IP, opóźnia odpowiedzi lub wyświetla różne komunikaty.

---

### 🧪 Krok 2: Analiza JWT

1. Zaloguj się i przechwyć token JWT.
2. Przeanalizuj go na https://jwt.io lub za pomocą `jwt_tool`.

```bash
jwt_tool eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Sprawdź:
   - Algorytm podpisu (`alg`)
   - Czy `exp`, `iat`, `sub` mają sensowne wartości
   - Czy można token zmanipulować (np. `alg=none`, zmiana `sub`)

---

### 🧪 Krok 3: Sesja po wylogowaniu

1. Wyloguj się z aplikacji (np. `POST /api/logout`).
2. Spróbuj ponownie użyć tokenu do żądania `GET /api/profile`.

➡️ Czy dostęp jest nadal możliwy? Jeśli tak – sesja nie jest unieważniana.

---

### 🛠️ Mitigacja – przykładowe działania

- Wprowadzenie limitu prób logowania i mechanizmu CAPTCHA.
- Przechowywanie JWT w `httpOnly` cookie.
- Rotacja tokenu po zalogowaniu.
- Wymuszenie wygasania sesji po nieaktywności.

---

## 🧠 Dodatkowe scenariusze

- Test konta `admin` z domyślnym hasłem.
- Próba logowania na konto z nieaktywowanym e-mailem.
- Testowanie resetu hasła z użyciem starego linku.

---

W kolejnym podrozdziale: **Wykonane zadania i dokumentacja testu**
