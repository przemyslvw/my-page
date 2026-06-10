---
id: "subdomain-enumeration-takeover"
title: "🌐 Enumeracja subdomen i Subdomain Takeover"
sidebar_position: 7
---

# 🌐 Enumeracja subdomen i Subdomain Takeover

Powierzchnia ataku organizacji to nie jedna domena, lecz dziesiątki, czasem tysiące subdomen — często zapomnianych. **Subdomain Takeover** to przejęcie subdomeny wskazującej (przez rekord DNS) na nieistniejący już zasób zewnętrzny. Atakujący rejestruje ten zasób i zaczyna serwować własną treść pod zaufaną domeną ofiary.

---

## 🔎 Enumeracja subdomen

To rozszerzenie rekonesansu (powiązanie z modułami Passive/Active Recon). Im pełniejsza lista subdomen, tym większa szansa znalezienia podatnej.

### **1️⃣ Pasywna enumeracja (bez kontaktu z celem)**
Źródła: certyfikaty (Certificate Transparency), bazy pasywnego DNS, wyszukiwarki.
```bash
# Subfinder — szybki, wiele źródeł pasywnych
subfinder -d example.com -all -o subs.txt

# amass w trybie pasywnym
amass enum -passive -d example.com -o amass.txt

# Certificate Transparency przez crt.sh
curl -s "https://crt.sh/?q=%25.example.com&output=json" | jq -r '.[].name_value' | sort -u
```

### **2️⃣ Aktywna enumeracja (bruteforce + permutacje)**
```bash
# Bruteforce DNS dużą listą
amass enum -active -d example.com -brute -w /usr/share/seclists/Discovery/DNS/dns-Jhaddix.txt

# Szybki bruteforce rozdzielczy
puredns bruteforce /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt example.com
```

### **3️⃣ Rozwiązywanie i sprawdzanie żywych hostów**
```bash
# Rozwiąż subdomeny i zachowaj te z rekordem
cat subs.txt | dnsx -silent -a -resp

# Które odpowiadają po HTTP/HTTPS
cat subs.txt | httpx -silent -status-code -title -tech-detect
```

---

## 💥 Subdomain Takeover

### **1️⃣ Na czym polega?**
Mechanizm „wiszącego" (dangling) rekordu DNS:
1. Firma tworzy `shop.example.com` jako `CNAME` na usługę zewnętrzną (np. `shop.example.com → myshop.myshopify.com`).
2. Usługa zostaje usunięta/wygasa, ale **rekord CNAME w DNS pozostaje**.
3. Atakujący rejestruje `myshop.myshopify.com` u dostawcy.
4. Teraz `shop.example.com` serwuje treść atakującego — pod zaufaną domeną.

### **2️⃣ Wykrywanie wiszących rekordów**
Szukaj subdomen z `CNAME` na zewnętrznych dostawców, które zwracają charakterystyczny komunikat błędu („NoSuchBucket", „There isn't a GitHub Pages site here", „Domain not found"):
```bash
# Sprawdzenie rekordu CNAME
dig CNAME shop.example.com +short

# Automatyczne wykrywanie znanych fingerprintów (subzy)
subzy run --targets subs.txt

# Alternatywnie — nuclei z szablonami takeover
nuclei -l subs.txt -t http/takeovers/ -severity high,critical
```

### **3️⃣ Podatni dostawcy (przykłady)**
GitHub Pages, AWS S3, Heroku, Shopify, Fastly, Azure (`*.azurewebsites.net`, `*.cloudapp.net`, `trafficmanager.net`), Surge.sh, Tumblr, Cargo, Zendesk, Readme.io, Webflow. Bazą fingerprintów jest projekt **can-i-take-over-xyz**.

### **4️⃣ Potwierdzenie przejęcia (PoC)**
Jeśli `app.example.com` ma `CNAME` na nieistniejący bucket S3:
```bash
# Subdomena wskazuje na zwolniony bucket
dig CNAME app.example.com +short   # -> app-assets.s3.amazonaws.com
aws s3 mb s3://app-assets --region us-east-1   # rejestracja tej samej nazwy
```
Po wgraniu pliku `index.html` z nieszkodliwym znacznikiem (np. swój nick + identyfikator zgłoszenia) potwierdzasz przejęcie — **bez** publikowania szkodliwej treści.

> ⚖️ W bug bounty/pentestach jako PoC umieszczaj wyłącznie nieagresywny dowód kontroli (np. plik tekstowy z identyfikatorem zgłoszenia). Nie hostuj phishingu ani złośliwego kodu.

---

## 🎯 Dlaczego to groźne?

- **Phishing pod zaufaną domeną** – ofiary ufają `secure.example.com`.
- **Kradzież ciasteczek** – ciasteczka ustawione na `.example.com` (domena nadrzędna) trafią do przejętej subdomeny.
- **Obejście CORS/OAuth** – zaufanie do wszystkich subdomen (powiązanie z modułami Client-Side i OAuth).
- **Bypass CSP** – jeśli polityka ufa `*.example.com`.

---

## 🔐 Jak się bronić?
✅ **Porządkuj DNS** – usuwaj rekord CNAME/A natychmiast po likwidacji zasobu (decommissioning).
✅ **Regularnie audytuj rekordy DNS** pod kątem wiszących wpisów (automatyczny monitoring).
✅ **Twórz zasób przed dodaniem rekordu DNS**, a usuwaj rekord przed zasobem.
✅ **Ogranicz zaufanie do subdomen** w CORS, OAuth `redirect_uri` i CSP – nie używaj szerokich wildcardów.

---

Enumeracja subdomen i takeover poszerzają powierzchnię ataku, którą warto zmapować na początku. Kolejnym krokiem będą **Injection Attacks (SQL, Command, LDAP)**! 🚀
