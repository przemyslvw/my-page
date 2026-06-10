---
sidebar_position: 6
title: "Rozdział 6: Obiekty i struktury danych"
description: "Streszczenie: Rozdział 6: Obiekty i struktury danych — Czysty Kod, Robert C. Martin"
---

Oto praktyczne streszczenie rozdziału 6. książki „Czysty Kod” Roberta C. Martina, napisanego z perspektywy praktyka dla praktyka.

## Rozdział 6: Obiekty i struktury danych – esencja architektury kodu

### 1. O co chodzi w tej sekcji
Główną tezą autora jest to, że **obiekty i struktury danych to byty komplementarne, ale przeciwstawne**, a ich mylenie jest jednym z najczęstszych błędów projektowych [1, 2]. Obiekty ukrywają dane za abstrakcją i udostępniają funkcje (zachowania), natomiast struktury danych eksponują dane i nie posiadają znaczących funkcji [1]. Zrozumienie tej różnicy pozwala świadomie wybierać między podejściem obiektowym a proceduralnym w zależności od tego, czy planujemy częściej dodawać nowe typy danych, czy nowe operacje [3].

### 2. Kluczowe zasady i reguły

*   **Abstrakcja danych to nie tylko gettery i settery:** Samo dodanie warstwy funkcji nad zmiennymi prywatnymi nie tworzy abstrakcji [4]. Prawdziwe ukrywanie implementacji polega na udostępnianiu interfejsu, który pozwala manipulować *istotą* danych, bez znajomości ich formy [4, 5].
*   **Antysymetria obiektów i struktur:**
    *   **Kod proceduralny** (oparty na strukturach danych) ułatwia dodawanie nowych funkcji bez zmiany istniejących struktur, ale utrudnia dodawanie nowych struktur danych (wymaga zmiany wszystkich funkcji) [2, 3].
    *   **Kod obiektowy** ułatwia dodawanie nowych klas (typów) bez zmiany istniejących funkcji, ale utrudnia dodawanie nowych funkcji (wymaga zmiany wszystkich klas) [2, 3].
*   **Prawo Demeter (Zasada „rozmawiaj z przyjaciółmi, nie z obcymi”):** Moduł nie powinien znać wnętrza obiektów, na których operuje [6]. Metoda `f` klasy `C` powinna wywoływać tylko metody: samej klasy `C`, obiektów utworzonych przez `f`, argumentów `f` oraz obiektów w zmiennych instancyjnych klasy `C` [6, 7].
*   **Unikaj „wraków pociągów”:** Długie łańcuchy wywołań (np. `a.getB().getC().doSomething()`) są sygnałem naruszenia Prawa Demeter, o ile obiekty te nie są prostymi strukturami danych [8].
*   **Wystrzegaj się hybryd:** Tworzenie struktur, które są w połowie obiektami (mają logikę biznesową), a w połowie strukturami danych (eksponują zmienne prywatne przez gettery/settery), to błąd [9]. Hybrydy mają wady obu podejść i są trudne w utrzymaniu [9].
*   **DTO i Active Record to struktury danych:** Obiekty transferu danych (DTO) powinny być traktowane jako czyste struktury danych bez metod biznesowych [10, 11]. Dodawanie logiki do klas typu Active Record (które mapują tabele bazodanowe) tworzy niebezpieczne hybrydy [11, 12].

### 3. Przykłady kodu

#### Abstrakcja danych: Ukrywanie implementacji
Zamiast eksponować sposób przechowywania współrzędnych, lepiej udostępnić metody operujące na ich znaczeniu.

```java
// LISTING 6.1: Punkt konkretny (ZŁO - eksponuje implementację)
public class Point {
  public double x;
  public double y;
}

// LISTING 6.2: Punkt abstrakcyjny (DOBRZE - ukrywa implementację)
public interface Point {
  double getX();
  double getY();
  void setCartesian(double x, double y);
  double getR();
  double getTheta();
  void setPolar(double r, double theta);
}
```
W drugim przypadku użytkownik nie wie, czy dane są przechowywane w układzie kartezjańskim, czy biegunowym, co daje programiście swobodę zmiany implementacji [13].

