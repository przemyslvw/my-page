---
id: "a07-authentication-failures-opis"
title: " 3.7.1 – Opis podatności i jej wpływ"
sidebar_position: 31
---

##  A07:2025 – Identification and Authentication Failures

Podatności w zakresie **identyfikacji i uwierzytelniania użytkowników** prowadzą do przejęcia kont, eskalacji uprawnień lub obejścia mechanizmów kontroli dostępu.

---

###  Na czym polega problem?

Aplikacje często błędnie implementują:

- Logikę logowania i sesji,
- Przechowywanie haseł,
- Reset haseł,
- Weryfikację tożsamości (np. 2FA),
- Tokeny dostępu (np. JWT, OAuth),
- Mechanizmy blokady konta po wielu próbach.

---

### Przykłady ataków

- Brak limitu logowań ➜ ataki słownikowe / brute-force.
- Przechowywanie haseł w postaci czystego tekstu.
- Przechwycenie sesji przez brak atrybutu `HttpOnly`, `Secure` w cookie.
- Użycie przewidywalnych identyfikatorów użytkowników (`user?id=1001`).
- Brak walidacji podpisu JWT (lub użycie `none` jako algorytmu).
- Brak rotacji tokenów sesyjnych po zalogowaniu.

---

###  Skutki podatności

- Pełne przejęcie kont użytkowników (w tym adminów).
- Kradzież danych osobowych i wrażliwych.
- Nadużycia funkcji aplikacji z uprawnieniami ofiary.
- Naruszenie RODO, NIS2, standardów PCI-DSS.

---

###  Statystyki i występowanie

- Jedna z najczęściej wykrywanych podatności w testach manualnych.
- Często łączy się z IDOR, Broken Access Control lub Session Fixation.
- Błędna konfiguracja SSO / OAuth może narazić całą organizację.

---

W kolejnym podrozdziale: **3.7.2 – Metody testowania podatności**
