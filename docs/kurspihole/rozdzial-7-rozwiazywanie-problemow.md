---
id: "rozdzial-7-rozwiazywanie-problemow"
title: "🧑‍💻 Rozdział 7: Rozwiązywanie problemów"
sidebar_position: 8
---

### 🛠️ 7.1 Najczęstsze problemy i ich rozwiązania

#### ❓ **Pi-hole nie blokuje reklam**
1. Sprawdź, czy urządzenie korzysta z Pi-hole jako DNS:
``````bash
nslookup pi.hole
``````

2. Upewnij się, że zapytania DNS przechodzą przez Pi-hole:
``````bash
tail -f /var/log/pihole.log
``````

3. Zaktualizuj listy blokujące:
``````bash
pihole -g
``````

---

#### ❓ **Brak dostępu do panelu administracyjnego**
1. Upewnij się, że serwer jest uruchomiony:
``````bash
sudo service lighttpd status
``````

2. Jeśli serwer nie działa, uruchom go ponownie:
``````bash
sudo service lighttpd restart
``````

3. Sprawdź zaporę sieciową:
``````bash
sudo ufw allow 80/tcp
``````

---

#### ❓ **Reklamy pojawiają się mimo poprawnej konfiguracji**
1. Dodaj dodatkowe listy blokujące w **Adlists**.
2. Sprawdź, czy reklamy pochodzą z HTTPS lub z tzw. reklam "inline", które mogą wymagać rozszerzenia do przeglądarki.

---

### 📋 7.2 Analiza logów i identyfikacja błędów

1. **Bieżące logi zapytań DNS:**
``````bash
tail -f /var/log/pihole.log
``````

2. **Logi serwera DNS:**
``````bash
journalctl -u pihole-FTL
``````

3. **Szybkie statystyki Pi-hole:**
``````bash
pihole -c
``````

---

### 🔄 7.3 Pi-hole nie działa jako DNS – co zrobić?

1. Sprawdź, czy serwis **FTL** działa:
``````bash
sudo service pihole-FTL status
``````

2. Jeśli nie działa, uruchom go ponownie:
``````bash
sudo service pihole-FTL restart
``````

3. Sprawdź, czy port 53 (DNS) jest otwarty:
``````bash
sudo netstat -tuln | grep :53
``````

---

### ♻️ 7.4 Przywracanie domyślnych ustawień

Jeśli wszystko inne zawiedzie, możesz zresetować konfigurację Pi-hole.

1. Usuń Pi-hole:
``````bash
sudo pihole uninstall
``````

2. Ponownie zainstaluj Pi-hole:
``````bash
curl -sSL https://install.pi-hole.net | bash
``````

3. Zaktualizuj listy blokujące po reinstalacji:
``````bash
pihole -g
``````

---

## 🟢 Podsumowanie

✅ Rozwiązano najczęstsze problemy.  
✅ Przeanalizowano logi i statystyki.  
✅ Zresetowano konfigurację w razie potrzeby.

---

**➡️ Przejdź do [Rozdziału 8: Scenariusze zastosowania](./rozdzial-8-scenariusze-zastosowania.md), aby poznać różne sposoby wykorzystania Pi-hole.** 💡
