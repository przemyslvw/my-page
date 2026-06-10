---
sidebar_position: 10
title: "Rozdział 10: Klasy"
description: "Streszczenie: Rozdział 10: Klasy — Czysty Kod, Robert C. Martin"
---

## Rozdział 10: Klasy – Praktyczne streszczenie

### O co chodzi w tej sekcji
Główną tezą Roberta C. Martina jest to, że **klasy muszą być małe i posiadać tylko jedną, jasno zdefiniowaną odpowiedzialność** [1, 2]. Czystość kodu na poziomie klas osiąga się nie przez zliczanie wierszy, ale przez minimalizację powodów do zmiany danego modułu oraz utrzymywanie wysokiej spójności metod i zmiennych [2, 3].

---

### Kluczowe zasady i reguły

*   **Prawidłowa organizacja (Standard Java):** Klasa powinna zachowywać określoną kolejność: publiczne stałe statyczne -> prywatne zmienne statyczne -> prywatne zmienne instancyjne -> funkcje publiczne -> prywatne funkcje pomocnicze [4].
*   **Zasada Pojedynczej Odpowiedzialności (SRP):** Klasa lub moduł powinny mieć jeden i tylko jeden powód do zmiany [2]. Jeśli opisując klasę, używasz słów „oraz”, „lub” lub „ale”, prawdopodobnie ma ona zbyt wiele odpowiedzialności [2].
*   **Nazewnictwo jako metryka rozmiaru:** Nazwa klasy powinna precyzyjnie opisywać jej rolę. Unikaj ogólnikowych terminów takich jak *Processor*, *Manager* czy *Super* [5]. Jeśli nie możesz nadać klasie zwięzłej nazwy, jest ona za duża [5].
*   **Wysoka spójność (Cohesion):** Metody klasy powinny manipulować jej zmiennymi instancyjnymi. Klasa jest maksymalnie spójna, gdy każda zmienna jest używana przez każdą metodę [3]. Gdy spójność spada (tylko część metod używa części zmiennych), należy wydzielić nową klasę [6].
*   **Zasada Otwarty-Zamknięty (OCP):** Projektuj klasy tak, aby były otwarte na rozszerzanie, ale zamknięte na modyfikacje [7]. Nowe funkcjonalności powinny być dodawane poprzez tworzenie nowych klas, a nie edytowanie istniejącego, przetestowanego kodu [7].
*   **Zasada Odwrócenia Zależności (DIP):** Klasy powinny zależeć od abstrakcji (interfejsów), a nie od konkretnych implementacji [8]. Pozwala to odizolować system od zmian w zewnętrznych komponentach (np. API giełdy czy bazy danych) [8, 9].

---

### Przykłady kodu

#### 1. SRP: Od „klasy boskiej” do separacji odpowiedzialności
Poniższy szkielet klasy `SuperDashboard` pokazuje zbyt dużą liczbę metod i odpowiedzialności (zarządzanie GUI oraz numerami wersji) [10-13].

```java
// PRZED: Klasa o zbyt wielu odpowiedzialnościach
public class SuperDashboard extends JFrame implements MetaDataUser {
    public Component getLastFocusedComponent() { /*...*/ }
    public void setLastFocused(Component lastFocused) { /*...*/ }
    public int getMajorVersionNumber() { /*...*/ }
    public int getMinorVersionNumber() { /*...*/ }
    public int getBuildNumber() { /*...*/ }
    // ... i 65 innych metod ...
}
```

Po refaktoryzacji odpowiedzialność za wersjonowanie zostaje wydzielona do osobnej klasy, którą można łatwo testować i użyć ponownie [14].

```java
// PO: Wydzielona klasa o jednej odpowiedzialności
public class Version {
    public int getMajorVersionNumber() { /*...*/ }
    public int getMinorVersionNumber() { /*...*/ }
    public int getBuildNumber() { /*...*/ }
}
```

