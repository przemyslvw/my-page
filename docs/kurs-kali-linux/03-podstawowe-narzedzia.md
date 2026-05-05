---
id: "podstawowe-narzedzia-kali"
title: "🛠️ Podstawowe narzędzia w Kali Linux"
sidebar_position: 3
---

# 🛠️ Podstawowe narzędzia w Kali Linux

## 💻 Terminal i zarządzanie systemem
Kali Linux to system oparty na Debianie, w którym terminal jest kluczowym narzędziem do zarządzania systemem i przeprowadzania testów penetracyjnych. Oto podstawowe komendy:

### **1️⃣ Nawigacja w systemie plików**
- `ls` – wyświetlenie zawartości katalogu
- `cd <katalog>` – przejście do katalogu
- `pwd` – wyświetlenie bieżącej ścieżki
- `mkdir <nazwa>` – tworzenie katalogu
- `rm -r <nazwa>` – usuwanie katalogu

### **2️⃣ Zarządzanie plikami**
- `touch <plik>` – utworzenie pliku
- `cp <plik> <lokalizacja>` – kopiowanie pliku
- `mv <plik> <lokalizacja>` – przenoszenie pliku
- `rm <plik>` – usunięcie pliku
- `cat <plik>` – wyświetlenie zawartości pliku
- `nano <plik>` – edycja pliku w edytorze Nano

### **3️⃣ Zarządzanie procesami**
- `ps aux` – lista procesów
- `kill <PID>` – zakończenie procesu o danym PID
- `htop` – interaktywne zarządzanie procesami (wymaga instalacji: `sudo apt install htop`)

### **4️⃣ Zarządzanie użytkownikami**
- `whoami` – sprawdzenie aktualnego użytkownika
- `id` – wyświetlenie informacji o użytkowniku
- `sudo useradd <nazwa>` – dodanie nowego użytkownika
- `sudo passwd <nazwa>` – zmiana hasła użytkownika

---

## 🖥️ Praca z Bash i podstawowe skrypty
Bash (Bourne Again Shell) to domyślna powłoka w Kali Linux. Warto znać podstawy skryptowania, aby automatyzować zadania pentesterskie.

### **1️⃣ Tworzenie i uruchamianie skryptów Bash**
Aby utworzyć skrypt, stwórz plik `.sh`, np. `test.sh`, i dodaj:

```bash
#!/bin/bash

echo "Witaj w Kali Linux!"
```

Nadaj mu uprawnienia do uruchamiania:
```bash
chmod +x test.sh
```

Uruchom skrypt:
```bash
./test.sh
```

### **2️⃣ Pętle i warunki w Bash**
#### **Przykład pętli for:**
```bash
for i in {1..5}; do
  echo "Test numer $i"
done
```
#### **Instrukcja warunkowa if:**
```bash
if [ -f /etc/passwd ]; then
  echo "Plik passwd istnieje"
else
  echo "Brak pliku passwd"
fi
```

### **3️⃣ Automatyzacja zadań pentesterskich**
Przykładowy skrypt do skanowania sieci:
```bash
#!/bin/bash

read -p "Podaj zakres sieci (np. 192.168.1.0/24): " subnet
nmap -sn $subnet
```

---

## 📂 Struktura katalogów w Kali Linux
Warto znać podstawowe katalogi w Kali Linux:

| Katalog      | Opis |
|-------------|----------------------------------|
| `/root/`    | Katalog domowy użytkownika root |
| `/home/`    | Katalogi domowe użytkowników    |
| `/etc/`     | Pliki konfiguracyjne systemu    |
| `/var/`     | Logi systemowe i inne dane      |
| `/usr/`     | Zainstalowane aplikacje         |
| `/tmp/`     | Pliki tymczasowe                |

Aby sprawdzić rozmiar katalogu:
```bash
du -sh /etc/
```
Aby znaleźć plik:
```bash
find / -name "nazwa_pliku"
```

Po opanowaniu podstawowych narzędzi Kali Linux możemy przejść do kolejnego etapu – metodologii testów penetracyjnych! 🚀
