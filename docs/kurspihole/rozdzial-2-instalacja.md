---
id: "rozdzial-2-instalacja"
title: "⚡ Rozdział 2: Instalacja Pi-hole"
sidebar_position: 3
---

### 📥 2.1 Instalacja krok po kroku

1. **Zaloguj się do Raspberry Pi przez SSH** *(jeśli jeszcze nie jesteś zalogowany):*
``````bash
ssh pi@raspberrypi.local
``````

2. **Zaktualizuj listę pakietów i upewnij się, że system jest aktualny:**
``````bash
sudo apt update && sudo apt upgrade -y
``````

3. **Pobierz i uruchom skrypt instalacyjny Pi-hole:**
``````bash
curl -sSL https://install.pi-hole.net | bash
``````

4. **Podczas instalacji wybierz następujące opcje:**
   - **Upstream DNS Provider** → np. Google (8.8.8.8), Cloudflare (1.1.1.1) lub inny.
   - **Block Lists** → zostaw domyślne lub dodaj własne po instalacji.
   - **Web Interface** → wybierz **YES**, aby zainstalować interfejs webowy.
   - **Lighttpd** → wybierz **YES**, jeśli nie masz własnego serwera WWW.
   - **Privacy Mode** → ustaw według własnych preferencji.

---

### ⚙️ 2.2 Konfiguracja podstawowa

1. **Dostęp do panelu administracyjnego:**
   - Otwórz przeglądarkę i przejdź do adresu:
   ```
   http://<IP_Raspberry_Pi>/admin
   ```
   *(Zamień `<IP_Raspberry_Pi>` na adres IP Twojego Raspberry Pi, np. `192.168.0.12`)*

2. **Zaloguj się do panelu przy użyciu hasła wygenerowanego podczas instalacji.**
   - Jeśli zapomniałeś hasła, zresetuj je poleceniem:
``````bash
pihole -a -p
``````

3. **Dodaj nowe listy blokujące lub usuń istniejące w zakładce "Group Management" > "Adlists".**

---

### 🌐 2.3 Ustawienie statycznego IP (jeśli nie zostało ustawione wcześniej)

1. **Edytuj plik konfiguracyjny:**
``````bash
sudo nano /etc/dhcpcd.conf
``````

2. **Dodaj lub edytuj sekcję dla interfejsu sieciowego:**
``````bash
interface eth0
static ip_address=192.168.0.12/24
static routers=192.168.0.1
static domain_name_servers=8.8.8.8 8.8.4.4
``````

3. **Zapisz zmiany i uruchom ponownie Raspberry Pi:**
``````bash
sudo reboot
``````

---

## 🟢 Podsumowanie

✅ Zainstalowano Pi-hole.  
✅ Skonfigurowano interfejs webowy.  
✅ Ustawiono statyczny adres IP.  

---

