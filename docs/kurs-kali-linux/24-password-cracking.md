---
id: "password-cracking"
title: "Łamanie haseł offline (Hashcat i John the Ripper)"
sidebar_position: 24
---

# Łamanie haseł offline (Hashcat i John the Ripper)

W module *Broken Authentication* atakowaliśmy logowanie online (Hydra, Burp Intruder). Tutaj zajmujemy się **łamaniem offline** — gdy po post-exploitation (np. `hashdump`, dump bazy, plik `/etc/shadow`) mamy **hashe** i chcemy odzyskać hasła bez kontaktu z systemem ofiary. Brak rate-limitu i blokad sprawia, że to znacznie potężniejsza technika.

> ⚖️ Łam wyłącznie hashe pozyskane legalnie w ramach autoryzowanego testu lub własne/labowe. Złamane hasła to dane wrażliwe — chroń je i usuń po zakończeniu zlecenia.

---

##  Najpierw: identyfikacja typu hasha

Zanim zaczniesz łamać, ustal algorytm:
```bash
# hashid / hash-identifier
hashid '$2y$10$N9qo8uLOickgx2ZMRZoMy...'

# Nazewnictwo trybów Hashcat
hashcat --help | grep -i bcrypt
```
Najczęstsze typy i tryby Hashcat (`-m`):

| Hash | Hashcat `-m` | Kontekst |
|------|-------------|----------|
| MD5 | 0 | stare aplikacje |
| SHA-256 | 1400 | aplikacje webowe |
| bcrypt | 3200 | nowoczesne aplikacje (wolny, mocny) |
| NTLM | 1000 | hashe Windows (SAM, hashdump) |
| NetNTLMv2 | 5600 | przechwycone przez Responder |
| Kerberos TGS (Kerberoasting) | 13100 | Active Directory |
| sha512crypt (`$6$`) | 1800 | Linux `/etc/shadow` |
| WPA/WPA2 | 22000 | handshake Wi-Fi |

---

## 🔥 Hashcat

Hashcat wykorzystuje **GPU** — jest bardzo szybki dla podatnych algorytmów.

### **1️⃣ Atak słownikowy (Straight)**
```bash
hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt
```
- `-m 0` – typ hasha (MD5),
- `-a 0` – tryb słownikowy.

### **2️⃣ Słownik + reguły (mutacje)**
Reguły modyfikują słowa (dopisują cyfry, zamieniają litery — `leet speak`):
```bash
hashcat -m 0 -a 0 hashes.txt rockyou.txt -r /usr/share/hashcat/rules/best64.rule
```

### **3️⃣ Atak maskowy (Brute-force ukierunkowany)**
Gdy znasz wzorzec hasła (np. 8 znaków, pierwsza wielka, na końcu cyfry):
```bash
# u wielka, ?l mała, ?d cyfra, ?s znak specjalny
hashcat -m 0 -a 3 hashes.txt '?u?l?l?l?l?l?d?d'
```

### **4️⃣ Atak kombinowany i hybrydowy**
```bash
# Słownik + dopisana maska (np. word + rok)
hashcat -m 0 -a 6 hashes.txt rockyou.txt '?d?d?d?d'
```

### **5️⃣ Podgląd i odzysk wyników**
```bash
hashcat -m 0 hashes.txt rockyou.txt --status        # postęp
hashcat -m 0 hashes.txt --show                       # pokaż złamane
hashcat --restore                                    # wznów przerwaną sesję
```

---

## 🃏 John the Ripper

John bywa wygodniejszy do hashy „systemowych" i ma świetne narzędzia `*2john`.

### **1️⃣ Przygotowanie hashy Linux**
```bash
# Połącz passwd i shadow w format Johna
unshadow /etc/passwd /etc/shadow > crackme.txt
john crackme.txt --wordlist=/usr/share/wordlists/rockyou.txt
john crackme.txt --show
```

### **2️⃣ Narzędzia `*2john` (ekstrakcja hasha z plików)**
```bash
zip2john secret.zip > zip.hash        # archiwum ZIP
ssh2john id_rsa > ssh.hash            # zaszyfrowany klucz SSH
keepass2john baza.kdbx > kp.hash      # baza KeePass
office2john dokument.docx > doc.hash  # dokumenty Office
john zip.hash --wordlist=rockyou.txt
```

### **3️⃣ Tryby ataku**
```bash
john --wordlist=rockyou.txt --rules hashes.txt   # słownik + reguły
john --incremental hashes.txt                    # bruteforce inkrementalny
```

---

##  Wordlisty celowane (CeWL i crunch)

Gdy rockyou.txt jest zbyt ogólny, warto wygenerować słownik dostosowany do konkretnego celu.

### **CeWL – słownik ze strony atakowanego**
CeWL crawluje stronę internetową i buduje słownik z unikalnych słów — ludzie często używają nazw firmowych, produktów lub terminologii swojej branży w hasłach:

```bash
# Głębokość 3, minimalna długość słowa 6 znaków
cewl -d 3 -m 6 http://example.com -w cewl_wordlist.txt

# Dołącz też e-maile znalezione na stronie
cewl -d 2 -m 6 --email http://example.com -w cewl_wordlist.txt
```

Użycie z Hashcatem:
```bash
hashcat -m 0 -a 0 hashes.txt cewl_wordlist.txt -r best64.rule
```

### **crunch – słownik według polityki haseł**
Gdy znasz dokładną politykę (długość, zestaw znaków), crunch generuje precyzyjny brute-force zamiast losowych list:

```bash
# 8 znaków: małe litery + cyfry
crunch 8 8 abcdefghijklmnopqrstuvwxyz0123456789 -o crunch8.txt

# Wzorzec: wielka, 5 małych, 2 cyfry (np. Klient01)
crunch 8 8 -t @@@@@%^^ \
  -o wzorzec.txt
# = mała litera, % = cyfra, ^ = znak specjalny, , = wielka litera
```

Połączenie CeWL + reguły Hashcat to często skuteczniejsze podejście niż samo crunch dla typowych haseł.

---

## 🔗 Powiązanie z post-exploitation

Typowy łańcuch:
1. Przejęcie systemu → `hashdump` (Windows) lub odczyt `/etc/shadow` (Linux) — patrz moduł *Reverse Shell i Post-Exploitation*.
2. Przechwycenie **NetNTLMv2** w sieci (Responder) → Hashcat `-m 5600`.
3. **Kerberoasting** w AD (`GetUserSPNs.py`) → Hashcat `-m 13100`.
4. Złamane hasło → ruch boczny (password reuse, pass-the-hash) i eskalacja.

---

##  Jak utrudnić łamanie haseł?
✅ **Używaj wolnych, solonych algorytmów** – bcrypt, scrypt, Argon2 (nie MD5/SHA1).
✅ **Wymuszaj długie hasła/passphrasy** – długość bije złożoność przy bruteforce.
✅ **Unikalna sól per użytkownik** – niweczy tęczowe tablice i atak na wiele kont naraz.
✅ **MFA** – nawet złamane hasło nie wystarcza (powiązanie z modułem 2FA).
✅ **Monitoruj wycieki** – sprawdzaj hasła względem list skompromitowanych (HIBP).

---

Łamanie haseł offline zamienia pojedynczy dump w pełną kompromitację tożsamości. Kolejnym krokiem będą **Ataki na uwierzytelnianie wieloskładnikowe (2FA Bypass)**! 🚀
