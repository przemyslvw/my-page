---
slug: krytyczna-luka-bezpieczenstwa-w-kamerach-lg
title: "Krytyczna luka bezpieczeństwa w kamerach LG bez możliwości naprawy"
authors: [przemyslvw]
tags: [cybersecurity, jamming, xiaomi, web-security, ochrona-sieci]
date: 2025-07-26
---

**Setki kamer bezpieczeństwa LG Innotek LNV5110R są narażone na zdalne ataki hakerskie z powodu niepłatanej luki umożliwiającej nieautoryzowane zdalne wykonywanie kodu.**

## Szczegóły zagrożenia

Amerykańska Agencja Cyberbezpieczeństwa i Bezpieczeństwa Infrastruktury (CISA) ujawniła w czwartek istnienie krytycznej luki bezpieczeństwa w kamerach LG Innotek model LNV5110R[^1]. Podatność, oznaczona jako **CVE-2025-7742**, otrzymała ocenę "wysokiej ważności" i pozwala napastnikom na pominięcie uwierzytelniania w celu uzyskania dostępu administracyjnego do urządzenia[^1][^2].

<!-- truncate -->

### Mechanizm ataku

Luka polega na **obejściu uwierzytelniania przynatywnej ścieżki lub kanału** (CWE-288)[^2]. Napastnik może wykorzystać tę podatność poprzez przesłanie specjalnie spreparowanego żądania HTTP POST do pamięci nieulotnej urządzenia[^1][^2]. Skutkiem tego działania może być zdalne wykonywanie kodu z podwyższonymi uprawnieniami administratora[^1].

Jak wyjaśnia odkrywca luki, badacz bezpieczeństwa **Souvik Kandar** z firmy MicroSec: *"To jest pełna, niewymagająca uwierzytelnienia luka zdalnego wykonywania kodu. Napastnik może przesłać reverse shell bez żadnego logowania, uzyskać uprawnienia administratora, wykonać dowolne polecenia Linux i użyć urządzenia jako platformy startowej do infiltracji wewnętrznych sieci"*[^1].

## Skala problemu

Według badań przeprowadzonych przez Souvik Kandara, **około 1300 kamer jest dostępnych w internecie** i podatnych na zdalne włamania[^1][^3]. Urządzenia te są wykorzystywane na całym świecie, w tym w sektorze obiektów komercyjnych zaliczanym do infrastruktury krytycznej[^1][^2].

### Możliwości napastników

Eksploitacja tej luki umożliwia atakującym:

- **Dostęp do transmisji na żywo** z kamer bezpieczeństwa[^1]
- **Zakłócenie działania** lub całkowite wyłączenie urządzeń[^1]
- **Wykonywanie dowolnych poleceń** na poziomie administratora systemu[^1]
- **Wykorzystanie skompromitowanego urządzenia** jako punktu wejścia do szerszych ataków na sieć wewnętrzną[^1]


## Ocena ryzyka

Podatność otrzymała następujące oceny w systemach CVSS:

- **CVSS v3.1**: 7.0 (Wysokie zagrożenie)[^2]
- **CVSS v4**: 8.3 (Wysokie zagrożenie)[^2][^4]

Wektor ataku według CVSS v4: `AV:N/AC:H/AT:N/PR:N/UI:N/VC:H/VI:L/VA:L/SC:N/SI:N/SA:N`[^2], co oznacza:

- Atak możliwy przez sieć (Network)
- Wysoka złożoność ataku
- Brak wymaganych uprawnień
- Brak wymaganej interakcji użytkownika


## Brak dostępnej łatki

**Najbardziej alarmującym aspektem** tej sytuacji jest fakt, że LG Innotek **nie udostępni poprawki** bezpieczeństwa. Firma została powiadomiona o luce, ale stwierdziła, że produkt osiągnął koniec życia (end-of-life) i nie może być już łatany[^1][^2].

CISA podkreśla w swoim komunikacie: *"LG Innotek jest świadome luki, ale zauważa, że jest to produkt wycofany z produkcji, który nie może być już łatany"*[^2].

## Zalecenia bezpieczeństwa

W obliczu braku dostępnej łatki, CISA rekomenduje następujące środki obronne[^2]:

### Segmentacja sieci

- **Minimalizacja ekspozycji sieciowej** wszystkich urządzeń sterujących
- **Izolacja od internetu** - upewnienie się, że kamery nie są dostępne z sieci publicznej
- **Umieszczenie za zaporami ogniowymi** i odizolowanie od sieci biznesowych


### Bezpieczny dostęp zdalny

