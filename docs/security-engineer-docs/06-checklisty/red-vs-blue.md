---
id: "red-vs-blue"
title: "Red vs blue"
sidebar_position: 1
---

Checklisty „Red vs Blue” pomagają zrozumieć i porównać działania ofensywne (Red Team) oraz defensywne (Blue Team) w środowisku bezpieczeństwa IT. To zestawienie kluczowych aspektów umożliwia ocenę gotowości organizacji zarówno w ataku, jak i obronie.

## 🔴 Red Team – checklista ofensywna (atakujący)

### 🔍 Rekonesans i enumeracja

- [ ] Zidentyfikowano wszystkie publiczne zasoby (subdomeny, porty, aplikacje)?
- [ ] Sprawdzono metadane w dokumentach publicznych?
- [ ] Przeanalizowano publiczne repozytoria i błędy konfiguracji (np. GitHub, S3)?

### ⚙️ Eksploatacja podatności

- [ ] Wykorzystano znane CVE i błędne konfiguracje?
- [ ] Testowano XSS, SQLi, CSRF, SSRF, RCE, IDOR?
- [ ] Przeprowadzono fuzzing API i endpointów?

### 🔐 Eskalacja uprawnień

- [ ] Próby obejścia autoryzacji lub zdobycia tokenów JWT?
- [ ] Lokalne eskalacje przez błędne uprawnienia, binarki SUID?
- [ ] Wykorzystanie błędnych ról w IAM/AD?

### 🕵️‍♂️ Unikanie detekcji

- [ ] Użycie narzędzi C2 z obfuskacją (Covenant, Sliver)?
- [ ] Testowanie EDR i AV z custom payloadami?
- [ ] Zacieranie śladów (logi, timestomping, clear command history)?

## 🔵 Blue Team – checklista defensywna (obrońcy)

### 🛡️ Prewencja

- [ ] Aktualne systemy i łatki?
- [ ] MFA dla wszystkich kont uprzywilejowanych?
- [ ] Segmentacja sieci i minimalizacja dostępu?

### 📈 Detekcja

- [ ] SIEM monitoruje zdarzenia z kluczowych źródeł?
- [ ] Wdrożone reguły detekcji MITRE ATT&CK?
- [ ] Alerty są priorytetyzowane i testowane (purple team)?

### 🚨 Reakcja

- [ ] Istnieją procedury reagowania na incydenty?
- [ ] Czy playbooki SOAR są automatyzowane i testowane?
- [ ] Czy zespół przeprowadza symulacje ataków?

### 🔁 Odzyskiwanie i raportowanie

- [ ] Backupy są szyfrowane i testowane?
- [ ] Incydenty są dokumentowane i raportowane?
- [ ] Prowadzona jest retrospekcja i aktualizacja polityk?

## 🧩 Narzędzia Red & Blue

| Cel                | Red Team                           | Blue Team                          |
|--------------------|------------------------------------|------------------------------------|
| Eksploatacja       | Metasploit, Burp Suite, nmap       | IDS/IPS, Wazuh, Firewall           |
| C2 & Payloady      | Cobalt Strike, Sliver, Empire      | EDR, AV, Yara Rules                |
| Analiza            | BloodHound, Recon-ng               | ELK Stack, Splunk, Grafana         |
| Testy              | CrackMapExec, mimikatz              | Sysmon, MITRE ATT&CK Navigator     |

> Idealne bezpieczeństwo powstaje wtedy, gdy Red Team myśli jak atakujący, a Blue Team – jak przyszła ofiara. Razem tworzą kulturę cyberodporności.
