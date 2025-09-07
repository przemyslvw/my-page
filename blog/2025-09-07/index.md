---
slug: news-2025-09-07
title: "Kryzys cyberbezpieczeństwa września 2025: Rekordowy wzrost ataków ransomware i nowe zagrożenia"
authors: [przemyslvw]
tags: ["cybersecurity", "ataki", "exploits", "privacy"]
date: "2025-09-07"
---

Pierwsze dni września 2025 roku przyniosły niepokojącą eskalację cyberzagrożeń na globalnym rynku. W ciągu ostatniego tygodnia odnotowano **gwałtowny wzrost ataków ransomware o 57% w sektorze produkcyjnym**, podczas gdy największe firmy technologiczne znalazły się w centrum zaawansowanych kampanii kradzieży danych. Ataki na **łańcuchy dostaw SaaS**, wykorzystujące zaufane platformy takie jak Salesforce, osiągnęły nowy poziom wyrafinowania, podczas gdy **krytyczne luki zero-day w systemach SAP** i **routerach TP-Link** są aktywnie eksploatowane przez cyberprzestępców.[^1][^2][^3][^4]

<!-- truncate -->

Szczególną uwagę zwracają **ataki na platformy OAuth** oraz **kampanie spear-phishingu** wykorzystujące sztuczną inteligencję do obejścia tradycyjnych mechanizmów bezpieczeństwa. **Infrastruktura krytyczna** w Ameryce Północnej stała się głównym celem, czego przykładem są ataki na Bridgestone oraz Nevada State - pierwszy w historii **atak ransomware na poziomie stanowym**.[^4]

## Najważniejsze Incydenty Cyberbezpieczeństwa (1-7 września 2025)

**-  Masowy atak na łańcuch dostaw Salesforce-Drift (sierpień-wrzesień 2025)**

- **Firmy:** Cloudflare, Palo Alto Networks, Zscaler, Google, setki innych organizacji[^5][^6][^7]
- **Mechanizm:** Kompromitacja tokenów OAuth w integracji Salesloft Drift, eksfiltracja przez Bulk API 2.0[^6][^5]
- **Skutki:** Kradzież kluczy AWS, haseł, tokenów Snowflake; Cloudflare wykryła 104 skompromitowane tokeny API[^7][^5]
- **Typ:** Supply chain attack, OAuth token compromise (UNC6395/GRUB1)[^5][^6]

**-  Krytyczna luka SAP S/4HANA (CVE-2025-42957) - aktywnie eksploatowana**

- **System:** SAP S/4HANA (wszystkie wersje Private Cloud i On-Premise)[^8][^2][^1]
- **Mechanizm:** Code injection ABAP przez RFC z niskimi uprawnieniami[^1][^8]
- **Skutki:** Pełne przejęcie systemu, tworzenie kont SAP_ALL, download hashy haseł[^8][^1]
- **CVSS:** 9.9 - łatka dostępna od sierpnia 2025, ale aktywnie wykorzystywana[^2][^1]

**-  Cyberatak na Bridgestone Americas - zakłócenia produkcji**

- **Data:** 2 września 2025[^9][^10][^11]
- **Zasięg:** Wszystkie zakłady w Ameryce Północnej (według burmistrza Joliette)[^11][^9]
- **Skutki:** Zatrzymanie produkcji, pracownicy bez płacy lub konserwacja za pełną płacę[^10][^9]
- **Typ:** Prawdopodobnie ransomware (nieupotwierdzony)[^12][^13]

**-  Zero-day w routerach TP-Link - wykorzystywane przez botnet Quad7**

- **CVE:** CVE-2025-50224, CVE-2025-9377, CVE-2020-24363[^3][^14][^15]
- **Modele:** Archer C7, TL-WR841N/ND, TL-WA855RE[^14][^3]
- **Mechanizm:** Password spray attacks na konta Microsoft 365 przez skompromitowane routery[^3][^14]
- **Status:** CISA dodała do KEV, urząd zaleca wycofanie EOL urządzeń[^15][^14]

**-  Naruszenie Chess.com - 4500 użytkowników**

- **Data:** 5-18 czerwca 2025 (ujawnione 3 września)[^16][^17][^18]
- **Mechanizm:** Kompromitacja narzędzia third-party file transfer[^17][^16]
- **Skutki:** Kradzież nazwisk i danych osobowych, brak haseł/płatności[^16][^17]
- **Zasięg:** Mniej niż 0,003% z 150 milionów użytkowników[^17]

**-  Wealthsimple - naruszenie danych finansowych**

- **Data:** 30 sierpnia 2025 (ujawnione 5 września)[^19][^20][^21]
- **Mechanizm:** Skompromitowany pakiet oprogramowania third-party[^20][^19]
- **Skutki:** Kradzież SIN, numerów kont, dat urodzenia, IP (<1% z 3 mln klientów)[^21][^19]
- **Ochrona:** 2 lata bezpłatnego monitoringu tożsamości[^20][^21]

