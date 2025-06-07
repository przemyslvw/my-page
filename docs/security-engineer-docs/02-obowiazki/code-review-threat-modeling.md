---
id: "code-review-threat-modeling"
title: "Code review threat modeling"
sidebar_position: 1
---

Przegląd kodu (code review) oraz modelowanie zagrożeń (threat modeling) to dwie kluczowe praktyki w procesie tworzenia bezpiecznego oprogramowania. W połączeniu pozwalają na wczesne wykrycie słabości, zanim trafią one do środowiska produkcyjnego.

## 🧪 Code Review — bezpieczeństwo w pull requeście

- Analiza kodu z perspektywy bezpieczeństwa, nie tylko funkcjonalności  
- Weryfikacja kontroli dostępu, walidacji danych, obsługi błędów  
- Wyszukiwanie znanych wzorców podatności (np. hardcoded credentials, SQLi)  
- Utrwalanie wiedzy w zespole – uczymy się na błędach

## 🧠 Threat Modeling — planowanie obrony zanim powstanie kod

- Identyfikacja potencjalnych zagrożeń już na etapie projektowania  
- Korzystanie z metod STRIDE, PASTA, LINDDUN lub własnych matryc ryzyka  
- Tworzenie diagramów przepływu danych (DFD) i ścieżek ataku  
- Ustalenie priorytetów: co jest najważniejsze do ochrony (crown jewels)

## 🔄 Połączenie obu praktyk

- Threat modeling dostarcza kontekstu, na co zwracać uwagę w code review  
- Wyniki przeglądu kodu mogą wskazywać na niedoskonałości w modelu zagrożeń  
- Regularne sesje łączące modelowanie z przeglądami zwiększają odporność aplikacji

> „Secure by design” zaczyna się od zrozumienia zagrożeń – a kończy na bezpiecznym kodzie. Obie praktyki są fundamentem bezpieczeństwa w SDLC.
