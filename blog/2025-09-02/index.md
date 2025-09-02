---
slug: news-2025-09-02
title: "Salesforce, Google, Citrix i UNC6395 na celowniku – Fala ataków supply chain, ransomware i ShadowCaptcha uderza w branżę SaaS!"
authors: [przemyslvw]
tags: ["cybersecurity", "ataki", "exploits", "privacy"]
date: "2025-09-02"
---

Ostatni tydzień przyniósł wyjątkową dynamikę w świecie cyberbezpieczeństwa – ataki na łańcuchy dostaw (supply chain), nowatorskie kampanie ransomware i masowe nadużycia tokenów OAuth dotknęły nawet liderów rynku jak Salesforce, Google i Citrix. Pojawiły się też nowe typy zagrożeń, w których cyberprzestępcy wykorzystują automatyzację oraz AI do eskalacji ataków, omijania zabezpieczeń SaaS, kradzieży danych na skalę masową i szantażowania ofiar. Dostrzegalnym trendem jest także szybka eksploitacja krytycznych podatności typu zero-day (np. CVE-2025-7775) oraz szeroko zakrojona automatyzacja fazy ataku.

<!-- truncate -->

## Najważniejsze cyberwydarzenia ostatnich 7 dni

- **Salesforce/Google – masowy wyciek danych przez sprzedażowe integracje Drift OAuth**
    - Data: 8–18 sierpnia 2025
    - Mechanizm: Przejęte tokeny OAuth od integracji Salesloft Drift (kampania UNC6395), wykorzystane do nieautoryzowanego dostępu do wielu korporacyjnych instancji Salesforce
    - Skutki: Eksfiltracja danych z rekordów account/contact/case/opportunity, kradzież haseł i kluczy AWS/Snowflake, próby ukrycia śladów poprzez kasowanie logów zapytań
    - Trend: Wektor ataku oparty na automatyzacji, rozprzestrzenianie się przez inne SaaS (Google Workspace, Slack, Pardot)
- **Citrix NetScaler – aktywna exploityacja CVE-2025-7775 (RCE)**
    - Data: od 26 sierpnia 2025 r.
    - Mechanizm: Krytyczna luka typu memory overflow umożliwiająca zdalne wykonanie kodu oraz ataki DoS na niezałatanych urządzeniach Citrix NetScaler ADC \& Gateway
    - Skutki: Instalowanie webshelli, ryzyko szybkiego upublicznienia exploita, rekomendacje natychmiastowego patchowania
    - Trend: Masowe ataki na infrastrukturę krytyczną, historyczne zainteresowanie grup ransomware sprzętem Citrix
- **Rosnące kampanie ransomware i spear-phishing**
    - Branża: SaaS, usługi krytyczne, firmy globalne
    - Mechanizmy: Wykorzystanie zero-day, „live-off-the-land”, zaawansowane phishingi z elementami AI (np. ShadowCaptcha), socjotechniki wobec helpdesków
    - Skutki: Kradzież danych, zakłócenia operacji, wycieki do dark web
- **Ataki supply chain z użyciem AI i automatyzacji**
    - Przykład: Automatyzowane przeszukiwanie wykradzionych baz danych, masowa sprzedaż rekordów oraz keyloggery w integracjach


## Podsumowanie

W minionym tygodniu cyberprzestępcy pokazali, że automatyzacja ataków i nadużycia połączeń API (OAuth/SaaS) skutecznie omijają klasyczne zabezpieczenia, a krytyczne luki (np. Citrix CVE-2025-7775) są wykorzystywane w praktyce niemal natychmiast po upublicznieniu. W najbliższych dniach spodziewać się można wzmożonej liczby ataków supply chain, dużej aktywności ransomware oraz dalszego wykorzystania AI w automatyzacji i eskalacji ataków.