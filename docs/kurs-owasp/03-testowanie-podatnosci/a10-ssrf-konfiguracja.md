---
id: "a10-ssrf-konfiguracja"
title: "Weryfikacja konfiguracji aplikacji i serwera"
sidebar_position: 48
---

#  Weryfikacja konfiguracji aplikacji i serwera – Server-Side Request Forgery (SSRF) (A10:2025)

##  Cel

Zweryfikowanie, czy konfiguracja aplikacji i serwera chroni przed możliwością wykonywania nieautoryzowanych żądań HTTP do wewnętrznych zasobów lub usług zaufanych.

---

##  Obszary do sprawdzenia

### 1. 🔗 Aplikacja (kod i biblioteki)
- Czy aplikacja umożliwia użytkownikowi podanie URL jako wejścia?
- Czy URL jest walidowany lub filtrowany?
- Czy aplikacja korzysta z funkcji wykonujących żądania (`fetch`, `axios`, `requests`, `curl`)?
- Czy istnieje whitelist/blacklist domen dozwolonych?

### 2.  Serwer i zapora sieciowa (firewall)
- Czy serwer ma dostęp do usług wewnętrznych (np. metadata service w chmurze)?
- Czy outbound traffic jest filtrowany?
- Czy stosowane są reguły `iptables` lub `ufw`, ograniczające połączenia wychodzące?

---

##  Przykłady zabezpieczeń w konfiguracji

| Komponent | Przykład konfiguracji | Cel |
|----------|------------------------|-----|
| Aplikacja | Walidacja domen i IP przed wykonaniem żądania | Blokada SSRF |
| Serwer | `ufw deny out to 169.254.169.254` | Ochrona metadata API |
| Serwis chmurowy | IAM deny dla `GetMetadata` | Blokada kradzieży tożsamości |
| Reverse Proxy (nginx) | Blokada lokalnych adresów (127.0.0.0/8) | Ochrona backendu |

---

## 🚨 Typowe błędy konfiguracyjne

- Brak filtrowania parametrów URL.
- Domyślnie dozwolony outbound traffic do wszystkich IP.
- Zbyt szerokie uprawnienia instancji w chmurze (brak segmentacji).
- Brak audytu logów połączeń wychodzących.

---

## ✅ Rekomendacje

- Wprowadź whitelistę akceptowanych domen lub endpointów.
- Zablokuj dostęp aplikacji do lokalnych i prywatnych adresów IP.
- W środowiskach chmurowych ogranicz dostęp do `169.254.169.254`.
- Korzystaj z serwisów proxy z inspekcją i filtracją ruchu.
- Monitoruj outbound traffic aplikacji.

---

##  Weryfikacja

- Sprawdź kod źródłowy aplikacji – czy dane wejściowe są walidowane.
- Przeanalizuj konfigurację serwera sieciowego i firewalli.
- W środowisku chmurowym – sprawdź uprawnienia IAM i dostęp do metadata API.
