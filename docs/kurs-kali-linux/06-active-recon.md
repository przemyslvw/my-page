---
id: "active-recon"
title: "🔍 Active Recon – interaktywne skanowanie"
sidebar_position: 6
---

# 🔍 Active Recon – interaktywne skanowanie

Active Recon (aktywne rozpoznanie) to etap, w którym wchodzimy w interakcję z celem, wysyłając zapytania sieciowe w celu identyfikacji dostępnych usług, podatności i ukrytych zasobów.

---

## 📡 Skanowanie portów (Nmap)
Nmap (Network Mapper) to jedno z najpotężniejszych narzędzi do skanowania sieci i wykrywania usług.

### **1️⃣ Podstawowe skanowanie**
```bash
nmap example.com
```
To polecenie wykryje otwarte porty na podanym serwerze.

### **2️⃣ Skanowanie pełnego zakresu portów**
```bash
nmap -p- example.com
```
Skanuje wszystkie 65535 portów.

### **3️⃣ Identyfikacja usług i wersji**
```bash
nmap -sV example.com
```
Pozwala określić, jakie usługi działają na otwartych portach i w jakich wersjach.

### **4️⃣ Wykrywanie systemu operacyjnego**
```bash
nmap -O example.com
```
Próbuje zidentyfikować system operacyjny celu.

### **5️⃣ Skanowanie agresywne (pełne informacje)**
```bash
nmap -A example.com
```
Zawiera skanowanie wersji, wykrywanie systemu operacyjnego i traceroute.

### **6️⃣ Wykrywanie zapór sieciowych (Firewall/IDS evasion)**
```bash
nmap -Pn example.com
```
Używane w sytuacji, gdy host nie odpowiada na ping.

Więcej technik Nmap: [https://nmap.org/book/man.html](https://nmap.org/book/man.html)

---

## 🔎 Fuzzing adresów URL (ffuf, gobuster)
Fuzzing to metoda dynamicznego testowania aplikacji w celu wykrycia ukrytych katalogów, plików oraz parametrów.

### **1️⃣ Wyszukiwanie katalogów i plików (Gobuster)**
```bash
gobuster dir -u http://example.com -w /usr/share/wordlists/dirb/common.txt
```
Parametry:
- `-u` – URL celu
- `-w` – lista słów do testowania

### **2️⃣ Fuzzing parametrów HTTP (ffuf)**
```bash
ffuf -u http://example.com/FUZZ -w wordlist.txt
```
Skanuje potencjalne endpointy na serwerze.

Przykład fuzzingu parametrów:
```bash
ffuf -u "http://example.com/page.php?FUZZ=test" -w params.txt
```
To pozwala znaleźć ukryte parametry w aplikacji.

---

## 🖥️ Fingerprinting aplikacji webowych
Fingerprinting pozwala określić, jakie technologie i frameworki są używane przez aplikację.

### **1️⃣ Wappalyzer – analiza technologii**
Narzędzie dostępne jako rozszerzenie do przeglądarek:
[https://www.wappalyzer.com/](https://www.wappalyzer.com/)

### **2️⃣ WhatWeb – skanowanie technologii z poziomu terminala**
```bash
whatweb example.com
```
Wykrywa CMS-y, serwery, frameworki i biblioteki JS.

### **3️⃣ BuiltWith – online fingerprinting**
[https://builtwith.com/](https://builtwith.com/) pozwala na identyfikację technologii używanych na stronie.

### **4️⃣ Netcraft – analiza serwera**
[https://www.netcraft.com/](https://www.netcraft.com/) dostarcza informacji o serwerze, domenie i certyfikatach SSL.

---

Active Recon dostarcza krytycznych informacji o infrastrukturze celu. Kolejnym krokiem będzie **Enumeracja subdomen i Subdomain Takeover**! 🚀
