---
sidebar_position: 11
title: "Rozdział 11: Systemy"
description: "Streszczenie: Rozdział 11: Systemy — Czysty Kod, Robert C. Martin"
---

## Rozdział 11: Systemy – Praktyczne Podsumowanie

### O co chodzi w tej sekcji
Główną tezą autora jest konieczność zachowania **separacji zadań** na poziomie systemowym, co oznacza oddzielenie procesu konstruowania systemu (tworzenia obiektów i ich powiązań) od logiki jego działania. Złożoność zabija projekty, dlatego systemy powinny być budowane przyrostowo z czystych obiektów POJO (Plain Old Java Objects), a aspekty techniczne (trwałość, transakcje, bezpieczeństwo) winny być wdrażane nieinwazyjnie przy użyciu narzędzi takich jak wstrzykiwanie zależności czy programowanie aspektowe.

### Kluczowe zasady i reguły
*   **Separacja konstrukcji od używania:** System nie powinien mieszać kodu odpowiedzialnego za inicjalizację i konfigurację z kodem realizującym logikę biznesową. 
*   **Wydzielenie modułu Main:** Przenieś całą odpowiedzialność za tworzenie i konfigurowanie obiektów do funkcji `main` lub dedykowanego modułu, a resztę aplikacji projektuj tak, by po prostu korzystała z gotowych, wstrzykniętych komponentów.
*   **Stosowanie wstrzykiwania zależności (DI):** Obiekty nie powinny samodzielnie rozwiązywać swoich zależności; zamiast tego powinny być całkowicie pasywne i otrzymywać potrzebne zasoby przez konstruktory lub settery od mechanizmu zarządzającego (np. kontenera DI).
*   **Architektura ewolucyjna (brak BDUF):** Unikaj projektowania wszystkiego od razu (Big Design Up Front). Systemy oprogramowania mogą i powinny rosnąć przyrostowo, adaptując się do nowych potrzeb, pod warunkiem zachowania odpowiedniej modularności.
*   **Domena oparta na POJO:** Logika biznesowa powinna być zapisana w prostych obiektach, które nie mają zależności od ciężkich bibliotek infrastrukturalnych ani frameworków (takich jak dawne EJB2), co ułatwia testowanie i konserwację.
*   **Separacja problemów "przecinających się" (AOP):** Problemy takie jak trwałość danych, transakcyjność czy bezpieczeństwo mają tendencję do przenikania przez granice obiektów domeny; należy je zamykać w osobnych aspektach, aby nie zanieczyszczały czystej logiki biznesowej.
*   **Opóźnianie decyzji:** Dzięki modularności możemy odłożyć kluczowe decyzje techniczne do ostatniego możliwego momentu, kiedy dysponujemy najbardziej aktualnymi informacjami.
*   **Wykorzystanie Języków Dziedzinowych (DSL):** Dobry język DSL pozwala na pisanie kodu, który czyta się jak prozę, minimalizując przepaść komunikacyjną między ekspertem domenowym a programistą.

### Przykłady kodu

#### Przykład 1: "Leniwa inicjalizacja" – typowy błąd mieszania konstrukcji z logiką
To częsty, pozornie wygodny idiom, który jednak buduje sztywne zależności od konkretnych implementacji i utrudnia testowanie.

```java
// PRZED: Konstrukcja wymieszana z logiką działania
public Service getService() {
  if (service == null)
    service = new MyServiceImpl(...); // Sztywne powiązanie z konkretną implementacją!
  return service;
}
```

#### Przykład 2: Separacja zadań za pomocą fabryki abstrakcyjnej
Gdy aplikacja musi decydować o momencie utworzenia obiektu, należy odizolować ją od szczegółów tego procesu.

```java
// PO: Oddzielenie szczegółów tworzenia obiektu od kodu aplikacji
public interface LineItemFactory {
    LineItem makeLineItem();
}

public class OrderProcessing {
    private LineItemFactory factory;
    
    public OrderProcessing(LineItemFactory factory) {
        this.factory = factory;
    }
    
    public void addOrder() {
        // Aplikacja kontroluje KIEDY stworzyć obiekt, ale nie wie JAK
        LineItem newItem = factory.makeLineItem();
        // ... dalsza logika
    }
}
```

