---
sidebar_position: 7
title: "Rozdział 7: Obsługa błędów"
description: "Streszczenie: Rozdział 7: Obsługa błędów — Czysty Kod, Robert C. Martin"
---

Oto praktyczne streszczenie rozdziału 7. „Obsługa błędów” z książki Roberta C. Martina, przygotowane z myślą o natychmiastowym zastosowaniu w codziennej pracy programisty.

## Rozdział 7: Obsługa błędów — O co w tym chodzi?

Główną tezą autora jest to, że **obsługa błędów nie może dominować nad logiką biznesową kodu**. Czysty kod to taki, w którym potrafimy oddzielić główny algorytm od sytuacji wyjątkowych, dzięki czemu czytelnik może skupić się na tym, co program faktycznie robi, a nie na tym, jak próbuje przetrwać awarię.

---

## Kluczowe zasady i reguły

*   **Używaj wyjątków zamiast kodów powrotu:** Kody błędów zmuszają wywołującego do natychmiastowego sprawdzenia stanu, co prowadzi do głęboko zagnieżdżonych struktur `if`. Wyjątki pozwalają przenieść obsługę problemu do osobnego bloku, czyszcząc ścieżkę „szczęśliwego wykonania” (happy path).
*   **Zaczynaj od pisania instrukcji `try-catch-finally`:** Pisanie obsługi błędów jako pierwszej części algorytmu pozwala zdefiniować zakres „transakcji”. Dzięki temu od początku budujesz kod z myślą o tym, że coś może pójść nie tak, co pomaga utrzymać program w spójnym stanie.
*   **Stosuj wyjątki niekontrolowane (Unchecked Exceptions):** Robert Martin jednoznacznie twierdzi, że debata nad wyjątkami kontrolowanymi (checked) jest zakończona — ich cena (naruszenie zasady otwarty-zamknięty) jest zbyt wysoka. Każda zmiana na niskim poziomie wymusza modyfikację sygnatur metod na wielu wyższych poziomach, co niszczy hermetyzację.
*   **Dostarczaj kontekst wraz z wyjątkami:** Każdy zgłoszony błąd powinien zawierać wystarczająco dużo informacji, by programista mógł określić jego źródło bez ślęczenia nad debuggerem. Komunikaty błędów powinny jasno wskazywać operację, która się nie udała, oraz typ awarii.
*   **Definiuj klasy wyjątków pod kątem potrzeb wywołującego:** Nie twórz osobnych klas wyjątków dla każdego możliwego błędu niskopoziomowego, jeśli wywołujący i tak obsłuży je wszystkie w ten sam sposób. Często jedna klasa wyjątku dla danego obszaru kodu jest wystarczająca.
*   **Osłaniaj API firm zewnętrznych (Wrappers):** Zamiast rozprzestrzeniać specyficzne wyjątki zewnętrznej biblioteki po całym systemie, stwórz własną klasę osłonową. Minimalizuje to zależności i ułatwia zmianę biblioteki w przyszłości.
*   **Stosuj wzorzec Specjalnego Przypadku (Special Case Pattern):** Zamiast przerywać działanie programu wyjątkiem w sytuacji typowej (np. brak wydatku na posiłek), skonfiguruj obiekt tak, by zwracał domyślne zachowanie (np. ryczałt dzienny). Dzięki temu kod klienta staje się prostszy, bo nie musi obsługiwać sytuacji wyjątkowej.
*   **Nigdy nie zwracaj `null`:** Zwracanie `null` to proszenie się o `NullPointerException` i zmuszanie innych programistów do pisania niekończących się sprawdzeń `if (obj != null)`. Zamiast tego rzuć wyjątek lub zwróć obiekt specjalnego przypadku (np. pustą listę przez `Collections.emptyList()`).
*   **Nigdy nie przekazuj `null` do metod:** Przekazywanie `null` w argumentach jest jeszcze gorsze niż jego zwracanie. Większość języków nie ma dobrej metody obsługi przypadkowo przekazanego `null`, więc najlepszą strategią jest wprowadzenie zakazu jego przekazywania w zespole.

---

## Przykłady kodu: Przed i po refaktoryzacji

