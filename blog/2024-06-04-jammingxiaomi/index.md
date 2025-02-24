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
