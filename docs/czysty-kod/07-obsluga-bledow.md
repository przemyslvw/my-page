---
sidebar_position: 7
title: "Rozdział 7: Obsługa błędów"
description: "Streszczenie: Rozdział 7: Obsługa błędów — Czysty Kod, Robert C. Martin"
---

Oto praktyczne streszczenie rozdziału 7. „Obsługa błędów” z książki Roberta C. Martina, przygotowane z myślą o natychmiastowym zastosowaniu w codziennej pracy programisty.

## Rozdział 7: Obsługa błędów — O co w tym chodzi?

Główną tezą autora jest to, że **obsługa błędów nie może dominować nad logiką biznesową kodu** [1]. Czysty kod to taki, w którym potrafimy oddzielić główny algorytm od sytuacji wyjątkowych, dzięki czemu czytelnik może skupić się na tym, co program faktycznie robi, a nie na tym, jak próbuje przetrwać awarię [2, 3].

---

## Kluczowe zasady i reguły

*   **Używaj wyjątków zamiast kodów powrotu:** Kody błędów zmuszają wywołującego do natychmiastowego sprawdzenia stanu, co prowadzi do głęboko zagnieżdżonych struktur `if` [2, 4]. Wyjątki pozwalają przenieść obsługę problemu do osobnego bloku, czyszcząc ścieżkę „szczęśliwego wykonania” (happy path) [5, 6].
*   **Zaczynaj od pisania instrukcji `try-catch-finally`:** Pisanie obsługi błędów jako pierwszej części algorytmu pozwala zdefiniować zakres „transakcji” [7]. Dzięki temu od początku budujesz kod z myślą o tym, że coś może pójść nie tak, co pomaga utrzymać program w spójnym stanie [7, 8].
*   **Stosuj wyjątki niekontrolowane (Unchecked Exceptions):** Robert Martin jednoznacznie twierdzi, że debata nad wyjątkami kontrolowanymi (checked) jest zakończona — ich cena (naruszenie zasady otwarty-zamknięty) jest zbyt wysoka [9]. Każda zmiana na niskim poziomie wymusza modyfikację sygnatur metod na wielu wyższych poziomach, co niszczy hermetyzację [9, 10].
*   **Dostarczaj kontekst wraz z wyjątkami:** Każdy zgłoszony błąd powinien zawierać wystarczająco dużo informacji, by programista mógł określić jego źródło bez ślęczenia nad debuggerem [11]. Komunikaty błędów powinny jasno wskazywać operację, która się nie udała, oraz typ awarii [11].
*   **Definiuj klasy wyjątków pod kątem potrzeb wywołującego:** Nie twórz osobnych klas wyjątków dla każdego możliwego błędu niskopoziomowego, jeśli wywołujący i tak obsłuży je wszystkie w ten sam sposób [12, 13]. Często jedna klasa wyjątku dla danego obszaru kodu jest wystarczająca [14].
*   **Osłaniaj API firm zewnętrznych (Wrappers):** Zamiast rozprzestrzeniać specyficzne wyjątki zewnętrznej biblioteki po całym systemie, stwórz własną klasę osłonową [14, 15]. Minimalizuje to zależności i ułatwia zmianę biblioteki w przyszłości [14].
*   **Stosuj wzorzec Specjalnego Przypadku (Special Case Pattern):** Zamiast przerywać działanie programu wyjątkiem w sytuacji typowej (np. brak wydatku na posiłek), skonfiguruj obiekt tak, by zwracał domyślne zachowanie (np. ryczałt dzienny) [16]. Dzięki temu kod klienta staje się prostszy, bo nie musi obsługiwać sytuacji wyjątkowej [16].
*   **Nigdy nie zwracaj `null`:** Zwracanie `null` to proszenie się o `NullPointerException` i zmuszanie innych programistów do pisania niekończących się sprawdzeń `if (obj != null)` [17, 18]. Zamiast tego rzuć wyjątek lub zwróć obiekt specjalnego przypadku (np. pustą listę przez `Collections.emptyList()`) [19, 20].
*   **Nigdy nie przekazuj `null` do metod:** Przekazywanie `null` w argumentach jest jeszcze gorsze niż jego zwracanie [21]. Większość języków nie ma dobrej metody obsługi przypadkowo przekazanego `null`, więc najlepszą strategią jest wprowadzenie zakazu jego przekazywania w zespole [3].

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

**PO (Listing 7.2):** Czysty podział na logikę i obsługę błędów [5].
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

**PRZED:** Każde wywołanie zmusza do obsługi wielu specyficznych wyjątków biblioteki `ACMEPort` [13].
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

**PO:** Uproszczenie wywołania dzięki klasie osłonowej `LocalPort` [15].
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

**PRZED:** Logika zaciemniona przez obsługę braku danych [22].
```java
 try {
   MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
   m_total += expenses.getTotal();
 } catch(MealExpensesNotFound e) {
   m_total += getMealPerDiem();
 }
```

**PO:** DAO zawsze zwraca obiekt, który „wie”, co robić, nawet jeśli brak wydatków [16, 22].
```java
 MealExpenses expenses = expenseReportDAO.getMeals(employee.getID());
 m_total += expenses.getTotal();
```

---

## Praktyczne wnioski — Co zmienić w swoim kodzie?

1.  **Przestań używać kodów błędów (np. `-1`, `false`, `0`) jako sygnałów awarii.** Zastąp je rzucaniem czytelnych wyjątków, które niosą kontekst [2, 11].
2.  **Usuń słowo kluczowe `throws` ze swoich metod i przestań używać Checked Exceptions.** Jeśli pracujesz w Javie, opakowuj wyjątki kontrolowane w `RuntimeException`, aby nie „brudzić” interfejsów wyższego poziomu [9, 10].
3.  **Wprowadź zakaz zwracania `null`.** Zamiast tego zwracaj puste kolekcje lub obiekty typu „Null Object” [19, 20]. Przejrzyj istniejący kod i usuń zbędne sprawdzenia `if (obj != null)`, zastępując je lepszą strukturą danych [18].
4.  **Jeśli korzystasz z zewnętrznej biblioteki, która rzuca mnóstwo różnych wyjątków, stwórz dla niej Wrapper.** Ukryj tam całe skomplikowanie obsługi błędów i wystaw swojej aplikacji jeden, czytelny wyjątek biznesowy [14, 15].
5.  **Stosuj asercje na początku metod, aby wyłapać przypadki przekazania `null` przez innych programistów.** Dzięki temu błąd objawi się natychmiast, a nie w losowym miejscu głęboko w kodzie [3, 23].