#### Przykład 3: Konfiguracja wstrzykiwania zależności (Spring)
Zamiast tworzyć powiązania w kodzie, deklarujemy je w pliku konfiguracyjnym, co pozwala na pełne odłączenie aplikacji od szczegółów infrastrukturalnych.

```xml
<!-- Plik konfiguracyjny app.xml -->
<beans>
  <bean id="appDataSource" class="org.apache.commons.dbcp.BasicDataSource" ... />
  
  <bean id="bankDataAccessObject" class="com.example.banking.persistence.BankDataAccessObject"
        p:dataSource-ref="appDataSource"/>
        
  <bean id="bank" class="com.example.banking.model.Bank"
        p:dataAccessObject-ref="bankDataAccessObject"/>
</beans>
```

```java
// Uzyskanie obiektu z kontenera DI
XmlBeanFactory bf = new XmlBeanFactory(new ClassPathResource("app.xml", getClass()));
Bank bank = (Bank) bf.getBean("bank");
```

#### Przykład 4: Ewolucja od inwazyjnego EJB2 do czystego EJB3/POJO
W EJB2 logika biznesowa była silnie sprzężona z kontenerem, co uniemożliwiało testowanie jednostkowe i ponowne użycie kodu. W EJB3 kod jest znacznie czystszy, a szczegóły techniczne są ukryte w adnotacjach lub deskryptorach XML.

```java
// PRZED: EJB2 – inwazyjne dziedziczenie i narzut kontenera
public abstract class Bank implements javax.ejb.EntityBean {
  // Metody cyklu życia narzucone przez framework
  public void ejbActivate() {}
  public void ejbPassivate() {}
  // ... mnóstwo pustych metod, które tylko zaciemniają kod
  
  public void addAccount(AccountDTO accountDTO) {
    // Rozwiązywanie zależności bezpośrednio w logice biznesowej
    InitialContext context = new InitialContext();
    AccountHomeLocal accountHome = context.lookup("AccountHomeLocal");
    // ...
  }
}
```

```java
// PO: EJB3 / JPA – Czyste POJO z adnotacjami (szczegóły techniczne są dyskretne)
@Entity
@Table(name = "BANKS")
public class Bank implements java.io.Serializable {
  @Id @GeneratedValue(strategy=GenerationType.AUTO)
  private int id;
  
  @Embedded
  private Address address;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy="bank")
  private Collection<Account> accounts = new ArrayList<Account>();

  // Czyste metody biznesowe bez śmieci technicznych
  public void addAccount(Account account) {
    account.setBank(this);
    accounts.add(account);
  }
  // ... gettery i settery
}
```

### Praktyczne wnioski
1.  **Usuń `new` z metod biznesowych:** Jeśli Twoja klasa tworzy instancję innej klasy za pomocą słowa kluczowego `new`, prawdopodobnie łamiesz separację zadań. Przenieś to tworzenie do konstruktora (jako parametr) lub skorzystaj z fabryki.
2.  **Stosuj POJO wszędzie, gdzie to możliwe:** Twoja domena biznesowa powinna być testowalna bez uruchamiania bazy danych czy serwera aplikacji. Jeśli testowanie wymaga "podnoszenia" frameworka, Twoja architektura jest zbyt inwazyjna.
3.  **Wybieraj najprostsze skuteczne mechanizmy:** Nie używaj skomplikowanych frameworków tylko dlatego, że są standardem rynkowym, jeśli proste wstrzykiwanie zależności i POJO wystarczą do rozwiązania problemu.
4.  **Ujawniaj intencje na każdym poziomie abstrakcji:** Kod na poziomie systemowym musi być tak samo czytelny jak na poziomie funkcji. Używaj nazw i struktur, które jasno komunikują, co system ma robić, a nie jak technicznie jest zaimplementowany.
5.  **Dąż do nieinwazyjności:** Idealne API techniczne powinno być niemal niewidoczne w kodzie biznesowym, pozwalając zespołowi skupić się na dostarczaniu wartości dla użytkownika.