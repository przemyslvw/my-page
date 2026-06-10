---
id: "rozdzial-5-zabezpieczenia"
title: " Rozdział 5: Zabezpieczenia i optymalizacja"
sidebar_position: 6
---

###  5.1 Ustawienie hasła do panelu administracyjnego

Aby zabezpieczyć dostęp do panelu administracyjnego Pi-hole, ustaw silne hasło.

1. Otwórz terminal i wpisz polecenie:
``````bash
pihole -a -p
``````

2. Podaj nowe hasło i zatwierdź.

3. Jeśli chcesz usunąć hasło (np. w środowisku testowym), użyj:
``````bash
pihole -a -p ""
``````

---

### 🦠 5.2 Blokowanie złośliwych domen

Pi-hole może blokować znane domeny phishingowe, malware i adware poprzez dodanie dedykowanych list blokujących.

1. Wejdź do **Group Management** → **Adlists**.

2. Dodaj rekomendowane listy bezpieczeństwa, np.:
   - [Malware Domain List](https://www.malwaredomainlist.com)
   - [Phishing Army](https://phishing.army)

3. Zaktualizuj listy poleceniem:
``````bash
pihole -g
``````

4. Sprawdź logi, aby upewnić się, że złośliwe domeny są blokowane:
``````bash
tail -f /var/log/pihole.log
``````

---

### 🔥 5.3 Konfiguracja Firewall

Aby dodatkowo zabezpieczyć Pi-hole przed nieautoryzowanym dostępem, skonfiguruj firewall.

1. Zainstaluj **UFW** (Uncomplicated Firewall), jeśli jeszcze go nie masz:
``````bash
sudo apt install ufw
``````

2. Skonfiguruj podstawowe reguły zapory:
``````bash
sudo ufw allow ssh
sudo ufw allow 53/tcp
sudo ufw allow 53/udp
sudo ufw allow 80/tcp
sudo ufw enable
``````

3. Sprawdź status zapory:
``````bash
sudo ufw status
``````

---

### ♻️ 5.4 Aktualizacje Pi-hole

Regularne aktualizowanie Pi-hole zapewnia najnowsze funkcje i poprawki bezpieczeństwa.

1. **Zaktualizuj Pi-hole do najnowszej wersji:**
``````bash
pihole -up
``````

2. **Zaktualizuj system operacyjny Raspberry Pi:**
``````bash
sudo apt update && sudo apt upgrade -y
``````

3. **Automatyczne aktualizacje (opcjonalnie):**
   - Dodaj zadanie cron, aby automatycznie aktualizować listy blokujące:
``````bash
echo "0 3 * * * root pihole -g" | sudo tee -a /etc/crontab
``````

---

## 🟢 Podsumowanie

✅ Ustawiono hasło do panelu administracyjnego.  
✅ Dodano listy złośliwych domen.  
✅ Skonfigurowano zaporę sieciową.  
✅ Zaktualizowano Pi-hole i system operacyjny.

---

**➡️ Przejdź do [Rozdziału 6: Zaawansowane funkcje](./rozdzial-6-zaawansowane-funkcje.md), aby odkryć dodatkowe możliwości Pi-hole.** 
