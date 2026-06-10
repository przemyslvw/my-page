---
id: "a05-security-misconfiguration-narzedzia"
title: "🧰 3.5.4 – Narzędzia do testowania"
sidebar_position: 24
---

## 🧰 Narzędzia do testowania Security Misconfiguration

Poniżej znajduje się lista narzędzi – darmowych i komercyjnych – pomocnych w wykrywaniu błędów konfiguracji w aplikacjach webowych, serwerach, kontenerach i chmurze.

---

###  Narzędzia darmowe (open source)

| Narzędzie | Opis |
|----------|------|
| **OWASP ZAP** | Automatyczny skaner aplikacji – wykrywa brak nagłówków, niezabezpieczone endpointy, błędy CORS. |
| **Nikto** | Skaner serwera WWW – sprawdza niebezpieczne pliki, nagłówki, metody HTTP. |
| **testssl.sh** | Skrypt bash do testowania konfiguracji SSL/TLS. |
| **nmap** | Skanowanie otwartych portów, wykrywanie usług. |
| **LinEnum / LinPEAS** | Lokalne testy błędów konfiguracji w systemach Linux. |
| **kube-hunter** | Skaner błędów konfiguracji klastra Kubernetes. |
| **dockle** | Testowanie kontenerów Docker pod kątem best practices. |
| **trivy** | Skanowanie obrazów Docker, konfiguracji i podatności. |
| **gitleaks** | Wyszukiwanie poświadczeń i sekretów w repozytoriach Git. |

---

### 💼 Narzędzia komercyjne

| Narzędzie | Opis |
|----------|------|
| **Burp Suite Pro** | Zaawansowany skaner + możliwość pisania własnych testów. |
| **Acunetix** | Skanowanie OWASP Top 10, błędów konfiguracji, testy CORS i nagłówków. |
| **Detectify** | Skanowanie zewnętrzne, wykrywanie endpointów i błędów bezpieczeństwa. |
| **Qualys Web Application Scanner** | Testy konfiguracyjne i podatności w aplikacjach i środowisku chmurowym. |
| **Rapid7 InsightAppSec** | Automatyczne testy aplikacji i błędów konfiguracyjnych. |

---

## ✅ Rekomendacja

🔎 **Zautomatyzowane skanery** są pomocne, ale:
- **nie zastąpią przeglądu manualnego konfiguracji**, zwłaszcza w środowiskach staging i chmurowych.
- warto je łączyć z testami logiki i checklistami OWASP.

---

W następnym kroku: **3.5.5 – Praktyczne ćwiczenie: Testowanie i mitigacja**
