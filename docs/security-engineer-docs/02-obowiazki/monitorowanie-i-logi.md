---
id: "monitorowanie-i-logi"
title: "Monitorowanie i logi"
sidebar_position: 1
---

Monitorowanie systemów oraz analiza logów to fundament skutecznej detekcji zagrożeń i reagowania na incydenty bezpieczeństwa. Dobrze skonfigurowane logowanie oraz świadoma analiza danych pozwalają nie tylko identyfikować ataki, ale też szybko reagować i ograniczać skutki.

## 📈 Co monitorujemy?

- Ruch sieciowy (wejścia/wyjścia, anomalia, nietypowe źródła)  
- Aktywność użytkowników (logowania, błędne hasła, zmiany uprawnień)  
- Działanie systemów i usług (restarty, błędy aplikacji, wykorzystanie zasobów)  
- Dostępy do danych (kto, kiedy, z jakiego adresu IP)

## 🧰 Narzędzia i rozwiązania

- **SIEM** (np. Splunk, Elastic Security, Wazuh) – centralizacja i korelacja logów  
- **EDR/XDR** – zaawansowana detekcja na endpointach  
- **Syslog/Journalctl** – podstawowe logi systemowe  
- **Prometheus + Grafana** – monitoring metryk i alertów

## ⚙️ Dobre praktyki

- Loguj tylko to, co istotne – nadmiar danych = chaos  
- Stosuj standaryzację formatów logów (np. JSON, CEF)  
- Zadbaj o integralność logów – niezmienność, zabezpieczenie przed manipulacją  
- Analizuj logi regularnie – automatyzuj alerty i dashboardy

## 📊 Korzyści

- Wczesne wykrywanie incydentów i prób ataków  
- Pełna ścieżka audytowa – przydatna przy analizie post-mortem  
- Lepsze zrozumienie działania infrastruktury  
- Wsparcie dla zgodności z regulacjami (np. RODO, NIS2)

> Kto nie monitoruje – ten nie wie, co się dzieje. Logi to oczy inżyniera bezpieczeństwa.
