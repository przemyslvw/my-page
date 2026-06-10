---
id: "a10-ssrf-opis"
title: "Opis podatności i jej wpływ"
sidebar_position: 46
---

#  Opis podatności i jej wpływ – Server-Side Request Forgery (SSRF) (A10:2025)

##  Czym jest SSRF?

**Server-Side Request Forgery (SSRF)** to podatność, w której atakujący zmusza serwer aplikacji do wykonania żądania HTTP do innego zasobu – wewnętrznego lub zewnętrznego – w imieniu aplikacji. Może to prowadzić do:

- uzyskania dostępu do zasobów wewnętrznych (np. `localhost`, `169.254.169.254`),
- skanowania sieci wewnętrznej,
- wycieku danych,
- eskalacji ataków (np. przez wykorzystanie tokenów, metadanych, usług backendowych).

---

##  Przykład działania

Aplikacja pozwala na pobieranie miniatur obrazków z zewnętrznych adresów URL:

```
GET /fetch-image?url=http://example.com/image.jpg
```

Atakujący podmienia adres na wewnętrzny:

```
GET /fetch-image?url=http://127.0.0.1:8080/admin
```

➡️ Aplikacja wykonuje żądanie do własnego backendu lub ukrytej usługi, ujawniając dane lub umożliwiając zdalne wykonanie poleceń.

---

## Potencjalne konsekwencje

- **Dostęp do wewnętrznych API** – np. `http://localhost:5000/internal/status`.
- **Odczyt metadanych instancji chmurowej** – np. AWS EC2: `http://169.254.169.254/latest/meta-data/`.
- **Ataki typu port scanning / SSRF chaining** – np. łączone z RCE, XSS, IDOR.
- **Dostęp do baz danych, Redis, Docker socket** – w zależności od otwartości środowiska.

---

## 📉 Czynniki ryzyka

- Brak walidacji i filtrowania adresów URL dostarczanych przez użytkownika.
- Zezwalanie na przekazywanie żądań przez serwer do niekontrolowanych adresów.
- Używanie bibliotek wykonujących żądania bez whitelisty (np. `curl`, `requests`, `urllib`).

---

##  Dlaczego to istotne?

- SSRF omija ograniczenia sieciowe i firewalle — to serwer wykonuje żądania.
- Atak bywa trudny do wykrycia – żądanie pochodzi z legalnego IP serwera.
- Często wykorzystywana jako wektor początkowy w atakach na chmurę (np. kradzież tokenów IAM).
- W 2021 roku podatność SSRF umożliwiła ataki na Azure, Alibaba Cloud, Google Cloud i AWS.

---

## ✅ Podsumowanie

SSRF to krytyczna podatność typu „proxy”, umożliwiająca atakującemu wykonanie żądań w kontekście aplikacji. Nawet pozornie bezpieczna funkcjonalność (np. preview linku, parsery PDF) może stanowić wektor ataku, jeśli umożliwia odwołania do adresów kontrolowanych przez użytkownika.
