---
id: "rozdzial-4-zarzadzanie"
title: "🔍 Rozdział 4: Zarządzanie i monitorowanie"
sidebar_position: 5
---

### 🖥️ 4.1 Przegląd interfejsu

Pi-hole posiada intuicyjny interfejs webowy, który umożliwia pełną kontrolę nad działaniem serwera DNS.

1. Otwórz przeglądarkę i przejdź do:
   ```
   http://<IP_Raspberry_Pi>/admin
   ```

2. Zaloguj się przy użyciu hasła administracyjnego.

#### 📋 **Główne sekcje interfejsu:**
- **Dashboard:** Podgląd statystyk w czasie rzeczywistym.
- **Query Log:** Szczegółowa lista zapytań DNS.
- **Whitelist/Blacklist:** Zarządzanie dozwolonymi i zablokowanymi domenami.
- **Tools:** Narzędzia diagnostyczne i dodatkowe opcje.

---

### 📊 4.2 Statystyki i logi

#### ✅ **Podstawowe statystyki dostępne na Dashboardzie:**
- Liczba zablokowanych zapytań.
- Procent ruchu DNS, który został zablokowany.
- Najczęściej blokowane domeny.
- Urządzenia generujące najwięcej zapytań.

#### 📁 **Dostęp do logów z poziomu terminala:**
1. Wyświetlenie najnowszych logów:
``````bash
tail -f /var/log/pihole.log
``````

2. Wyświetlenie szczegółowych statystyk DNS:
``````bash
pihole -c
``````

---

### 📝 4.3 Zarządzanie listami

#### ➕ **Dodawanie nowych list blokujących:**
1. Przejdź do **Group Management** → **Adlists**.
2. Kliknij **Add** i wklej URL do listy blokującej.
3. Zaktualizuj listy poleceniem:
``````bash
pihole -g
``````

#### ➖ **Usuwanie lub dezaktywacja listy:**
1. W zakładce **Adlists** znajdź listę do usunięcia.
2. Kliknij **Disable** lub **Delete**.

---

### ⚙️ 4.4 Zmiana ustawień DNS

1. Przejdź do **Settings** → **DNS**.
2. Wybierz preferowanego dostawcę DNS (np. Google, Cloudflare) lub wprowadź własne serwery DNS.
3. Możesz dodać więcej niż jeden serwer DNS dla redundancji.
4. Zapisz zmiany i odśwież Pi-hole:
``````bash
pihole restartdns
``````

---

## 🟢 Podsumowanie

✅ Poznałeś interfejs Pi-hole.  
✅ Nauczyłeś się odczytywać statystyki i logi.  
✅ Zarządzałeś listami blokującymi.  
✅ Zmieniłeś ustawienia DNS.

---

**➡️ Przejdź do [Rozdziału 5: Zabezpieczenia i optymalizacja](./rozdzial-5-zabezpieczenia-optymalizacja.md), aby dowiedzieć się, jak zwiększyć bezpieczeństwo Pi-hole.** 🔒