### 1. Kody błędów vs Wyjątki

**PRZED (Listing 7.1):** Logika biznesowa ginie w gąszczu sprawdzeń `if`.
```java
public class DeviceController {
  public void sendShutDown() {
    DeviceHandle handle = getHandle(DEV1);
    if (handle != DeviceHandle.INVALID) {
      retrieveDeviceRecord(handle);
      if (record.getStatus() != DEVICE_SUSPENDED) {
        pauseDevice(handle);
        clearDeviceWorkQueue(handle);
        closeDevice(handle);
      } else {
        logger.log("Urządzenie wstrzymane. Nie można wyłączyć");
      }
    } else {
      logger.log("Niewłaściwy uchwyt dla: " + DEV1.toString());
    }
  }
}
```

**PO (Listing 7.2):** Czysty podział na logikę i obsługę błędów.
```java
public class DeviceController {
  public void sendShutDown() {
    try {
      tryToShutDown();
    } catch (DeviceShutDownError e) {
      logger.log(e);
    }
  }

  private void tryToShutDown() throws DeviceShutDownError {
    DeviceHandle handle = getHandle(DEV1);
    DeviceRecord record = retrieveDeviceRecord(handle);
    pauseDevice(handle);
    clearDeviceWorkQueue(handle);
    closeDevice(handle);
  }
}
```

### 2. Osłanianie (Wrapping) API firm zewnętrznych

**PRZED:** Każde wywołanie zmusza do obsługi wielu specyficznych wyjątków biblioteki `ACMEPort`.
```java
 ACMEPort port = new ACMEPort(12);
 try {
   port.open();
 } catch (DeviceResponseException e) {
   reportPortError(e);
   logger.log("Wyjątek odpowiedzi urządzenia", e);
 } catch (ATM1212UnlockedException e) {
   reportPortError(e);
   logger.log("Wyjątek odblokowania", e);
 } catch (GMXError e) {
   reportPortError(e);
   logger.log("Wyjątek odpowiedzi urządzenia");
 } finally {
   ...
 }
```

**PO:** Uproszczenie wywołania dzięki klasie osłonowej `LocalPort`.
```java
 LocalPort port = new LocalPort(12);
 try {
   port.open();
 } catch (PortDeviceFailure e) {
   reportError(e);
   logger.log(e.getMessage(), e);
 } finally {
   ...
 }
```

### 3. Wzorzec Specjalnego Przypadku (Special Case Pattern)

**PRZED:** Logika zaciemniona przez obsługę braku danych.
```java
 try {
   MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
   m_total += expenses.getTotal();
 } catch(MealExpensesNotFound e) {
   m_total += getMealPerDiem();
 }
```

**PO:** DAO zawsze zwraca obiekt, który „wie”, co robić, nawet jeśli brak wydatków.
```java
 MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
 m_total += expenses.getTotal();
```

---

## Praktyczne wnioski — Co zmienić w swoim kodzie?

1.  **Przestań używać kodów błędów (np. `-1`, `false`, `0`) jako sygnałów awarii.** Zastąp je rzucaniem czytelnych wyjątków, które niosą kontekst.
2.  **Usuń słowo kluczowe `throws` ze swoich metod i przestań używać Checked Exceptions.** Jeśli pracujesz w Javie, opakowuj wyjątki kontrolowane w `RuntimeException`, aby nie „brudzić” interfejsów wyższego poziomu.
3.  **Wprowadź zakaz zwracania `null`.** Zamiast tego zwracaj puste kolekcje lub obiekty typu „Null Object”. Przejrzyj istniejący kod i usuń zbędne sprawdzenia `if (obj != null)`, zastępując je lepszą strukturą danych.
4.  **Jeśli korzystasz z zewnętrznej biblioteki, która rzuca mnóstwo różnych wyjątków, stwórz dla niej Wrapper.** Ukryj tam całe skomplikowanie obsługi błędów i wystaw swojej aplikacji jeden, czytelny wyjątek biznesowy.
5.  **Stosuj asercje na początku metod, aby wyłapać przypadki przekazania `null` przez innych programistów.** Dzięki temu błąd objawi się natychmiast, a nie w losowym miejscu głęboko w kodzie.