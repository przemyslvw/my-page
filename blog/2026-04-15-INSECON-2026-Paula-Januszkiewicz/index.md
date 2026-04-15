---
slug: INSECON-2026-Paula-Januszkiewicz
title: "Kompromitacja Active Directory i ekstrakcja sekretów DPAPI. Analiza techniczna prelekcji Pauli Januszkiewicz na INSECON"
authors: [przemyslvw]
tags: ['cyberbezpieczenstwo', 'pentesting', 'insecon']
date: "2026-04-15"
---

Podczas konferencji INSECON Paula Januszkiewicz, CEO CQURE, przedstawiła dogłębną analizę wektorów ataków na infrastrukturę Microsoft Active Directory oraz procedur reagowania na incydenty (Incident Response). Prelekcja, bazująca na realnych przypadkach (m.in. kompromitacji infrastruktury wodociągowej), obnażyła krytyczne luki w zarządzaniu cyklem życia poświadczeń, w tym problem niewygasających certyfikatów i ekstrakcji kluczy za pomocą DPAPI.

<!-- truncate -->

Poniższy materiał stanowi techniczną syntezę omawianych zagadnień z naciskiem na mechanizmy ochrony danych w systemach Windows.

## **Problem DPAPI: Architektura ochrony danych w systemach Windows**

Kluczowym elementem demonstracji technicznej (PoC) był atak na Data Protection API (DPAPI). Jest to wbudowany w systemy Windows interfejs kryptograficzny, używany przez aplikacje (np. Google Chrome, Microsoft Edge, SAP) do szyfrowania wrażliwych danych użytkownika, takich jak ciasteczka sesyjne, zapisane hasła czy klucze prywatne.

### **Mechanizm działania DPAPI i punkt krytyczny (Master Key)**

1. **Szyfrowanie asymetryczne na poziomie użytkownika:** Dane są szyfrowane unikalnym kluczem głównym (Master Key), generowanym dla każdego konta użytkownika.  
2. **Ochrona Master Key:** Klucz ten jest następnie szyfrowany przy użyciu skrótu (hash) hasła logowania użytkownika oraz, w środowiskach domenowych, dodatkowym kluczem odzyskiwania (Domain Backup Key).  
3. **Wektor ataku (LSA i skróty haseł):** Atakujący posiadający uprawnienia lokalnego administratora (np. poprzez eskalację uprawnień) może wykorzystać narzędzia takie jak Mimikatz do zrzutu zawartości pamięci podsystemu Local Security Authority (LSA). Ekstrakcja wpisów takich jak MSDCC2 (odpowiedzialnych za cache poświadczeń logowania) pozwala na odzyskanie materiału kryptograficznego.  
4. **Kompromitacja Domain Backup Key:** Jeśli napastnik skompromituje kontroler domeny i wyeksportuje klucz zapasowy domeny (Domain Backup Key), uzyskuje możliwość deszyfrowania wszystkich plików chronionych przez DPAPI (tzw. blobów) dla **każdego użytkownika w całej domenie**, całkowicie offline. Omija to całkowicie mechanizmy MFA, pozwalając na kradzież aktywnych sesji webowych.

Zarządzanie certyfikatami i kluczami to najczęstszy punkt awarii. Jak wskazano w prezentowanym studium przypadku infrastruktury wodociągowej, wdrożenie domeny polegało na jej migracji na nowsze wersje Windows Server, z pozostawieniem oryginalnego, wygasłego w 2012 roku certyfikatu głównego. Wyciek takiego certyfikatu to definitywny koniec poufności danych w infrastrukturze.

## **Czas przebywania napastnika (Dwell Time) a detekcja**

Statystyki przytaczane na podstawie raportów (m.in. FBI) wskazują, że średni czas przebywania grupy APT w infrastrukturze przed wykryciem (Dwell Time) wynosi około 200 dni. Ukrywanie się w środowisku IT jest relatywnie proste, jeśli organizacja nie wdrożyła rygorystycznego monitorowania analityki behawioralnej i telemetrii punktów końcowych. Atakujący wykorzystują ten czas na mapowanie infrastruktury, zdobywanie poświadczeń serwisowych i implementację wielu niezależnych mechanizmów persystencji.

## **Procedura Post-Incident: Odbudowa zaufania do Active Directory**

W przypadku potwierdzenia kompromitacji środowiska Tier 0 (Domain Controllers), usunięcie pojedynczego złośliwego oprogramowania jest niewystarczające. Należy założyć, że wszystkie sekrety uległy kompromitacji. Konieczna jest realizacja następującej procedury oczyszczania:

* **Zabezpieczenie materiału dowodowego:** Wykonanie kopii zapasowej VHD/System State kontrolerów domeny przed jakimikolwiek modyfikacjami.  
* **Rotacja poświadczeń bazowych:**  
  * Podwójny reset haseł dla wszystkich użytkowników, administratorów i kont usług.  
  * Reset haseł kont maszynowych stacji roboczych i serwerów.  
  * **Podwójny reset hasła konta KRBTGT:** Działanie krytyczne w celu unieważnienia spreparowanych biletów Kerberos (Golden Tickets). Należy uwzględnić opóźnienia w replikacji AD pomiędzy resetami.  
* **Weryfikacja wektorów utrzymania dostępu (Persistence):**  
  * Sprawdzenie deskryptorów bezpieczeństwa (w tym atrybutu AdminSDHolder), aby upewnić się, że napastnik nie delegował sobie ukrytych uprawnień do grup chronionych.  
  * Audyt Auto-Start Extension Points (ASEP), w tym zaplanowanych zadań, rejestrów usług (SCM), sterowników drukarek oraz modyfikacji typu Utilman na serwerach Tier 0.  
* **Oczyszczanie środowisk hybrydowych (Entra ID):**  
  * Wymuszenie odświeżenia biletów Seamless SSO (Update-AzureADSSOForest).  
  * Rotacja haseł dla kont powiązanych z Microsoft Entra Connect.  
  * Masowe unieważnienie tokenów sesyjnych użytkowników w chmurze (Invalidate-MgUserRefreshToken).  
* **Weryfikacja systemów zaufanych:** Pilna rotacja certyfikatów podpisujących tokeny w Active Directory Federation Services (ADFS) oraz weryfikacja logów rozwiązań klasy PAM (Privileged Access Management).

## **Rekomendacje dla Architektów IT i Security**

Utrzymanie bezpiecznej infrastruktury wymaga podejścia "Secure by Design" oraz wdrożenia procedury "Threat Hunting". Obejmuje to regularne analizowanie logów, monitorowanie środowiska narzędziami klasy PingCastle, a także zabezpieczenie warstwy LSA za pomocą **Credential Guard**, co znacząco utrudnia ataki polegające na ekstrakcji skrótów z pamięci. W przypadku środowisk o krytycznym znaczeniu, rozważaną (choć skrajną) praktyką z zakresu polityki bezpieczeństwa jest planowana, cykliczna przebudowa struktury Active Directory od zera (np. co 5 lat), co skutecznie eliminuje niewykrytą persystencję i dług technologiczny w konfiguracjach kryptograficznych.