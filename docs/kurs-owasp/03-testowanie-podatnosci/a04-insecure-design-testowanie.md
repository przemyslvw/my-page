---
id: "a04-insecure-design-testowanie"
title: " 3.4.2 – Metody testowania podatności"
sidebar_position: 17
---

##  Cel sekcji

Zrozumienie, jak identyfikować podatności typu **Insecure Design** poprzez analizę logiki, architektury i przepływów w aplikacji, a nie tylko kodu źródłowego.

---

##  Testowanie podatności Insecure Design

### 1. 🔎 Analiza przepływu danych i logiki biznesowej

- Czy system rozróżnia role użytkowników przy dostępie do danych?
- Czy każda akcja ma przypisane wymagane uprawnienia?
- Czy użytkownik może manipulować przepływem (np. pominąć etap płatności)?

➡️ Przykład:
1. Utwórz konto testowe.
2. Przejdź przez cały proces zakupowy.
3. Spróbuj wykonać zapytanie `POST /order` bez płatności.

---

### 2.  Modelowanie zagrożeń (Threat Modeling)

Stwórz diagram przepływu aplikacji i odpowiedz na pytania:

- Gdzie dane opuszczają zaufaną strefę (boundary)?
- Jakie decyzje podejmuje system automatycznie?
- Czy dane klienta są źródłem prawdy (np. cena, rola, ID)?

➡️ Narzędzia pomocne: OWASP Threat Dragon, Microsoft Threat Modeling Tool.

---

### 3.  Testowanie końcówek API pod kątem logiki

- Czy API `GET /user/{id}` sprawdza właściciela zasobu?
- Czy `POST /discount` wymaga odpowiednich uprawnień?
- Czy można wykonać operację `DELETE` jako inny użytkownik?

➡️ Przykłady testów: Zmiana `userId`, `orderId`, roli w tokenie JWT.

---

### 4.  Testy sekwencji kroków (misuse cases)

Spróbuj wykonać akcje poza planowanym scenariuszem, np.:

- Przejście do ostatniego kroku bez wcześniejszych.
- Ręczna modyfikacja URL lub danych JSON.
- Pomięcie weryfikacji dwuetapowej, akceptacji regulaminu, itp.

---

### 5.  Analiza dokumentacji i przypadków użycia

- Czy logika biznesowa została opisana?
- Czy przewidziano wyjątki lub nadużycia (abuse cases)?
- Czy istnieje ograniczenie liczby prób akcji wrażliwych (reset hasła, logowanie, płatność)?

---

##  Wskazówki

- Myśl jak atakujący: co możesz pominąć, powtórzyć, zmanipulować?
- Testuj nieliniowo – zmieniaj kolejność i dane.
- Uwzględnij scenariusze „co się stanie, jeśli...”.

---

W następnym kroku: **3.4.3 – Weryfikacja konfiguracji aplikacji i serwera**
