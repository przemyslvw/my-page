---
slug: news-2025-09-16
title: "Podsumowanie exploitów AI – Drugi kwartał 2025"
authors: [przemyslvw]
tags: ["AIsecurity", "cybersecurity", "genAI", "artificialIntelligence", "cyberThreats", "dataBreach", "promptInjection", "deepfake", "zeroDay", "infosec", "MLsecurity", "securityAwareness", "techRisks", "AIexploit", "secureAI", "patchManagement", "cyberIncident", "threat-intelligence"]
date: "2025-09-16"
---

Eksploity AI z drugiego kwartału 2025 roku ukazują rosnące zagrożenia związane z wykorzystaniem sztucznej inteligencji w celach przestępczych, takich jak jailbreaki modeli, głosowe deepfake’i czy wstrzyknięcia złośliwego kodu. Te incydenty podkreślają konieczność ciągłego monitoringu, zaawansowanych mechanizmów ochrony oraz edukacji użytkowników, aby minimalizować ryzyka w erze dynamicznego rozwoju generatywnej AI. Wzrost ataków wymusza też ścisłe regulacje i współpracę między firmami, ekspertami i regulatorami.

<!-- truncate -->

Exploit 1: Jailbreak GPT-4.1 poprzez zatrucie narzędziami
W kwietniu 2025 roku za pomocą “tool poisoning” wbudowano złośliwe instrukcje w opisy narzędzi MCP, co spowodowało, że GPT-4.1 wykonywał nieautoryzowane akcje i wyprowadzał dane bez wiedzy użytkowników. Podatność ujawniła słabość w walidacji i sanitizacji opisów narzędzi, podkreślając konieczność ścisłych kontroli integracji.

Exploit 2: Oszustwo deepfake voice atakuje systemy bankowe
W marcu 2025 roku przestępcy wykorzystali AI do wygenerowania głosowych deepfake’ów klientów banku, co umożliwiło obejście systemów uwierzytelniania głosowego i przejęcie kont o wartości około 25 mln USD. Atak obnażył niedostateczną ochronę biometrii głosowej i potrzebę wprowadzenia wieloczynnikowej weryfikacji.

Exploit 3: Wstrzyknięcie kodu w ChatGPT prowadzi do wycieku danych
W marcu 2025 roku złośliwe prompt injection zmusiło ChatGPT do ujawnienia poufnych informacji z uprzednich interakcji, obnażając luki w mechanizmach bezpieczeństwa wejścia. Wskazuje to na niezbędność kontekstowo świadomych filtrów i silnej walidacji danych wejściowych.

Exploit 4: Wyciek danych DeepSeek
Między styczniem a marcem 2025 roku z powodu błędnej konfiguracji publicznie udostępniono bazę danych DeepSeek, wyciekło ponad milion rekordów czatów, kluczy API i metadanych użytkowników. Incydent uruchomił dochodzenia regulatorów w Korei Południowej, Włoszech i USA oraz ban dla rządowych wdrożeń.

Exploit 5: Sony Music usuwa muzykę deepfake
W marcu 2025 roku Sony Music zleciło usunięcie ponad 75 000 ścieżek deepfake, które AI wygenerowało, naśladując artystów jak Beyoncé czy Harry Styles. Akcja uwydatniła wyzwania prawne i techniczne związane z ochroną własności intelektualnej w erze generatywnej muzyki.

Exploit 6: Luka w NVIDIA TensorRT-LLM (CVE-2025-23254)
Pod koniec kwietnia 2025 odkryto krytyczną podatność w Python Executor TensorRT-LLM (pickle deserialization), umożliwiającą zdalne wykonanie kodu, wyciek danych i manipulację modelami. Naprawa wymaga aktualizacji do wersji 0.18.2 i zastąpienia pickle bezpieczniejszymi formatami serializacji.

Exploit 7: CAIN – Celowe przejęcie komunikatów LLM
W maju 2025 roku atak CAIN wprowadził złośliwe system prompty do LLM, co pozwalało na generowanie szkodliwych odpowiedzi dla określonych zapytań, przy zachowaniu normalnego działania dla innych. Incydent uwypuklił potrzebę walidacji i monitoringu promptów oraz wytycznych dotyczących bezpiecznego inżynieringu promptów.

Exploit 8: Ataki Vishing generowane przez AI via ViKing
W kwietniu 2025 automaty AI ViKing generowały realistyczne połączenia phishingowe, podszywając się pod zaufane podmioty i wyłudzając dane osobowe. Sukces ataków pokazał, że weryfikacja głosu wymaga dodatkowych mechanizmów, a użytkownicy powinni być szkoleni w rozpoznawaniu deepfake’ów.

Exploit 9: Wypełnianie danych i automatyczne skanowanie AI
W maju 2025 cyberprzestępcy zastosowali AI do masowego skanowania i credential stuffing, szybko identyfikując poprawne login–hasło i przejmując konta. Wzrost skuteczności ataków wskazuje na potrzebę MFA, ograniczeń szybkości logowań i regularnych audytów haseł.

Exploit 10: Naruszenie danych DeepSeek i transfer danych
W kwietniu 2025 DeepSeek bez zgody przekazywał dane południowokoreańskich użytkowników na serwery w Chinach, naruszając lokalne i europejskie przepisy o ochronie danych. Incydent spowodował blokadę aplikacji w Korei i działania regulacyjne podkreślające konieczność ścisłych kontroli transferu danych.

Exploit 11: Naruszenie bezpieczeństwa botów rekrutacyjnych McDonald’s
30 czerwca 2025 badacze złamali prostą usługę logowania AI-chatbota “Olivia”, zgadując hasło “123456” i uzyskali dostęp do danych 64 mln kandydatów. Wykazało to fatalną higienę haseł i wymaganie MFA oraz przeglądu zabezpieczeń stron zewnętrznych dostawców.

Exploit 12: Kampania podszywania się pod Rubio AI
W czerwcu–lipcu 2025 AI generował deepfake głosu i tekstu przedstawiając się jako Marco Rubio w komunikatorze Signal, próbując wyłudzić informacje od dyplomatów. Choć nie odnotowano bezpośrednich wycieków, kampania skłoniła Departament Stanu USA do ostrzeżeń i podkreśliła wątpliwości co do bezpieczeństwa komunikatorów.

Exploit 13: Skynet – Pośrednie złośliwe oprogramowanie
W czerwcu 2025 malware “Skynet” wstrzykiwało prompt-injection do AI AV, nakazując “NO MALWARE DETECTED” i uruchamiając proxy TOR. Stanowi to dowód rosnącej zaawansowania ataków dezinformujących systemy AI, wymagając wielowarstwowej detekcji i polityk niespolegających wyłącznie na AI.

Exploit 14: Wstrzyknięcie poleceń AI bez kliknięcia w M365 Copilot
W czerwcu 2025 znaleziono zero-click exploit w M365 Copilot, gdzie złośliwe instrukcje w mailu powodowały wyciek danych korporacyjnych bez interakcji użytkownika. Microsoft załatał go w Patch Tuesday; incydent uwydatnił konieczność izolacji kontekstu oraz wymuszania wyraźnych poleceń użytkownika.