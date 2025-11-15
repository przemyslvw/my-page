---
slug: pegasus-tracking-2025-11-15
title: "Pegasus: Meta wygrała. Ty wciąż jesteś śledzony"
authors: [przemyslvw]
tags: ["facebook", "privacy", "cybersecurity", "security", "malware", "web-security", "open-source-intel", "gps", "spoofing", "ataki"]
date: "2025-11-15"
---

Pegasus to zaawansowany spyware opracowany przez izraelską grupę NSO, która została niedawno przejęta przez inwestorów amerykańskich. Oprogramowanie kosztuje **20 000 USD za telefon** i jest uważane za jeden z najbardziej zaawansowanych narzędzi szpiegowskich na świecie.[^1]

<!-- truncate -->

**Wyrok sądu w sprawie Meta kontra NSO**

Sąd amerykański 19 października wydał orzeczenie, w którym zakazał NSO Group dostępu do WhatsApp i innych produktów Meta (Facebook, Instagram). To orzeczenie jest jednak **bardzo zawężone** – zabrania tylko szpiegowania komunikacji na platformach Meta, ale nie zmienia nic w kwestii dostępu do innych aplikacji na telefonie.[^1]

Sprawa trwała **sześć lat**, co pokazuje, jak powolny jest system prawny. Orzeczenie ma wartość przede wszystkim precedensową – daje ofiarom prawo do pozwania NSO Group, choć w praktyce może to trwać latami.

**Nierealistyczne Oczekiwania Dotyczące Bezpieczeństwa iPhone'a**

Apple twierdzi, że iPhone'y są praktycznie nie do zhakowania, ale ekspert OTW (Occupy The Web) ma zupełnie inną perspektywę na podstawie doświadczeń z analizą zainfekowanych urządzeń. Mimo że konsumenckie złośliwe oprogramowanie rzadko atakuje iPhone'y, zaawansowany spyware mercenarius (taki jak Pegasus) **z łatwością infekuje te urządzenia**.[^1]

OTW ujawnił szokujący fakt: w ostatnich dziewięciu miesiącach odkrył, że **wiele zwykłych telefonów użytkowników jest zainfekowanego złośliwym oprogramowaniem** z różnych źródeł. Ludzie mają nie tylko zainfekowne telefony, ale także routery, urządzenia smart home, a nawet samochody. Bramy garażowe otwierają się losowo, światła migają – wszystko dlatego, że po uzyskaniu dostępu do sieci Wi-Fi atakujący mogą kontrolować wszystkie urządzenia w sieci.[^1]

### Mity i Rzeczywistość

| Aspekt | Mit Apple | Rzeczywistość |
| :-- | :-- | :-- |
| **Podatność na malware** | iPhone'y są niehackable | Liczne iPhone'y mają zainfekowania, które użytkownicy nie zdają sobie sprawy |
| **Zagrożenie** | Tylko od rządów (Pegasus) | Również od zwykłych hakerów najętych przez konkurentów biznesowych |
| **Metody ataku** | Wyrafinowane exploity | W 80% wypadków wykorzystywany jest social engineering |
| **Czasochłonność** | Należy do przeszłości | Wciąż głównym wektorem ataku |

### Apple iPhone 17 – Nowe Zabezpieczenia

Apple wprowadził **memory integrity enforcement** (egzekucję integralności pamięci), co jest porównane do istniejących już od ponad dekady technik takich jak ASLR (Address Space Layout Randomization). Nowa ochrona powinna utrudnić ataki, ale:

- Podobne techniki były już łatwe do obejścia przez malware
- **Nie czyni to iPhone'a unhackable** – jedynie utrudni ataki
- Technologia może jedynie **spowolnić** dobrze sfinansowanych atakujących[^1]

**Program Bug Bounty**: Apple zwiększył nagrody z 1 miliona do **5 milionów USD** za obejście zabezpieczeń w trybie Lockdown Mode. Jednak 5 milionów USD to **niewystarczająca kwota** w porównaniu z cenami, jakie oferują rządy autorytarne – mogą płacić **setki milionów dolarów** za zaawansowany spyware.

### Porównanie Systemów Operacyjnych

| Platform | Bezpieczeństwo | Uwagi |
| :-- | :-- | :-- |
| **iPhone (iOS)** | Średnie-Wysokie | Trudniejszy do zhakowania, ale podatny na ataki zaawansowane; marketing jest mylący |
| **GrapheneOS** | Najwyższe | Najlepszy wybór dla osób zainteresowanych bezpieczeństwem, ale atakujący mogą zmienić cel |
| **Android (stock)** | Niskie | 82% rynku, ale wielu użytkowników ma nieaktualizowane telefony – łatwy cel |
| **Telefony flip** | Bardzo niskie | Brak obrony; wymagają innego typu ataku; używanie SMS'ów w czystym tekście |

### Kluczowy Wgląd: Zagrożenie Łańcuchowe

Jeśli jeden telefon w domu/sieci jest zainfekowany, atakujący może przejąć całą sieć Wi-Fi i pozostałe urządzenia. To wyjaśnia obserwacje OTW, że ludzie mający całkowicie "zhakowane" domy – **wszystko jest podatne, jeśli jedno urządzenie nośnikowe jest zainfekowane**.[^1]

### Aspekt Prawny i Polityczny

- **NSO Group** jest obecnie własnością inwestorów amerykańskich (wcześniej izraelskich)
- Pegasus jest **zakazany w USA**, ale rządy mają dostęp do podobnych narzędzi poprzez kontraktantów
- 17 amerykańskich agencji wywiadowczych (nie tylko NSA) prowadzi operacje szpiegowskie
- Legalne jest tworzenie złośliwego oprogramowania **dla rządów** – nielegalne dla każdego innego[^1]


### Wnioski

1. **Brak bezpiecznych urządzeń** – Wszystko jest hackable; chodzi tylko o zasoby i czas, jakie atakujący chce poświęcić
2. **Marketing Apple jest zwodniczy** – Firmy twierdzą, że ich produkty są "unhackable", podczas gdy rzeczywistość pokazuje, że wiele iPhone'ów jest zainfekowanych
3. **Niski zwrot z bug bounty** – 5 milionów USD nie zniechęca hakerów, którzy mogą zarobić znacznie więcej sprzedając exploity rządom
4. **Zagrożenie sieciowe** – Jedno zainfekowane urządzenie może zainfekować całą sieć domową, w tym smart home, routery i inne gadżety
5. **Social engineering pozostaje kluczowy** – 80% haków ma element inżynierii społecznej; po dostępie do sieci atakujący mają relatywnie łatwo
6. **Orzeczenie sądowe ma ograniczoną wartość** – Choć zabrana NSO dostęp do WhatsApp, Pegasus może nadal szpiegować wszystkie inne aplikacje i komunikację
7. **Większe zagrożenie niż się wydaje** – Oprócz rządowych zagrożeń (Pegasus), istnieją zwykli hakerzy najęci przez konkurentów biznesowych lub inne osoby

Dla Ciebie jako profesjonalisty cybersecurity: ten materiał potwierdza, że **żaden system nie jest bezpieczny w pełni**, a marketing producентów czasem znacznie odbiega od rzeczywistości. Inwestycja w edukację, monitorowanie sieci i segmentację urządzeń jest kluczowa.

<div style={{textAlign: "center"}}>⁂</div>

[^1]: https://www.youtube.com/watch?v=e9n3TxzS3sY

