---
slug: news-2025-08-24
title: "Google ostrzega: Złośliwe moduły Go i botnety IoT atakują, wykradając dane i wykraczając poza tradycyjne cyberzagrożenia"
authors: [przemyslvw]
tags: ["cybersecurity", "ataki", "exploits", "privacy"]
date: "2025-08-24"
---

Najnowsze zagrożenia w cyberprzestrzeni: złośliwy moduł Go ukrywa się pod maską narzędzia do brute-force SSH, wykradając dane użytkowników i przesyłając je przez Telegram. Tymczasem cyberprzestępcy wykorzystują luki bezpieczeństwa w GeoServer i exposed Redis do tworzenia botnetów IoT, proxy i infrastruktury do kopania kryptowalut, przy czym ataki o wysokim współczynniku CVE-2024-36401 osiągnęły aż 9,8 w skali CVSS.

<!-- truncate -->

## Złośliwy moduł Go podszywający się pod narzędzie brute-force SSH

Złośliwy moduł Go udaje narzędzie do brute-force SSH, ale w rzeczywistości zawiera funkcjonalność do dyskretnego wykradania danych uwierzytelniających i przesyłania ich do swojego twórcy.

> "Przy pierwszym udanym logowaniu, pakiet wysyła adres IP celu, nazwę użytkownika i hasło do trudnodostępnego bota Telegram kontrolowanego przez osobę atakującą," powiedział badacz Socket, Kirill Boychenko.

## Eksploatacje GeoServer, PolarEdge i Gayfemboy

Eksploatacje GeoServer, PolarEdge i Gayfemboy popychają cyberprzestępczość poza tradycyjne botnety.

Badacze ds. cyberbezpieczeństwa zwracają uwagę na liczne kampanie, które korzystają z znanych luk bezpieczeństwa i odsłoniętych serwerów Redis do różnych złośliwych działań, w tym wykorzystywania zaatakowanych urządzeń jako botnetów IoT, proxy domowych lub infrastruktury do kopania kryptowalut.

Pierwszy zestaw ataków obejmuje eksploatację CVE-2024-36401 (wskaźnik CVSS: 9.8).