**-  Aktywnie eksploatowane luki Android - spyware zagrożenie**

- **CVE:** CVE-2025-48543 (Android Runtime), CVE-2025-38352 (Linux kernel)[^22][^23][^24]
- **Mechanizm:** Local privilege escalation bez interakcji użytkownika[^23][^22]
- **Status:** Wykryte przez Google TAG jako "ograniczone, ukierunkowane ataki"[^25][^22]
- **Zasięg:** Android 13-16, prawdopodobnie mercenary spyware[^23][^25]

**-  Wzrost ataków ransomware o 57% w produkcji**

- **Statystyki:** 506 ataków w sierpniu vs 473 w lipcu (+7% ogólnie)[^4]
- **Sektor:** Produkcja +57% (113 vs 72), healthcare, food \& beverage[^4]
- **Nowy rekord:** Pierwszy atak ransomware na poziomie stanu (Nevada)[^4]
- **Grupy:** Qilin (86 ataków), Akira (57), Sinobi (36)[^4]


## Podsumowanie

Pierwszy tydzień września 2025 roku ujawnił **systemową podatność globalnej infrastruktury cyfrowej** na wyrafinowane ataki na łańcuchy dostaw. **Kampania Salesforce-Drift** udowodniła, jak pojedyncza skompromitowana integracja może zagrozić setkom organizacji, włączając liderów cyberbezpieczeństwa. **Równoczesna eksploatacja krytycznych luk SAP** (CVE-2025-42957) i aktywne wykorzystanie **zero-day w Androidzie** sygnalizują rosnące zagrożenie ze strony zaawansowanych grup APT i dostawców spyware.

**Trendy alarmujące** obejmują 57% wzrost ataków ransomware w produkcji, pierwszy stanowy atak ransomware w historii USA oraz masowe wykorzystanie **skompromitowanych routerów domowych** do ataków na infrastrukturę korporacyjną. **Sztuczna inteligencja** coraz częściej służy zarówno do ataków (automatyzacja exploitów) jak i obrony, tworząc nowy wymiar wyścigu zbrojeń cybernetycznych.

**Kluczowym wnioskiem** jest konieczność **holistycznego podejścia do bezpieczeństwa łańcucha dostaw**, wykraczającego poza tradycyjne perimetry bezpieczeństwa i obejmującego **głęboką weryfikację integracji third-party** oraz **proaktywne monitorowanie tokenów OAuth** w środowiskach SaaS.
<span style="display:none">[^26][^27][^28][^29][^30][^31][^32][^33][^34][^35][^36][^37][^38][^39][^40][^41][^42][^43][^44][^45][^46][^47][^48][^49][^50][^51][^52][^53][^54][^55][^56][^57][^58][^59][^60]</span>

<div style="text-align: center">⁂</div>

[^1]: https://securitybridge.com/blog/critical-sap-s-4hana-code-injection-vulnerability-cve-2025-42957/

[^2]: https://thehackernews.com/2025/09/sap-s4hana-critical-vulnerability-cve.html

[^3]: https://www.malwarebytes.com/blog/news/2025/09/tp-link-warns-of-botnet-infecting-routers-and-targeting-microsoft-365-accounts

[^4]: https://industrialcyber.co/control-device-security/comparitech-reports-ransomware-attacks-rose-for-a-second-month-hitting-healthcare-manufacturing-food-sectors/

[^5]: https://www.securityweek.com/security-firms-hit-by-salesforce-salesloft-drift-breach/

[^6]: https://cloud.google.com/blog/topics/threat-intelligence/data-theft-salesforce-instances-via-salesloft-drift

[^7]: https://blog.cloudflare.com/response-to-salesloft-drift-incident/

[^8]: https://pathlock.com/blog/security-alerts/cve-2025-42957-critical-sap-s-4hana-code-injection-vulnerability/

[^9]: https://cybersecuritynews.com/bridgestone-cyberattack/

[^10]: https://www.bleepingcomputer.com/news/security/tire-giant-bridgestone-confirms-cyberattack-impacts-manufacturing/

[^11]: https://www.cryptika.com/bridgestone-confirms-cyberattack-impacts-manufacturing-facilities/

[^12]: https://cybernews.com/security/bridgestone-cyberattack-auto-manufacturer-disrupted-jaguar-link/

[^13]: https://www.linkedin.com/pulse/bridgestone-cyberattack-disrupts-manufacturing-raises-anna-ribeiro-pniac

[^14]: https://thehackernews.com/2025/09/cisa-flags-tp-link-router-flaws-cve.html

[^15]: https://cybernews.com/security/tp-link-whatsapp-vulnerabilities-exploited-by-hackers/

