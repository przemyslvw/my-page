---
slug: podatność-na-jamming-w-kamerach-xiaomi
title: "Podatność na jamming w kamerach Xiaomi"
authors: [przemyslvw]
tags: [cybersecurity, jamming, xiaomi, web-security, ochrona-sieci]
date: 2024-06-04
---

## Podatność na jamming w kamerach Xiaomi 🐛

### Wprowadzenie
Niedawno odkryto, że niektóre kamery Xiaomi są podatne na ataki jammingowe, które mogą powodować zatrzymanie obrazu. Ten artykuł omawia, jak można zminimalizować to zagrożenie za pomocą oprogramowania.

<!-- truncate -->

### Objawy i skutki 🐛
Podczas ataku jammingowego kamera traci połączenie z siecią Wi-Fi, co skutkuje zatrzymaniem obrazu lub całkowitym rozłączeniem. Niestety, detekcja ruchu w tych kamerach działa tylko na obrazie w czasie rzeczywistym, co oznacza, że po przywróceniu sygnału Wi-Fi, kamera nie analizuje nagrań z okresu braku połączenia.

### Rozwiązania
1. **Dualna łączność** - Wprowadzenie wsparcia dla sieci LTE jako zapasowego połączenia w przypadku utraty sygnału Wi-Fi.

2. **Automatyczne przełączanie kanałów** - Dodanie funkcji automatycznego przełączania kanałów, by unikać zakłóceń.

3. **Wykrywanie jammingu** - Implementacja systemu, który wykryje zakłócenia i przełączy kamerę na tryb lokalnego nagrywania.

4. **Analiza nagrań pod kątem detekcji ruchu** - Dodanie funkcji analizy nagrań z okresu braku połączenia, aby wykryć ruch i powiadomić użytkownika.

5. **Zwiększenie mocy sygnału** - Użycie mocniejszych anten, które będą bardziej odporne na zakłócenia.

Dzięki tym krokom można znacznie zwiększyć odporność kamer Xiaomi na ataki jammingowe.

### Testowany model to **Mi Camera 2K (Magnetic Mount)**

Odkryto, że kamera  jest podatna na ataki typu jamming, które mogą powodować zatrzymanie obrazu lub całkowite rozłączenie urządzenia.

### Potencjalnie zagrożone modele

Ze względu na podobieństwa w konstrukcji i funkcjonalności, inne modele kamer Xiaomi mogą również być podatne na tego typu ataki. Należą do nich:

- **Mi Home Security Camera 360°**: kamera oferująca panoramiczny widok z funkcją obrotu, często stosowana do monitoringu domowego.

- **Mi Home Security Camera 1080p Magnetic Mount**: model z magnetycznym mocowaniem, podobny w konstrukcji do Mi Camera 2K (Magnetic Mount).

- **Mi 360° Home Security Camera 2K Pro**: zaawansowana wersja kamery 360° z wyższą rozdzielczością, mogąca posiadać podobne podatności.

## Inni producenci, których urządzenia mogą być podatne na jamming

- **Nest (Google):** Kamery Nest korzystają z Wi-Fi do transmisji danych, co czyni je potencjalnie podatnymi na zakłócenia sygnału.

- **Arlo:** Bezprzewodowe kamery Arlo również opierają się na Wi-Fi, a więc mogą doświadczać problemów w przypadku ataków jammingowych.

- **Ring (Amazon):** Urządzenia Ring, takie jak dzwonki wideo i kamery bezpieczeństwa, komunikują się przez Wi-Fi, co może narażać je na zakłócenia.

- **Wyze:** Kamery Wyze działają w oparciu o sieć Wi-Fi, co oznacza, że są podatne na zakłócenia sygnału radiowego.

- **D-Link:** Producent oferuje szeroką gamę kamer IP korzystających z Wi-Fi, które mogą być podatne na ataki jammingowe.


### Zalecenia

Użytkownicy wymienionych modeli powinni być świadomi potencjalnych zagrożeń związanych z atakami jammingowymi i rozważyć dodatkowe środki zabezpieczające, takie jak:

- Aktualizacja oprogramowania kamery do najnowszej wersji.

- Monitorowanie stabilności połączenia Wi-Fi i unikanie zakłóceń sygnału.

- Rozważenie zastosowania dodatkowych zabezpieczeń sieciowych w celu ochrony przed atakami jammingowymi.

Dzięki tym działaniom można zwiększyć bezpieczeństwo i niezawodność systemu monitoringu opartego na kamerach Xiaomi.
