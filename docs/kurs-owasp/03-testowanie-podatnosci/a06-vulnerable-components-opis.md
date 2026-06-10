---
id: "a06-vulnerable-components-opis"
title: "📦 3.6.1 – Opis podatności i jej wpływ"
sidebar_position: 26
---

## 📦 A06:2025 – Vulnerable and Outdated Components

Podatność ta dotyczy używania:
- **niezałatanych bibliotek open-source**,
- **przestarzałych komponentów backendu/frontendu**,
- **niesprawdzonych zależności**, które zawierają znane podatności.

---

## Przykłady zagrożeń

- Użycie jQuery 1.x lub AngularJS z luką XSS.
- Log4j 2.x < 2.15 – podatność `Log4Shell`.
- Spring Framework podatny na `Spring4Shell`.
- Stare wersje CMS-ów (WordPress, Drupal) bez aktualizacji.
- Outdated Docker image (np. `node:8`, `python:2.7`).

---

## 🧨 Potencjalne skutki

- **Zdalne wykonanie kodu (RCE)**
- **Wyciek danych**
- **Ominięcie autoryzacji**
- **Utrata integralności aplikacji**
- **Ataki łańcuchowe przez zależności transitive**

---

## 🛑 Dlaczego do tego dochodzi?

- Brak procesu aktualizacji i weryfikacji zależności.
- Zbyt duże zaufanie do `npm`, `pip`, `nuget`, `composer`.
- Brak automatycznych skanerów bezpieczeństwa.
- Użycie komponentów bez ustalonej daty końca wsparcia.

---

## ✅ Dobre praktyki

- Regularnie aktualizuj zależności i komponenty bazowe.
- Używaj narzędzi SCA (Software Composition Analysis).
- Automatyzuj proces skanowania i alertowania.
- Unikaj "porzuconych" bibliotek bez aktualizacji od lat.

---

W kolejnym kroku: **3.6.2 – Metody testowania podatności**
