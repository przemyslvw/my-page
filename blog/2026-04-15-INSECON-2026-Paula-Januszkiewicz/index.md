---
slug: INSECON-2026-Paula-Januszkiewicz
title: "Kompromitacja Active Directory i ekstrakcja sekretów DPAPI. Analiza techniczna prelekcji Pauli Januszkiewicz na INSECON"
authors: [przemyslvw]
tags: ['cyberbezpieczenstwo', 'pentesting', 'insecon']
date: "2026-04-15"
---

Współczesne ataki na infrastrukturę tożsamości rzadko kończą się na jednorazowym włamaniu. Zgodnie z danymi wywiadowczymi (FBI, IBM), średni czas przebywania grupy APT wewnątrz sieci przed wykryciem (Dwell Time) wynosi około 200 dni. Atakujący wykorzystują ten czas na mapowanie zasobów, eskalację uprawnień i głęboką implementację mechanizmów persystencji. Poniższy materiał stanowi techniczną analizę anatomii ataku na poświadczenia Windows oraz rygorystycznego frameworku reagowania na incydenty (Incident Response) dla środowisk Tier 0, bazując na dekonstrukcji prelekcji Pauli Januszkiewicz (CQURE) z konferencji INSECON.

<!-- truncate -->

## **Studium przypadku: Dług technologiczny a kompromitacja DPAPI**

Podczas analizy powłamaniowej (post-breach) infrastruktury krytycznej stacji oczyszczania wody, badacze zidentyfikowali krytyczny wektor kompromitacji wynikający z długu technologicznego. Domenę migrowano na nowsze wersje Windows Server, pozostawiając wygasły w 2012 roku główny certyfikat w konfiguracji usług. Ten pojedynczy błąd architektoniczny otworzył drogę do globalnej kompromitacji sekretów w organizacji poprzez nadużycie mechanizmów Data Protection API (DPAPI).

### **Architektura DPAPI i wektory kradzieży danych**

DPAPI odpowiada za szyfrowanie wrażliwych danych użytkownika na poziomie systemu operacyjnego (hasła w przeglądarkach, tokeny SAP, ciasteczka sesyjne). W procesie tym wykorzystywane są następujące mechanizmy kryptograficzne:

1. **Szyfrowanie Payloadu:** Docelowe dane chronione są algorytmem symetrycznym **3DES** (0x6603), a ich integralność weryfikowana jest funkcją skrótu **SHA1** (0x8004).  
2. **Generowanie i Ochrona Master Key:** Kluczem deszyfrującym te zasoby jest unikalny dla profilu Master Key. Sam Master Key jest szyfrowany przy użyciu skrótu NT hash hasła użytkownika, który oparty jest na podatnym na ataki algorytmie **MD4**.  
3. **Ekstrakcja z LSA i MSDCC2:** Atakujący uzyskujący uprawnienia NT AUTHORITY\\SYSTEM (np. poprzez podatności w usługach) wykonuje zrzut pamięci podsystemu Local Security Authority (LSA). Wykorzystując narzędzia takie jak Mimikatz/Kiwi, ekstrahuje dane logowania z lokalnego bufora MSDCC2 (mscash2). Posiadając skrót hasła, atakujący deszyfruje Master Key i uzyskuje dostęp do lokalnych sekretów.  
4. **Wektor Domain Backup Key:** W domenach Active Directory istnieje funkcja awaryjnego odzyskiwania (Recovery). Master Key każdego użytkownika jest dodatkowo zaszyfrowany asymetrycznym kluczem publicznym domeny. Kompromitacja kontrolera domeny (DC) i eksfiltracja wygasłego, ale wciąż funkcjonalnego w architekturze DPAPI klucza prywatnego (Domain Backup Key), pozwala atakującym na masową deszyfrację wszystkich zabezpieczonych plików dla **każdego użytkownika w całej organizacji**, offline i z pominięciem mechanizmów Multi-Factor Authentication (MFA).

## **Framework Incident Response: Odbudowa środowiska Tier 0**

Wdrożenie nowej ochrony wymaga założenia pełnej kompromitacji domeny. Poniższa procedura Post-Incident definiuje techniczne minimum niezbędne do odzyskania kontroli nad infrastrukturą.

