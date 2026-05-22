---
slug: owasp-top-10-mcp
title: "Model Context Protocol (MCP): 10 krytycznych luk bezpieczeństwa, które otwierają infrastrukturę na ataki AI"
authors: [przemyslvw]
tags: [mcp, owasp, bezpieczenstwo, ai, llm, toolpoisoning, rce, zerotrust]
date: "2026-05-22"
---

Model Context Protocol (MCP) rewolucjonizuje budowę agentowych systemów AI, ale wdrażanie tego standardu bez odpowiednich barier ochronnych to biznesowe samobójstwo. Luki w warstwie projektowej – na czele z brakiem obligatoryjnego uwierzytelniania oraz podatnością na zatruwanie kontekstu – sprawiają, że serwery MCP stały się kluczowym celem ataków na architekturę korporacyjną i łańcuchy dostaw.

<!-- truncate -->

## Dlaczego protokół Model Context Protocol jest fundamentalnie podatny na ataki?
Model Context Protocol (MCP), wprowadzony przez firmę Anthropic jako uniwersalny standard łączący modele LLM z zewnętrznymi usługami, odwraca tradycyjny model zaufania architektury API. Zamiast ścisłej walidacji parametrów po stronie klienta, MCP deleguje wybór narzędzi do modelu sztucznej inteligencji, przy czym autoryzacja żądań pozostaje w protokole elementem całkowicie opcjonalnym. Brak wbudowanych mechanizmów kontroli potęguje ryzyko eksploatacji.

*   **Brak natywnego uwierzytelniania:** Specyfikacja MCP traktuje zabezpieczenia jako element opcjonalny, co prowadzi do wystawiania setek serwerów na świat bez żadnej autoryzacji (w tym blisko 500 niezabezpieczonych systemów zidentyfikowanych przez Trend Micro).
*   **Delegacja zaufania do LLM:** Złośliwy serwer zwraca wprost do kontekstu agenta AI własne, spreparowane opisy narzędzi w języku naturalnym, przez co system traci rozróżnienie między pożądaną instrukcją a ładunkiem ataku.
*   **Erozja infrastruktury przez "Shadow MCP":** Deweloperzy w firmach masowo uruchamiają lokalne, eksperymentalne serwery MCP z uprawnieniami administracyjnymi w trybie `stdio`, całkowicie omijając korporacyjne procedury bezpieczeństwa i scentralizowanego zarządzania tożsamością (IAM).

## Czym jest Tool Poisoning i jak wymusza nieautoryzowane akcje agentów?
Tool Poisoning to najgroźniejsza kategoria ataków na architekturę Model Context Protocol, zidentyfikowana w wytycznych OWASP MCP Top 10 jako podatność MCP03:2025. Metoda polega na wstrzykiwaniu złośliwych instrukcji bez pośrednictwa interfejsu (indirect prompt injection) wewnątrz metadanych lub opisów narzędzi udostępnianych przez serwer MCP. Modele LLM traktują te parametry jako bezpieczne instrukcje operacyjne.

*   **Zatruwanie opisów (Line Jumping):** Złośliwy serwer dostarcza z pozoru niewinną funkcję matematyczną, w której opisie ukryto komendę nakazującą agentowi wyciągnięcie kluczy SSH z dysku i wysłanie ich do atakującego bez żadnej autoryzacji ze strony użytkownika (np. dowody przedstawione przez badaczy Invariant Labs).
*   **Ataki typu "Rug-pull":** Złośliwy aktor aktualizuje zaufany początkowo serwer MCP i dynamicznie manipuluje konfiguracją w trakcie sesji. Narzędzie zatwierdzone przez administratorów w fazie audytu instalacji zostaje podmienione na trojana kradnącego tokeny przy użyciu niewidzialnych ładunków.
*   **Tool Shadowing (Kolizje przestrzeni nazw):** Serwery atakujących rejestrują obiekty o nazwach identycznych z poprawnymi narzędziami firmowymi, przejmując ich parametry (tzw. typosquatting) i wymuszając przekierowanie wrażliwych danych operacyjnych na nieautoryzowane zewnętrzne endpointy.

