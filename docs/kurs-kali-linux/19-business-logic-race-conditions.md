---
id: "business-logic-race-conditions"
title: "Logika biznesowa i Race Conditions"
sidebar_label: "🧩 Logika biznesowa i Race Conditions"
sidebar_position: 19
---

# 🧩 Logika biznesowa i Race Conditions

Nie każda podatność to wstrzyknięcie kodu. **Błędy logiki biznesowej** wynikają z błędnych założeń projektowych — aplikacja działa „zgodnie z kodem", ale niezgodnie z intencją. Tych luk nie wykryje skaner: wymagają zrozumienia procesu biznesowego. **Race conditions** to ich szczególny, czasowy wariant. To obszar OWASP **A04 – Insecure Design**.

---

## 🧠 Czym jest błąd logiki biznesowej?

To luka pozwalająca obejść zamierzony przepływ aplikacji poprzez:
- pominięcie lub zmianę kolejności kroków,
- manipulację wartościami, które aplikacja „ufa" klientowi,
- wykorzystanie założeń, których serwer nie egzekwuje.

Skanery widzą składnię, nie **intencję** — dlatego te błędy znajduje się manualnie.

---

## 💥 Typowe klasy błędów logiki

### **1️⃣ Manipulacja ceną i ilością**
Aplikacja ufa wartościom z żądania:
```http
POST /cart/add
{"product_id": 42, "quantity": -5, "price": 0.01}
```
Ujemna ilość obniżająca koszyk, nadpisana cena, manipulacja rabatem — klasyka e-commerce.

### **2️⃣ Pominięcie kroków przepływu (Flow Bypass)**
Proces wieloetapowy (koszyk → płatność → potwierdzenie). Test: wywołaj endpoint potwierdzenia **z pominięciem płatności**:
```http
POST /checkout/complete?order=1337
```
Jeśli zamówienie zostaje zrealizowane bez kroku płatności — logika jest po stronie klienta.

### **3️⃣ Nadużycie zaufanego parametru**
Pola typu `isAdmin`, `role`, `account_type`, `discount` przesyłane przez klienta i akceptowane przez serwer (powiązanie z **Mass Assignment**):
```http
PATCH /api/user
{"email":"x@x.com","role":"admin"}
```

### **4️⃣ Obejście limitów (kupony, próby, zaproszenia)**
- Wielokrotne użycie jednorazowego kuponu.
- Obejście limitu prób przez zmianę identyfikatora/sesji.
- Negatywne wartości przy transferach (powodujące „ujemny" przelew = zysk).

### **5️⃣ Niespójne kontrole autoryzacji**
Sprawdzenie uprawnień w jednym endpointcie, ale nie w jego wariancie (`GET` chroniony, `POST` nie) — powiązanie z IDOR/Broken Access Control.

---

## ⏱️ Race Conditions

Race condition występuje, gdy wynik zależy od kolejności równoległych żądań, a aplikacja zakłada operacje sekwencyjne. Krytyczne jest **okno czasowe** między sprawdzeniem warunku a jego użyciem (**TOCTOU – Time-of-Check to Time-of-Use**).

### **1️⃣ Typowe cele**
- **Limit-overrun** – wielokrotne użycie jednorazowego kuponu/gift carda wysłane równolegle.
- **Podwójne wydanie środków** – wypłata/przelew zatwierdzony wielokrotnie zanim saldo się zaktualizuje.
- **Obejście limitów** – rejestracja, głosowanie, rate-limit.

### **2️⃣ Eksploatacja – single-packet attack**
Nowoczesna technika (badania PortSwigger) wysyła wiele żądań tak, by dotarły **w tym samym oknie czasowym**, neutralizując jitter sieci. W **Burp Repeater**:
1. Zgrupuj żądania w jednej grupie (tab group).
2. Wybierz **„Send group in parallel (single-packet attack)"**.
3. Zduplikuj podatne żądanie 20–50 razy i wyślij równolegle.

### **3️⃣ Eksploatacja w `ffuf` / skrypcie**
Szybkie zrównoleglenie pomocniczo (mniej precyzyjne niż single-packet):
```bash
ffuf -u https://example.com/coupon/redeem -X POST \
  -H "Cookie: session=..." \
  -d 'code=PROMO50' -w <(seq 30) -p 0 -t 30
```
Lub `seq 1 30 | xargs -P 30 -I{} curl -s -X POST ...` — 30 równoległych żądań.

### **4️⃣ Potwierdzenie podatności**
Po wysłaniu serii sprawdź skutek: czy kupon zadziałał wielokrotnie, czy saldo spadło poniżej zera, czy powstało kilka rekordów tam, gdzie powinien być jeden.

---

## 🔎 Metodyka testowania logiki

1. **Zrozum proces biznesowy** – co aplikacja ma osiągnąć i jakie ma założenia.
2. **Zadawaj „co jeśli"** – co przy wartości ujemnej, zerowej, ogromnej, pominiętym kroku?
3. **Testuj granice i kolejność** – zmień sekwencję, powtórz, zrównoleglij.
4. **Atakuj zaufanie do klienta** – wszystko, co przychodzi od użytkownika, jest podejrzane.
5. **Dokumentuj wpływ biznesowy** – tu liczy się skutek finansowy/operacyjny, nie payload.

---

## 🔐 Jak zabezpieczyć aplikację?
✅ **Egzekwuj logikę po stronie serwera** – nigdy nie ufaj cenie, roli czy krokom z klienta.
✅ **Waliduj zakresy i niezmienniki** (ilość > 0, saldo ≥ 0, krok N tylko po N-1).
✅ **Używaj transakcji i blokad** (DB locks, atomic operations, idempotency keys) przeciw race conditions.
✅ **Stosuj idempotencję** dla operacji finansowych (jednorazowy token operacji).
✅ **Threat modeling na etapie projektu** – A04 to problem projektowy, nie tylko implementacyjny.

---

Logika biznesowa to obszar, gdzie pentester wygrywa z automatami. Kolejnym krokiem będą **Ataki po stronie klienta (Client-Side)**! 🚀
