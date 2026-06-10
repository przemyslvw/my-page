---
sidebar_position: 12
title: "Rozdział 12: Powstawanie projektu"
description: "Streszczenie: Rozdział 12: Powstawanie projektu — Czysty Kod, Robert C. Martin"
---

## Rozdział 12: Powstawanie projektu – Praktyczne streszczenie

W świecie profesjonalnego tworzenia oprogramowania rzadko zdarza się, by idealny projekt powstał w pierwszej iteracji. Rozdział 12 książki "Czysty Kod" autorstwa Roberta C. Martina (zredagowany przez Jeffa Langra) skupia się na tym, jak dzięki czterem prostym regułom Kenta Becka pozwolić projektowi „wyłonić się” w procesie pisania i refaktoryzacji kodu.

### 1. O co chodzi w tej sekcji
Główną tezą autora jest stwierdzenie, że **dobry projekt nie jest dziełem przypadku ani jednorazowego wysiłku na początku prac, lecz efektem ciągłej ewolucji opartej na testach i refaktoryzacji**. Według Martina stosowanie czterech zasad prostego projektu pozwala programiście uzyskać kod o wysokiej spójności i niskim sprzężeniu bez konieczności tworzenia skomplikowanych projektów „z góry”.

### 2. Kluczowe zasady i reguły
Kent Beck sformułował cztery zasady „prostego projektu” w kolejności ich ważności. Musisz je znać na pamięć i stosować przy każdym commicie:

*   **Zasada nr 1: System przechodzi wszystkie testy** – To fundament. Projekt może być teoretycznie genialny, ale jeśli nie da się go zweryfikować, jest bezwartościowy. Dążenie do pełnej testowalności wymusza na nas tworzenie małych klas o jednej odpowiedzialności (SRP), bo takie klasy najłatwiej przetestować.
*   **Zasada nr 2: Brak powtórzeń (DRY – Don’t Repeat Yourself)** – Powtórzenia to „wróg publiczny nr 1”. Nie chodzi tylko o identyczne linie kodu, ale także o powielanie logiki w różnych miejscach. Każda duplikacja to dodatkowa praca, ryzyko błędu przy zmianach i niepotrzebna złożoność.
*   **Zasada nr 3: Wyrazistość kodu (Ekspresja intencji)** – Kod jest czytany znacznie częściej niż pisany. Twoim zadaniem jest sprawienie, by czytelnik (często Ty sam za kilka miesięcy) nie był zaskoczony tym, co robi dana funkcja. Wybieraj dobre nazwy, twórz małe moduły i trzymaj się standardowych wzorców projektowych.
*   **Zasada nr 4: Minimalna liczba klas i metod** – Choć dążymy do małych jednostek, nie możemy popaść w dogmatyzm tworzenia klas dla samego ich posiadania. System powinien być tak mały, jak to możliwe, przy jednoczesnym zachowaniu testowalności, braku powtórzeń i czytelności.

### 3. Przykłady kodu

Refaktoryzacja w celu usunięcia powtórzeń to jeden z najważniejszych kroków w projektowaniu. Oto przykłady z tekstu:

#### Eliminacja drobnej duplikacji logicznej
Zamiast dwóch niezależnych metod, można powiązać jedną z drugą:
```java
// Zamiast osobnych implementacji:
int size() { /*...*/ }
boolean isEmpty() { /* logiczna implementacja sprawdzająca stan */ }

// Lepiej:
boolean isEmpty() {
  return 0 == size();
}
```

#### Refaktoryzacja metod manipulujących obrazem (Przed i Po)
Autor pokazuje, jak wydzielić wspólną logikę czyszczenia zasobów, która powtarzała się w dwóch różnych metodach.

