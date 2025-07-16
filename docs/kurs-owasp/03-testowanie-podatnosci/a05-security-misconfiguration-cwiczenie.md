---
id: "a05-security-misconfiguration-cwiczenie"
title: "🛠️ 3.5.5 – Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 25
---

## 🎯 Cel ćwiczenia

Celem ćwiczenia jest:
- wykrycie błędów konfiguracyjnych,
- przeprowadzenie testów eksploracyjnych,
- wdrożenie mitigacji na poziomie serwera i aplikacji.

---

## 🧪 Scenariusz testowy: Brak nagłówków bezpieczeństwa

### Aplikacja:
Publiczny serwis API hostowany na serwerze nginx.

### Krok 1: Sprawdzenie nagłówków HTTP

W narzędziu typu `curl`, `httpx` lub `ZAP`, wyślij żądanie:

```bash
curl -I https://example.com
```

➡️ Odpowiedź:

```
HTTP/1.1 200 OK
Server: nginx
...
```

Brak nagłówków takich jak:
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Strict-Transport-Security`
- `Content-Security-Policy`

---

### Krok 2: Weryfikacja konfiguracji serwera

Plik `nginx.conf`:

```nginx
server {
  ...
  add_header X-Content-Type-Options "nosniff";
  add_header X-Frame-Options "SAMEORIGIN";
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
  add_header Content-Security-Policy "default-src 'self'";
}
```

Dodaj brakujące nagłówki, przeładuj serwer i powtórz test.

---

## 🛠️ Scenariusz 2: Publiczny dostęp do środowiska dev

Odwiedź:
```
https://dev.example.com
```

➡️ Aplikacja z wersją developerską i wyłączonym uwierzytelnieniem. Umożliwia edycję danych, podgląd tokenów.

**Mitigacja:** zablokuj dostęp po IP, wymagaj autoryzacji, oznacz środowisko jako prywatne.

---

## 🧠 Dodatkowe scenariusze

- Sprawdź dostęp do katalogów (`/config`, `/logs`, `/backup`)
- Zidentyfikuj niezabezpieczone usługi na porcie (Redis, Jenkins)
- Zbadaj konfigurację CORS (`Access-Control-Allow-Origin: *`)

---

## ✅ Zadania do wykonania

- [ ] Wykonaj test nagłówków i środowisk.
- [ ] Zidentyfikuj co najmniej jeden błąd konfiguracyjny.
- [ ] Przedstaw propozycję poprawki w raporcie końcowym.


## ✅ Zadania wykonane – Security Misconfiguration (A05:2025)

---

### ☑️ Wykonano test nagłówków i środowisk

#### Test: curl -I https://example.com

**Wynik:**
```
HTTP/1.1 200 OK
Server: nginx/1.22.1
Date: ...
Content-Type: text/html
```

**Brakujące nagłówki:**
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Strict-Transport-Security`
- `Content-Security-Policy`

---

### ☑️ Zidentyfikowano błąd konfiguracyjny

- Publiczny dostęp do panelu developerskiego:
  - URL: `https://dev.example.com`
  - Brak autoryzacji, środowisko dev dostępne bez ograniczeń.
- Brak nagłówków zabezpieczających na stronie głównej.
- Brak blokady dostępu do katalogu `/config/` – możliwy wyciek plików `appsettings.json`.

---

### ☑️ Propozycje poprawek

#### 🔧 Konfiguracja serwera nginx

Dodano brakujące nagłówki w `nginx.conf`:

```nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
add_header Content-Security-Policy "default-src 'self'";
```

#### 🔒 Ochrona środowiska dev

- Wymuszono uwierzytelnienie HTTP Basic Auth.
- Dodano reguły dostępu tylko z sieci firmowej (VPN).
- Środowisko zostało ukryte w DNS i za load balancerem z kontrolą IP.

---

## 📌 Uwagi końcowe

Błędy konfiguracyjne są często trywialne do wykrycia, ale mogą mieć katastrofalne skutki. Regularne testy oraz checklisty są podstawą bezpieczeństwa infrastruktury.

Wszystkie znaleziska i poprawki zostały uwzględnione w raporcie końcowym.
