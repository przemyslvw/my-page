---
id: "a01-broken-access-control-konfiguracja"
title: "Broken Access Control: Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 3
---

##  Cel rozdziału

Sprawdzimy, **jakie błędy konfiguracyjne** aplikacji i środowiska uruchomieniowego mogą prowadzić do naruszeń kontroli dostępu. Często luki nie wynikają z błędów w kodzie, ale z **domyślnych, niezabezpieczonych ustawień**.

---

##  Co warto sprawdzić?

### ✅ Backend / aplikacja

- [ ] Czy backend **weryfikuje uprawnienia użytkownika przy każdym żądaniu**?
- [ ] Czy **nie ma endpointów** dostępnych tylko z poziomu frontendu, które backend obsługuje bez sprawdzenia uprawnień?
- [ ] Czy system ról jest stosowany i egzekwowany konsekwentnie?
- [ ] Czy użytkownik **nie może sam zmienić swojej roli** (np. przez edycję formularza)?
- [ ] Czy dostęp do danych jest ograniczany nie tylko na poziomie UI, ale również w backendzie?

---

###  API i sesje

- [ ] Czy tokeny JWT są **sprawdzane i weryfikowane** w każdym żądaniu?
- [ ] Czy dane użytkownika w sesji są **serwerowo walidowane**, a nie tylko na froncie?
- [ ] Czy endpointy REST/API **filtrowane są względem identyfikatora użytkownika**, a nie tylko numeru ID w URL?
- [ ] Czy GraphQL ma zaimplementowaną logikę autoryzacji per-resolver?

---

###  Konfiguracja serwera i reverse proxy

- [ ] Czy reverse proxy **nie pozwala na dostęp do endpointów administracyjnych**?
- [ ] Czy nie ma wystawionych endpointów typu `/admin`, `/api-docs`, `/swagger`, `/actuator`?
- [ ] Czy dostęp do tych endpointów wymaga uwierzytelnienia i odpowiednich ról?

---

###  Diagnostyka: co powinieneś sprawdzić ręcznie

| Element | Jak testować? |
|--------|----------------|
| Ukryte endpointy | Próbuj zgadywać (`/admin`, `/edit-user`, `/config`) |
| Przypadkowy dostęp | Przeglądaj dane innych użytkowników przez URL |
| Zmiana roli | Podmień `role=admin` w formularzu i wyślij request |
| Ochrona API | Sprawdź odpowiedź backendu na żądanie użytkownika bez uprawnień |

---

##  Przykład złej konfiguracji

```http
POST /user/delete?id=123
```

Brak:
- sprawdzenia czy `id=123` należy do zalogowanego użytkownika,
- kontroli roli użytkownika.

Efekt: każdy może usunąć każdego.

---

## ✅ Przykład dobrej konfiguracji

- Backend sprawdza:
  - czy token JWT jest ważny,
  - jaka jest rola użytkownika,
  - czy `id` należy do użytkownika autoryzowanego.

Odpowiedź w przypadku nieautoryzowanego dostępu:
```
HTTP/1.1 403 Forbidden
```

---

## 📌 Podsumowanie

> Solidna kontrola dostępu to nie tylko kod aplikacji. To również **konfiguracja całego środowiska** – od frameworka, przez API, aż po reverse proxy i serwer HTTP.

---

W kolejnym rozdziale omówimy narzędzia, które pomogą Ci wykryć podatności typu Broken Access Control w praktyce.