[^16]: https://www.bleepingcomputer.com/news/security/chesscom-discloses-recent-data-breach-via-file-transfer-app/

[^17]: https://hackread.com/chess-com-data-breach-3rd-party-file-transfer-tool/

[^18]: https://cybernews.com/security/chess-com-data-breach-third-party/

[^19]: https://cybersecuritynews.com/wealthsimple-data-breach/

[^20]: https://www.bleepingcomputer.com/news/security/financial-services-firm-wealthsimple-discloses-data-breach/

[^21]: https://www.ctvnews.ca/canada/article/wealthsimple-says-personal-client-data-accessed-in-security-breach/

[^22]: https://thehackernews.com/2025/09/android-security-alert-google-patches.html

[^23]: https://thecyberexpress.com/cve-2025-48543-and-cve-2025-38352/

[^24]: https://www.bleepingcomputer.com/news/security/google-fixes-actively-exploited-android-flaws-in-september-update/

[^25]: https://www.helpnetsecurity.com/2025/09/04/google-fixes-actively-exploited-android-vulnerabilities-cve-2025-48543-cve-2025-38352/

[^26]: https://www.stephens-scown.co.uk/specialist-sectors/technology/salesforce-breach-highlights-cybersecurity-risks-for-businesses/

[^27]: https://nvd.nist.gov/vuln/detail/CVE-2025-42957

[^28]: https://cloudprotection.withsecure.com/blog/salesforce-attacks-in-2025/

[^29]: https://support.sap.com/en/my-support/knowledge-base/security-notes-news/august-2025.html

[^30]: https://www.salesforceben.com/salesforce-data-theft-roundup-everything-you-need-to-know/

[^31]: https://www.darkreading.com/vulnerabilities-threats/sap-4hana-vulnerability-under-attack

[^32]: https://www.darkreading.com/cyberattacks-data-breaches/bridgestone-americas-cyberattack

[^33]: https://www.paloaltonetworks.com/blog/2025/09/salesforce-third-party-application-incident-response/

[^34]: https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/protect-your-sap-s-4hana-from-critical-code-injection-vulnerability-cve/ba-p/14208866

[^35]: https://www.techzine.eu/news/security/134354/zero-day-vulnerability-discovered-in-tp-link-routers/

[^36]: https://thecyberexpress.com/chess-com-data-breach-exposes-information/

[^37]: https://ca.finance.yahoo.com/news/wealthsimple-client-data-including-sins-200717909.html

[^38]: https://www.tp-link.com/us/support/faq/4647/

[^39]: https://therecord.media/chess-platform-data-breach-file-transfer-tool

[^40]: https://www.cbc.ca/news/business/wealthsimple-data-security-breach-1.7626565

[^41]: https://nvd.nist.gov/vuln/detail/CVE-2025-9377

[^42]: https://www.techradar.com/pro/security/thousands-of-chess-com-fans-may-have-had-details-stolen-in-cyberattack

[^43]: https://globalnews.ca/news/11394858/wealthsimple-data-breach/

[^44]: https://www.scworld.com/brief/global-fix-for-tp-link-zero-day-imminent

[^45]: https://cyberpress.org/chess-com-data-breach/

[^46]: https://vulert.com/vuln-db/debian-11-linux-196010

[^47]: https://www.cm-alliance.com/cybersecurity-blog/major-cyber-attacks-ransomware-attacks-and-data-breaches-august-2025

[^48]: https://nvd.nist.gov/vuln/detail/CVE-2025-38352

[^49]: https://www.halcyon.ai/blog/halcyon-threat-insights-020-september-2025-ransomware-report

[^50]: https://source.android.com/docs/security/bulletin/2025-09-01

[^51]: https://javascript.plainenglish.io/cve-2025-38352-android-linux-kernel-race-condition-exploited-in-the-wild-7c030e50acc4

[^52]: https://www.cyfirma.com/news/weekly-intelligence-report-05-september-2025/

[^53]: https://www.bitdefender.com/en-us/blog/hotforsecurity/androids-latest-security-update-fixes-120-flaws-with-two-under-active-attack

[^54]: https://access.redhat.com/security/cve/cve-2025-38352

[^55]: https://www.pdpc.gov.sg/news-and-events/announcements/2025/09/new-undertakings-on-3-september-2025

[^56]: https://socradar.io/september-2025-android-security-bulletin-cve-2025-38352-cve-2025-48543/

[^57]: https://www.hkcert.org/security-bulletin/suse-linux-kernel-multiple-vulnerabilities_20250901

[^58]: https://www.ransomware.live

[^59]: https://nvd.nist.gov/vuln/detail/CVE-2025-48543

[^60]: https://security.snyk.io/vuln/SNYK-CENTOS7-KERNELKDUMP-10877048

