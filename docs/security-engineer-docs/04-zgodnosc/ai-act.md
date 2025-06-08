---
id: "ai-act"
title: "Ai act"
sidebar_position: 1
---

AI Act to europejskie rozporządzenie mające na celu uregulowanie rozwoju i stosowania systemów sztucznej inteligencji. Z perspektywy Security Engineera oznacza to nowe obowiązki w zakresie oceny ryzyka, nadzoru nad modelami AI oraz zapewnienia zgodności z przepisami dotyczącymi bezpieczeństwa, przejrzystości i etyki.

## 📘 Czym jest AI Act?

- Rozporządzenie Parlamentu Europejskiego i Rady UE regulujące wykorzystanie AI w UE
- Wprowadza klasyfikację systemów AI według poziomu ryzyka (minimalne, ograniczone, wysokie, zakazane)
- Dotyczy producentów, dostawców i użytkowników systemów AI, również poza UE jeśli AI wpływa na obywateli UE
- Wymusza **compliance-by-design** oraz silne mechanizmy audytu i nadzoru

## 🛑 Kategorie ryzyka

- **Niedozwolone (zakazane)**: systemy manipulujące zachowaniem (np. ocena społeczeństwa, podprogowe oddziaływanie)
- **Wysokiego ryzyka**: AI w obszarach takich jak biometria, rekrutacja, infrastruktura krytyczna, systemy sądownicze
- **Ograniczonego ryzyka**: chatboty, systemy rekomendacji – muszą spełniać wymogi przejrzystości
- **Minimalne ryzyko**: np. AI w grach, spam-filtry – niepodlegające regulacji

## 🔐 Wymogi bezpieczeństwa

- Ocena ryzyka AI przed wdrożeniem i w cyklu życia (continuous risk assessment)
- Zabezpieczenia przed nadużyciami: manipulacją, diskriminacją, eskalacją uprawnień
- Dokumentacja techniczna (m.in. opis architektury, danych uczących, testów)
- Rejestrowanie działań AI (logi, metadane, decyzje)
- Ograniczenie dostępu do modeli i danych – uwzględnienie bezpieczeństwa infrastruktury

## 🧠 Obowiązki organizacji

- Wdrożenie systemu zarządzania ryzykiem AI (AI Risk Management System)
- Prowadzenie audytów technicznych i etycznych modeli
- Szkolenie personelu technicznego i operacyjnego
- Zgłaszanie incydentów i niezgodności do organów nadzorczych
- Współpraca z Data Protection Officer i zespołem ds. zgodności

## 🛠️ Rola Security Engineera

- Identyfikacja systemów AI w organizacji i klasyfikacja ryzyka
- Współpraca z zespołem ds. AI/ML przy audytach bezpieczeństwa modeli
- Zapewnienie odpowiedniej segregacji danych i kontroli dostępu do modeli
- Monitorowanie działania systemów AI pod kątem bezpieczeństwa i nadużyć
- Tworzenie polityk wewnętrznych dot. bezpiecznego użycia AI

## ✅ Dobre praktyki

- Twórz zbiór zasad „Responsible AI” z perspektywy bezpieczeństwa
- Stosuj Privacy by Design i Security by Design także w modelach ML
- Przechowuj i analizuj logi inferencji (jak model podejmował decyzję)
- Wdrażaj sandboxing i detekcję nadużyć (np. adversarial inputs)
- Upewnij się, że systemy AI nie obchodzą istniejących mechanizmów bezpieczeństwa

> AI Act to nie tylko regulacja – to konieczność, by budować bezpieczne, odpowiedzialne i odporne na nadużycia systemy sztucznej inteligencji.
