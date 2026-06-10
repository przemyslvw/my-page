---
id: "atuin-kurs-problemy-debugowanie"
title: " Problemy i debugowanie"
sidebar_position: 6
---

#  Problemy i debugowanie

Podczas korzystania z Atuin mogą pojawić się drobne problemy lub błędy związane z konfiguracją, synchronizacją czy kompatybilnością z powłoką terminala. W tym rozdziale znajdziesz najczęstsze problemy oraz sprawdzone metody ich rozwiązania.

---

##  Najczęstsze problemy i ich rozwiązania

### ❓ **Problem: Skrót `Ctrl+R` nie działa**

**Przyczyna:**  
Konflikt skrótów klawiszowych lub brak inicjalizacji Atuin w pliku konfiguracyjnym powłoki.

**Rozwiązanie:**  
1. Upewnij się, że Atuin został poprawnie zainicjalizowany:
   ```bash
   atuin init bash | tee -a ~/.bashrc
   source ~/.bashrc
   ```

2. Jeśli używasz innej powłoki:
   - **Zsh:**  
     ```bash
     atuin init zsh | tee -a ~/.zshrc
     source ~/.zshrc
     ```
   - **Fish:**  
     ```bash
     atuin init fish | tee -a ~/.config/fish/config.fish
     ```

3. Zmień skrót w pliku `~/.config/atuin/config.toml`, jeśli konfliktuje z innym narzędziem:
   ```toml
   keybinding = "Ctrl+T"
   ```

---

### ❓ **Problem: Synchronizacja nie działa**

**Przyczyna:**  
Brak połączenia z serwerem Atuin lub nieprawidłowa konfiguracja synchronizacji.

**Rozwiązanie:**
1. Sprawdź połączenie z serwerem:
   ```bash
   atuin sync
   ```

2. Upewnij się, że dane logowania są poprawne:
   ```bash
   atuin login -u twoja_nazwa_uzytkownika -p twoje_haslo
   ```

3. Jeśli korzystasz z własnego serwera, sprawdź ustawienia w `config.toml`:
   ```toml
   sync_address = "http://adres.twojego.serwera:port"
   ```

---

### ❓ **Problem: Duplikaty w historii komend**

**Przyczyna:**  
Zdarza się podczas migracji historii z innego narzędzia lub po wielokrotnym imporcie danych.

**Rozwiązanie:**
```bash
atuin history deduplicate
```

---

### ❓ **Problem: Znikające komendy z historii**

**Przyczyna:**  
Niektóre komendy mogą być automatycznie filtrowane lub oznaczone jako prywatne.

**Rozwiązanie:**
1. Sprawdź ustawienia filtra w `config.toml`:
   ```toml
   history_filter = ["password", "token", "secret"]
   ```

2. Usuń lub zmodyfikuj filtry, aby umożliwić zapisywanie określonych komend.

---

## 🐞 Debugowanie Atuin

### ✅ **Tryb debugowania**

Aby zobaczyć szczegółowe logi i błędy, uruchom Atuin w trybie debugowania:

```bash
RUST_LOG=debug atuin search
```

### ✅ **Sprawdzanie wersji i aktualizacji**

1. Sprawdź aktualną wersję Atuin:
   ```bash
   atuin --version
   ```

2. Zaktualizuj Atuin do najnowszej wersji:
   ```bash
   cargo install atuin --force
   ```

---

## ♻️ Przywracanie domyślnych ustawień

Jeśli chcesz zresetować konfigurację Atuin do ustawień fabrycznych:

1. Usuń plik konfiguracyjny:
   ```bash
   rm ~/.config/atuin/config.toml
   ```

2. Zainicjalizuj ponownie Atuin:
   ```bash
   atuin init bash | tee -a ~/.bashrc
   source ~/.bashrc
   ```

---

## ✅ Podsumowanie

W tym rozdziale poznaliśmy najczęstsze problemy związane z działaniem Atuin i sposoby ich rozwiązywania. Dzięki prostym komendom i trybowi debugowania można szybko zdiagnozować i naprawić większość usterek.

➡️ **Przejdź do kolejnego rozdziału:** [ Podsumowanie kursu](/docs/atuin-kurs-wstep/atuin-kurs-podsumowanie)
