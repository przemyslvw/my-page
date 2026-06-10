---
slug: osint-numer-telefonu
title: " OSINT: Jak prześwietlić numer telefonu pod kątem cyberzagrożeń"
authors: [przemyslvw]
tags: ["osint", "cyberbezpieczenstwo", "analiza", "phoneinfoga", "intelx"]
date: "2025-05-16"
image: "/img/blog/osint-numer-telefonu.webp"
---

Weryfikacja numeru telefonu może dostarczyć wielu istotnych informacji z punktu widzenia działu cyberbezpieczeństwa. W tym wpisie pokażemy konkretne techniki i narzędzia OSINT umożliwiające identyfikację właściciela numeru, analizę reputacji oraz ocenę potencjalnych zagrożeń.

<!-- truncate -->

## Lista technik OSINT dla numeru telefonu

1. **Reverse Phone Lookup**  
   Odwrotne wyszukiwanie numeru w katalogach, ogłoszeniach, bazach danych.

2. **Cross-platform username hunting**  
   Sprawdzanie, czy numer pojawia się jako login lub ID w mediach społecznościowych.

3. **Search Engine Correlation**  
   Wyszukiwanie za pomocą operatorów `intext:"+48..."`, `site:facebook.com`, itp.

4. **Analiza komunikatorów**  
   Dodanie numeru do kontaktów w WhatsApp, Signal, Telegram i obserwacja dostępnych danych (zdjęcie, status, aktywność).

5. **Pastebin & Leak Checks**  
   Weryfikacja obecności numeru w wyciekach danych, bazach typu Pastebin.

6. **Analiza reputacji i blacklist**  
   Sprawdzenie, czy numer figuruje jako spamowy, phishingowy lub nadużywany.

---

## Lista narzędzi i serwisów OSINT

| Narzędzie | Opis | Link |
|----------|------|------|
| **PhoneInfoga** | Narzędzie CLI do analizy numerów – operator, lokalizacja, integracja z OSINT. | [github.com/sundowndev/phoneinfoga](https://github.com/sundowndev/phoneinfoga) |
| **IntelX** | Przeszukuje pastebiny, wycieki i dokumenty zawierające dany numer. | [intelx.io](https://intelx.io) |
| **TrueCaller** | Globalna baza crowdsourcingowa – identyfikacja nazw użytkowników. | [truecaller.com](https://www.truecaller.com) |
| **Sync.me** | Weryfikacja reputacji numerów – baza danych o spamie i oszustwach. | [sync.me](https://www.sync.me) |
| **Whoscall** | Antyspamowa baza numerów telefonów. | [whoscall.com](https://www.whoscall.com) |
| **Google/DuckDuckGo** | Zaawansowane wyszukiwanie operatorami `intext:`, `site:`. | — |
| **OSINT Framework (Phone Numbers)** | Kompendium narzędzi OSINT, w tym sekcja dla numerów telefonów. | [osintframework.com/#phone-numbers](https://osintframework.com/#phone-numbers) |
| **Social Searcher** | Analiza powiązanych kont społecznościowych. | [social-searcher.com](https://www.social-searcher.com) |

---

## Rekomendacje i ocena ryzyka

**Ocena ryzyka:**
- Jeśli numer występuje w spamowych bazach lub wyciekach – może być powiązany z działalnością przestępczą.
- Obecność w komunikatorach i social mediach umożliwia pasywną analizę behawioralną.

**Rekomendowane działania:**
1. Przeprowadzić **pasywną analizę OSINT** przy użyciu PhoneInfoga i IntelX.
2. Sprawdzić obecność w komunikatorach – **sandboxowy numer testowy** może ułatwić obserwację.
3. Jeśli numer występuje w wyciekach lub jest powiązany z phishingiem – **eskalować do zespołu IR lub działu prawnego**.
4. Dodać numer do **SIEM/SOAR** jako wskaźnik zagrożenia (IoC).

---

Potrzebujesz zautomatyzować ten proces w Pythonie lub n8n? Napisz – pokażemy Ci, jak to zrobić krok po kroku.

![Grupy ransomware 2025](/img/blog/osint-numer-telefonu.webp)
