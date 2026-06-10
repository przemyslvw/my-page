---
id: "analiza-wynikow"
title: "Zbieranie i analiza wyników testów"
sidebar_position: 2
---

##  Zbieranie i analiza wyników testów

Etap analizy wyników jest kluczowy, aby nadać sens surowym danym z narzędzi oraz testów manualnych. Poniżej opisano, jak efektywnie zbierać, kategoryzować i analizować dane po zakończeniu testów bezpieczeństwa aplikacji.

---

###  1. Konsolidacja danych z różnych źródeł

Zbierz wyniki z:

- Narzędzi automatycznych (np. ZAP, Burp Suite, Acunetix)
- Testów manualnych (np. próby obejścia kontroli dostępu)
- Analizy kodu źródłowego (jeśli dostępna)
- Logów systemowych (np. błędy HTTP, próby nieautoryzowanego dostępu)

Upewnij się, że wszystkie dane mają jasne metadane: **czas, lokalizacja, metoda testu, tester**.

---

### 🗃️ 2. Grupowanie i deduplikacja podatności

- Grupuj podatności według kategorii OWASP Top 10.
- Eliminuj duplikaty (np. wielokrotne zgłoszenia tej samej podatności na różnych endpointach).
- Zadbaj o spójność opisu i klasyfikacji – każda podatność powinna mieć **jednoznaczną nazwę, ocenę ryzyka i rekomendację**.

---

### 📎 3. Ocena ryzyka (np. wg CVSS)

Dla każdej podatności określ:

- **Skalę zagrożenia (Low / Medium / High / Critical)**
- **Możliwy wpływ na użytkownika, system, dane**
- **Łatwość wykorzystania podatności**
- **Potencjalne konsekwencje biznesowe**

Możesz użyć np. **CVSS 3.1 lub CVSS 4.0**, jeśli raport tego wymaga.

---

### 📄 4. Tworzenie checklist i tabel

Warto stworzyć tabele podsumowujące:

| ID | Kategoria OWASP | Ryzyko | Lokalizacja | Status | Rekomendacja |
|----|------------------|--------|-------------|--------|---------------|
| A01 | Broken Access Control | High | `/admin` endpoint | Potwierdzona | Wdrożyć RBAC |

---

###  5. Potwierdzenie wyników (retrospekcja)

- Przegląd przez innego testera / analityka (zasada 4 oczu)
- Retest wybranych podatności, szczególnie **krytycznych**
- Konsultacja z zespołem dev/secops – czy raportowane problemy są zgodne ze stanem faktycznym

---

### ✅ 6. Gotowość do raportowania

Po zakończeniu analizy:

- Dane powinny być przejrzyste, spójne i kompletne
- Każda podatność powinna zawierać **dowód, opis, ocenę, rekomendację**
- Gotowe dane przenosimy do **struktury raportu końcowego** (patrz poprzedni rozdział)

