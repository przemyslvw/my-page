---
id: "zalaczniki"
title: "📁 Załączniki"
sidebar_position: 10
---

# 📁 Załączniki

## 📜 Przydatne listy blokujące

Aby zwiększyć skuteczność Pi-hole w blokowaniu niechcianych treści, warto dodać sprawdzone listy blokujące. Poniżej znajduje się lista rekomendowanych źródeł:

- **[The Big Blocklist Collection](https://firebog.net/)**: Obszerna kolekcja list blokujących, skategoryzowanych według przeznaczenia i potencjalnego wpływu na przeglądanie internetu.

- **[PolishFiltersTeam KADhosts](https://github.com/PolishFiltersTeam/KADhosts)**: Lista skupiająca się na polskich domenach związanych z oszustwami i spamem.

- **[AdAway](https://adaway.org/hosts.txt)**: Popularna lista blokująca reklamy, często używana w aplikacjach mobilnych.

- **[Disconnect.me Ads](https://s3.amazonaws.com/lists.disconnect.me/simple_ad.txt)**: Lista blokująca znane domeny reklamowe, pomagająca w ochronie prywatności.

**Uwaga**: Przed dodaniem nowych list do Pi-hole upewnij się, że są one regularnie aktualizowane i pochodzą z zaufanych źródeł. Dodanie zbyt wielu list może wpłynąć na wydajność oraz powodować fałszywe blokady.

## 📖 Słownik pojęć

- **DNS (Domain Name System)**: System zamieniający nazwy domen (np. www.przyklad.com) na adresy IP zrozumiałe dla komputerów.

- **Pi-hole**: Oprogramowanie działające jako serwer DNS, które blokuje reklamy i śledzenie w sieci lokalnej.

- **Lista blokująca (blocklist)**: Zbiór domen lub adresów IP, które są blokowane przez Pi-hole w celu ograniczenia reklam, malware lub śledzenia.

- **Whitelist (lista dozwolonych)**: Lista domen lub adresów IP, które są zawsze dozwolone, nawet jeśli pojawiają się na listach blokujących.

- **DHCP (Dynamic Host Configuration Protocol)**: Protokół sieciowy automatycznie przydzielający urządzeniom w sieci lokalnej adresy IP i inne parametry sieciowe.

## 🛠️ Narzędzia do analizy sieci

Aby monitorować i analizować ruch w sieci oraz skuteczność Pi-hole, warto skorzystać z następujących narzędzi:

- **Wireshark**: Zaawansowane narzędzie do analizy ruchu sieciowego, pozwalające na szczegółowe monitorowanie pakietów przesyłanych w sieci.

- **iftop**: Narzędzie działające w terminalu, pokazujące aktualne połączenia sieciowe oraz zużycie pasma przez poszczególne adresy IP.

- **Netdata**: Rozbudowane narzędzie do monitorowania systemu i sieci w czasie rzeczywistym, oferujące interfejs webowy z wykresami i statystykami.

- **dnsmasq**: Lekki serwer DNS i DHCP, który może współpracować z Pi-hole, oferując dodatkowe funkcje i możliwości konfiguracji.

**Porada**: Regularne monitorowanie ruchu sieciowego i analiza logów Pi-hole pozwala na optymalizację działania sieci oraz szybką identyfikację ewentualnych problemów.
