---
sidebar_position: 4
title: "Rozdział 4: Komentarze"
description: "Streszczenie: Rozdział 4: Komentarze — Czysty Kod, Robert C. Martin"
---

## Rozdział 4: Komentarze – Praktyczne kompendium

W świecie profesjonalnego programowania komentarze są często traktowane jako „czyste dobro”. Robert C. Martin w czwartym rozdziale swojej książki brutalnie rozprawia się z tym mitom. Jako programista piszący dla innych programistów, musisz zrozumieć, że każdy komentarz w twoim kodzie to sygnał ostrzegawczy.

### O co chodzi w tej sekcji?
Główną tezą autora jest stwierdzenie, że **komentarze są w najlepszym przypadku złem koniecznym, a ich obecność zazwyczaj sygnalizuje naszą porażkę w tworzeniu czytelnego i ekspresywnego kodu**. Zamiast tracić czas na pisanie wyjaśnień do skomplikowanych struktur, powinieneś poświęcić tę samą energię na refaktoryzację bałaganu tak, aby kod stał się zrozumiały sam w sobie.

### Kluczowe zasady i reguły

*   **Nie komentuj złego kodu — popraw go.** Jeśli czujesz potrzebę napisania komentarza, aby wyjaśnić, co robi dany blok, oznacza to, że kod jest zbyt skomplikowany i wymaga sprzątania.
*   **Komentarze kłamią.** Kod zmienia się i ewoluuje, a programiści rzadko pamiętają o aktualizowaniu komentarzy. Starsze komentarze stają się „osieroconymi notatkami”, które wprowadzają czytelnika w błąd.
*   **Jedynym źródłem prawdy jest kod.** Tylko on faktycznie wykonuje operacje; komentarz to jedynie niepewna interpretacja autora.
*   **Dobre komentarze to rzadkość.** Do wyjątków należą: konieczne informacje prawne (prawa autorskie), wyjaśnienie skomplikowanych wyrażeń regularnych, dokumentowanie intencji (dlaczego podjęto taką, a nie inną decyzję projektową), ostrzeżenia o skutkach ubocznych (np. wpływ na wydajność) oraz notatki TODO.
*   **Usuwaj zakomentowany kod natychmiast.** To jedna z najbardziej nieprofesjonalnych praktyk. Od historii zmian masz system kontroli wersji (Git). Zakomentowany kod zaśmieca plik i nikt nie ma odwagi go usunąć, bo „może jest ważny”.
*   **Unikaj redundantnego szumu.** Komentarze typu `i++; // inkrementacja i` lub Javadoc powtarzający sygnaturę metody (`@param title - tytuł`) są bezużyteczne i utrudniają czytanie.
*   **Komentarze nie są „szminką” dla bałaganu.** Zamiast pisać obszerne wyjaśnienia do chaotycznego modułu, po prostu go posprzątaj.

### Przykłady kodu: Refaktoryzacja zamiast komentarzy

Autor pokazuje, że najprostszym sposobem na usunięcie komentarza jest stworzenie opisowej funkcji lub zmiennej.

**Przykład 1: Intencja ukryta w logicznym wyrażeniu**

```java
// PRZED: Sprawdzenie, czy pracownik ma prawo do wszystkich korzyści
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))

// PO: Zastąpienie komentarza metodą o znaczącej nazwie
if (employee.isEligibleForFullBenefits())
```

**Przykład 2: Wyjaśnienie skomplikowanego bloku try-catch**

Zamiast dodawać frustrujące komentarze w środku skomplikowanej obsługi błędów, lepiej wyodrębnić logikę do oddzielnej metody.

```java
// PRZED: Kod z "bełkotem" w bloku catch
private void startSending() {
  try {
    doSending();
  } catch(SocketException e) {
    // Normalne. Ktoś zatrzymał żądanie.
  } catch(Exception e) {
    try {
      response.add(ErrorResponder.makeExceptionString(e));
      response.closeAll();
    } catch(Exception e1) {
      // Muszę zrobić przerwę!
    }
  }
}

// PO: Czytelna struktura bez zbędnego szumu
private void startSending() {
  try {
    doSending();
  } catch(SocketException e) {
    // Normalne. Ktoś zatrzymał żądanie.
  } catch(Exception e) {
    addExceptionAndCloseResponse(e);
  }
}

private void addExceptionAndCloseResponse(Exception e) {
  try {
    response.add(ErrorResponder.makeExceptionString(e));
    response.closeAll();
  } catch(Exception e1) {
    // Czysty blok catch lub logowanie
  }
}
```

**Przykład 3: Algorytm Sita Eratostenesa (fragmenty)**

W wersji „brudnej” program jest usiany komentarzami opisującymi każdy krok (inicjalizacja, sito, licznik). W wersji czystej komentarze znikają, ponieważ nazwy funkcji same mówią za siebie:

```java
// FRAGMENT PO REFAKTORYZACJI
public static int[] generatePrimes(int maxValue) {
  if (maxValue < 2)
    return new int;
  else {
    uncrossIntegersUpTo(maxValue);
    crossOutMultiples();
    putUncrossedIntegersIntoResult();
    return result;
  }
}

private static void crossOutMultiples() {
  int limit = determineIterationLimit();
  for (int i = 2; i <= limit; i++)
    if (notCrossed(i))
      crossOutMultiplesOf(i);
}
```
W powyższym przykładzie kod czyta się jak prozę, a komentarze stały się zbędne, bo nazwy takie jak `crossOutMultiplesOf(i)` są wystarczająco precyzyjne.

### Praktyczne wnioski – co zmienić w swoim kodzie?

1.  **Audyt komentarzy:** Przejrzyj swój ostatni projekt. Każdy komentarz, który wyjaśnia *co* robi kod, zamień na nową funkcję lub dobrze nazwaną zmienną.
2.  **Likwidacja "cmentarzysk kodu":** Przeszukaj pliki pod kątem zakomentowanych bloków kodu. Usuń je bez mrugnięcia okiem. Jeśli ich potrzebujesz, odnajdziesz je w historii Git.
3.  **Czyszczenie Javadoc:** Przestań generować dokumentację dla metod prywatnych lub takich, których działanie jest oczywiste z samej nazwy (np. settery i gettery). Robią one jedynie tłok w pliku.
4.  **Zmień perspektywę:** Za każdym razem, gdy kursor wędruje w stronę `//`, poczuj smak porażki. Zadaj sobie pytanie: „Jak mogę zmienić strukturę tego kodu, aby ten komentarz nie był potrzebny?”.
5.  **Pisz tylko wartościowe komentarze:** Jeśli musisz coś skomentować, skup się na „dlaczego”, a nie „co”. Wyjaśniaj nietypowe obejścia błędów w bibliotekach zewnętrznych lub ważne ograniczenia biznesowe, których nie da się zapisać samą składnią języka.

Stosując te zasady, zyskasz kod, który jest mniejszy, bardziej spójny i – co najważniejsze – nie kłamie, gdy przychodzi czas na jego modyfikację.