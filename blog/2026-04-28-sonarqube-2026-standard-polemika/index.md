---
slug: sonarqube-2026-standard-polemika
title: "SonarQube w 2026: dlaczego 'branżowy standard' przestał mieć sens dla większości projektów"
authors: [przemyslvw]
tags: [security, secops, devsecops, devops]
date: "2026-04-28"
---

Każda lista "must-have tools for code quality" zaczyna się tak samo. SonarQube. Branżowy standard. Quality Gates. Technical Debt. Cognitive Complexity. Sześć tysięcy wbudowanych reguł.

<!-- truncate -->

*Polemika z hype'em, oparta na realnym stacku produkcyjnym*

---

Wszystko prawda. I wszystko nieistotne — dla większości projektów, które dziś naprawdę powstają.

W projekcie [**reads**](https://github.com/przemyslvw/reads) podjąłem decyzję, żeby nie używać SonarQube. Nie z lenistwa, nie z oszczędności, tylko po świadomej analizie. Ten artykuł to obrona tej decyzji — ale też uczciwa lista rzeczy, które się przy okazji traci. Bo polemika bez przyznania racji drugiej stronie jest tylko marketingiem na opak.

## Mit "branżowego standardu"

Zacznijmy od najczęściej powtarzanego argumentu: "SonarQube to branżowy standard, więc trzeba go mieć".

To zdanie ukrywa kilka rzeczy. Po pierwsze — który SonarQube? Bo Sonar to nie jest jeden produkt. To rodzina:

- **Community Build** (dawniej Community Edition) — darmowy, open-source
- **Developer Edition** — od około 2500 USD/rok przy najmniejszej puli linii kodu
- **Enterprise Edition** — wycena indywidualna, kilka razy więcej
- **SonarQube Cloud** — SaaS, od 32 USD/miesiąc za 100k LOC

Kiedy ktoś mówi "u nas Sonar wykrył", to w 90% przypadków mówi o Developer Edition lub wyżej. Bo Community Build — ten darmowy, "branżowy standard" — w 2026 roku **nie ma branch analysis i nie ma PR decoration**. Nie wchodzi do pull requesta. Nie pokazuje wyników w GitHubie. Developer ma chodzić na osobny dashboard.

Według analizy z marca 2026 dla zespołów używających workflow opartego na pull requestach (czyli praktycznie każdego współczesnego zespołu) Developer Edition jest minimalną sensowną opcją, bo bez branch analysis i PR decoration findings Sonara po prostu giną — programiści ich nie widzą.

Innymi słowy: darmowa wersja Sonara w 2026 jest narzędziem do okresowego audytu, nie do code review. A płatna kosztuje minimum 2500 USD rocznie i wymaga własnego serwera albo subskrypcji SaaS.

To nie jest "darmowy branżowy standard". To jest funnel sprzedażowy.

## Co realnie pokrywa Sonar — i czym to zastąpić

Funkcje, dla których ludzie sięgają po Sonara, dzielą się na pięć kategorii. Sprawdźmy każdą.

### 1. SAST — wykrywanie podatności bezpieczeństwa

**Sonar Community Build:** podstawowe security checks, bez taint analysis, bez śledzenia przepływu danych.
**Sonar Developer+:** zaawansowany SAST z taint analysis (SQL injection, XSS, niebezpieczne dane).

Tu zaczyna się pierwszy nieprzyjemny fakt: **Community Build w ogóle nie skanuje pod kątem podatności w sposób, który dziś nazwałbyś SAST-em**. Kategoria "Security Hotspots" jest, ale to są podpowiedzi typu "tu jest hasło w stringu, sprawdź sam". Prawdziwy taint flow analysis jest w wersji płatnej.

**Alternatywa GitHub-native:** CodeQL.

CodeQL należy do GitHuba, jest darmowy dla publicznych repo i tani dla prywatnych (lub w ramach GitHub Advanced Security). Wykrywa SQL injection, XSS, path traversal, deserialization issues, hardcoded secrets — z taint analysis i cross-file flow. Wyniki lądują w zakładce Security w repo i blokują merge przez branch protection rules.

Specjaliści od bezpieczeństwa aplikacji często stwierdzają, że Sonar jako SAST jest słabszy od dedykowanych narzędzi typu Semgrep, Checkmarx czy Snyk Code, a CodeQL należy w ich opinii do tej drugiej kategorii — bo robi głęboką analizę semantyczną.

**Wniosek:** w obszarze SAST CodeQL bije Sonar Community Build na głowę i jest porównywalny lub lepszy od Sonar Developer Edition. Za zero złotych.

### 2. Linting i code smells

**Sonar:** około 6000 reguł, w tym dla TypeScript/JavaScript.
**Alternatywa:** Biome (lub ESLint + Prettier, jeśli ktoś jeszcze chce mieć oddzielne narzędzia).

Biome zastąpił mi ESLinta i Prettiera w jednym, jest napisany w Rust i działa kilkadziesiąt razy szybciej. Reguły są mniej liczne niż w Sonarze (kilkaset vs sześć tysięcy), ale w 2026 to nie jest problem, bo:

- większość reguł Sonara dla popularnych języków pokrywa się z tym, co robi linter,
- Biome działa w pre-commit hooku, w IDE w czasie rzeczywistym i w CI — feedback loop jest sekundowy, nie minutowy,
- co jest naprawdę unikalne (cognitive complexity), zaraz omówię osobno.

**Wniosek:** dla typowego projektu webowego Biome wystarcza. Sonar tu nie wnosi przewagi, którą czułbyś w codziennej pracy.

### 3. Code coverage

**Sonar:** raportuje pokrycie testami, ale samego testowania nie robi — i tak musisz mieć Vitest, Jest czy coś.
**Alternatywa:** Vitest + Codecov (lub Coveralls).

Codecov pokazuje pokrycie w PR, ma historyczny dashboard, robi flagi dla różnych części projektu. Robi dokładnie to samo, co Sonar w tej kategorii. Często lepiej.

### 4. Skanowanie sekretów i kontenerów

**Sonar Community Build:** brak. Advanced Secrets Detection jest tylko w Developer Edition+.
**Alternatywa:** Gitleaks (sekrety) + Trivy (kontenery, dependency scanning, IaC).

Tu Sonar nawet nie wchodzi do gry w darmowej wersji. Gitleaks i Trivy razem dają więcej niż Sonar Developer Edition w tym obszarze.

### 5. Quality Gate i Technical Debt Dashboard

**Sonar:** centralny dashboard z metryką "dni długu", trendy historyczne, quality gate blokujący merge.
**Alternatywa GitHub-native:** branch protection rules + status checks + CodeQL severity gates.

I tutaj — uczciwie — **Sonar wygrywa**. Tej jednej rzeczy nie zastąpisz prosto narzędziami GitHub-native.

## Czego naprawdę tracisz bez Sonara

To jest sekcja, której większość artykułów typu "Sonar vs X" nie pisze. A powinna.

**Cognitive Complexity w wersji Sonara**

Sonar wprowadził (white paper G. Ann Campbell, 2018) metrykę Cognitive Complexity, która zastąpiła starszą Cyclomatic Complexity. Liczy zagnieżdżenia, breaki w logice, ternary expressions w bardziej "ludzki" sposób. Stała się nieformalnym standardem.

Biome ma `noExcessiveCognitiveComplexity` z prostym progiem. ESLint ma `complexity` (cyclomatic). To nie jest to samo. Jeśli twój zespół ma kulturę "CC > 15 nie wchodzi do mastera", Sonar to zrobi precyzyjniej.

**Detekcja duplikacji kodu między modułami**

Sonar skanuje całe repo pod kątem powtarzających się bloków kodu (Sonar nazywa to "duplicated lines"). Biome tego nie robi. ESLint tego nie robi. CodeQL tego nie robi. Możesz dorzucić `jscpd` jako osobny krok w CI, ale to znowu narzędzie do utrzymania.

W projektach z wieloma wariantami (np. multi-domain, white-label) duplikacja jest realnym problemem długoterminowym. Bez Sonara musisz to łapać code reviewem.

**Centralny dashboard długu technicznego**

Quality Gate w Sonarze pokazuje: "ten moduł ma 12 dni długu, ten ma 3, trend rośnie". GitHub Security tab pokazuje *podatności*. Codecov pokazuje *coverage*. Biome pokazuje *bieżące błędy*. Żaden z nich nie agreguje tego w jedną liczbę "ile dni pracy musi zostać włożone, żeby spłacić kod".

Dla solo projektu albo dwuosobowego zespołu — bez znaczenia, bo i tak masz to w głowie. Dla zespołu pięcioosobowego utrzymującego kod trzy lata — to zaczyna mieć znaczenie. Dla regulowanej branży (banki, healthcare), gdzie audytor pyta "pokaż dashboard długu technicznego" — to jest realny powód, żeby Sonara mieć.

**Standaryzacja Quality Gate między projektami**

Jeśli masz pięć repozytoriów i chcesz, żeby wszystkie miały *identyczny* próg jakości (np. coverage > 80%, CC < 15, brak nowych code smells), Sonar to zrobi z jednego miejsca. GitHub-native wymaga skopiowania konfiguracji do każdego repo i utrzymywania jej w synchronizacji.

## Tabela porównawcza

| Funkcja                       | Sonar Community Build | Sonar Developer (~2500 USD/rok) | GitHub-native stack            |
| ----------------------------- | --------------------- | ------------------------------- | ------------------------------ |
| SAST z taint analysis         | nie                   | tak                             | tak (CodeQL)                   |
| Branch analysis / PR decoration | nie                 | tak                             | tak (natywnie)                 |
| Linting / code smells         | tak (6000 reguł)      | tak                             | tak (Biome, węższy zakres)     |
| Code coverage w PR            | tak                   | tak                             | tak (Codecov)                  |
| Skanowanie sekretów           | nie                   | tak (advanced)                  | tak (Gitleaks)                 |
| Skanowanie kontenerów / IaC   | nie                   | częściowo                       | tak (Trivy)                    |
| Cognitive Complexity (Sonar metric) | tak             | tak                             | przybliżone (Biome)            |
| Detekcja duplikacji           | tak                   | tak                             | nie (chyba że dodasz jscpd)    |
| Dashboard długu technicznego  | tak                   | tak                             | nie                            |
| Self-hosting                  | tak (JVM + Postgres)  | tak                             | nie wymagane                   |
| Koszt utrzymania              | serwer + aktualizacje | serwer + licencja               | zero infrastruktury            |

## Argument, który rzadko pada: koszt utrzymania samego Sonara

Self-hosted Sonar to nie jest neutralny dodatek do CI. To:

- JVM (minimum 2 GB RAM dla Community Build, więcej w praktyce)
- PostgreSQL (oddzielna baza)
- regularne aktualizacje (Long-Term Active 2026.1 jest aktualną wersją LTA, najnowszy release to 2026.2 z marca 2026 — czyli upgrade'y są częste)
- backup bazy
- monitoring uptime
- jeden więcej Single Point of Failure w pipelinie

Na moim VPS-ie mam już n8n, Pihole, WireGuard, GitHub Actions Runner, Cloudflare Tunnel. Dorzucenie Sonara to nie jest decyzja architektoniczna o jakości kodu — to decyzja o dodaniu kolejnego stacka do utrzymania. I to stacka, który padnie pierwszy, jak zabraknie RAM-u.

Alternatywą jest SonarQube Cloud. Wygodniej, ale wtedy łamiesz zasadę "self-hostable, no extra SaaS" i płacisz subskrypcję od linii kodu.

Antifragile thinking mówi: usuń komponent, którego wartość krańcowa jest niższa niż koszt utrzymania. W projekcie reads Sonar tę poprzeczkę nie przekraczał.

## Kiedy Sonar jednak ma sens

Polemika nie polega na tym, żeby udawać, że narzędzie jest bezużyteczne. Sonar ma sens w trzech przypadkach:

**1. Regulowane branże z audytami zewnętrznymi.**
Bank, ubezpieczenia, healthcare, krytyczna infrastruktura. Audytor przychodzi i pyta o dashboard długu technicznego, raporty OWASP Top 10 w PDF, historyczne trendy quality gate. GitHub-native nie wygeneruje ci PDF-a dla audytora.

**2. Zespoły 10+ osób z polyglot codebase.**
Java + .NET + Python + JavaScript + Go w jednym repo. Sonar obsługuje 35+ języków z jednym dashboardem. Dla zespołu, gdzie każdy zespół ma swój język, ujednolicenie metryk w jednym miejscu jest realnym zyskiem.

**3. Migracje legacy z dużym długiem.**
Przejmujesz codebase z 10 lat, masz 50% pokrycia, nie wiesz od czego zacząć. Sonar wskaże ci najbardziej zadłużone moduły, posortuje po severity, da ci roadmapę. CodeQL + Biome takiej narracji nie zbudują.

W żadnym z tych trzech scenariuszy nie jestem ja w 2026 roku, więc Sonara nie używam.

## Stack, który realnie zastąpił Sonara w projekcie reads

Dla porządku — co jest skonfigurowane w `.github/workflows/`:

- **CodeQL** (`codeql.yml`) — SAST, taint analysis, security severity gating
- **Trivy** — skanowanie kontenerów, dependency vulnerabilities, IaC misconfigurations
- **Gitleaks** — wykrywanie sekretów w commitach (pre-commit hook + CI)
- **Biome** — linting + formatting, w pre-commit i CI
- **Vitest + Codecov** — coverage z dashboardem PR
- **Branch protection rules** — wymagane status checks z wszystkich powyższych

Zero zewnętrznej infrastruktury. Zero subskrypcji SaaS poza darmowymi tierami. Cały feedback loop w GitHubie, gdzie programista i tak pracuje.

## Wniosek

"Branżowy standard" to argument leniwy. SonarQube był standardem, kiedy alternatywą był ESLint w 2014 roku. W 2026 roku, kiedy GitHub kupił Semmle (CodeQL), uruchomił Advanced Security, a narzędzia natywne zintegrowały się z PR-ami — równanie się zmieniło.

Dla większości współczesnych projektów webowych, prowadzonych przez 1–10 osób, na nowoczesnym stacku z PR-based workflow, GitHub-native stack:

- wykrywa więcej podatności niż Sonar Community Build,
- daje szybszy feedback,
- nie wymaga oddzielnej infrastruktury,
- nie wymaga licencji,
- nie zmusza do kompromisu między "darmowy ale bezużyteczny w PR" a "płatny ale 2500 USD/rok".

Tracisz dashboard długu technicznego, dokładną Cognitive Complexity Sonara, wykrywanie duplikacji i centralne quality gates dla wielu repo. Jeśli któreś z tych czterech jest dla ciebie krytyczne — Sonar (Developer Edition, nie Community) jest dobrym wyborem.

Jeśli nie — SonarQube w 2026 roku jest narzędziem, którego nie potrzebujesz, mimo że internet ci to powtarza.

---

*Tekst oparty na decyzjach architektonicznych projektu reads. ADR 0011 ("GitHub-native tools where possible; no additional SaaS") zachowuje moc.*
