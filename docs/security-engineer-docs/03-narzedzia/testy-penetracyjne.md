---
id: "testy-penetracyjne"
title: "Testy penetracyjne"
sidebar_position: 1
---

Testy penetracyjne (pentesty) to kontrolowane, symulowane ataki na system informatyczny, aplikację lub infrastrukturę organizacji, wykonywane w celu zidentyfikowania podatności oraz oceny odporności na realne zagrożenia.

##  Cele testów penetracyjnych

- Sprawdzenie, czy da się obejść mechanizmy bezpieczeństwa
- Identyfikacja błędów konfiguracyjnych, niezałatanych podatności i słabych punktów logiki aplikacji
- Symulacja realnych scenariuszy ataku – z punktu widzenia zewnętrznego napastnika lub zaufanego użytkownika
- Ocena ryzyka i możliwych skutków udanego ataku
- Weryfikacja skuteczności mechanizmów detekcji i reakcji (SIEM, EDR)

##  Rodzaje testów penetracyjnych

- **Black-box** – brak wiedzy o systemie, symuluje atak spoza organizacji
- **White-box** – pełen dostęp do kodu źródłowego, dokumentacji, uprawnień
- **Gray-box** – częściowa wiedza (np. dostęp testowy, ograniczony kod)
- **Internal pentest** – test infrastruktury wewnętrznej, urządzeń, aplikacji dostępnych tylko z sieci LAN
- **External pentest** – analiza usług narażonych na Internet
- **Web application pentest** – testy aplikacji webowej (OWASP Top 10, logika biznesowa)
- **Wireless pentest** – testy sieci Wi-Fi, konfiguracji i podatności radiowych
- **Social engineering** – phishing, vishing, próby fizycznego dostępu (tylko przy wcześniejszym uzgodnieniu)
- **Red Teaming** – długoterminowa, realistyczna kampania ataku obejmująca fizyczne, techniczne i socjotechniczne wektory

##  Narzędzia do testów

- **Recon i scanning**: nmap, amass, Shodan, recon-ng
- **Exploitation**: Metasploit, sqlmap, Burp Suite Pro, OWASP ZAP
- **Web**: wfuzz, dirsearch, ffuf, jwt_tool, Postman, mitmproxy
- **Wireless**: aircrack-ng, hcxdumptool, Bettercap
- **Custom scripts**: Python/Bash do automatyzacji powtarzalnych kroków

##  Etapy testów penetracyjnych

1. **Reconnaissance** – zbieranie informacji (passive/active)
2. **Enumeration** – identyfikacja zasobów, kont, wersji usług
3. **Exploitation** – próba wykorzystania podatności
4. **Post-Exploitation** – eskalacja uprawnień, pivoting, lateral movement
5. **Persistence & Cleanup** – sprawdzenie możliwości utrzymania się i usunięcie śladów
6. **Reporting** – pełna dokumentacja wyników, wektory ataku, rekomendacje

## ✅ Dobre praktyki

- Ustal zakres, cele i zgodę pisemną **(Rules of Engagement)** przed rozpoczęciem testów
- Przeprowadzaj testy cyklicznie – najlepiej po każdej większej zmianie lub wdrożeniu
- Testuj nie tylko aplikacje, ale i infrastrukturalne komponenty (DNS, e-mail, VPN)
- Zawsze przygotuj i przetestuj środowisko testowe lub maszyny backupowe
- Dokumentuj nie tylko udane ataki, ale też wszystkie próby i obserwacje

> Testy penetracyjne są jak próbny włam – lepiej zaprosić kogoś, kto powie Ci prawdę, niż czekać na atak, który Ci ją pokaże.
