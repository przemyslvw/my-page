---
slug: http-evolution-2026
title: "Ewolucja HTTP (1.1 vs 2.0 vs 3.0) – Od czystego tekstu do zaszyfrowanych dronów"
authors: [przemyslvw]
tags: ['web-security', 'http', 'http2', 'http3', 'tls', 'quic', 'crlf', 'owasp']
date: "2026-02-14"
---

Zanim przejdziemy do kodu, wyjaśnijmy różnice między wersjami protokołu HTTP tak, aby zrozumiał to każdy – od junior frontendowca po project managera. Różnice te mają kolosalne znaczenie dla bezpieczeństwa.

<!-- truncate -->

* **HTTP/1.1 (Era tekstu i kolejek):** Wyobraź sobie, że wysyłasz pocztówkę. Wszystko jest zapisane czystym, zrozumiałym dla człowieka tekstem (nagłówki, treść). Jeśli chcesz pobrać 10 obrazków ze strony, przeglądarka musi wysyłać zapytania jedno po drugim (lub otwierać wiele ciężkich połączeń).  
  * *Bezpieczeństwo:* Protokół sam w sobie **nie wymusza szyfrowania** (można go używać po zwykłym http://). Tekstowa natura sprawia, że jest podatny na wstrzykiwanie znaków specjalnych i manipulacje (np. HTTP Request Smuggling, gdzie atakujący oszukuje serwer co do tego, gdzie kończy się jedno żądanie, a zaczyna drugie).  
* **HTTP/2 (Era binarna i multipleksowania):** Zamiast pocztówek, wysyłasz zapieczętowaną paczkę kurierską z przegródkami. Dane nie są już czytelnym tekstem, ale ustandaryzowanymi **ramkami binarnymi** (0 i 1). W ramach jednego połączenia TCP (jednej paczki) przeglądarka pobiera wszystkie obrazki i skrypty naraz (multipleksowanie).  
  * *Bezpieczeństwo:* Choć standard na to pozwala, w praktyce przeglądarki **wymuszają szyfrowanie (TLS)** dla HTTP/2 (tzw. h2). Binarna struktura ramek natywnie leczy nas z podatności opartych na wstrzykiwaniu tekstu, jednak rodzi nowe wektory ataków (np. słynny atak DoS "Rapid Reset", polegający na masowym otwieraniu i zamykaniu ramek strumieni).  
* **HTTP/3 (Era QUIC i wbudowanej kryptografii):** Całkowita rewolucja. Zamiast ciężarówki (TCP), która staje w korku, gdy zgubi się choćby jedna paczka, używamy roju niezależnych dronów opartych na protokole UDP (tzw. QUIC). Jeśli jeden dron (pakiet) spadnie, reszta leci dalej.  
  * *Bezpieczeństwo:* **Szyfrowanie (TLS 1.3) jest wbudowane na twardo w sam fundament protokołu transportowego.** W HTTP/3 nie da się wysłać czystego tekstu. Cały proces negocjacji połączenia i szyfrowania odbywa się błyskawicznie w jednym kroku.

Aby pokazać, dlaczego tekstowa natura HTTP/1.1 bywa katastrofalna i dlaczego przejście na protokoły binarne (HTTP/2/3) było konieczne, spójrzmy na klasyczną podatność CRLF Injection.

---

**Dlaczego tekstowy HTTP/1.1 jest niebezpieczny: HTTP Response Splitting (CRLF)**

**Definicja (Co to jest?)**

W tekstowym protokole HTTP/1.1, znaki nowej linii (CRLF - \r\n) służą do oddzielania od siebie nagłówków oraz ciała odpowiedzi. Jeśli aplikacja pobiera dane od użytkownika (np. adres URL do przekierowania) i wstawia je bezpośrednio do nagłówków bez weryfikacji, atakujący może wstrzyknąć własne znaki \r\n. Pozwala to na "przecięcie" odpowiedzi na pół i wstrzyknięcie własnych, złośliwych nagłówków (np. nadpisujących ciasteczka) lub całego ciała strony. HTTP/2 jest na to domyślnie odporny dzięki ramkowaniu binarnemu i kompresji nagłówków HPACK.

**Scenariusz z życia (Vulnerable Code)**

Deweloper tworzy prosty endpoint do przekierowywania użytkowników po zalogowaniu, używając surowej odpowiedzi frameworka.

```python
# Python / Flask - Podatne przekierowanie HTTP/1.1  
@app.route('/redirect')  
def login_redirect():  
    target_url = request.args.get('next')  
    # Podatność: Brak sanityzacji payloadu wejściowego.   
    # Znaki nowej linii z parametru trafią prosto do nagłówka HTTP.  
    return Response(status=302, headers={'Location': target_url})
```

**Exploit (Jak to hakujemy)**

1. Znajduję podatny parametr `next`.  
2. Zamiast zwykłego linku, konstruuję złośliwy payload zawierający zakodowane w URL znaki nowej linii `%0d%0a` (czyli `\r\n`):
   `https://target.com/redirect?next=http://example.com%0d%0aSet-Cookie:%20admin=1;%20Secure`
3. Wysyłam link ofierze.  
4. Podatny serwer generuje tekstową odpowiedź HTTP/1.1. Przez wstrzyknięte znaki przeglądarka ofiary interpretuje to tak:  
   ```http
   HTTP/1.1 302 Found  
   Location: http://example.com  
   Set-Cookie: admin=1; Secure
   ```
5. Złośliwe ciasteczko zostaje osadzone w przeglądarce ofiary. Złamaliśmy strukturę protokołu jednym parametrem.

**Secure Code (Jak to naprawić)**

Na poziomie kodu musimy kategorycznie wycinać lub kodować znaki kontrolne. Dodatkowo w architekturze "Automation First" powinniśmy wdrożyć testy integracyjne sprawdzające reakcję aplikacji na payloady zawierające CRLF.

```python
# Python / Flask - Zabezpieczone przekierowanie  
@app.route('/redirect')  
def login_redirect():  
    target_url = request.args.get('next')  
      
    # Zabezpieczenie: Agresywne usunięcie znaków kontrolnych \r i \n  
    # W nowoczesnych frameworkach robią to wbudowane biblioteki (np. werkzeug)  
    if target_url:  
        target_url = target_url.replace('\r', '').replace('\n', '')  
          
    return Response(status=302, headers={'Location': target_url})
```
