---
id: "a01-broken-access-control-opis"
title: "A01:2025 – Broken Access Control: Opis podatności i jej wpływ"
sidebar_position: 1
---

## 🔓 Opis podatności

**Broken Access Control** oznacza sytuację, w której użytkownik może wykonać akcje lub uzyskać dostęp do zasobów, do których nie powinien mieć uprawnień.

To najczęstsza i najgroźniejsza klasa błędów w aplikacjach webowych – wynika z błędnie zaimplementowanej **autoryzacji**, czyli sprawdzania, *czy użytkownik ma prawo wykonać daną operację*.

---

## 💥 Skutki naruszenia kontroli dostępu

- Odczyt, modyfikacja lub usunięcie cudzych danych.
- Przejęcie konta innego użytkownika.
- Uzyskanie dostępu do panelu administratora.
- Modyfikacja zasobów systemowych (np. zmiana ról, danych płatności).
- Ataki na interfejs API (IDOR – Insecure Direct Object References).

---

## 📈 Przykłady ataków

### 🔁 IDOR (Insecure Direct Object Reference)
```http
GET /api/users/12345/profile
```
Zmiana ID w URL na cudzy identyfikator:
```http
GET /api/users/12346/profile
```
➡️ Brak weryfikacji, czy użytkownik ma prawo do tego zasobu.

---

### 🧩 Brak filtrowania danych wg ról

Użytkownik zwykły może wysłać żądanie:
```http
POST /admin/delete-user?id=123
```
➡️ Aplikacja nie sprawdza roli użytkownika przed wykonaniem akcji.

---

### 🔀 Zmiana roli przez manipulację formularzem
```html
<input type="hidden" name="role" value="admin" />
```
➡️ Jeśli backend nie filtruje zmian ról – krytyczna luka.

---

## 🛡️ Dlaczego to krytyczne?

- Dotyczy **fundamentu bezpieczeństwa aplikacji**.
- Jest trudne do wykrycia przez skanery automatyczne.
- Każda aplikacja ma unikalną logikę autoryzacji, którą trzeba testować ręcznie.
- Naruszenie często prowadzi do **pełnej kompromitacji systemu**.

---

## 📌 Podsumowanie

> Broken Access Control to **numer 1 na liście OWASP nie bez powodu**. Jeśli nie masz solidnej autoryzacji, cała reszta zabezpieczeń nie ma znaczenia.

---

W kolejnym kroku pokażemy **jak testować tę podatność w praktyce**, zarówno ręcznie, jak i z użyciem narzędzi.