**Przed refaktoryzacją:**
```java
public void scaleToOneDimension(float desiredDimension, float imageDimension) {
  if (Math.abs(desiredDimension - imageDimension) < errorThreshold)
    return;
  float scalingFactor = desiredDimension / imageDimension;
  scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
  RenderedOp newImage = ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor);
  image.dispose(); // Powtórzenie
  System.gc();     // Powtórzenie
  image = newImage; // Powtórzenie
}

public synchronized void rotate(int degrees) {
  RenderedOp newImage = ImageUtilities.getRotatedImage(image, degrees);
  image.dispose(); // Powtórzenie
  System.gc();     // Powtórzenie
  image = newImage; // Powtórzenie
}
```

**Po refaktoryzacji (wydzielenie `replaceImage`):**
```java
public void scaleToOneDimension(float desiredDimension, float imageDimension) {
  if (Math.abs(desiredDimension - imageDimension) < errorThreshold)
    return;
  float scalingFactor = desiredDimension / imageDimension;
  scalingFactor = (float)(Math.floor(scalingFactor * 100) * 0.01f);
  replaceImage(ImageUtilities.getScaledImage(image, scalingFactor, scalingFactor));
}

public synchronized void rotate(int degrees) {
  replaceImage(ImageUtilities.getRotatedImage(image, degrees));
}

private void replaceImage(RenderedOp newImage) {
  image.dispose();
  System.gc();
  image = newImage;
}
```

#### Zastosowanie wzorca Szablon Metody (Template Method)
To zaawansowany sposób na usunięcie duplikacji z algorytmów o podobnej strukturze.

**Przed (osobne klasy z niemal identycznym kodem):**
Metody `accrueUSDivisionVacation` i `accrueEUDivisionVacation` mają te same kroki, różnią się tylko detalami prawnymi.

**Po refaktoryzacji:**
```java
abstract public class VacationPolicy {
  public void accrueVacation() { // Szablon algorytmu
    calculateBaseVacationHours();
    alterForLegalMinimums();
    applyToPayroll();
  }

  private void calculateBaseVacationHours() { /* ... */ };
  abstract protected void alterForLegalMinimums(); // "Dziura" w algorytmie
  private void applyToPayroll() { /* ... */ };
}

public class USVacationPolicy extends VacationPolicy {
  @Override protected void alterForLegalMinimums() {
    // Kod specyficzny dla USA.
  }
}
```

### 4. Praktyczne wnioski – co zmienić w swoim kodzie?

Po lekturze tej sekcji powinieneś wprowadzić następujące zmiany w swoim warsztacie:

1.  **Przestań traktować testy jako dodatek.** Jeśli Twój projekt utrudnia pisanie testów, to znaczy, że projekt jest zły. Zacznij używać interfejsów i wstrzykiwania zależności (DI), aby odizolować klasy i umożliwić ich łatwe sprawdzanie.
2.  **Zatrzymaj się po każdej drobnej zmianie.** Nie czekaj na „dzień sprzątania kodu”. Gdy tylko dodasz nową funkcjonalność, spójrz na projekt i zadaj sobie pytanie: „Czy właśnie go nie zepsułem?”. Jeśli tak – napraw to od razu.
3.  **Bądź bezlitosny dla powtórzeń.** Jeśli widzisz podobne fragmenty kodu w dwóch miejscach, wydziel je do metody. Jeśli widzisz podobne algorytmy w klasach, zastosuj wzorzec *Template Method* lub *Strategy*.
4.  **Zainwestuj w nazewnictwo.** Nazwa funkcji powinna opowiadać historię. Jeśli nazwa klasy jest zbyt ogólna (np. `Manager`), prawdopodobnie ma ona zbyt wiele odpowiedzialności i narusza SRP.
5.  **Nie projektuj na zapas (YAGNI).** Unikaj tworzenia skomplikowanych hierarchii klas tylko dlatego, że „może się kiedyś przydadzą”. Trzymaj system tak małym, jak to możliwe, dopóki testy i brak powtórzeń są zachowane.

Pamiętaj: **Uwaga jest najcenniejszym zasobem programisty.** Poświęć ją na to, by Twój kod był czytelny dla innych, bo to Ty będziesz tą osobą, która wróci do niego za pół roku.