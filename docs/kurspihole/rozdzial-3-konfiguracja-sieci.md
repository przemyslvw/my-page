---
id: "rozdzial-3-konfiguracja-sieci"
title: "🌐 Rozdział 3: Konfiguracja sieci"
sidebar_position: 4
---

### 🧭 3.1 Ustawienie Pi-hole jako DNS

Aby Pi-hole mógł blokować reklamy dla całej sieci, musisz ustawić go jako **główny serwer DNS** na routerze lub na urządzeniach końcowych.

#### ✅ **Konfiguracja na routerze (zalecane):**
1. Zaloguj się do panelu administracyjnego swojego routera.
2. Przejdź do ustawień DNS.
3. Ustaw adres IP Raspberry Pi jako **Primary DNS** (np. `192.168.0.12`).
4. Zapisz zmiany i zrestartuj router.

#### ✅ **Konfiguracja na pojedynczych urządzeniach (opcjonalnie):**
- **Windows/Linux/macOS:** Ustaw statyczny DNS w ustawieniach sieciowych.
- **Smartfony:** Zmień ustawienia DNS w Wi-Fi lub użyj aplikacji DNS.

---

### 📡 3.2 Konfiguracja DHCP (opcjonalnie)

Pi-hole może pełnić rolę serwera DHCP, jeśli Twój router tego nie obsługuje lub chcesz mieć pełną kontrolę nad przydzielaniem adresów IP.

1. Wejdź do panelu administracyjnego Pi-hole:
   ```
   http://<IP_Raspberry_Pi>/admin
   ```

2. Przejdź do **Settings** → **DHCP**.

3. Zaznacz opcję **"Enable DHCP server"**.

4. Skonfiguruj zakres adresów IP, np.:
   - **Range:** `192.168.0.100` – `192.168.0.200`
   - **Router (Gateway):** `192.168.0.1`

5. Zapisz zmiany.

6. Wyłącz serwer DHCP w routerze, aby uniknąć konfliktów.

---

### 📝 3.3 Dodawanie wyjątków (Whitelist/Blacklist)

Czasem Pi-hole może zablokować potrzebne domeny. Aby temu zapobiec:

#### ➕ **Dodanie domeny do białej listy:**
1. Otwórz panel Pi-hole → **Group Management** → **Domains**.
2. Wpisz nazwę domeny, którą chcesz odblokować.
3. Wybierz typ: **Whitelist**.
4. Kliknij **Add**.

#### ➖ **Dodanie domeny do czarnej listy:**
1. Wejdź do **Group Management** → **Domains**.
2. Wpisz domenę do zablokowania.
3. Wybierz typ: **Blacklist**.
4. Kliknij **Add**.

---

### 🚫 3.4 Blokowanie reklam na poziomie całej sieci

1. Upewnij się, że Pi-hole jest ustawiony jako główny DNS.
2. Sprawdź statystyki w zakładce **Dashboard**.
3. Dodaj dodatkowe listy blokujące w sekcji **Adlists**:
   - Przykład: [Firebog Recommended](https://firebog.net)

4. Zaktualizuj listy poleceniem:
``````bash
pihole -g
``````

---

## 🟢 Podsumowanie

✅ Ustawiono Pi-hole jako główny DNS.  
✅ Skonfigurowano DHCP (opcjonalnie).  
✅ Dodano wyjątki i listy blokujące.  
✅ Skonfigurowano blokowanie reklam w całej sieci.

---
