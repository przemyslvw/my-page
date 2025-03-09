# Tarlogic wykrywa ukrytą funkcję w popularnym chipie ESP32, która może zagrozić milionom urządzeń IoT

## Wprowadzenie

Zespół badawczy z firmy Tarlogic Security odkrył nieudokumentowaną funkcję w mikrokontrolerze ESP32, szeroko stosowanym w urządzeniach IoT. To odkrycie rodzi poważne obawy dotyczące bezpieczeństwa milionów urządzeń na całym świecie. 5

## Czym jest ESP32?

ESP32 to seria niskokosztowych, energooszczędnych mikrokontrolerów z wbudowanym Wi-Fi i Bluetooth, opracowanych przez chińską firmę Espressif Systems. Od momentu wprowadzenia na rynek w 2016 roku, ESP32 znalazł zastosowanie w szerokiej gamie urządzeń, od inteligentnych domów po sprzęt medyczny. 13

## Odkrycie Tarlogic

Podczas konferencji RootedCON 2025, badacze z Tarlogic przedstawili wyniki swoich badań nad ESP32. Odkryli oni nieudokumentowane komendy w firmware Bluetooth tego chipu, które mogą umożliwić atakującym przejęcie kontroli nad urządzeniami, modyfikację pamięci oraz podszywanie się pod inne urządzenia Bluetooth. 21

## Potencjalne zagrożenia

Wykorzystanie tych ukrytych funkcji stwarza szereg zagrożeń:25

- **Ataki typu impersonation**: Atakujący mogą podszywać się pod zaufane urządzenia, uzyskując nieautoryzowany dostęp do systemów.29

- **Trwałe infekcje**: Możliwość modyfikacji pamięci pozwala na wprowadzenie złośliwego kodu, który przetrwa restart urządzenia.33

- **Ataki na łańcuch dostaw**: Ukryte komendy mogą być wykorzystane do wprowadzenia backdoorów na etapie produkcji, co stanowi zagrożenie dla całego ekosystemu IoT. 38

## Reakcja społeczności i producenta

Odkrycie Tarlogic spotkało się z szerokim echem w społeczności bezpieczeństwa. Jednak do tej pory producent ESP32, firma Espressif Systems, nie wydała oficjalnego oświadczenia w tej sprawie. 46

## Wnioski

Odkrycie ukrytej funkcji w chipie ESP32 podkreśla potrzebę ciągłego monitorowania i audytu bezpieczeństwa urządzeń IoT. Użytkownicy i producenci powinni być świadomi potencjalnych zagrożeń i podejmować odpowiednie środki w celu zabezpieczenia swoich urządzeń.53