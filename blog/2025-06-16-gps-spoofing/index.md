---
slug: zaklocenia-gps-spoofing-jamming-2025
title: '🛰️ Zakłócenia GPS nad północną Polską – co się dzieje z naszymi dronami?'
authors: [przemyslvw]
tags: ['cybersecurity', 'gps', 'spoofing', 'jamming', 'drony', 'nawigacja', 'open-source-intel']
date: 2025-06-16
---

W ostatnich tygodniach północna Polska – szczególnie rejon Trójmiasta i Półwyspu Helskiego – doświadcza **bezprecedensowych zakłóceń sygnału GPS**. Drony spadają z nieba, systemy nawigacji szaleją, a operatorzy są zdezorientowani. Czy to awaria systemowa? A może coś znacznie poważniejszego?

<!-- truncate -->

## 🚨 Co dokładnie się dzieje?

Od końca maja 2025 roku piloci dronów oraz użytkownicy systemów opartych o GNSS (Global Navigation Satellite Systems) raportują:

- Utraty sygnału GPS w rejonach **Gdyni, Helu, Władysławowa i Jastarni**
- Masowe błędy lokalizacji – drony „myślą”, że są w Kaliningradzie, a nie nad Bałtykiem
- Spadki z powodu `failsafe GPS lost`, `RTH` w złym kierunku lub **błędnego powrotu** do punktu startowego
- Nietypowe sygnały ostrzegawcze w **samochodowych systemach nawigacji** i na pokładzie samolotów GA (General Aviation)

Nie jest to przypadek. Zjawisko jest **rozległe, długotrwałe i powtarzalne**.

## 🛠️ Spoofing i jamming – co to znaczy?

Zakłócenia sygnału GNSS można podzielić na dwie główne techniki:

###  **Jamming (zagłuszanie sygnału)**

- Emitowanie fal radiowych w paśmie GPS (L1), aby zablokować odbiór legalnego sygnału
- Efekt: całkowity brak sygnału GPS lub niestabilna lokalizacja

###  **Spoofing (fałszowanie pozycji)**

- Emitowanie **podrobionego sygnału GPS**, który podszywa się pod prawdziwy
- Efekt: urządzenie odbiera pozornie poprawny sygnał, ale z błędnymi współrzędnymi
- W przypadku dronów może prowadzić do **przejęcia trajektorii lotu** lub **zmuszenia do lądowania**

🔎 Według informacji z [Niebezpiecznika](https://niebezpiecznik.pl/post/uwaga-piloci-dronow-na-polnocy-polski/), odnotowano **przemieszczanie „pozycji domowej” o kilkadziesiąt kilometrów**, a drony raportowały "utracony sygnał" nawet na otwartym terenie.

##  Kto za tym stoi?

Nie ma oficjalnych komunikatów ze strony rządu, ale wiele wskazuje na **działania wojskowe**:

- Obszar zakłóceń pokrywa się z korytarzami lotów NATO i ćwiczeniami armii
- Możliwe użycie **mobilnych nadajników zakłócających** w ramach treningu obrony elektronicznej
- Alternatywnie – działania **sąsiedniego państwa**, wykorzystujące zakłócanie jako element **wojny hybrydowej**

Na serwisach typu [GPSJam.org](https://gpsjam.org) widać **anomalie sygnału** nad Polską, Litwą i Bałtykiem – szczególnie wokół obwodu kaliningradzkiego.

## ✈️ Jak się chronić jako operator drona?

Jeśli latasz dronem na północy Polski, zachowaj szczególną ostrożność:

### ✅ Co robić:

- **Wyłącz GPS** i przejdź na tryb ręczny, jeśli zauważysz błędne pozycjonowanie
- **Nie używaj funkcji RTH** w podejrzanym środowisku – dron może wrócić… ale gdzie indziej
- **Zachowaj wzrokowy kontakt** z dronem i trzymaj go w zasięgu sterowania (VLOS)
- **Ustaw limity wysokości i dystansu** w kontrolerze – unikniesz ucieczki poza zasięg
- Korzystaj z **czujników inercyjnych i barometrycznych**, a nie tylko z GPS

### ❌ Czego unikać:

- Lotów automatycznych (waypoints, follow me)
- Latania nad wodą lub poza zasięgiem wzroku
- Używania sprzętu bez wsparcia `failsafe manual override`

##  Co to oznacza szerzej?

To zjawisko to nie tylko problem dla droniarzy:

- **Systemy transportu**, rolnictwo precyzyjne, logistyka – wszystkie opierają się na GNSS
- Zakłócenia mogą wpływać na **lotnictwo cywilne** i służby ratownicze
- W dobie wojny hybrydowej, **bezpieczeństwo elektromagnetyczne** staje się równie ważne jak sieciowe

Nie jesteśmy odporni na tego typu działania. I to powinien być sygnał ostrzegawczy dla firm, operatorów i instytucji.

##  Podsumowanie i rekomendacje

Zakłócenia GPS to nie science-fiction. To realna, rosnąca w siłę technika walki elektronicznej, która **testuje odporność naszej infrastruktury**.

 **Co warto zrobić już teraz?**

- Uświadom użytkowników – **drony, rolnicy, transportowcy**
- Weryfikuj dane z GPS z innymi źródłami (mapy offline, czujniki)
- Zainwestuj w systemy **multi-GNSS (GPS + GLONASS + Galileo)** z detekcją spoofingu
- Monitoruj sytuację na serwisach typu `gpsjam.org`, `adsbexchange.com`, `openskynetwork.org`

---

🛰️ **To nie był test – to był sygnał. A będzie ich więcej.** Przygotujmy się, zanim nasze systemy zostaną realnie oślepione.

---

#CyberSecurity #Drony #Spoofing #GPS #ElectronicWarfare
