---
id: "a10-ssrf-cwiczenie"
title: "Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 50
---

#  Praktyczne ćwiczenie: Testowanie i mitigacja – Server-Side Request Forgery (SSRF) (A10:2025)

##  Cel ćwiczenia

Celem ćwiczenia jest zidentyfikowanie i wykorzystanie podatności typu SSRF w aplikacji webowej, a następnie wdrożenie skutecznych mechanizmów mitigacji w kodzie i konfiguracji serwera.

---

##  Scenariusz testowy

### Aplikacja:
- Backend Node.js z funkcją `/fetch?url=...` pozwalającą użytkownikowi na pobranie zawartości z zewnętrznego URL.
- Brak walidacji adresu URL.
- Aplikacja działa w chmurze (np. AWS EC2).

---

##  Krok po kroku: testowanie SSRF

### 1. Wstępna analiza
- Przetestuj endpoint `/fetch?url=` z adresami:
  - `http://localhost:80/`
  - `http://169.254.169.254/latest/meta-data/`
  - `http://127.0.0.1/admin`

➡️ Zwróć uwagę na odpowiedzi – czy aplikacja zwraca zawartość?

---

### 2. Weryfikacja SSRF przez narzędzia

- Skorzystaj z narzędzi:
  - `Burp Suite` lub `OWASP ZAP` – do przechwycenia i zmodyfikowania żądania.
  - `Interactsh` – do rejestrowania żądań wychodzących.
  - `SSRFmap` – do automatycznego skanowania i eksploitacji.

---

### 3. Eskalacja – atak na metadata service

- W środowiskach chmurowych (np. AWS) sprawdź:
  ```
  http://169.254.169.254/latest/meta-data/iam/security-credentials/
  ```
- Jeśli odpowiedź zawiera dane uwierzytelniające – podatność jest krytyczna.

---

## ✅ Mitigacja

1. **Walidacja i filtrowanie danych wejściowych**
   - Dopuszczaj tylko znane, bezpieczne domeny (whitelist).
   - Odrzucaj adresy IP z zakresów lokalnych, prywatnych, rezerwowych.

2. **Bezpieczna konfiguracja środowiska**
   - Zablokuj dostęp aplikacji do adresów `127.0.0.1`, `169.254.169.254` na poziomie firewalla.
   - Ogranicz uprawnienia IAM instancji w chmurze.

3. **Monitorowanie i alertowanie**
   - Monitoruj outbound traffic aplikacji.
   - Wykrywaj nietypowe żądania wychodzące do wewnętrznych adresów.

---

##  Wnioski

Po wykonaniu ćwiczenia uczestnik będzie potrafił:

- zidentyfikować potencjalne punkty podatne na SSRF,
- wykorzystać podatność do uzyskania danych z wewnętrznych zasobów,
- wdrożyć skuteczne zabezpieczenia na poziomie kodu i infrastruktury.


#  Dodatkowe ćwiczenie: Wykrywanie SSRF w środowisku testowym

##  Cel

Zidentyfikować i potwierdzić istnienie podatności SSRF w środowisku testowym z wykorzystaniem dedykowanego narzędzia (np. SSRFmap) oraz usługi rejestrującej żądania (np. Interactsh).

---

##  Scenariusz

### Środowisko testowe:
- Aplikacja PHP udostępnia funkcję `/proxy.php?url=`.
- Możliwość podania dowolnego zewnętrznego adresu URL przez użytkownika.

---

##  Krok po kroku

### 1. Uruchom serwer rejestrujący (Interactsh)
- Wejdź na https://github.com/projectdiscovery/interactsh lub skorzystaj z darmowego endpointu Interactsh.
- Wygeneruj unikalny identyfikator subdomeny, np. `abcd1234.oast.site`.

---

### 2. Podstawowy test SSRF
- Wprowadź do aplikacji wartość:
  ```
  /proxy.php?url=http://abcd1234.oast.site/
  ```
- Obserwuj, czy serwer Interactsh zarejestruje połączenie – jeśli tak, aplikacja jest podatna.

---

### 3. Test SSRF z nietypowymi protokołami
- Przetestuj protokoły alternatywne:
  - `ftp://abcd1234.oast.site/`
  - `gopher://abcd1234.oast.site/`
  - `file:///etc/passwd`

➡️ Zwróć uwagę, czy aplikacja próbuje wykonać żądanie lub zwraca błąd serwera (np. 500).

---

### 4. Test za pomocą narzędzia SSRFmap
- Uruchom narzędzie:
  ```bash
  python3 ssrfmap.py -u "http://localhost/proxy.php?url=INJECT_HERE" -l payloads.txt
  ```
- Obserwuj, które payloady generują odpowiedzi, timeouty lub błędy.

---

## ✅ Cel ćwiczenia został osiągnięty, jeśli:

- Aplikacja wykonuje żądania HTTP do Interactsh lub innego kontrolowanego hosta.
- Uczestnik potrafi zidentyfikować punkt podatny, przetestować różne warianty SSRF i wyciągnąć wnioski na podstawie odpowiedzi aplikacji.

---

##  Rekomendacja końcowa

Po potwierdzeniu podatności należy:

- Zablokować dostęp do prywatnych IP i wewnętrznych domen.
- Walidować dane wejściowe.
- Stosować whitelistę hostów lub pośredniczący bezpieczny proxy.