- W przypadku konieczności zdalnego dostępu, używanie **bezpiecznych metod** takich jak VPN
- **Aktualizowanie VPN** do najnowszych wersji
- Pamiętanie, że VPN jest tak bezpieczny, jak urządzenia do niego podłączone


### Monitorowanie i reakcja

- **Przeprowadzenie odpowiedniej analizy wpływu** przed wdrożeniem środków obronnych
- **Monitoring ruchu sieciowego** w poszukiwaniu podejrzanych aktywności
- **Zgłaszanie podejrzanych działań** do CISA zgodnie z ustalonymi procedurami


## Kontekst branżowy

Ta sytuacja jest emblematyczna dla szerszego problemu w branży urządzeń IoT i systemów nadzoru. Jak zauważają badacze bezpieczeństwa, **cykle życia oprogramowania często są krótsze niż żywotność fizyczna** tych produktów, szczególnie w sektorach gdzie cykle modernizacji są rzadkie lub kosztowne[^5].

### Poprzednie problemy z urządzeniami LG

To nie pierwszy przypadek wykrycia luk bezpieczeństwa w produktach LG. W przeszłości firma mierzyła się z podobnymi problemami:

- W 2017 roku Check Point odkrył podatność "HomeHack" w aplikacji SmartThinQ, która umożliwiała przejęcie kontroli nad urządzeniami domowymi[^6]
- W 2024 roku Bitdefender znalazł luki w telewizorach LG z systemem webOS, które mogły pozwolić na uzyskanie dostępu root[^7]


## Działania badacza Souvik Kandara

Souvik Kandar, badacz bezpieczeństwa z firmy MicroSec, który odkrył tę lukę, jest uznanym ekspertem w dziedzinie bezpieczeństwa IoT i OT. W 2025 roku zgłosił już **50 podatności**[^1], w tym luki w inteligentnych systemach pogodowych, czujnikach sejsmicznych, systemach morskich, routerach i urządzeniach OT[^1].

Kandar jest również autorem odkryć w produktach firm AutomationDirect, Instantel i Lantronix przeznaczonych dla środowisk przemysłowych[^1][^8]. Jego badania są koordynowane przez Idaho National Laboratory (INL) i CISA, co podkreśla ich znaczenie dla bezpieczeństwa infrastruktury krytycznej[^9].

## Wnioski i rekomendacje

Przypadek kamer LG Innotek LNV5110R stanowi **ostrzeżenie dla całej branży** dotyczące zarządzania cyklem życia produktów IoT. Organizacje wykorzystujące takie urządzenia powinny:

1. **Opracować strategie zarządzania końcem życia produktów** z uwzględnieniem aspektów bezpieczeństwa
2. **Regularnie przeprowadzać audyty** wszystkich urządzeń sieciowych w swojej infrastrukturze
3. **Wdrożyć zasady Defense-in-Depth** zgodnie z zaleceniami CISA
4. **Planować wymianę urządzeń** przed zakończeniem wsparcia przez producenta

Brak możliwości załatania tej krytycznej luki stanowi **poważne zagrożenie dla bezpieczeństwa** infrastruktury krytycznej na całym świecie. Organizacje używające tych kamer powinny **niezwłocznie** rozważyć ich wymianę lub wdrożenie zdecydowanych środków kompensacyjnych w celu minimalizacji ryzyka cyberataków.

[^1]: https://www.securityweek.com/no-patch-for-flaw-exposing-hundreds-of-lg-cameras-to-remote-hacking/

[^2]: https://www.cisa.gov/news-events/ics-advisories/icsa-25-205-04

[^3]: https://securityaffairs.com/180368/security/unpatched-flaw-in-eol-lg-lnv5110r-cameras-lets-hackers-gain-admin-access.html

[^4]: https://www.tenable.com/cve/CVE-2025-7742

[^5]: https://windowsforum.com/threads/lg-innotek-lnv5110r-camera-vulnerability-end-of-life-risks-cybersecurity-challenges.374685/latest

[^6]: https://blog.checkpoint.com/security/homehack-how-hackers-could-have-taken-control-of-lgs-iot-home-appliances/

[^7]: https://arstechnica.com/security/2024/04/patches-released-for-as-many-as-91000-hackable-lg-tvs-exposed-to-the-internet/

[^8]: https://www.securityweek.com/lantronix-device-used-in-critical-infrastructure-exposes-systems-to-remote-hacking/

[^9]: https://www.linkedin.com/posts/souvik-kandar_cybersecurity-zeroday-inl-activity-7321608281225891840-UBR1

