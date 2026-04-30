---
slug: sonarqube-2026-zero-trust
title: "Kiedy CI/CD zderza się z Zero Trust: Wdrożenie SonarQube za Cloudflare Tunnel"
authors: [przemyslvw]
tags: [security, secops, devsecops, devops]
date: "2026-04-30"
---

Automatyzacja kontroli jakości kodu to dziś standard, ale co jeśli Twoja infrastruktura jest "zbyt" bezpieczna? W tym artykule opisuję naszą inżynieryjną przeprawę z integracją SonarQube i GitHub Actions, gdzie największym wyzwaniem okazał się... nasz własny system bezpieczeństwa.

<!-- truncate -->

## Cel: Wdrożenie Quality Gates
Zadanie wydawało się proste: podpiąć SonarQube pod projekt monorepo (Next.js + Fastify) — konkretnie mowa o moim otwartoźródłowym projekcie [reads](https://github.com/przemyslvw/reads) — i zablokować możliwość mergowania kodu (Pull Requests), jeśli ten nie spełnia standardów (np. pokrycie testami poniżej 80%, krytyczne błędy bezpieczeństwa). 

Oto z czym musieliśmy się zmierzyć krok po kroku.

### Krok 1: Wygenerowanie raportów (Vitest)
Skaner SonarQube sam z siebie nie uruchamia testów – on tylko konsumuje ich wyniki. Nasze API używało `vitest`, więc pierwszym krokiem było dodanie biblioteki `@vitest/coverage-v8` i zmuszenie testów do generowania raportu w formacie `lcov.info`.

Wszystko szło gładko, do momentu aż... wybuchły nam testy.
Okazało się, że mockowaliśmy obiekt uwierzytelniania `lucia`, ale nasz kod aplikacji korzystał z eksportowanej metody `getLucia()`. 
**Lekcja:** Brak odpowiedniego mocka dla funkcji rzucał `TypeError`, a nasze API zwracało z testów ślepe błędy `500` zamiast oczekiwanych `200/201`. Po poprawieniu testów, pokrycie kodu wreszcie zapisało się do pliku.

### Krok 2: The Final Boss – Cloudflare Access
Nasz serwer SonarQube nie stał "goły" w internecie. Był schowany za Cloudflare Tunnel i zabezpieczony polityką **Cloudflare Access (Zero Trust)**. Żeby wejść na stronę, każdy deweloper musiał przejść przez ekran logowania. 

GitHub Actions nie ma przeglądarki ani człowieka, który kliknie "Zaloguj". Musieliśmy użyć **Service Tokenów** (pary `Client-Id` i `Client-Secret`). I tu zaczęły się schody.

#### Próba 1: Naiwne wstrzyknięcie nagłówków
Założyliśmy, że przekażemy nagłówki prosto do skanera za pomocą flag w workflow:
```yaml
SONAR_SCANNER_OPTS: >
  -Dsonar.web.http.header.CF-Access-Client-Id=...
```
**Wynik:** Porażka. Skaner rzucił błędem parsera HTML, bo dostał z powrotem stronę logowania Cloudflare. Okazuje się, że oficjalny SonarScanner CLI (oparty na Javie) **nie wspiera wstrzykiwania niestandardowych nagłówków HTTP**. Ściana.

#### Próba 2: Oficjalna ścieżka, czyli `cloudflared`
Cloudflare zaleca w takich sytuacjach utworzenie lokalnego tunelu TCP wewnątrz CI/CD:
```bash
cloudflared access tcp --hostname sonar.mojadomena.pl --url localhost:9000 \
  --service-token-id ... --service-token-secret ...
```
**Wynik:** `websocket: bad handshake`. Mimo dostarczenia poprawnych tokenów (co potwierdziliśmy diagnozując logi niezależnym curlem), proces `cloudflared` nie potrafił poprawnie wynegocjować połączenia WebSocket w środowisku GitHub Actions dla tej konkretnej konfiguracji aplikacji.

#### Rozwiązanie Ostateczne: Lightweight Node.js Proxy
Jeśli nie możesz zmienić skanera ani tunelu, musisz zbudować własny most. 
Skoro całe nasze CI/CD miało preinstalowane środowisko Node.js, postanowiliśmy stworzyć **wbudowane proxy**, które w ułamek sekundy odpala się tuż przed skanowaniem.

Zamiast dodawać zewnętrzne kontenery, użyłyśmy 15-linijkowego skryptu Node.js zaszytego wewnątrz GitHub Actions (`sonar.yml`):

```javascript
const http = require('http'), https = require('https'), url = new URL(process.env.TARGET);
http.createServer((req, proxyRes) => {
  const options = {
    hostname: url.hostname, port: 443, path: req.url, method: req.method,
    headers: { 
      ...req.headers, 
      host: url.hostname, 
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID, 
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET 
    }
  };
  const proxyReq = https.request(options, r => { proxyRes.writeHead(r.statusCode, r.headers); r.pipe(proxyRes); });
  proxyReq.on('error', () => { proxyRes.writeHead(500); proxyRes.end(); });
  req.pipe(proxyReq);
}).listen(9000);
```

**Jak to zadziałało w praktyce?**
1. Lokalny serwer startuje na porcie `9000` w tle (`&`).
2. Konfigurujemy SonarScanner tak, jakby serwer stał lokalnie (`SONAR_HOST_URL: http://localhost:9000`).
3. Skaner wysyła pliki i metadane do naszego proxy.
4. Proxy w locie "dokleja" brakujące nagłówki `CF-Access` i wysyła (bezpiecznym protokołem `https`) żądanie do prawdziwego, zabezpieczonego serwera.

**Wynik:** `EXECUTION SUCCESS`. W pełni przezroczysta autoryzacja bez dodawania zewnętrznych zależności.

### Krok 3: Domknięcie bram (Branch Protection)
Gdy skanowanie zaczęło przechodzić, wystarczyło wejść w ustawienia branchy w GitHubie (`develop` oraz `master`) i nałożyć nową regułę: **Require status checks to pass before merging** -> `SonarQube scan`. 

### Podsumowanie
Połączenie "sztywnych" narzędzi enterprise (SonarQube) z nowoczesnymi warstwami zabezpieczeń (Cloudflare Zero Trust) rzadko działa "out of the box". 
Czasami zamiast walczyć z dokumentacją i instalować w CI/CD potężne narzędzia sieciowe, wystarczy 15 linijek czystego JavaScriptu postawionego pośrodku.

Całość wdrożenia i konfigurację można podejrzeć w moim projekcie open-source: [github.com/przemyslvw/reads](https://github.com/przemyslvw/reads).

*** 