---
id: "rozdzial-6-zaawansowane-funkcje"
title: "📊 Rozdział 6: Zaawansowane funkcje"
sidebar_position: 7
---

### 🔗 6.1 Integracja z Unbound (Lokalny resolver DNS)

Integracja Pi-hole z **Unbound** pozwala stworzyć własny, niezależny resolver DNS, co zwiększa prywatność i bezpieczeństwo.

#### ✅ **Instalacja Unbound:**
1. Zainstaluj Unbound:
``````bash
sudo apt install unbound -y
``````

2. Pobierz najnowszą listę root serwerów DNS:
``````bash
wget -O /var/lib/unbound/root.hints https://www.internic.net/domain/named.cache
``````

3. Utwórz plik konfiguracyjny Unbound:
``````bash
sudo nano /etc/unbound/unbound.conf.d/pi-hole.conf
``````

4. Wklej poniższą konfigurację:
``````bash
server:
    verbosity: 0
    interface: 127.0.0.1
    port: 5335
    do-ip4: yes
    do-udp: yes
    do-tcp: yes
    root-hints: "/var/lib/unbound/root.hints"
    harden-glue: yes
    harden-dnssec-stripped: yes
    cache-min-ttl: 3600
    cache-max-ttl: 86400
    prefetch: yes
``````

5. Uruchom ponownie Unbound:
``````bash
sudo service unbound restart
``````

6. W Pi-hole ustaw serwer DNS na:
``````bash
127.0.0.1#5335
``````

---

### 🛡️ 6.2 Konfiguracja VPN z WireGuard

Dzięki VPN możesz korzystać z Pi-hole poza domową siecią.

#### ✅ **Instalacja WireGuard:**
1. Zainstaluj WireGuard:
``````bash
sudo apt install wireguard -y
``````

2. Utwórz klucze publiczne i prywatne:
``````bash
wg genkey | tee privatekey | wg pubkey > publickey
``````

3. Skonfiguruj plik `/etc/wireguard/wg0.conf`:
``````bash
[Interface]
PrivateKey = <PRIVATE_KEY>
Address = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey = <CLIENT_PUBLIC_KEY>
AllowedIPs = 0.0.0.0/0
``````

4. Uruchom WireGuard:
``````bash
sudo wg-quick up wg0
``````

---

### ⚖️ 6.3 Czarne i białe listy

#### ➕ **Dodanie domeny do czarnej listy:**
1. Otwórz panel administracyjny Pi-hole.
2. Przejdź do **Group Management** → **Domains**.
3. Wpisz domenę i zaznacz jako **Blacklist**.

#### ➖ **Dodanie domeny do białej listy:**
1. W tym samym panelu dodaj domenę i zaznacz jako **Whitelist**.

---

### 📋 6.4 Tworzenie własnych list blokujących

Jeśli chcesz stworzyć własną listę domen do zablokowania:

1. Utwórz plik tekstowy:
``````bash
nano ~/moja-lista.txt
``````

2. Dodaj domeny do zablokowania, np.:
``````bash
ads.example.com
trackers.example.org
``````

3. Dodaj własną listę do Pi-hole:
   - Przejdź do **Adlists** i wklej lokalną ścieżkę lub URL.

4. Zaktualizuj listy:
``````bash
pihole -g
``````

---

## 🟢 Podsumowanie

✅ Skonfigurowano Unbound jako lokalny resolver DNS.  
✅ Skonfigurowano VPN za pomocą WireGuard.  
✅ Zarządzano czarnymi i białymi listami.  
✅ Utworzono własne listy blokujące.

---

**➡️ Przejdź do [Rozdziału 7: Rozwiązywanie problemów](./rozdzial-7-rozwiazywanie-problemow.md), aby dowiedzieć się, jak radzić sobie z najczęstszymi błędami.** 🧑‍💻
