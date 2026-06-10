---
id: "skanowanie-i-incydenty"
title: "Skanowanie i incydenty"
sidebar_position: 1
---

Skanowanie podatności oraz skuteczne zarządzanie incydentami to dwa kluczowe filary operacyjnego bezpieczeństwa. Pozwalają one na wykrycie słabych punktów zanim zrobi to atakujący oraz na szybką reakcję w przypadku naruszenia.

##  Skanowanie podatności (Vulnerability Scanning)

- Regularne sprawdzanie systemów, aplikacji i urządzeń pod kątem znanych podatności  
- Użycie narzędzi takich jak **Nessus**, **OpenVAS**, **Qualys**, **Nikto**, **Nmap + NSE**  
- Weryfikacja zależności (np. podatne biblioteki, komponenty third-party)  
- Automatyczne raportowanie i kategoryzacja ryzyk (CVSS, CWE)

## 🚨 Zarządzanie incydentami (Incident Response)

- Tworzenie planów reakcji na incydenty (IRP – Incident Response Plan)  
- Identyfikacja, analiza, ograniczenie i usuwanie skutków incydentu  
- Komunikacja z interesariuszami i dokumentacja zdarzeń  
- Wnioski po incydencie – lekcje i aktualizacja polityk/konfiguracji

##  Połączenie procesów

- Skanowanie może ujawnić podatność, która zostaje wykorzystana – IR ją obsługuje  
- Procesy muszą być zsynchronizowane – skaner wykrywa, zespół IR reaguje  
- Ścisła współpraca między zespołem technicznym, SOC, a managementem

## ✅ Dobre praktyki

- Ustal harmonogramy cyklicznego skanowania (np. tygodniowo, miesięcznie)  
- Monitoruj źródła CVE, aktualizacje vendorów i bazy zagrożeń  
- Prowadź rejestr incydentów i wyciągaj z nich lekcje (post-incident reviews)  
- Ćwicz symulacje incydentów (np. tabletop exercises)

> Im szybciej wykryjesz i zareagujesz – tym mniej kosztowny będzie incydent.
