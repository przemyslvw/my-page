---
id: "instalacja-kali-linux"
title: "🛠️ Instalacja i konfiguracja Kali Linux"
sidebar_position: 2
---

# 🛠️ Instalacja i konfiguracja Kali Linux

## 💾 Wymagania systemowe
Aby zainstalować Kali Linux, Twój system powinien spełniać następujące minimalne wymagania:

- **Procesor**: 64-bitowy (Intel/AMD)
- **RAM**: Minimum 2 GB (zalecane 4 GB lub więcej)
- **Dysk twardy**: Minimum 20 GB wolnego miejsca
- **Karta graficzna**: Obsługująca rozdzielczość 1024x768 lub wyższą
- **Połączenie z Internetem**: Wymagane do pobrania aktualizacji i narzędzi

## 📥 Instalacja Kali Linux na maszynie wirtualnej
Najprostszym i najbezpieczniejszym sposobem na pracę z Kali Linux jest instalacja na maszynie wirtualnej. Możesz użyć **VirtualBox** lub **VMware**.

### **1️⃣ Pobranie obrazu ISO**
1. Przejdź na oficjalną stronę Kali Linux: [https://www.kali.org/downloads/](https://www.kali.org/downloads/)
2. Pobierz wersję **Kali Linux Installer** (ISO) lub gotowy obraz do **VirtualBox/VMware**.

### **2️⃣ Instalacja w VirtualBox**
1. Otwórz **VirtualBox** i kliknij `Nowa`.
2. Wprowadź nazwę maszyny, wybierz `Typ: Linux` oraz `Wersja: Debian (64-bit)`.
3. Przydziel **minimum 2 GB RAM** (zalecane 4 GB).
4. Utwórz nowy dysk wirtualny **(dynamically allocated, 20 GB)**.
5. W ustawieniach VM:
   - W sekcji `System > Procesor` zwiększ liczbę rdzeni (zalecane 2+).
   - W sekcji `Sieć` ustaw tryb `Bridged Adapter`.
   - W sekcji `Ekran` zwiększ pamięć wideo do 128 MB.
6. Wybierz pobrany obraz ISO i rozpocznij instalację.
7. Postępuj zgodnie z instrukcjami instalatora Kali Linux.

## ⚙️ Konfiguracja środowiska testowego (VirtualBox/VMware)
Po instalacji zaleca się wykonanie kilku kroków:

1. **Zainstalowanie dodatków dla gościa (Guest Additions)**:
   ```bash
   sudo apt update && sudo apt install -y virtualbox-guest-x11
   reboot
   ```
2. **Skonfigurowanie SSH i dostępu z hosta**:
   ```bash
   sudo systemctl enable --now ssh
   ```
3. **Dodanie użytkownika do grupy sudo**:
   ```bash
   sudo usermod -aG sudo <nazwa_użytkownika>
   ```

## 🔄 Aktualizacja i personalizacja Kali Linux
Po instalacji warto od razu zaktualizować system i dodać przydatne pakiety:

```bash
sudo apt update && sudo apt full-upgrade -y
sudo apt install -y kali-linux-large
```

Dodatkowo można:
- Zmienić domyślną powłokę na **zsh**:
  ```bash
  chsh -s /bin/zsh
  ```
- Zainstalować ulubione narzędzia pentesterskie, np.:
  ```bash
  sudo apt install -y burpsuite gobuster sqlmap
  ```

## 🏗️ Tworzenie labu testowego (DVWA, Juice Shop, Mutillidae)
Aby ćwiczyć ataki w bezpiecznym środowisku, warto skonfigurować aplikacje testowe:

### **1️⃣ Instalacja Damn Vulnerable Web Application (DVWA)**
```bash
git clone https://github.com/digininja/DVWA.git /var/www/html/dvwa
cd /var/www/html/dvwa
cp config/config.inc.php.dist config/config.inc.php
sudo systemctl restart apache2
```

### **2️⃣ Instalacja OWASP Juice Shop**
```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
mkdir ~/juiceshop && cd ~/juiceshop
git clone https://github.com/juice-shop/juice-shop.git .
npm install && npm start
```

### **3️⃣ Instalacja Mutillidae**
```bash
git clone https://github.com/webpwnized/mutillidae.git /var/www/html/mutillidae
sudo systemctl restart apache2
```

Po tych krokach Twoje środowisko Kali Linux jest gotowe do pracy! 🚀

---

Kolejnym krokiem będzie omówienie podstawowych narzędzi Kali Linux. 🔍
