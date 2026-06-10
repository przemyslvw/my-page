---
id: "a09-logging-monitoring-konfiguracja"
title: "Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 43
---

#  Weryfikacja konfiguracji aplikacji i serwera – Security Logging and Monitoring Failures (A09:2025)

##  Cel

Zweryfikowanie, czy konfiguracja aplikacji i środowiska serwerowego zapewnia skuteczne logowanie i monitorowanie zdarzeń bezpieczeństwa, zgodnie z zasadami dobrej praktyki i wymaganiami regulacyjnymi (np. RODO, ISO 27001, NIS2).

---

## 📌 Obszary do weryfikacji

### 1. **Aplikacja (backend / frontend)**

- Czy logi są zapisywane w centralnym miejscu (np. przez `winston`, `log4j`, `pino`, `bunyan`)?
- Czy aplikacja rozróżnia poziomy logowania (`info`, `warn`, `error`, `security`)?
- Czy logi zawierają dane takie jak: IP, ID użytkownika, czas, endpoint?
- Czy błędy bezpieczeństwa (brak JWT, nieudane logowanie, CSRF) są rejestrowane?

---

### 2. **Serwer (system operacyjny / runtime)**

- Czy logowanie systemowe (syslog, journald) jest aktywne i skonfigurowane?
- Czy serwer rejestruje zdarzenia SSH, sudo, crontab, systemd failures?
- Czy konfiguracja logrotate zapewnia rotację, kompresję i retencję logów?
- Czy logi są chronione przed modyfikacją przez użytkowników nieuprzywilejowanych?

---

### 3. **Serwer HTTP / Reverse Proxy**

- Czy nginx/apache zapisuje logi błędów (`error_log`) i dostępu (`access_log`)?
- Czy logi zawierają dane źródłowe (IP klienta, kod odpowiedzi, user-agent)?
- Czy logi są przesyłane do zewnętrznego systemu monitorującego (np. ELK stack)?

---

### 4. **Monitorowanie i integracje**

- Czy aplikacja integruje się z systemem SIEM (np. Splunk, Wazuh, ELK)?
- Czy dostęp do logów jest chroniony (role, ACL, RBAC)?
- Czy system monitorujący obsługuje alerty dla krytycznych zdarzeń (np. brute-force)?

---

##  Przykładowe kontrole

| Obszar | Przykład konfiguracji | Wartość oczekiwana |
|--------|------------------------|---------------------|
| `nginx` | `access_log` włączony | ✓ |
| `logrotate` | cykliczna rotacja co 7 dni | ✓ |
| `app logger` | poziom `error` zapisuje stacktrace | ✓ |
| `auditd` | rejestracja zmian plików systemowych | ✓ |
| `CI/CD` | logowanie nieudanych buildów | ✓ |

---

## Typowe błędy konfiguracyjne

- Logi zapisywane tylko lokalnie bez backupu.
- Brak logowania prób logowania i sesji.
- Zbyt niski poziom logowania (np. tylko `fatal`).
- Logi zawierające dane wrażliwe (np. pełne JWT, hasła).

---

## ✅ Rekomendacje

- Włącz pełne logowanie zdarzeń krytycznych (uwierzytelnienie, błędy HTTP 4xx/5xx, wyjątki).
- Używaj dedykowanych loggerów z tagowaniem (`context`, `
