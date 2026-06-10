---
id: "wstep-do-kursu"
title: "Wstęp do kursu Kali Linux – Testy penetracyjne aplikacji webowych"
sidebar_label: "📖 Wstęp do kursu Kali Linux – Testy penetracyjne aplikacji webowych"
sidebar_position: 1
---

# 📖 Wstęp do kursu Kali Linux – Testy penetracyjne aplikacji webowych

## 🎯 Cele kursu i czego się nauczysz
Ten kurs jest praktycznym przewodnikiem po testach penetracyjnych aplikacji webowych z wykorzystaniem Kali Linux. Po ukończeniu kursu:

- Opanujesz Kali Linux i kluczowe narzędzia pentesterskie.
- Nauczysz się przeprowadzać testy penetracyjne – skanowanie, enumerację i eksploitację systemów.
- Poznasz techniki hakowania systemów Linux i Windows.
- Odkryjesz podatności OWASP Top 10 i nauczysz się ich wykorzystywania.
- Zautomatyzujesz ataki przy użyciu narzędzi takich jak `sqlmap`.
- Opanujesz techniki Reverse Shell i Post-Exploitation.
- Przećwiczysz wszystko na realnych case study z platformy HTB (Hack The Box).

## 👥 Dla kogo jest ten kurs?
Kurs jest przeznaczony dla:
- Początkujących i średnio zaawansowanych pentesterów.
- Administratorów systemów i specjalistów ds. bezpieczeństwa.
- Programistów chcących lepiej zrozumieć podatności w aplikacjach webowych.
- Osób przygotowujących się do certyfikacji takich jak **OSCP**, **eWPTX**, czy **CEH**.

Nie musisz być ekspertem – wystarczy podstawowa znajomość systemu Linux i sieci komputerowych.

## 🗂️ Typy audytów bezpieczeństwa

Nie każde zaangażowanie wygląda tak samo. Przed zleceniem klient i pentester muszą ustalić, jaki typ audytu jest potrzebny:

| Typ | Co obejmuje | Kiedy stosować |
|-----|-------------|----------------|
| **Vulnerability Assessment** | Automatyczne skanowanie, raport podatności bez exploitacji | Szybki przegląd stanu, audyt zgodności |
| **Compliance Assessment** | Weryfikacja zgodności z normą (ISO 27001, PCI DSS, HIPAA) | Certyfikacja, wymogi prawne |
| **Traditional Pentest** | Pełna exploitacja, eskalacja, post-exploitation | Weryfikacja realnego ryzyka |
| **Application Assessment** | Skupiony na jednej aplikacji webowej/mobilnej/API | OWASP Top 10, code review + test |

### Perspektywa atakującego (zakres wiedzy)

- **Black Box** — pentester nie ma żadnej wiedzy wstępnej, symuluje zewnętrznego atakującego
- **Grey Box** — częściowa wiedza (np. konto testowe, schemat API), realistyczny scenariusz
- **White Box** — pełny dostęp (kod źródłowy, dokumentacja, dane dostępowe), maksymalna głębokość analizy

---

## ⚖️ Etyka i legalność testów penetracyjnych
Testy penetracyjne muszą być przeprowadzane zgodnie z prawem i etyką. Pamiętaj o następujących zasadach:

- **Zawsze uzyskuj zgodę** przed testowaniem systemów, które do Ciebie nie należą.
- **Nie przeprowadzaj ataków na produkcyjne środowiska** bez odpowiednich zezwoleń.
- **Przestrzegaj regulacji prawnych**, takich jak **RODO, GDPR, CFAA**.
- **Używaj zdobytej wiedzy w sposób etyczny** – celem jest poprawa bezpieczeństwa, a nie wyrządzanie szkód.

Pentesterzy działają w ramach prawa, pomagając organizacjom w zabezpieczaniu ich systemów. Jeżeli chcesz profesjonalnie zajmować się testami penetracyjnymi, warto zapoznać się z certyfikacjami oraz kodeksem etyki hackerów.

---

---

## 📅 Historia aktualizacji kursu

| Data | Zakres zmian |
|------|-------------|
| 10.06.2026 | Dodanie modułów: Enumeracja subdomen & Subdomain Takeover (poz. 7), Łamanie haseł offline – Hashcat/John (poz. 24), Podatne zależności, SCA & DevSecOps (poz. 29). Uzupełnienie rekonesansu o subfinder/amass/crt.sh |
| 10.06.2026 | Rozbudowa o moduły zaawansowane (poz. 17–20, 26): OAuth/OIDC/SAML, Logika biznesowa & Race Conditions, ataki Client-Side (CORS/Clickjacking/Prototype Pollution/postMessage), HTTP Request Smuggling & Web Cache Poisoning, Bezpieczeństwo aplikacji LLM/AI (OWASP Top 10 for LLM) |
| 10.06.2026 | Domknięcie OWASP Top 10: nowe moduły CSRF, XXE, File Upload & Web Shells, Insecure Deserialization (poz. 13–16). Odświeżenie analizy incydentów (Log4Shell, MOVEit/CL0P, Citrix Bleed, XZ Utils), dodanie CVSS 4.0/EPSS/KEV. Poprawki: składnia Hydry (API), Evilginx 3.x, konfiguracja bazy DVWA, doprecyzowanie 5ire |
| 18.04.2026 | Aktualizacja do Kali Linux 2026.1: nowe narzędzia (Atomic-Operator, AdaptixC2, XSStrike, SSTImap), sekcja AI/LLM w pentestach, uzupełnienie testów Azure, poprawki deprecated komend |

To tyle we wstępie! Przejdźmy do kolejnego kroku – instalacji i konfiguracji Kali Linux. 🚀
