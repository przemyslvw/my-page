---
id: "atuin-kurs-konfiguracja"
title: " Zaawansowana konfiguracja Atuin"
sidebar_position: 8
---

#  Zaawansowana konfiguracja Atuin

W tym rozdziale poznasz szczegółowe ustawienia **Atuin**, które pozwolą Ci dostosować narzędzie do Twojego stylu pracy. Skonfigurujemy **synchronizację**, **filtry historii**, **tryby wyszukiwania** oraz **motywy**.

---

##  **Optymalna konfiguracja Atuin**

Jeśli chcesz mieć w pełni zoptymalizowaną wersję Atuin, oto rekomendowana konfiguracja pliku:

```bash
nano ~/.config/atuin/config.toml
```

🔹 **Wklej poniższą konfigurację:**

```toml
#  Zapisywanie katalogów w historii
record_cwd = true

#  Automatyczna synchronizacja historii
auto_sync = true
sync_frequency = "0" # Synchronizacja po każdej komendzie

#  Domyślny tryb filtrowania (historia tylko z danego katalogu)
filter_mode = "directory"
filters = [ "directory", "session", "host", "global", "workspace" ]

#  Uruchamianie demona Atuin (szybsza synchronizacja)
enabled = true
sync_frequency = 300 # Demon synchronizuje co 5 minut

# 🎨 Motyw kolorystyczny
name = "autumn"

#  Tryb wyszukiwania (lepsze dopasowanie)
search_mode = "fuzzy"
show_preview = true

# ❌ Wyłączenie zbędnych opcji debugowania
debug = false
systemd_socket = false
```

📌 **Po zapisaniu pliku uruchom ponownie powłokę:**
```bash
exec bash  # lub exec zsh
```

Teraz Atuin **będzie działał szybciej, przechowa katalogi i efektywniej wyszuka historię**! 🚀

---

## 🏷️ **Organizowanie historii za pomocą tagów**
Atuin nie ma wbudowanych zakładek, ale możesz **grupować komendy**, dodając **tagi** na końcu każdej komendy.

### ✅ **Dodawanie tagów**
Po prostu dodaj `#` z opisem na końcu komendy:

```bash
sudo apt update #linux
ng serve --open #angular
Get-Process | Select-Object Name, Id #powershell
```

### 🔎 **Wyszukiwanie historii według tagów**
Jeśli chcesz zobaczyć tylko konkretne komendy, użyj:

```bash
atuin search #linux
atuin search #angular
atuin search #powershell
```

Teraz Atuin pokaże tylko komendy z danej kategorii! 

---

## 📑 **Tworzenie aliasów do wyszukiwania grup komend**
Jeśli często wyszukujesz określone grupy, możesz utworzyć aliasy:

```bash
alias history_linux="atuin search #linux"
alias history_powershell="atuin search #powershell"
alias history_angular="atuin search #angular"
```

Teraz wystarczy wpisać:

```bash
history_linux
```

Aby zobaczyć wszystkie komendy związane z **Linuxem**! 🚀

---

## 🏗 **Tworzenie własnych list komend**
Jeśli chcesz **zachować ulubione komendy** w pliku:

1. Utwórz katalog:
   ```bash
   mkdir -p ~/.atuin_aliases
   ```

2. Stwórz plik dla danej kategorii:
   ```bash
   nano ~/.atuin_aliases/linux.txt
   ```

3. Dodaj tam ulubione komendy:
   ```
   sudo apt update
   sudo apt upgrade
   systemctl restart networking
   ```

4. Aby wyświetlić zapisane komendy:
   ```bash
   cat ~/.atuin_aliases/linux.txt
   ```

---

## ✅ **Podsumowanie**

- **Konfiguracja Atuin** pozwala na **lepszą synchronizację, szybsze wyszukiwanie i zapisywanie katalogów**.
- **Tagowanie komend** (`#linux`, `#angular`, `#powershell`) pozwala szybko filtrować historię.
- **Alias dla grup komend** (`history_linux`) sprawia, że wyszukiwanie jest jeszcze prostsze.
- **Pliki tekstowe z listami komend** pomagają przechowywać najważniejsze polecenia.

Dzięki tym ustawieniom Twój terminal będzie jeszcze bardziej efektywny! 🚀

