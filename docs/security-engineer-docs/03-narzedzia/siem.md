---
id: "siem"
title: "Siem"
sidebar_position: 1
---

Systemy SIEM (Security Information and Event Management) są kluczowym elementem architektury bezpieczeństwa organizacji. Pozwalają na centralizację logów, korelację zdarzeń oraz generowanie alertów w czasie rzeczywistym.

## 🧠 Co robi SIEM?

- Zbiera logi z różnych źródeł: systemów operacyjnych, aplikacji, firewalli, EDR/XDR, baz danych
- Koreluje zdarzenia na podstawie reguł i wzorców zagrożeń
- Generuje alerty bezpieczeństwa, np. próba logowania z wielu lokalizacji, zmiana uprawnień konta
- Archiwizuje dane dla celów audytowych i zgodności z regulacjami
- Umożliwia analizy forensic po incydencie (kto, co, kiedy, jak)

## 🔧 Przykładowe systemy SIEM

- **Splunk** – bardzo wydajny, szeroko stosowany, kosztowny
- **Elastic Security (dawniej ELK + SIEM plugin)** – elastyczny, open-source
- **Wazuh** – SIEM oparty o OSSEC, dobry do środowisk open-source
- **IBM QRadar, ArcSight, Sumo Logic, Graylog** – inne komercyjne alternatywy

## 🛠️ Kluczowe komponenty

- **Collector** – zbiera logi z różnych źródeł (syslog, API, agent)
- **Parser** – zamienia logi na jednolity format (np. JSON)
- **Correlator** – interpretuje zależności i wykrywa anomalie
- **Dashboard / UI** – wizualizacje, raporty, filtrowanie danych
- **Alerting engine** – reguły detekcji i generowanie powiadomień

## ⚙️ Zastosowania SIEM w praktyce

- Detekcja malware, exploitów, brute-force, privilege escalation
- Wczesne ostrzeganie o incydentach: ransomware, wycieki danych
- Zbieranie danych wymaganych przez normy (np. ISO 27001, RODO, PCI-DSS)
- Obsługa inspektorów ochrony danych i audytów zewnętrznych
- Wsparcie zespołów SOC i CSIRT – jako centralny punkt analizy

## ✅ Dobre praktyki

- Ustal, co faktycznie chcesz logować (nie loguj „wszystkiego”)
- Twórz reguły korelacji adekwatne do środowiska i zagrożeń
- Regularnie testuj skuteczność alertów (symulacje, purple teaming)
- Nie zostawiaj alertów bez właściciela – workflow musi prowadzić do reakcji
- Automatyzuj klasyfikację incydentów (integracja z SOAR)

> Dobry SIEM nie zastąpi zespołu bezpieczeństwa – ale może go odciążyć, przyspieszyć reakcję i poprawić widoczność zagrożeń.
