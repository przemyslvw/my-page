---
id: "a10-ssrf-narzedzia"
title: "Narzędzia do testowania"
sidebar_position: 49
---

# 🛠️ Narzędzia do testowania – Server-Side Request Forgery (SSRF) (A10:2025)

Testowanie SSRF polega na identyfikacji punktów w aplikacji, które umożliwiają wykonanie zdalnego żądania HTTP na podstawie danych dostarczonych przez użytkownika. Poniżej przedstawiono narzędzia (zarówno darmowe, jak i komercyjne) przydatne do identyfikacji i eksploatacji SSRF.

---

##  Narzędzia bezpłatne

| Narzędzie | Opis |
|----------|------|
| **Burp Suite Community** | Możliwość manualnego testowania parametrów URL, proxy, repeater. |
| **OWASP ZAP** | Darmowy skaner z możliwością modyfikacji żądań i rejestrowania odpowiedzi. |
| **SSRFmap** | Automatyzuje testy SSRF – wykorzystuje znane payloady i wzorce. |
| **Interactsh** | Serwer do logowania żądań DNS/HTTP – do wykrywania SSRF i RCE. |
| **Amass** | Pomocnicze narzędzie do mapowania DNS – przydatne przy atakach przez DNS rebinding. |
| **Curl / Wget** | Przydatne do manualnego wykonywania żądań podczas testów SSRF lokalnie. |

---

## 💼 Narzędzia płatne / komercyjne

| Narzędzie | Opis |
|----------|------|
| **Burp Suite Professional** | Zaawansowany skaner i Burp Collaborator do detekcji SSRF. |
| **Detectify** | Zewnętrzny skaner aplikacji webowych, wykrywa także SSRF. |
| **Intruder.io** | Skanowanie podatności, w tym SSRF, z poziomu chmury. |
| **Invicti (dawniej Netsparker)** | Komercyjny DAST z dobrą detekcją SSRF, IDOR, RCE. |

---

##  Infrastruktura do testów

| Narzędzie / Serwis | Opis |
|--------------------|------|
| **Burp Collaborator** | Usługa wykrywająca wycieki SSRF, XXE, RCE poprzez logi DNS/HTTP. |
| **Interact.sh** | Lekka alternatywa open-source dla Burp Collaborator. |
| **ngrok / localtunnel** | Wystawianie usług lokalnych do internetu – przydatne do testowania reakcji aplikacji na żądania zwrotne. |

---

## ✅ Rekomendacje

- Testuj ręcznie z proxy i narzędziami do rejestrowania żądań wychodzących.
- Używaj Interactsh lub Collaborator do potwierdzania SSRF.
- Skonfiguruj własny serwer do detekcji (np. DNS, HTTP logger).
- Używaj automatycznych narzędzi (SSRFmap) do szybkiego skanowania aplikacji.

---

Dobre testowanie SSRF to połączenie automatyzacji, kreatywności i monitorowania sieci po stronie aplikacji.