[^10]: https://dailysecurityreview.com/podcasts/no-fix-coming-remote-code-execution-flaw-in-1300-lg-security-cameras/

[^11]: https://community.opentextcybersecurity.com/vulnerability-vault-228/no-patch-for-flaw-exposing-hundreds-of-lg-cameras-to-remote-hacking-361615

[^12]: https://securityaffairs.com/124191/hacking/linux-kernel-rce.html

[^13]: https://securitybrief.com.au/story/check-point-uncovers-major-security-flaw-lg-smart-devices

[^14]: https://www.show.it/en/no-patch-for-flaw-exposing-hundreds-of-lg-cameras-to-remote-hacking/

[^15]: https://www.bitdefender.com/en-gb/blog/hotforsecurity/security-vulnerability-lg-smartthinkq-turns-1-million-devices-digital-spies

[^16]: https://x.com/EduardKovacs/status/1948670525183852774

[^17]: https://www.tomsguide.com/computing/online-security/hackers-could-spy-on-you-through-your-lg-tv-update-now-to-patch-these-critical-vulnerabilities

[^18]: https://www.linkedin.com/posts/lewiscombs_ics-otsecurity-embeddeddevices-activity-7354487337277407234-dVyh

[^19]: https://twitter.com/HackerMigh32064/status/1948469380486234559

[^20]: https://nvd.nist.gov/vuln/detail/CVE-2025-7742

[^21]: https://www.opencve.io/cve?vendor=9.dotpp.net

[^22]: https://vulners.com/cve/CVE-2025-7742

[^23]: https://westoahu.hawaii.edu/cyber/vulnerability-research/vulnerabilities-weekly-summaries/homehack-hacking-lg-smart-appliances/

[^24]: https://industrialcyber.co/threats-attacks/cisa-flags-hardware-vulnerabilities-in-honeywell-medtronic-mitsubishi-lg-network-thermostat-devices/

[^25]: https://feedly.com/cve/CVE-2025-7742

[^26]: https://in.linkedin.com/in/souvik-kandar

[^27]: https://secalerts.co/vulnerability/CVE-2025-7742

[^28]: https://github.com/advisories/GHSA-2rv3-3939-3h9h

[^29]: https://cybernews.com/security/smart-iot-devices-vulnerable-to-unauthenticated-hackers/

[^30]: https://www.isssource.com/no-fix-for-lg-innotek-camera/

[^31]: https://us-cert.cisa.gov/news-events/ics-advisories/icsa-25-205-01

[^32]: https://www.cve.org/CVERecord?id=CVE-2025-7742

[^33]: https://www.infocean.com/cisa-releases-six-industrial-control-systems-advisories-16/

[^34]: https://securityaffairs.com/174923/security/u-s-cisa-adds-linux-kernel-and-vmware-esxi-and-workstation-flaws-to-its-known-exploited-vulnerabilities-catalog.html

[^35]: https://nvd.nist.gov/vuln/detail/CVE-2025-7472

[^36]: https://www.youtube.com/watch?v=cbN62fKgBcs

[^37]: https://therecord.media/lg-promises-three-years-of-security-updates-after-pulling-out-of-smartphone-biz

[^38]: https://industrialcyber.co/threats-attacks/bitsight-reveals-global-surge-in-exposed-unsecured-security-cameras-in-manufacturing-healthcare/

[^39]: https://www.lgnewsroom.com/page/39/?p=L3Jlc291cmNlL3Bvc3QvNDczL0xHX1A1MDBfTWFpbl9TcGVjaWZpY2F0aW9ucy5wZGY%3D\&f=TEdfUDUwMF9NYWluX1NwZWNpZmljYXRpb25zLnBkZg%3D%3D

[^40]: https://www.intelligentciso.com/2025/06/19/more-than-40000-security-cameras-found-openly-accessible-on-the-internet/

[^41]: https://www.lgcorp.com/esg/policy

[^42]: https://www.bitsight.com/blog/bitsight-identifies-thousands-of-compromised-security-cameras

[^43]: https://www.lg.com/global/business/privacy

[^44]: https://lgshield.lge.com/en/terms-of-use

[^45]: https://gbhackers.com/dover-fueling-solutions-flaw/

[^46]: https://blackhatnews.tokyo/archives/3891

[^47]: https://www.lg.com/uk/support/announcement/GBNTC20220419152260/

[^48]: https://cyberpress.org/dover-fueling-solutions-vulnerability/

[^49]: https://www.lg.com/global/business/download/resources/security/LND3230R_LNU3230R_OM_ENG_MFL69460501.pdf

<div style={{textAlign: "center"}}>⁂</div>