---
id: "rozdzial-1-przygotowanie"
title: "🛠️ Rozdział 1: Przygotowanie środowiska"
sidebar_position: 2
---

## 💡 W tym rozdziale dowiesz się:
- Jak wybrać odpowiedni sprzęt dla Pi-hole.
- Jak przygotować kartę SD z systemem operacyjnym.
- Jak skonfigurować sieć dla Raspberry Pi.
- Jak wykonać podstawową konfigurację systemu.

---

## 🥧 1.1 Wybór sprzętu

### ✅ **Najlepsza opcja: Raspberry Pi**
Pi-hole został zaprojektowany z myślą o pracy na **Raspberry Pi** – lekkim, energooszczędnym minikomputerze, który idealnie nadaje się jako serwer DNS.

#### 💾 **Zalecane modele:**
- **Raspberry Pi 3B+** lub **Raspberry Pi 4** (najlepsza wydajność)
- **Raspberry Pi Zero 2 W** (dla małych sieci domowych)
- **Raspberry Pi 2** (wystarczający dla podstawowych zastosowań)

#### ⚙️ **Alternatywy:**
- Komputery z systemem **Linux** (Debian/Ubuntu)
- **Docker** (dla bardziej zaawansowanych użytkowników)
- **Windows** (poprzez WSL2)

---

## 💾 1.2 Przygotowanie karty SD

### 📥 **Krok 1: Pobierz system operacyjny**
Pobierz **Raspberry Pi OS (Lite)** z oficjalnej strony:
👉 [Pobierz Raspberry Pi OS](https://www.raspberrypi.com/software/)

### 🖥️ **Krok 2: Wgraj system na kartę SD**
1. Pobierz i zainstaluj **Raspberry Pi Imager**.
2. Wybierz:
   - System: **Raspberry Pi OS (Lite)** *(bez środowiska graficznego)*.
   - Dysk: Twoja karta SD *(minimum 8 GB, zalecane 16 GB)*.
3. Kliknij **"Write"** i poczekaj na zakończenie procesu.

### 💡 **Tip:** Po wgraniu systemu, dodaj pusty plik o nazwie `ssh` do katalogu głównego karty SD, aby włączyć zdalny dostęp SSH.

---

## 🌐 1.3 Konfiguracja sieci

### 🧑‍💻 **Podłącz Raspberry Pi do sieci:**
- **Ethernet** (zalecane) — stabilniejsze połączenie.
- **Wi-Fi** — dla bardziej elastycznego ustawienia.

#### 📄 **Jeśli używasz Wi-Fi:**
1. Otwórz kartę SD po wgraniu systemu.
2. Utwórz plik `wpa_supplicant.conf` z poniższą treścią:

``````bash
country=PL
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
    ssid="NAZWA_SIECI"
    psk="TWOJE_HASLO"
}
``````

3. Zapisz plik i włóż kartę SD do Raspberry Pi.

## ⚡ 1.4 Podstawowe ustawienia systemu

1. **Uruchom Raspberry Pi** z przygotowanej karty SD.

2. **Połącz się przez SSH:**

``````bash
ssh pi@raspberrypi.local
``````

- **Hasło domyślne:** `raspberry`

---

3. **Zmień hasło użytkownika:**

``````bash
passwd
``````

---

4. **Zaktualizuj system:**

``````bash
sudo apt update && sudo apt upgrade -y
``````

---

5. **Ustaw statyczny adres IP** *(opcjonalnie, ale zalecane):*

``````bash
sudo nano /etc/dhcpcd.conf
``````

Dodaj na końcu pliku:

``````bash
interface eth0
static ip_address=192.168.0.12/24
static routers=192.168.0.1
static domain_name_servers=8.8.8.8 8.8.4.4
``````

Zapisz plik i uruchom ponownie system:

``````bash
sudo reboot
``````


## 🟢 Podsumowanie

✅ Wybrałeś sprzęt.  
✅ Przygotowałeś kartę SD z systemem.  
✅ Skonfigurowałeś sieć i podstawowe ustawienia.

---

**➡️ Przejdź do [Rozdziału 2: Instalacja Pi-hole](./rozdzial-2-instalacja.md), aby rozpocząć instalację.** 🚀

---

### 📌 **Co zawiera ten rozdział?**
- Kompletne instrukcje przygotowania środowiska.
- Przykłady konfiguracji sieci.
- Najlepsze praktyki (np. ustawienie statycznego IP i zabezpieczenie systemu).

Czy chcesz teraz przejść do **Rozdziału 2: Instalacja Pi-hole**? ⚡
