---
id: "a09-logging-monitoring-cwiczenie"
title: "Praktyczne ćwiczenie: Testowanie i mitigacja"
sidebar_position: 45
---

#  Praktyczne ćwiczenie: Testowanie i mitigacja – Security Logging and Monitoring Failures (A09:2025)

##  Cel ćwiczenia

Zadaniem uczestnika jest przetestowanie aplikacji webowej pod kątem rejestrowania zdarzeń bezpieczeństwa oraz skonfigurowanie mechanizmów monitorowania i alertowania na poziomie aplikacji i infrastruktury.

---

## 🛠️ Scenariusz testowy

### Środowisko:
- Aplikacja Node.js z backendem Express.
- Logowanie użytkowników i dostęp do zasobów chronionych.
- Serwer działa za reverse proxy (np. nginx) na systemie Ubuntu.
- Brak zewnętrznego systemu monitorowania.

---

##  Krok po kroku: testowanie

### 1. **Sprawdzenie logowania zdarzeń**
- Wykonaj:
  - nieudane logowanie (`/login`),
  - dostęp do zasobu chronionego bez tokena (`/admin`),
  - wygeneruj błąd aplikacji (`/crash` lub nieistniejący endpoint).
- Sprawdź, czy zdarzenia są logowane:
  - w aplikacji (np. `logs/app.log`),
  - w `access_log`/`error_log` nginx,
  - w `syslog` (`/var/log/syslog`, `journalctl`).

➡️ Czy logi zawierają IP, user-agent, czas, endpoint?

---

### 2. **Testowanie jakości i bezpieczeństwa logów**
- Czy dane logowane nie zawierają pełnych tokenów JWT, haseł, danych osobowych?
- Czy logi są dostępne tylko dla uprawnionych użytkowników (`chmod`, `chown`)?

---

### 3. **Integracja z systemem monitorującym (np. Wazuh lub ELK)**
- Skonfiguruj Filebeat lub Fluentd do przesyłania logów aplikacji i systemu.
- Utwórz prosty dashboard (np. Kibana) pokazujący liczbę błędów, 403, 500.
- Skonfiguruj alert e-mail/SMS dla zdarzenia: 5 błędnych logowań w 60 sekund.

---

## 🧰 Narzędzia, które możesz wykorzystać

- `winston`, `pino` – loggery dla Node.js.
- `fail2ban` – blokowanie IP po serii nieudanych logowań.
- `GoAccess` – analizator logów nginx.
- `Wazuh`, `ELK Stack` – analiza i wizualizacja logów.
- `Prometheus + Grafana` – metryki + alerty.

---

## ✅ Mitigacja i dobre praktyki

1. **Loguj wszystkie kluczowe zdarzenia bezpieczeństwa:**
   - logowania, błędy autoryzacji, wyjątki backendu.

2. **Dbaj o jakość logów:**
   - unikaj danych wrażliwych,
   - zapewnij format JSON lub structured logs.

3. **Zadbaj o dostępność i odporność logów:**
   - używaj rotacji (`logrotate`),
   - backupuj,
   - przesyłaj do zewnętrznego systemu (SIEM, ELK).

4. **Ustaw alerty dla podejrzanych wzorców:**
   - brute-force,
   - spike 500,
   - nietypowa aktywność użytkowników.

---

##  Wynik ćwiczenia

Po wykonaniu ćwiczenia uczestnik będzie w stanie:

- rozpoznać braki w logowaniu aplikacji,
- zidentyfikować potencjalne problemy z widocznością incydentów,
- wdrożyć skuteczny mechanizm monitoringu i alertowania,
- zadbać o zgodność z wymaganiami audytowymi.

