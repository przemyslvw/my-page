---
id: "identyfikacja-technologii"
title: "Identyfikacja technologii frontendowych i backendowych"
sidebar_position: 1
---

##  Cel rozdziału

Rozpoznanie stosowanych technologii frontendowych i backendowych w aplikacji webowej to **pierwszy krok do efektywnego testu bezpieczeństwa**. Każda technologia ma swój profil ryzyka, znane luki oraz specyficzne wektory ataku.

---

##  Co to jest stos technologiczny?

**Stos technologiczny** (ang. *tech stack*) to zestaw narzędzi i frameworków użytych do budowy aplikacji.

Podział na dwie główne warstwy:

- **Frontend** – to, co widzi użytkownik (HTML, JS, CSS).
- **Backend** – logika aplikacji, bazy danych, API, autoryzacja.

---

## 🕵️ Jak identyfikować technologie?

###  1. Analiza frontendu (z poziomu przeglądarki)

| Metoda | Opis |
|--------|------|
| **Nagłówki HTTP** | Informacje o serwerze, frameworku. |
| **Konsola przeglądarki (DevTools)** | Biblioteki JS, nazwy frameworków (np. Angular, React, Vue). |
| **Pliki `manifest.json`, `robots.txt`, itp.** | Często zawierają metadane o technologii. |
| **Struktura plików i klas CSS/JS** | Np. `ng-`, `react-`, `v-` mogą zdradzać framework. |

###  2. Analiza backendu (z zewnątrz)

| Metoda | Opis |
|--------|------|
| **Nagłówki HTTP** | `Server`, `X-Powered-By`, `Set-Cookie` (np. PHPSESSID, JSESSIONID). |
| **Analiza błędów serwera** | Stack trace, ścieżki, formaty komunikatów. |
| **Fingerprinting (np. Wappalyzer, BuiltWith)** | Narzędzia identyfikujące technologie na podstawie wzorców. |
| **Rekonesans pasywny (np. Shodan, Censys)** | Odczyt informacji z metadanych serwera, TLS itp. |

---

## 🛠️ Przykładowe narzędzia

### 🔓 Darmowe:

- [Wappalyzer](https://www.wappalyzer.com/)
- [BuiltWith](https://builtwith.com/)
- [WhatRuns](https://www.whatruns.com/)
- curl / httpx / ffuf (CLI do badania nagłówków i zasobów)
- Nikto (podstawowy skaner serwera HTTP)

### 💼 Komercyjne:

- Burp Suite Professional (identyfikacja backendów, fingerprinting)
- Detectify (kompletny profil aplikacji)
- Intruder.io (asset discovery z analizą stacku)

---

##  Przykład

```bash
curl -I https://example.com
```

Odpowiedź:
```
Server: Apache/2.4.41 (Ubuntu)
X-Powered-By: PHP/7.4.3
```

➡️ Backend: Apache + PHP

---

##  Dlaczego to ważne?

- Pomaga dobrać odpowiednie narzędzia i payloady.
- Umożliwia identyfikację **znanych podatności** dla danego stacku.
- Kluczowe do mapowania powierzchni ataku.

---

## 📌 Podsumowanie

> Zanim zaczniesz atakować aplikację, **musisz wiedzieć, co testujesz**. Im więcej informacji o stacku – tym lepszy plan działania.

---

W kolejnym rozdziale omówimy **narzędzia do automatycznej i ręcznej analizy stosu technologicznego**.
