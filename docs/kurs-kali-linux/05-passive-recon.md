---
id: "passive-recon"
title: "Passive Recon – zbieranie informacji bez pozostawiania śladów"
sidebar_position: 5
---

# Passive Recon – zbieranie informacji bez pozostawiania śladów

Passive Recon (pasywne rozpoznanie) to etap testów penetracyjnych, w którym zbieramy informacje o celu bez bezpośredniego kontaktu z jego infrastrukturą. Dzięki temu pozostajemy niewidoczni dla systemów monitorujących ruch sieciowy.

---

##  Google Dorking
**Google Dorking** to technika wyszukiwania wrażliwych informacji w Google przy użyciu specjalnych operatorów.

Przykładowe dorki:
- **Pliki konfiguracyjne**: `ext:env OR ext:ini OR ext:log OR ext:sql "DB_PASSWORD"`
- **Dostęp do paneli logowania**: `inurl:admin OR inurl:login`
- **Pliki z hasłami**: `intitle:index.of passwords`
- **Kamery IP online**: `inurl:/view.shtml`

Przykładowe użycie:
```
site:example.com filetype:pdf "confidential"
inurl:"wp-content/uploads" site:example.com
```

Aby uniknąć blokady Google, można używać proxy lub TOR.

---

##  WHOIS, Shodan, theHarvester

### **1️⃣ WHOIS – informacje o domenie**
WHOIS pozwala uzyskać dane rejestracyjne domeny i jej właściciela.

Przykład użycia:
```bash
whois example.com
```

Informacje, które możemy uzyskać:
- Rejestrator domeny
- Dane kontaktowe właściciela (jeśli nie jest ukryte)
- Serwery DNS

### **2️⃣ Shodan – wyszukiwarka podatnych urządzeń**
Shodan pozwala wyszukiwać urządzenia podłączone do internetu, np. serwery, kamery, IoT.

Przykłady zapytań:
- **Otwarta baza danych MongoDB**: `product:MongoDB country:PL`
- **Niebezpieczne RDP (Windows)**: `port:3389 country:PL`
- **Urzadzenia CISCO ASA**: `cisco asa port:443`

Użycie w Kali Linux:
```bash
shodan search "default password"
```

### **3️⃣ theHarvester – zbieranie e-maili, subdomen i metadanych**
theHarvester jest przydatny do zbierania publicznych informacji o domenie.

Przykład skanowania domeny:
```bash
theHarvester -d example.com -b google
```
Opcje:
- `-b google` – wyszukiwanie w Google
- `-b linkedin` – zbieranie danych z LinkedIn
- `-b all` – wszystkie dostępne źródła

---

##  OSINT i analiza footprintu
**OSINT (Open-Source Intelligence)** to gromadzenie informacji z publicznych źródeł:
- **Media społecznościowe**: Facebook, LinkedIn, Twitter
- **Repozytoria kodu**: GitHub, GitLab
- **Rejestry SSL/TLS**: crt.sh
- **Metadane plików**: ExifTool, FOCA

Przykład pobrania metadanych z pliku PDF:
```bash
exiftool dokument.pdf
```

Narzędzia do OSINT:
- **SpiderFoot** – automatyczna analiza
- **Maltego** – wizualizacja relacji między danymi
- **Recon-ng** – modularne narzędzie do OSINT

Przykład użycia Recon-ng:
```bash
recon-ng
modules search domains
use domains-whois
```

---

Dzięki tym technikom możemy zdobyć wiele kluczowych informacji, zanim jeszcze nawiążemy kontakt z celem. Kolejnym krokiem będzie **Active Recon – interaktywne skanowanie**! 🚀
