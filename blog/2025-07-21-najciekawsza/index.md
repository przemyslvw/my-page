---
slug: news-2025-07-21
title: "Microsoft SharePoint na celowniku cyberprzestępców: globalne ataki na lukę zero-day"
authors: [przemyslvw]
tags: ["cybersecurity", "ataki", "exploits", "privacy"]
date: 2025-07-21
---

Aktualne ataki na krytyczne luki zero day w Microsoft SharePoint (CVE‑2025‑53770 & CVE‑2025‑53771), znane pod nazwą „ToolShell”, potwierdzają, że zagrożenie jest poważne i globalne. Exploity umożliwiają nieautoryzowane wykonanie kodu (RCE) i spoofing klientów SharePoint — wszystko bez logowania. 
<!-- truncate -->

Pierwsze przypadki odnotowano 18 lipca 2025, a ataki eskalowały w ciągu weekendu ([sentinelone.com](https://www.sentinelone.com/blog/sharepoint-toolshell-zero-day-exploited-in-the-wild-targets-enterprise-servers/?utm_source=chatgpt.com)).

Cyberprzestępcy i aktorzy państwowi powiązani z Chinami (Linen Typhoon, Violet Typhoon, Storm‑2603) wykorzystują te luki, atakując instytucje rządowe, uniwersytety, firmy energetyczne, telekomy i szpitale w USA, Niemczech, Azji i Europie ([politico.com](https://www.politico.com/news/2025/07/22/microsoft-sharepoint-hack-china-federal-agencies-00467254?utm_source=chatgpt.com)).

Microsoft wydał pilne poprawki 19–20 lipca 2025 dla SharePoint Server Subscription Edition oraz 2019; patch dla wersji 2016 jest w drodze ([techradar.com](https://www.techradar.com/pro/security/microsoft-releases-urgent-sharepoint-security-flaw-patches-heres-what-you-need-to-know-and-how-to-update?utm_source=chatgpt.com)). CISA, FBI oraz inne agencje ostrzegają: nawet po patchu należy zakładać, że serwery mogły zostać skompromitowane — atakujący mogą mieć backdoory lub web shelle ([wsj.com](https://www.wsj.com/tech/cybersecurity/microsoft-alerts-firms-to-server-software-attack-99f9b036?utm_source=chatgpt.com)).

#### 🔧 Co robić?  
1. **Niezwłocznie zastosować poprawki** dla wersji 2019 / Subscription Edition, a gdy dostępny – również dla 2016 ([techradar.com](https://www.techradar.com/pro/security/microsoft-releases-urgent-sharepoint-security-flaw-patches-heres-what-you-need-to-know-and-how-to-update?utm_source=chatgpt.com)).  
2. **Podać się założyć, że doszło do włamania** — rozpocząć poszukiwanie IOC: web shelle („spinstall0.aspx”), skradzione MachineKeys ([microsoft.com](https://www.microsoft.com/en-us/security/blog/2025/07/22/disrupting-active-exploitation-of-on-premises-sharepoint-vulnerabilities/?utm_source=chatgpt.com)).  
3. **Wdrażać dodatkowe zabezpieczenia**: AMSI + Defender, rotację ASP.NET MachineKeys, monitorowanie aktywności, odłączenie serwerów od Internetu aż do patchowania ([msrc.microsoft.com](https://msrc.microsoft.com/blog/2025/07/customer-guidance-for-sharepoint-vulnerability-cve-2025-53770/?utm_source=chatgpt.com)).  
4. **Zaangażować zespół IR / zewnętrznych ekspertów**, jeśli mamy do czynienia z instytucjonalną, branżową lub rządową infrastrukturą.

### Podsumowanie
- **Co to?** Atak „ToolShell”: wykorzystanie dwóch krytycznych CVE (53770—RCE; 53771—spoofing), łączonych z wcześniejszymi 49704/49706 ([blog.qualys.com](https://blog.qualys.com/vulnerabilities-threat-research/2025/07/21/toolshell-zero-day-microsoft-rushes-emergency-patch-for-actively-exploited-sharepoint-vulnerabilities?utm_source=chatgpt.com)).  
- **Od kiedy?** Pierwsze działania wykryto już 7 lipca, realne ataki ruszyły 18 lipca 2025 ([windowscentral.com](https://www.windowscentral.com/software-apps/were-witnessing-an-urgent-and-active-threat-microsoft-sharepoint-toolshell-vulnerability-is-being-attacked-globally?utm_source=chatgpt.com), [trendmicro.com](https://www.trendmicro.com/en_us/research/25/g/cve-2025-53770-and-cve-2025-53771-sharepoint-attacks.html?utm_source=chatgpt.com)).  
- **Kogo dotyczy?** On‑prem SharePoint Server (2016, 2019, Subscription Edition); **nie dotyczy** SharePoint Online / Microsoft 365 ([wsj.com](https://www.wsj.com/tech/cybersecurity/microsoft-alerts-firms-to-server-software-attack-99f9b036?utm_source=chatgpt.com)).

Sytuacja jest ostra i dynamiczna — wymaga reakcji tu i teraz. To nie teoria — to realny, trwający atak, a każdy dzień zwłoki to zagrożenie utraty kluczowej infrastruktury.


