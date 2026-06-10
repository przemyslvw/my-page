---
id: "atuin-kurs-podstawowe-funkcje"
title: "🚀 Podstawowe funkcje Atuin"
sidebar_position: 3
---

# 🚀 Podstawowe funkcje Atuin

Po zainstalowaniu Atuin i przeprowadzeniu wstępnej konfiguracji, możesz w pełni wykorzystać jego możliwości. W tym rozdziale poznasz najważniejsze funkcje Atuin, które usprawnią Twoją pracę z terminalem.

---

## 🔎 Wyszukiwanie historii komend (Fuzzy Search)

Atuin umożliwia błyskawiczne przeszukiwanie historii komend za pomocą wyszukiwania typu **fuzzy**.

### ✅ **Jak uruchomić wyszukiwanie?**

1. W terminalu naciśnij skrót klawiszowy:
   ```
   Ctrl+R
   ```

2. Zacznij wpisywać fragment polecenia — Atuin automatycznie zaproponuje pasujące wpisy z historii.

3. Użyj strzałek `↑` i `↓`, aby poruszać się po wynikach.

4. Naciśnij `Enter`, aby zatwierdzić wybraną komendę.

###  **Przykład:**

Jeśli wpiszesz `git ch`, Atuin może zasugerować:

```bash
git checkout feature/nowa-funkcja
```

---

## 🕑 Filtrowanie według kontekstu czasowego

Atuin pozwala na przeszukiwanie historii z uwzględnieniem czasu wykonania komend.

### ✅ **Przykłady filtrowania:**

- Komendy z ostatniej godziny:
  ```bash
  atuin search --before "1 hour ago"
  ```

- Komendy z ostatnich 7 dni:
  ```bash
  atuin search --after "7 days ago"
  ```

- Komendy z określonego dnia:
  ```bash
  atuin search --after "2024-01-01" --before "2024-01-02"
  ```

---

##  Filtrowanie po katalogu roboczym

Często pracujesz nad wieloma projektami jednocześnie? Atuin pozwala filtrować historię komend na podstawie katalogu roboczego.

### ✅ **Przykład:**

Aby zobaczyć tylko komendy wykonane w bieżącym katalogu:

```bash
atuin search --cwd
```

---

## 🎨 Personalizacja Atuin

Plik konfiguracyjny Atuin znajduje się w:

```bash
~/.config/atuin/config.toml
```

Możesz w nim dostosować takie opcje jak:

- Zmiana skrótu klawiszowego (`Ctrl+R` → np. `Ctrl+T`)
- Domyślne filtry wyszukiwania
- Motyw kolorystyczny interfejsu

### ✅ **Przykład zmiany skrótu klawiszowego:**

W pliku `config.toml`:

```toml
keybinding = "Ctrl+T"
```

Po zapisaniu zmian uruchom ponownie terminal.

---

##  Statystyki użycia komend

Atuin umożliwia analizę najczęściej używanych komend:

```bash
atuin stats
```

Przykładowy wynik:

```
Najczęściej używane komendy:
1. git status     - 150 razy
2. ls -la         - 120 razy
3. docker ps      - 85 razy
4. cd /projekty   - 60 razy
```

---

## 🧹 Czyszczenie historii

Aby usunąć określoną komendę z historii:

```bash
atuin rm --id <ID_komendy>
```

Aby całkowicie wyczyścić historię:

```bash
atuin history clear
```

---

## 🚀 Pro Tipy

-  **Szybkie powtarzanie ostatnich komend:**  
  Wciśnij `Ctrl+R` i naciśnij `Enter` bez wpisywania frazy — uruchomi ostatnią komendę.

-  **Wyszukiwanie w określonym katalogu:**  
  ```bash
  atuin search --cwd /ścieżka/do/katalogu
  ```

- ⏰ **Filtrowanie po czasie i katalogu jednocześnie:**  
  ```bash
  atuin search --cwd --after "2 days ago"
  ```

---

## ✅ Podsumowanie

W tym rozdziale poznałeś najważniejsze funkcje Atuin — od wyszukiwania fuzzy po filtrowanie po katalogach i czasie. Dzięki nim praca z terminalem staje się szybsza, wygodniejsza i bardziej efektywna.

➡️ **Przejdź do kolejnego rozdziału:** [ Synchronizacja i bezpieczeństwo](/docs/atuin-kurs-wstep/atuin-kurs-synchronizacja-bezpieczenstwo)
