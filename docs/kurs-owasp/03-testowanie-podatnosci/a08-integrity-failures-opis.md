---
id: "a08-integrity-failures-opis"
title: " 3.8.1 – Opis podatności i jej wpływ"
sidebar_position: 36
---

##  A08:2025 – Software and Data Integrity Failures

Ta kategoria obejmuje błędy w ochronie **integralności kodu i danych** – szczególnie podczas aktualizacji oprogramowania, pobierania bibliotek lub uruchamiania dynamicznych komponentów.

---

###  Na czym polega problem?

- Brak weryfikacji podpisów cyfrowych aktualizacji (np. aplikacje desktop, IoT).
- Pobieranie skryptów/bibliotek z zewnętrznych źródeł bez kontroli wersji i hashy.
- Nieprawidłowe korzystanie z deserializacji obiektów (np. `pickle`, `BinaryFormatter`, `PHP unserialize()`).
- Brak kontroli CI/CD nad tym, co jest wdrażane.

---

### Przykłady ataków

- Modyfikacja skryptu JS CDN w czasie rzeczywistym ➜ XSS lub kradzież danych.
- Zainfekowany pakiet z PyPI / NPM (np. `event-stream`, `ctx`) ➜ backdoory.
- Osadzony malware w aktualizacji aplikacji bez weryfikacji podpisu.
- Nadpisanie pliku `.env` podczas wdrożenia przez podatny pipeline.

---

###  Skutki podatności

- Wstrzyknięcie złośliwego kodu.
- Zdalne przejęcie systemu (np. RCE).
- Szkody reputacyjne, kradzież danych, straty finansowe.
- Naruszenie wymogów bezpieczeństwa (np. NIS2, ISO 27001, PCI DSS).

---

###  Występowanie

- Często spotykane w systemach z automatycznymi aktualizacjami, CI/CD, oraz aplikacjach korzystających z bibliotek open source.
- Szczególnie niebezpieczne w środowiskach DevOps, gdzie zmiany wchodzą automatycznie na produkcję.

---

W kolejnym kroku: **3.8.2 – Metody testowania podatności**