## Jakie błędy po stronie serwerów MCP prowadzą do RCE i wycieku danych?
Krytyczne luki zabezpieczeń po stronie instancji serwerowych Model Context Protocol wynikają z braku izolacji wykonawczej oraz ślepego zaufania do ładunków generowanych przez duże modele językowe. Niedociągnięcia te bezpośrednio otwierają architekturę chmurową na ataki Server-Side Request Forgery (SSRF) oraz zdalne wykonanie kodu (RCE) wskutek wstrzyknięcia złośliwych poleceń w surowych parametrach.

*   **Command Injection jako standard (CVE-2025-6514):** Setki popularnych implementacji, na czele z biblioteką `mcp-remote` oraz narzędziem MCP Inspector (CVE-2025-49596), przekazywały wygenerowane parametry wprost do systemowej powłoki. Agent LLM pod wpływem wstrzykniętego złośliwego promptu był w stanie wyeskalować swoje uprawnienia do poziomu roota systemów operacyjnych.
*   **Eksploatacja chmury przez SSRF:** Podatne serwery MCP próbują rozwiązywać metadane OAuth (takie jak `resource_metadata`), pozwalając atakującemu na wstrzyknięcie wewnętrznych adresów np. `169.254.169.254`, co skutkuje bezpośrednim zrzutem uprawnień i kluczy platform AWS, GCP czy Azure bezpośrednio do rąk napastnika.
*   **Przemycanie tokenów (Confused Deputy):** Ze względu na współdzielone wdrożenia opierające się o statyczne identyfikatory Client ID, hakerzy modyfikują żądania OAuth, podszywając się pod prawowitych użytkowników sieci, przez co bezprawnie przejmują cudze tokeny dostępowe w atakach typu cross-tenant.

## Wnioski praktyczne
Zabezpieczenie ekosystemu Model Context Protocol przed rosnącym wektorem zautomatyzowanych zagrożeń wymusza budowę warstwowego modelu obrony opartego na architekturze Zero Trust. Uwierzytelnianie przy pomocy protokołu OAuth 2.1 z wymuszeniem PKCE oraz rygorystyczne bramki aplikacyjne weryfikujące poprawność wywołań narzędziowych w surowych danych JSON-RPC to absolutna konieczność. Pasywny monitoring nie chroni przed eksfiltracją.

*   **Wdrażaj aktywne bramki inspekcyjne (MCP Gateways):** Wprowadź w warstwie sieciowej sprzętowe proxy (np. z wykorzystaniem technologii takich jak Pipelock, TrueFoundry, DataDome), blokujące żądania niepasujące do twardo przypisanych schematów, realizujące kontrolę dostępu na poziomie pojedynczych narzędzi (RBAC per-tool) oraz skanowanie regułami DLP na wyjściu.
*   **Zastosuj mechanizm Tool Pinning (Kryptograficzne przypinanie):** Analizuj hashe SHA-256 i podpisy cyfrowe metadanych w formatach JWS/COSE w momencie procedury odkrywania funkcji (Discovery), co skutecznie zneutralizuje środowisko przed bezprawną podmianą parametrów przez ataki Rug-pull.
*   **Zamknij instancje MCP w restrykcyjnych Sandboxach:** Każdy serwer (zwłaszcza te udostępniane dla klienta przez procesy lokalne `stdio`) musi operować w ściśle ograniczonym środowisku powłoki (np. kontenery eBPF, profilowanie Landlock, reguły seccomp), z zablokowanymi trasami sieciowymi (wykluczenie adresacji link-local) i odciętym dostępem do dysku hosta.
*   **Zlikwiduj przekazywanie tokenów (Token Passthrough):** Konfiguruj autoryzację MCP tak, by serwery żądały dedykowanych tokenów wygenerowanych wyłącznie dla nich (Audience Validation), rygorystycznie ograniczając uprawnienia per-endpoint (Scope Minimization) i wykluczając z architektury szerokie, wielodomenowe poświadczenia API przypisane do tożsamości ludzkich.

## Źródła
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)