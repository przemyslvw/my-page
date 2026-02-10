---
slug: black-hat-python
title: "Dlaczego warto pisać własne narzędzia? Przegląd Black Hat Python (Wydanie II)"
authors: [przemyslvw]
tags: ["book-review", "black-hat-python", "python", "offensive-security", "red-teaming", "networking"]
date: "2026-02-09"
---

Od Script Kiddie do Profesjonalisty. W przedmowie do drugiego wydania "Black Hat Python", Charlie Miller (znany z głośnego ataku na Jeepa Cherokee) stawia sprawę jasno: różnica między "script kiddies" a profesjonalnymi hakerami polega na tym, że ci pierwsi używają cudzych narzędzi, a ci drudzy potrafią napisać własne.

<!-- truncate -->


Książka Justina Seitza i Tima Arnolda to przewodnik właśnie dla tych, którzy chcą przejść na wyższy poziom i tworzyć własne oprogramowanie ofensywne. Python pozostaje "koniem roboczym" branży bezpieczeństwa, używanym do wszystkiego – od exploitów po frameworki takie jak CANVAS czy fuggery.

## Co nowego w drugim wydaniu?

Pierwsze wydanie było klasykiem, ale świat poszedł do przodu. Druga edycja została w pełni zaktualizowana do Pythona 3, ponieważ Python 2 osiągnął koniec swojego cyklu życia w 2020 roku. Autorzy nie tylko przepisali kod, ale także uwzględnili nowsze biblioteki i praktyki, takie jak używanie wirtualnych środowisk (venv) czy menedżerów kontekstu. Kod w książce podąża za wytycznymi PEP 8, z naciskiem na czytelność – mantra współautora, Tima Arnolda, brzmi: "niech działa, niech będzie zrozumiałe, niech będzie szybkie – w tej kolejności".


## Przegląd najciekawszych projektów z książki

Książka to zbiór praktycznych projektów ("przepisów") na ofensywne narzędzia. Oto co można w niej znaleźć:
1. **Własny Netcat i Proxy TCP** — Autorzy wychodzą z założenia, że w sieci korporacyjnej często nie mamy dostępu do narzędzi takich jak Wireshark czy Netcat. Pierwsze rozdziały uczą więc, jak napisać własny zamiennik Netcata w Pythonie (z możliwością przesyłania plików i wykonywania komend) oraz jak zbudować Proxy TCP do modyfikowania ruchu sieciowego w locie.

2. **Sniffing i Manipulacja Pakietami (Scapy)** — Książka pokazuje, jak wykorzystać bibliotekę Scapy do zadań wywiadowczych. Znajdziesz tu instrukcje, jak napisać sniffer wykradający poświadczenia pocztowe (POP3, IMAP, SMTP) oraz jak przeprowadzić atak ARP Cache Poisoning, aby stać się "man-in-the-middle" i przechwytywać ruch ofiary. Ciekawostką jest rozdział o przetwarzaniu plików PCAP, gdzie autorzy uczą, jak wyciągać obrazy z ruchu HTTP, a następnie używać biblioteki OpenCV do wykrywania na nich ludzkich twarzy.

3. **Web Hacking i Rozszerzanie Burp Suite** — Dla fanów websecu przygotowano materiał o mapowaniu aplikacji open source (np. WordPress) i brute-forcowaniu paneli logowania przy użyciu biblioteki requests i lxml. Co ważniejsze, książka uczy, jak pisać własne rozszerzenia do Burp Suite przy użyciu Jython (Python działający na JVM). Przykłady obejmują stworzenie fuzera (BHP Fuzzer) oraz integrację z API Binga do rekonesansu.

4. **Trojan sterowany przez GitHub (C2)** — To jeden z najciekawszych projektów w książce. Zamiast używać standardowych kanałów Command & Control (C2), autorzy budują modułowego trojana, który pobiera konfigurację i kod do wykonania bezpośrednio z prywatnego repozytorium na GitHubie. Dzięki temu ruch sieciowy wygląda na legalny (szyfrowany SSL do znanej domeny), a trojan może dynamicznie importować nowe biblioteki bez konieczności rekompilacji.

5. **Ofensywa na Windows i Eskalacja Uprawnień** — Dla atakujących środowiska Windows przygotowano skrypty wykorzystujące WMI (Windows Management Instrumentation) do monitorowania procesów i tworzenia keyloggerów z użyciem pyWinhook. Autorzy pokazują też techniki "wygrywania wyścigu" (race conditions) przy nadpisywaniu plików tymczasowych oraz wstrzykiwanie kodu (Code Injection) do procesów, aby uzyskać uprawnienia SYSTEM.

6. **Ofensywna Informatyka Śledcza (Volatility)** — Ostatni rozdział odwraca rolę narzędzia defensywnego – frameworka Volatility. Zamiast szukać dowodów włamania, czytelnik uczy się analizować zrzuty pamięci RAM, aby wyciągnąć hasła użytkowników (hashdump), historię komend i połączyć się z otwartymi sesjami na maszynach wirtualnych ofiary.


## Dla kogo jest ta książka?

"Black Hat Python" nie uczy podstaw programowania. Jest skierowana do osób, które znają już podstawy Pythona (średniozaawansowani) i chcą zrozumieć, jak tworzyć własne narzędzia bezpieczeństwa, zamiast polegać wyłącznie na gotowych rozwiązaniach. To pozycja obowiązkowa dla pentesterów, którzy chcą dostosowywać swoje ataki do specyficznych środowisk, gdzie standardowe skrypty mogą zawieść.

## Wnioski

Jak piszą autorzy: "Hakowanie to nasz ostateczny cel". Ta książka to zestaw klocków Lego dla hakerów – daje solidne fundamenty (networking, surowe gniazda, obsługa Web API), z których można budować wyrafinowane narzędzia ataku.
