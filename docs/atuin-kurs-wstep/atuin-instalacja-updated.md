---
id: "atuin-kurs-instalacja"
title: " Instalacja Atuin"
sidebar_position: 2
---

#  Instalacja Atuin

## 🔹 Wymagania systemowe

Przed rozpoczęciem instalacji upewnij się, że Twój system spełnia poniższe wymagania:

- **Linux** (Ubuntu, Debian, Fedora, Arch i inne)
- **macOS** (macOS 10.15 lub nowszy)
- **Windows** (WSL lub natywna instalacja przez PowerShell)
- **Powłoki:** `bash`, `zsh`, `fish`, `PowerShell`
- **Rust** w wersji **1.82.0** lub nowszej (jeśli instalujesz przez Cargo)

---

## 🐧 Instalacja na Linuxie

### ✅ **Metoda 1: Instalacja przez skrypt (dla większości dystrybucji)**

```bash
curl -sSL https://github.com/ellie/atuin/releases/latest/download/install.sh | bash
```

### ✅ **Metoda 2: Instalacja przez menedżera pakietów**

**Debian/Ubuntu:**

```bash
sudo apt update
sudo apt install atuin
```

**Fedora:**

```bash
sudo dnf install atuin
```

**Arch Linux (AUR):**

```bash
yay -S atuin
```

### ✅ **Metoda 3: Instalacja przez Cargo (dla użytkowników Rust)**

1. **Ustaw domyślną wersję Rust:**

```bash
rustup default stable
```

2. **Zainstaluj Atuin przez Cargo:**

```bash
cargo install atuin
```

**❗ Jeśli używasz starszej wersji Rust (np. 1.75.0), zainstaluj starszą wersję Atuin:**

```bash
cargo install atuin --version 18.2.0
```

3. **Sprawdź wersję Atuin:**

```bash
atuin --version
```

---

## 🍏 Instalacja na macOS

### ✅ **Metoda 1: Homebrew**

```bash
brew install atuin
```

### ✅ **Metoda 2: MacPorts**

```bash
sudo port install atuin
```

---

## 🏁 Instalacja na Windows

### ✅ **Metoda 1: WSL (Windows Subsystem for Linux)**

1. Zainstaluj WSL i wybierz dystrybucję (np. Ubuntu).
2. W WSL uruchom komendę:

```bash
curl -sSL https://github.com/ellie/atuin/releases/latest/download/install.sh | bash
```

3. Dodaj Atuin do swojej powłoki (`bash` lub `zsh`):

```bash
atuin init bash | tee -a ~/.bashrc
source ~/.bashrc
```

### ✅ **Metoda 2: Natywna instalacja przez PowerShell**

1. Jeśli masz zainstalowany **Scoop**, użyj komendy:

```powershell
scoop install atuin
```

2. Alternatywnie, użyj **winget**:

```powershell
winget install atuin
```

3. Możesz także pobrać binarkę z [GitHub Releases](https://github.com/ellie/atuin/releases) i dodać ją do zmiennych środowiskowych `PATH`.

---

## 🔗 **Pierwsze uruchomienie i konfiguracja**

1. **Zainicjalizuj Atuin** dla swojej powłoki:

```bash
atuin init bash | tee -a ~/.bashrc
source ~/.bashrc
```

Dla innych powłok:

- `atuin init zsh | tee -a ~/.zshrc`
- `atuin init fish | tee -a ~/.config/fish/config.fish`
- `atuin init powershell | Out-File -Append $PROFILE`

2. **Zaimportuj istniejącą historię komend:**

```bash
atuin import auto
```

3. **Przetestuj wyszukiwanie:**

Naciśnij `Ctrl+R` w terminalu i wyszukaj komendy z historii przy użyciu fuzzy search.

---

##  **Sprawdzanie wersji i aktualizacja**

Aby sprawdzić zainstalowaną wersję Atuin:

```bash
atuin --version
```

Aby zaktualizować Atuin do najnowszej wersji:

```bash
cargo install atuin --force
```

---

## 🚀 Co dalej?

Atuin jest już gotowy do użycia! W kolejnych rozdziałach dowiesz się, jak korzystać z podstawowych funkcji, takich jak wyszukiwanie historii, personalizacja oraz synchronizacja danych między urządzeniami.

➡️ **Przejdź do kolejnego rozdziału:** [🚀 Podstawowe funkcje Atuin](/docs/atuin-kurs-wstep/atuin-kurs-podstawowe-funkcje)
