---
id: "narzedzia-do-analizy"
title: "Narzędzia do analizy stosu technologicznego"
sidebar_position: 2
---

##  Cel rozdziału

Poznasz narzędzia, które umożliwią automatyczną lub półautomatyczną identyfikację technologii używanych w aplikacjach webowych. Narzędzia te pomogą w:
- profilowaniu aplikacji,
- wykrywaniu frameworków i serwerów,
- mapowaniu powierzchni ataku.

---

##  Kategorie narzędzi

### 🔎 1. Analiza klienta (frontend)

| Narzędzie | Typ | Opis |
|----------|-----|------|
| [**Wappalyzer**](https://www.wappalyzer.com/) | Darmowe / płatne | Wtyczka do przeglądarki i API do detekcji stacku aplikacji. |
| [**BuiltWith**](https://builtwith.com/) | Freemium | Webowy fingerprinting technologii frontend/back. |
| [**WhatRuns**](https://www.whatruns.com/) | Darmowe | Rozszerzenie przeglądarki do wykrywania bibliotek JS i frameworków. |

---

###  2. Analiza serwera (backend)

| Narzędzie | Typ | Opis |
|----------|-----|------|
| `curl` / `httpx` | CLI | Badanie nagłówków serwera. |
| **Nmap** + skrypty NSE | CLI | Detekcja usług i ich wersji (`-sV`, `http-title`, `http-headers`). |
| **Nikto** | CLI | Skanowanie serwerów HTTP, stare wersje, błędy konfiguracyjne. |

---

###  3. Narzędzia ofensywne z funkcją fingerprintingu

| Narzędzie | Typ | Opis |
|----------|-----|------|
| **Burp Suite (Community/Pro)** | GUI | Identyfikacja technologii backendu na podstawie odpowiedzi. |
| **OWASP ZAP** | GUI | Profilowanie aplikacji webowej. |
| **WhatWeb** | CLI | Fingerprinting technologii z odpowiedzi HTTP. |
| **Wfuzz** | CLI | Bruteforce + detekcja zasobów + fingerprinting nagłówków. |

---

### 4. Narzędzia komercyjne (SaaS/API)

| Narzędzie | Opis |
|----------|------|
| **Detectify** | Automatyczne testy + fingerprint stacku i znanych podatności. |
| **Intruder.io** | Discovery + passive scan + powiązanie stacku z CVE. |
| **Censys / Shodan** | Profilowanie hostów na podstawie skanów Internetu (TLS, porty, metadane). |

---

##  Przykład: analiza przy pomocy curl + WhatWeb

```bash
curl -I https://example.com
```

```bash
whatweb https://example.com
```

Przykładowy wynik:
```
Apache[2.4.41], PHP[7.4.3], WordPress, jQuery
```

➡️ Detekcja backendu (Apache + PHP) i CMS (WordPress)

---

## 📦 API do automatyzacji

- **Wappalyzer API** – do integracji z CI/CD lub automatycznymi testami.
- **BuiltWith API** – płatne, zaawansowana analiza aplikacji i domen.
- **Censys API** – dane o hostach, certyfikatach, portach.

---

## 📌 Podsumowanie

> Zastosowanie odpowiednich narzędzi pozwala szybko i efektywnie zbudować obraz aplikacji, zanim zaczniemy faktyczne testy bezpieczeństwa. **Profil aplikacji = plan ataku**.

---

W kolejnym rozdziale omówimy, **jak stack technologiczny wpływa na bezpieczeństwo aplikacji i jakie są typowe zagrożenia dla popularnych technologii**.