#### 2. OCP: Organizowanie zmian w SQL
Zamiast jednej klasy `Sql`, która musi być edytowana przy każdym nowym typie zapytania (łamie SRP i OCP), autor proponuje strukturę hierarchiczną [15, 16].

```java
// PRZED: Klasa, którą trzeba otwierać przy każdej zmianie
public class Sql {
    public Sql(String table, Column[] columns) { /*...*/ }
    public String create() { /*...*/ }
    public String insert(Object[] fields) { /*...*/ }
    public String selectAll() { /*...*/ }
    private String valuesList(Object[] fields, final Column[] columns) { /*...*/ }
    // ... dodanie funkcjonalności 'update' wymaga edycji tej klasy ...
}
```

Po zmianie na system klas pochodnych, dodanie zapytania `update` wymaga jedynie stworzenia nowej klasy `UpdateSql` bez dotykania istniejącego kodu [16-18].

```java
// PO: Zbiór zamkniętych klas zgodnych z OCP
abstract public class Sql {
    public Sql(String table, Column[] columns) { /*...*/ }
    abstract public String generate();
}

public class CreateSql extends Sql {
    public CreateSql(String table, Column[] columns) { super(table, columns); }
    @Override public String generate() { /*...*/ }
}

public class SelectSql extends Sql {
    @Override public String generate() { /*...*/ }
}

public class InsertSql extends Sql {
    @Override public String generate() { /*...*/ }
    private String valuesList(Object[] fields, final Column[] columns) { /*...*/ }
}
// Dodanie UpdateSql nie niszczy istniejącego kodu.
```

#### 3. DIP: Izolowanie od zmian zewnętrznych
Przykład klasy `Portfolio`, która zamiast zależeć od konkretnego API giełdy, zależy od interfejsu [19].

```java
// PO: Wykorzystanie interfejsu do odizolowania od konkretnej implementacji
public interface StockExchange {
    Money currentPrice(String symbol);
}

public class Portfolio {
    private StockExchange exchange;
    public Portfolio(StockExchange exchange) {
        this.exchange = exchange;
    }
    // ...
}
```

---

### Praktyczne wnioski – co zmienić w swoim kodzie?

1.  **Rozbijaj „klasy-tasiemce”:** Jeśli Twoja klasa ma setki linii i dziesiątki metod, to na 100% łamie SRP [1]. Podziel ją na mniejsze jednostki, z których każda robi jedną rzecz [20].
2.  **Analizuj zmienne instancyjne:** Jeśli widzisz, że pewna grupa metod używa tylko wybranego podzbioru zmiennych klasy, to znak, że te metody i zmienne powinny trafić do nowej, osobnej klasy [6].
3.  **Używaj interfejsów do zewnętrznych systemów:** Nie pozwalaj, aby Twój kod zależał bezpośrednio od konkretnej bazy danych czy zewnętrznego API [8, 9]. Stwórz interfejs-pośrednik, co umożliwi Ci łatwe testowanie (przez mockowanie) i bezproblemową wymianę dostawcy usługi w przyszłości [8, 21].
4.  **Zamykaj klasy na modyfikacje:** Zamiast dodawać kolejnego `if-a` lub `case-a` do wielkiej metody wewnątrz klasy, zastanów się, czy nie lepiej stworzyć nowej klasy dziedziczącej po abstrakcyjnym rodzicu [7, 18].
5.  **Dąż do „artykułu w gazecie”:** Organizuj kod tak, by czytający go programista widział najważniejsze funkcje na górze, a detale implementacyjne ukryte w prywatnych metodach na dole [4].
6.  **Nie bój się wielu małych plików:** Wielu programistów obawia się, że system z setkami małych klas jest trudniejszy do ogarnięcia. Martin twierdzi odwrotnie: łatwiej utrzymać porządek w skrzynce z małymi, opisanymi szufladkami niż w jednej wielkiej szufladzie, do której wrzucono wszystko naraz [14, 20].