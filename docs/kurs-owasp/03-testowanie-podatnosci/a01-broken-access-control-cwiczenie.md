---
id: "a01-broken-access-control-cwiczenie"
title: "🛡️ 3.1.5 – Praktyczne ćwiczenie: Testowanie i mitigacja podatności Broken Access Control"
sidebar_position: 5
---

## 🎯 Cel ćwiczenia

W tym ćwiczeniu:
- przetestujesz aplikację podatną na Broken Access Control (IDOR),
- wykorzystasz narzędzia do przejęcia danych innego użytkownika,
- zasymulujesz atak i przeprowadzisz jego **mitigację po stronie backendu**.

---

## 🧪 Scenariusz testowy

**Aplikacja**: System zarządzania zamówieniami użytkowników (REST API).

**Endpoint**:
`GET /api/orders/{orderId}`

Użytkownik `user1` ma przypisane zamówienie o ID `1001`.

---

## 🧪 Krok 1: Zaloguj się jako `user1`

Uzyskaj token JWT (np. w Postmanie):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5..."
}
```

---

## 🧪 Krok 2: Prześlij zapytanie do swojego zamówienia

```http
GET /api/orders/1001
Authorization: Bearer <token_user1>
```

➡️ Odpowiedź: status `200`, dane zamówienia `user1`.

---

## 🧪 Krok 3: Spróbuj uzyskać dane orderId=1002 (które należy do `user2`)

```http
GET /api/orders/1002
Authorization: Bearer <token_user1>
```

➡️ Odpowiedź `200` – dane `user2`. 🔥 Luka IDOR!

---

## ✅ Oczekiwane zachowanie (po naprawie)

Aplikacja powinna zwrócić:

```http
HTTP/1.1 403 Forbidden
```

lub

```http
HTTP/1.1 404 Not Found
```

Jeśli użytkownik `user1` nie ma dostępu do `orderId=1002`.

---

## 🛠️ Mitigacja – backend (Node.js przykład)

```javascript
app.get('/api/orders/:id', authenticateToken, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.userId !== req.user.id) {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json(order);
});
```

---

## 🧠 Dodatkowe scenariusze do przetestowania

- Modyfikacja `userId` w żądaniu `POST` / `PUT`
- Zmiana ról w formularzu (ukryte pola `role=admin`)
- Wywołanie endpointów `/admin` jako użytkownik nieuprzywilejowany
- Token JWT innego użytkownika – porównanie odpowiedzi

---



## 🛠️ Środowisko

- **Aplikacja testowa:** [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/)
- **System operacyjny:** Kali Linux / Parrot OS / inna dystrybucja z narzędziami pentestowymi
- **Przeglądarka:** Firefox z dodatkami:
  - FoxyProxy
  - HackBar / RESTer
- **Proxy:** Burp Suite Community lub Pro

---

## BONUS

## 🔍 Scenariusz 1: Bezpośredni dostęp do zasobów (IDOR)

1. Zaloguj się jako zwykły użytkownik.
2. Przejdź do historii zamówień lub danych konta.
3. Zidentyfikuj parametr z ID (np. `orderId=123`).
4. Zmień ID w adresie URL na inny (np. `orderId=124`) i sprawdź, czy masz dostęp do cudzych danych.

**Oczekiwany wynik:** Możliwość przeglądania danych innych użytkowników oznacza podatność typu IDOR.

---

## 🔓 Scenariusz 2: Brak kontroli dostępu do panelu administratora

1. Wejdź bezpośrednio na URL `/admin` lub `/api/users`.
2. Sprawdź, czy serwer zwraca dane mimo braku autoryzacji.
3. Przetestuj dostęp za pomocą zmodyfikowanych ciastek sesyjnych (np. `role=admin`).

**Oczekiwany wynik:** Uzyskanie dostępu bez odpowiednich uprawnień.

---

## 🧪 Testy przy użyciu Burp Suite

1. Użyj **Proxy** do przechwytywania żądań.
2. Zidentyfikuj endpointy zależne od uprawnień użytkownika.
3. Użyj **Intrudera** do fuzzowania parametrów ID/role.
4. Sprawdź odpowiedzi HTTP (`200 OK`, `403 Forbidden`, `401 Unauthorized`).

---

## 🔐 Mitigacja

- **Zasada minimalnych uprawnień** – użytkownicy powinni mieć dostęp tylko do tego, co jest im potrzebne.
- **Weryfikacja po stronie serwera** – nie ufaj danym z klienta.
- **Modele ról i uprawnień** – stosuj mechanizmy RBAC (Role-Based Access Control).
- **Testy automatyczne uprawnień** – integruj z CI/CD.
- **Audyt logów** – loguj nieudane próby dostępu.

---

## 📚 Zadania do wykonania

✅ Zidentyfikuj co najmniej jedną funkcję podatną na Broken Access Control.  
✅ Przeprowadź atak (np. IDOR lub dostęp do ukrytego endpointa).  
✅ Zapisz wynik testu i dowód (zrzut ekranu, odpowiedź HTTP).  
✅ Opracuj rekomendację mitigacji.  
✅ Umieść wyniki w raporcie końcowym.

---

## 📎 Źródła

- [OWASP Cheat Sheet: Access Control](https://cheatsheetseries.owasp.org/cheatsheets/Access_Control_Cheat_Sheet.html)
- [OWASP Juice Shop Guide](https://owasp-juice.shop/)

---

## 🧠 Pro tip

🔁 Automatyzuj testy uprawnień za pomocą **ZAP scripts** lub **Postman tests**.  
🧪 Używaj **JWT debuggerów** do analizy tokenów i testów zmiany uprawnień.


## 📌 Podsumowanie

**Broken Access Control** to jeden z niewielu błędów, który możesz wykryć w ciągu kilku minut – a jego skutki mogą być krytyczne. Regularne testowanie logiki uprawnień to obowiązek każdej organizacji.

---

W następnym rozdziale przejdziemy do `A02:2025 – Cryptographic Failures`.
