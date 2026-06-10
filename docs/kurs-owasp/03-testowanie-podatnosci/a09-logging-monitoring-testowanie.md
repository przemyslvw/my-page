---
id: "a09-logging-monitoring-testowanie"
title: "Metody testowania podatności"
sidebar_position: 42
---

# 🔬 Metody testowania podatności – Security Logging and Monitoring Failures (A09:2025)

##  Cel testowania

Celem testowania tej podatności jest sprawdzenie, czy aplikacja i jej infrastruktura odpowiednio rejestrują zdarzenia bezpieczeństwa, a także czy te dane są monitorowane i wykorzystywane do reakcji na incydenty.

---

##  Krok po kroku: jak testować?

### 1. **Sprawdzenie logowania kluczowych zdarzeń**
- Wykonaj nieudane logowanie (błędne hasło).
- Spróbuj uzyskać dostęp do zasobu bez autoryzacji.
- Wygeneruj wyjątek aplikacyjny.
- Prześlij złośliwe dane (np. XSS, SQLi).
- Obserwuj logi serwera, backendu i aplikacji.

➡️ **Czy zdarzenie zostało zapisane w logach?**  
➡️ **Czy zawiera kontekst: IP, user-agent, identyfikator użytkownika?**

---

### 2. **Testowanie rotacji i przechowywania logów**
- Sprawdź, czy logi nie są nadpisywane.
- Czy występuje mechanizm rotacji (logrotate, systemd-journald)?
- Czy logi są przesyłane do systemu zewnętrznego (np. SIEM)?

---

### 3. **Alertowanie i monitoring**
- Symuluj atak (np. szybka seria logowań).
- Obserwuj, czy pojawiły się alerty:
  - na e-mail,
  - w systemie SIEM/SOAR,
  - w panelu monitoringu.

➡️ **Czy incydent wywołał alert?**

---

### 4. **Analiza logów z perspektywy audytu**
- Czy logi zawierają niezbędne informacje dla inspektora (czas, źródło, wynik, ID użytkownika)?
- Czy logi są dostępne tylko dla uprawnionych?
- Czy są odporne na modyfikacje (np. WORM storage)?

---

##  Przykładowe przypadki testowe

| Scenariusz | Oczekiwany log |
|------------|----------------|
| Nieudane logowanie | `auth failure for user X from IP Y` |
| Przekroczenie limitu API | `rate limit exceeded for IP` |
| Błąd serwera 500 | `internal server error at /endpoint` |
| Brak JWT | `missing token for secured resource` |

---

##  Testowanie w kontekście DevSecOps

- Czy CI/CD rejestruje błędy buildów i deploymentów?
- Czy pipeline zawiera testy logowania bezpieczeństwa?
- Czy logi są testowane jako część scenariuszy E2E?

---

## ✅ Wnioski

Testowanie logowania i monitoringu to nie tylko sprawdzenie, czy coś się *zapisuje*, ale czy te dane mają wartość bezpieczeństwa, są widoczne, kompletne i umożliwiają reakcję.