### **Krok 1: Retencja dowodów i rotacja poświadczeń bazowych**

* Zabezpieczenie obrazów kontrolerów domeny (VHD, System State, pełny backup) przed i po incydencie na potrzeby analizy forensycznej.  
* **Podwójny reset hasła konta KRBTGT:** Działanie krytyczne unieważniające skradzione bilety Kerberos (Golden Tickets). Proces wymaga uwzględnienia opóźnień w replikacji między kontrolerami domeny.  
* Podwójny reset haseł wszystkich użytkowników w celu zatarcia historii haseł.  
* Reset haseł dla wszystkich kont administracyjnych, serwisowych (w tym gMSA) oraz wymuszenie zmiany haseł dla kont maszynowych stacji roboczych i serwerów (Invoke DC machine account password changes).

### **Krok 2: Eliminacja ukrytej persystencji**

Weryfikacja środowiska pod kątem modyfikacji strukturalnych pozwalających napastnikowi na szybki powrót:

* **Obiekty AD:** Reset atrybutów bezpieczeństwa, w tym kluczowego obiektu AdminSDHolder chroniącego grupy uprzywilejowane. Przegląd delegowanych uprawnień w AD.  
* **Infrastruktura asymetryczna (ADCS/PKI):** Pełny audyt certyfikatów. Weryfikacja szablonów, unieważnienie i ponowne wydanie wszystkich certyfikatów oraz usunięcie nieautoryzowanych wpisów NTAuth.  
* **Wektory lokalne (ASEP):** Inspekcja Auto-Start Extension Points na maszynach Tier 0: zaplanowane zadania, filtry zdarzeń WMI, klucze rejestru *Run/RunOnce*, weryfikacja złośliwych deskryptorów w Service Control Manager (SCM) oraz podmian w architekturze Utilman.  
* **LAPS:** Globalna rotacja haseł w Local Administrator Password Solution.

### **Krok 3: Reagowanie w środowiskach hybrydowych (Integracja Chmurowa)**

Infrastruktura on-premise ściśle koreluje z tożsamością w chmurze, co wymaga natychmiastowych akcji w Entra ID (Azure AD):

* Rotacja kluczy Kerberos dla Seamless SSO przy użyciu dedykowanego polecenia: Update-AzureADSSOForest.  
* Wymuszenie wylogowania użytkowników i unieważnienie tokenów odświeżania: Invalidate-MgUserRefreshToken.  
* Zmiana poświadczeń kont serwisowych Microsoft Entra Connect (posiadających najwyższe uprawnienia do synchronizacji).  
* Audyt zmian w obszarze Conditional Access, App Registrations oraz nowo utworzonych ról uprzywilejowanych.

### **Krok 4: Weryfikacja infrastruktury wspierającej**

* **ADFS:** Natychmiastowa rotacja certyfikatów podpisujących i deszyfrujących (Urgent token signing cert rollover).  
* **MECM (SCCM):** Weryfikacja sekwencji zadań i zmodyfikowanych paczek, aby zapobiec dystrybucji złośliwego oprogramowania na stacje końcowe przez legalne kanały administracyjne.  
* **PAM:** Audyt logów w systemach Privileged Access Management oraz weryfikacja integralności wszystkich zdeponowanych sekretów.

## **Zakończenie: Architektura Secure by Design**

Utrzymanie bezpieczeństwa środowiska tożsamości wymaga ciągłego procesu Threat Huntingu (np. przy użyciu LOKI, THOR w warstwie Tier 0, czy narzędzi PingCastle i BloodHound mapujących ścieżki eskalacji do MITRE ATT&CK).

W perspektywie architektonicznej należy wdrożyć pełną separację uprawnień (Tiering Model) oraz obligatoryjnie uaktywnić **Credential Guard**, co drastycznie ogranicza skuteczność ataków wymierzonych w podsystem LSA i ekstrakcję skrótów haseł. Najwyższy poziom dojrzałości bezpieczeństwa nakazuje traktować środowisko Active Directory jako byt tymczasowy – w najbardziej rygorystycznych organizacjach wdraża się politykę całkowitej przebudowy struktury domeny od podstaw w stałych cyklach (np. co 5 lat), co bezpowrotnie eliminuje martwy dług technologiczny i niewykryte wcześniej wektory persystencji.