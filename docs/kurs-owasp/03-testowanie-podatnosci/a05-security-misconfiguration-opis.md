---
id: "a05-security-misconfiguration-opis"
title: "🔧 3.5.1 – Opis podatności i jej wpływ"
sidebar_position: 21
---

## 🔧 Czym jest Security Misconfiguration?

**Security Misconfiguration** to jedna z najczęstszych podatności w aplikacjach webowych. Oznacza błędy w konfiguracji aplikacji, serwera, kontenerów, nagłówków HTTP, uprawnień czy ustawień domyślnych.

Nie zawsze wynika z kodu – najczęściej to **brak odpowiedniego zabezpieczenia istniejących komponentów**.

---

## ⚠️ Przykłady błędnej konfiguracji

- Włączony tryb debugowania (`debug=true`).
- Dostępne panele administracyjne bez autoryzacji (np. `/admin`, `/phpmyadmin`).
- Brak nagłówków bezpieczeństwa (np. `X-Frame-Options`, `Content-Security-Policy`).
- Domyślne hasła kont (admin/admin, root/root).
- Odsłonięte dane debugujące w odpowiedzi serwera (stack trace, logi).
- Przypadkowe wystawienie środowiska staging/dev do internetu.

---

## 💥 Wpływ podatności

- Eskalacja uprawnień.
- Ujawnienie danych technicznych (ścieżki, logi, tokeny).
- Możliwość wykonania ataku XSS / CSRF / Directory Traversal.
- Przejęcie całego serwera lub środowiska chmurowego.
- Umożliwienie ataku na inne komponenty infrastruktury.

---

## 🧠 Przykład realny

Serwer nginx wystawiony publicznie z dostępem do katalogu `/config/`:
```
https://example.com/config/appsettings.json
```

➡️ Wyciek kluczy API, poświadczeń bazy danych, hasła administratora.

---

## 🧪 Różne poziomy błędów konfiguracji

| Poziom | Przykład | Skutki |
|--------|----------|--------|
| Aplikacja | debug=true | wycieki logów, ścieżek |
| Backend/API | brak autoryzacji dla /admin | pełen dostęp |
| Sieć | otwarte porty (np. Redis) | dostęp z internetu |
| Serwer | brak aktualizacji | podatności CVE |
| Cloud | źle ustawione ACL w S3 | publiczne pliki |

---

## ✅ Podsumowanie

Security Misconfiguration to podatność, która **może wystąpić na każdym poziomie stosu technologicznego** – od frontendów SPA, przez backendy REST, po konfigurację load balancerów i sieci.

W następnym punkcie omówimy **metody testowania tej podatności**.
