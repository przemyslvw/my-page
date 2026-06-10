---
id: "podstawowe-narzedzia-kali"
title: "Podstawowe narzędzia w Kali Linux"
sidebar_label: "🛠️ Podstawowe narzędzia w Kali Linux"
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

---

## 📦 Zarządzanie pakietami (apt i dpkg)

Kali bazuje na Debianie — `apt` i `dpkg` to podstawowe narzędzia do instalacji i zarządzania oprogramowaniem.

### **Najważniejsze komendy apt**
```bash
# Aktualizacja listy pakietów i upgrade systemu
sudo apt update && sudo apt full-upgrade -y

# Instalacja pakietu
sudo apt install -y nmap

# Wyszukiwanie pakietu
apt search sqlmap

# Usunięcie pakietu wraz z konfiguracją
sudo apt purge narzedzie

# Usunięcie nieużywanych zależności
sudo apt autoremove
```

### **dpkg – bezpośrednia obsługa plików .deb**
```bash
# Instalacja z pliku .deb
sudo dpkg -i narzedzie.deb

# Lista zainstalowanych pakietów
dpkg -l | grep nmap

# Naprawa zepsutych zależności po dpkg
sudo apt install -f

# Wymuszenie instalacji przy konflikcie plików
sudo apt -o Dpkg::Options::="--force-overwrite" install narzedzie
```

Flaga `--force-overwrite` bywa potrzebna przy aktualizacji Kali gdy nowszy pakiet nadpisuje pliki starszego.

---

## 🔌 Netcat – szwajcarski nóż sieci

Netcat (`nc`) to fundamentalne narzędzie do testowania połączeń sieciowych, transferu plików i tworzenia reverse shellu.

### **Listener (odbiór połączeń przychodzących)**
```bash
# -n = bez DNS, -l = listen, -v = verbose, -p = port
nc -nlvp 4444
```

Po uruchomieniu Kali czeka na połączenie od celu.

### **Połączenie z hostem**
```bash
nc 192.168.1.10 80
```

### **Transfer pliku przez netcat**
```bash
# Kali – odbiorca
nc -nlvp 4444 > plik_odebrany.txt

# Cel – nadawca
nc 192.168.1.100 4444 < plik_do_wyslania.txt
```

### **Sprawdzenie czy port jest otwarty**
```bash
nc -zv 192.168.1.10 22
```

Netcat jako listener jest punktem startowym dla każdego reverse shella — payload generowany przez msfvenom lub wstrzyknięty przez SQLi/RFI łączy się właśnie z `nc -nlvp`.

---

## 🌐 curl – testowanie żądań HTTP

curl pozwala ręcznie wysyłać żądania HTTP z terminala — niezbędne do testowania API, nagłówków i parametrów bez przeglądarki.

```bash
# Proste żądanie GET
curl http://example.com

# Wyświetl nagłówki odpowiedzi
curl -I http://example.com

# Żądanie POST z danymi formularza
curl -X POST -d "username=admin&password=test" http://example.com/login

# Żądanie POST z JSON
curl -X POST -H "Content-Type: application/json" \
  -d '{"user":"admin","pass":"test"}' http://example.com/api/login

# Dołącz cookie do żądania
curl -b "PHPSESSID=abc123" http://example.com/profile

# Podążaj za przekierowaniami
curl -L http://example.com
```

Burp Suite jako proxy do curl:
```bash
curl --proxy http://127.0.0.1:8080 http://example.com
```

---

Po opanowaniu podstawowych narzędzi Kali Linux możemy przejść do kolejnego etapu – metodologii testów penetracyjnych! 🚀