#### Antysymetria: Podejście proceduralne vs. obiektowe
W podejściu proceduralnym geometria operuje na strukturach:

```java
// LISTING 6.5: Podejście proceduralne (struktury danych)
public class Square { public Point topLeft; public double side; }
public class Circle { public Point center; public double radius; }

public class Geometry {
  public double area(Object shape) throws NoSuchShapeException {
    if (shape instanceof Square) {
      Square s = (Square)shape; return s.side * s.side;
    } else if (shape instanceof Circle) {
      Circle c = (Circle)shape; return Math.PI * c.radius * c.radius;
    }
    throw new NoSuchShapeException();
  }
}
```
Dodanie nowej funkcji (np. `perimeter()`) w klasie `Geometry` nie wymaga zmian w kształtach [14].

W podejściu obiektowym kształty same obliczają pole:

```java
// LISTING 6.6: Podejście obiektowe (polimorfizm)
public interface Shape { double area(); }

public class Square implements Shape {
  private double side;
  public double area() { return side * side; }
}

public class Circle implements Shape {
  private double radius;
  public double area() { return Math.PI * radius * radius; }
}
```
Dodanie nowego kształtu nie wymaga zmiany istniejących funkcji, ale dodanie nowej metody do interfejsu `Shape` wymusza edycję wszystkich klas pochodnych [2, 14].

#### Refaktoryzacja „wraku pociągu”
Zamiast wyciągać dane z głębi struktury obiektu, należy poprosić obiekt o wykonanie zadania.

```java
// Przed (WRAK POCIĄGU - naruszenie Demeter):
final String outputDir = ctxt.getOptions().getScratchDir().getAbsolutePath();

// Po (Zastosowanie Prawa Demeter):
// Pytamy obiekt ctxt, czy może sam utworzyć dla nas plik roboczy, 
// zamiast pytać go o opcje i katalogi.
BufferedOutputStream bos = ctxt.createScratchFileStream(classFileName);
```
Dzięki temu obiekt `ctxt` ukrywa swoją strukturę wewnętrzną [10].

### 4. Praktyczne wnioski – co zmienić w swoim kodzie?

1.  **Przestań automatycznie generować gettery i settery:** Zanim dodasz te metody do każdej zmiennej prywatnej, zastanów się, czy klasa powinna być obiektem (ukrywającym dane), czy strukturą danych (DTO) [5, 15]. Jeśli to obiekt, skup się na tym, co ma *robić*, a nie jakie dane posiada [4].
2.  **Rozpoznaj typ zmiany w projekcie:** Jeśli Twój system często wzbogaca się o nowe funkcjonalności przy stałym zestawie typów danych, rozważ podejście proceduralne (struktury danych + klasy operacyjne) [3]. Jeśli jednak częściej dodajesz nowe rodzaje obiektów do istniejącej logiki, trzymaj się ścisłego programowania obiektowego [3].
3.  **Analizuj łańcuchy wywołań:** Jeśli widzisz kod typu `a.getB().getC()...`, sprawdź, czy `B` i `C` to obiekty, czy struktury danych [8]. Jeśli to obiekty, przenieś logikę „głębiej”, aby uniknąć ujawniania struktury wewnętrznej [10, 16].
4.  **Oczyść Active Records:** Jeśli korzystasz z wzorca Active Record (często w frameworkach ORM), nie dopisuj tam metod logiki biznesowej [11]. Active Record to struktura danych – logika powinna znaleźć się w osobnych obiektach, które korzystają z tych struktur jako swojego zaplecza [11, 12].
5.  **Dąż do precyzji w terminologii:** Wyraźnie oznaczaj klasy będące DTO (Data Transfer Objects). Nie wstydź się używać publicznych pól w strukturach, które służą wyłącznie do przenoszenia danych – to czyni ich naturę jawną i odróżnia je od pełnoprawnych obiektów [9, 10].