---
slug: jak-zhakowac-wlasna-aplikacje
title: "Jak zhakować własną aplikację? Kompletna checklista bezpieczeństwa dla API i SPA"
authors: [przemyslvw]
tags: ['web-security', 'pentesting', 'offensive-security', 'red-teaming', 'webapp', 'owasp', 'vulnerabilities']
date: "2026-02-12"
---

Testy bezpieczeństwa to nie (tylko) bezmyślne wpisywanie \<script\>alert(1)\</script\> w każdym polu formularza. Aby znaleźć krytyczne błędy, takie jak IDOR czy przejęcie konta, musisz działać według planu.

<!-- truncate -->

Poniżej przedstawiam uniwersalną strategię testowania nowoczesnych aplikacji webowych (Single Page Applications \+ REST API), którą warto wdrożyć przed każdym wdrożeniem na produkcję.

## ---

**FAZA 1: Rekonesans i Mapowanie (Recon)**

*Zanim zaczniesz atakować, musisz zrozumieć, jak zbudowana jest twierdza.*

1. **Mapowanie Aplikacji (Site Map)**  
   * Przejdź przez "szczęśliwą ścieżkę" (Happy Path) użytkownika. Kliknij w każdy przycisk, odwiedź każdą zakładkę.  
   * Pozwól proxy (np. Burp Suite/ZAP) zbudować mapę wszystkich endpointów API.  
2. **Statyczna Analiza Plików JavaScript (.js)**  
   * **To kluczowy punkt dla aplikacji SPA (React/Vue/Angular).**  
   * Szukaj w kodzie źródłowym:  
     * Ukrytych endpointów API (np. /api/admin, /users).  
     * Ciekawych zmiennych (np. isAdmin, userRole, debugMode).  
     * Kluczy API lub hardkodowanych sekretów.  
3. **Identyfikacja Technologii (Fingerprinting)**  
   * Sprawdź nagłówki odpowiedzi (Server, X-Powered-By).  
   * Wiedza o tym, że backend to Python, Node.js lub PHP, determinuje późniejsze wektory ataku.

## ---

**FAZA 2: Rejestracja i Uwierzytelnianie (Auth)**

*Jak dostać się do środka i czy można ominąć bramkę?*

4. **Testy Rejestracji (Mass Assignment)**  
   * Przechwyć żądanie rejestracji i spróbuj "wstrzyknąć" dodatkowe parametry JSON, których nie ma w formularzu.  
   * **Co testować:** `{"is_admin": true}`, `{"role": "admin"}`, `{"active": true}`, `{"email_verified": 1}`.  
   * **Cel:** Stworzenie konta z wyższymi uprawnieniami lub ominięcie weryfikacji e-mail.  
5. **Analiza Tokenów Sesyjnych (JWT)**  
   * Jeśli aplikacja używa JSON Web Tokens, sprawdź:  
     * Czy token wygasa po wylogowaniu?  
     * Czy algorytm podpisu to HS256 (symetryczny)? Jeśli tak, czy hasło jest słabe (próba łamania offline)?  
     * Czy serwer przyjmuje token z algorytmem None (podpis pusty)?

## ---

**FAZA 3: Autoryzacja i Kontrola Dostępu (Access Control)**

*To tutaj najczęściej leżą "krytyki". Czy mogę zobaczyć dane sąsiada?*

6. **IDOR (Insecure Direct Object Reference)**  
   * Znajdź w URL-ach lub ciele żądania identyfikatory obiektów (np. /api/orders/1050).  
   * Zmień ID na inne (np. 1051 lub 1).  
   * Sprawdź, czy serwer zwróci dane innej osoby. Testuj to na: fakturach, profilach użytkowników, wiadomościach prywatnych.  
7. **Eskalacja Uprawnień (Privilege Escalation)**  
   * **Pionowa:** Czy zwykły użytkownik może wywołać endpointy administratora (np. DELETE /api/users/1)?  
   * **Pozioma:** Czy użytkownik A może edytować profil użytkownika B?  
8. **User Enumeration (Wyliczanie kont)**  
   * Sprawdź, jak API reaguje na pytania o istniejące i nieistniejące zasoby.  
   * Jeśli /users/1 zwraca 403 Forbidden, a /users/99999 zwraca 404 Not Found, to znaczy, że możemy stworzyć listę wszystkich użytkowników systemu.

## ---

**FAZA 4: Walidacja Danych Wejściowych (Input Validation)**

*Zepsujmy logikę aplikacji dziwnymi danymi.*

9. **XSS i HTML Injection**  
   * Wprowadzaj tagi HTML (np. \<h1\>test\</h1\>, \<img src=x onerror=alert(1)\>) we wszystkich polach tekstowych (tytuł, opis, imię).  
   * Sprawdź, czy aplikacja "wybucha" (błąd parsowania JSON, popsuty widok strony) lub wykonuje kod JavaScript.  
   * **Pamiętaj:** Testuj to również w polach niewidocznych w UI, ale przesyłanych w JSON.  
10. **Injection (SQL/NoSQL)**  
    * W polach wyszukiwania i ID wstawiaj znaki specjalne ' " ; \--.  
    * Dla baz NoSQL (MongoDB) próbuj wstrzykiwać obiekty JSON, np. zamiast `id=1` wyślij `id={"$ne": 1}`.

## ---

**FAZA 5: Bezpieczeństwo po stronie klienta (Client-Side)**

*Nigdy nie ufaj przeglądarce.*

11. **Manipulacja Local Storage / Cookies**  
    * Sprawdź, co aplikacja zapisuje w pamięci przeglądarki.  
    * Jeśli widzisz tam klucze typu user\_role: "user" lub permissions: \[...\], zmień je ręcznie na admin i odśwież stronę.  
    * **Cel:** Odblokowanie ukrytych menu administracyjnych (nawet jeśli API nadal zablokuje dane, sam wyciek UI jest błędem).  
12. **CORS (Cross-Origin Resource Sharing)**  
    * Sprawdź, czy API pozwala na zapytania z dowolnej domeny (Access-Control-Allow-Origin: \*) przy jednoczesnym przesyłaniu ciasteczek (Allow-Credentials: true). To otwarta droga do przejęcia konta.

## ---

**FAZA 6: Infrastruktura i Konfiguracja**

*Fundamenty twierdzy.*

13. **Nagłówki Bezpieczeństwa**  
    * Czy serwer wysyła nagłówki chroniące przed typowymi atakami?  
    * Wymagane minimum: Strict-Transport-Security (HSTS), X-Frame-Options (Clickjacking), Content-Security-Policy (XSS).  
14. **Wyciek Informacji (Information Disclosure)**  
    * Czy serwer w nagłówkach lub stronach błędów zdradza dokładne wersje oprogramowania (np. nginx/1.18.0, Werkzeug/2.0)? To ułatwia atakującym znalezienie gotowych exploitów (CVE).

### ---

**Podsumowanie**

Testowanie bezpieczeństwa to proces, nie jednorazowe wydarzenie. Powyższa lista to absolutne minimum, które pozwala wykryć \~80% najgroźniejszych błędów logicznych, których automatyczne skanery często nie widzą.

**Pamiętaj:** Największe luki (jak IDOR czy Mass Assignment) wynikają zazwyczaj z błędów w logice biznesowej, a nie ze skomplikowanych błędów w kodzie. Myśl jak deweloper, który poszedł na skróty – tam zazwyczaj znajdziesz błąd.