---
id: "a01-broken-access-control-narzedzia"
title: "Narzędzia do testowania"
sidebar_position: 4
---

##  Cel rozdziału

Poznasz narzędzia – darmowe i płatne – które pomogą Ci w wykrywaniu i testowaniu podatności z kategorii **Broken Access Control**, zarówno w aplikacjach webowych, jak i API.

---

## 🛠️ Narzędzia darmowe (open source)

| Narzędzie | Opis |
|----------|------|
| **Burp Suite Community Edition** | Ręczna analiza żądań, zmiana parametrów, testy roli użytkownika. |
| **OWASP ZAP** | Skaner z trybem manualnym (Explore) i automatycznym fuzzingiem. |
| **Autorize (plugin do Burpa)** | Porównywanie odpowiedzi użytkowników o różnych rolach. |
| **Postman / Insomnia** | Testowanie API – łatwa manipulacja parametrami i nagłówkami. |
| **ffuf / wfuzz** | Bruteforce endpointów z możliwością testów IDOR i ACL. |
| **JWT Tool** | Manipulacja i dekodowanie tokenów JWT (CLI/GUI). |
| **ModHeader (przeglądarka)** | Podmiana nagłówków HTTP (Authorization, Cookie, Role). |

---

## 💼 Narzędzia komercyjne

| Narzędzie | Funkcje |
|----------|---------|
| **Burp Suite Pro** | Pełna automatyzacja, rozszerzenia typu Autorize, BApp Store, Intruder. |
| **Detectify** | Automatyczny test Broken Access Control w oparciu o fingerprinty i CVE. |
| **Pentest-Tools.com** | Skanery online z modułem kontroli dostępu. |
| **Intruder.io** | Discovery + passive scan + testy ACL i role-check. |

---

## 🔌 Przydatne rozszerzenia do Burp Suite

- `Autorize` – testowanie kontroli dostępu między użytkownikami.
- `AuthMatrix` – zaawansowane macierze ról i uprawnień.
- `Session Authenticator` – obsługa sesji wielu użytkowników.
- `JWT Editor / Decoder` – manipulacja tokenami JWT.

---

##  Automatyzacja testów

- **Wappalyzer API** – rozpoznanie stacku aplikacji przed testem.
- **ZAP CLI + zaproxy** – automatyczne testy endpointów REST.
- **Burp Suite Pro + CI pipeline** – skanowanie i raportowanie po deploymencie.
- **GraphQL Raider (Burp/ZAP)** – testowanie uprawnień w środowisku GraphQL.

---

##  Przykład: test z użyciem Autorize (Burp Plugin)

1. Zaloguj się jako użytkownik zwykły.
2. Skonfiguruj **token admina** w Autorize jako alternatywną sesję.
3. Włącz Autorize i przejdź do testowania aplikacji.
4. Narzędzie porówna odpowiedzi dla obu ról i zaznaczy rozbieżności.

---

##  Wskazówki

- Testy Broken Access Control **nie kończą się na jednym skanerze** – wymagają korelacji zachowań aplikacji.
- Używaj **kombinacji narzędzi GUI i CLI** – ułatwia to dokładne porównania i automatyzację.
- Dobrym podejściem jest stworzenie kont użytkownika z różnymi rolami i **przełączanie sesji** w narzędziach.

---

## 📌 Podsumowanie

> Samo narzędzie nic nie znajdzie – ale właściwe narzędzie w rękach świadomego testera pozwala **zdemaskować luki autoryzacyjne**, zanim zrobi to ktoś inny.

---

W kolejnym rozdziale wykonasz **praktyczne ćwiczenie wykrycia i mitigacji podatności Broken Access Control**.
