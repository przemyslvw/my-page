---
id: "atuin-kurs-statystyki-personalizacja"
title: " Statystyki i personalizacja"
sidebar_position: 5
---

#  Statystyki i personalizacja

Atuin nie tylko rejestruje historię komend, ale także umożliwia analizowanie ich statystyk oraz pełną personalizację interfejsu i działania narzędzia. Dzięki temu możesz zoptymalizować swoją pracę i dostosować środowisko terminala do własnych preferencji.

---

##  Statystyki użycia komend

### ✅ **Podstawowe statystyki**

Aby zobaczyć najczęściej używane komendy:

```bash
atuin stats
```

Przykładowy wynik:

```
Najczęściej używane komendy:
1. git status        - 200 razy
2. ls -la            - 180 razy
3. docker ps         - 150 razy
4. cd /projekty      - 130 razy
5. cargo build       - 90 razy
```

---

###  **Zaawansowane analizy**

Aby wygenerować statystyki dla konkretnego okresu:

```bash
atuin stats --after "2024-01-01" --before "2024-01-31"
```

Aby sprawdzić statystyki dla określonego katalogu:

```bash
atuin stats --cwd /ścieżka/do/projektu
```

---

## 🎨 Personalizacja Atuin

Plik konfiguracyjny Atuin znajduje się w:

```bash
~/.config/atuin/config.toml
```

### ✅ **Najważniejsze opcje konfiguracyjne:**

- **Zmienianie skrótów klawiszowych**  
  Domyślny skrót to `Ctrl+R`, ale możesz go zmienić:

  ```toml
  keybinding = "Ctrl+T"
  ```

- **Wyświetlanie daty przy komendach**

  ```toml
  show_dates = true
  ```

- **Ukrywanie wybranych komend z historii**  
  Możesz dodać komendy do ignorowania:

  ```toml
  history_filter = ["password", "token", "secret"]
  ```

---

## 🌈 Zmiana motywu kolorystycznego

Atuin pozwala na dostosowanie kolorów interfejsu. W pliku `config.toml` możesz zmienić schemat kolorystyczny.

### ✅ **Przykład konfiguracji:**

```toml
theme = "gruvbox-dark"
```

Aby zobaczyć dostępne motywy:

```bash
atuin theme list
```

---

##  Tworzenie własnych filtrów i aliasów

Atuin pozwala tworzyć własne skróty i filtry, które ułatwią codzienną pracę.

### ✅ **Dodawanie aliasów:**

W pliku `config.toml`:

```toml
[aliases]
gst = "git status"
gco = "git checkout"
```

Teraz wpisując `gst` w terminalu, uruchomisz `git status`.

---

## 🧹 Zarządzanie historią

### ✅ **Usuwanie duplikatów z historii:**

```bash
atuin history deduplicate
```

### ✅ **Eksportowanie historii do pliku:**

```bash
atuin history export > moja_historia.json
```

### ✅ **Importowanie historii z pliku:**

```bash
atuin history import < moja_historia.json
```

---

##  Porady i triki

-  **Automatyczna synchronizacja co godzinę:**

  W pliku `config.toml`:

  ```toml
  sync_frequency = "1h"
  ```

- ⏰ **Ustawienie maksymalnej długości historii:**

  ```toml
  max_history_size = 10000
  ```

-  **Ukrywanie prywatnych komend przed synchronizacją:**

  ```toml
  sync_filter = ["ssh", "scp"]
  ```

---

## ✅ Podsumowanie

Dzięki możliwościom personalizacji i analizy statystyk Atuin staje się nie tylko narzędziem do zarządzania historią terminala, ale także potężnym narzędziem do optymalizacji pracy. W kolejnym rozdziale dowiesz się, jak rozwiązywać najczęstsze problemy i jak dbać o bezpieczeństwo swojej historii komend.

➡️ **Przejdź do kolejnego rozdziału:** [ Problemy i debugowanie](/docs/atuin-kurs-wstep/atuin-kurs-problemy-debugowanie)
