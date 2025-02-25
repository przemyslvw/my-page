---
id: "atuin-kurs-synchronizacja-bezpieczenstwo"
title: "☁️ Synchronizacja i bezpieczeństwo"
sidebar_position: 4
---

# ☁️ Synchronizacja i bezpieczeństwo

Jedną z najważniejszych funkcji Atuin jest możliwość **synchronizacji historii komend** między wieloma urządzeniami oraz zapewnienie wysokiego poziomu bezpieczeństwa danych dzięki szyfrowaniu. W tym rozdziale dowiesz się, jak skonfigurować synchronizację i zadbać o prywatność swojej historii terminala.

---

## 🌐 Synchronizacja z chmurą Atuin

Atuin umożliwia synchronizację historii z chmurą, co pozwala na dostęp do swojej historii z dowolnego urządzenia.

### ✅ **Krok 1: Rejestracja konta**

Aby rozpocząć synchronizację, zarejestruj konto w chmurze Atuin:

```bash
atuin register -u twoja_nazwa_uzytkownika -p twoje_haslo
```

### ✅ **Krok 2: Logowanie do konta**

Po rejestracji zaloguj się:

```bash
atuin login -u twoja_nazwa_uzytkownika -p twoje_haslo
```

### ✅ **Krok 3: Włączanie synchronizacji**

Po zalogowaniu Atuin automatycznie rozpocznie synchronizację historii. Aby ręcznie zsynchronizować dane, użyj:

```bash
atuin sync
```

---

## 🏡 Synchronizacja lokalna (Self-Hosted)

Jeśli nie chcesz korzystać z chmury Atuin, możesz postawić własny serwer do synchronizacji historii.

### ✅ **Krok 1: Pobierz i uruchom serwer Atuin**

1. Sklonuj repozytorium Atuin:

```bash
git clone https://github.com/ellie/atuin.git
cd atuin
```

2. Zbuduj serwer za pomocą Cargo:

```bash
cargo build --release
```

3. Uruchom serwer:

```bash
./target/release/atuin-server
```

### ✅ **Krok 2: Skonfiguruj klienta do pracy z własnym serwerem**

W pliku `~/.config/atuin/config.toml` dodaj:

```toml
sync_address = "http://adres.twojego.serwera:port"
```

---

## 🛡️ Szyfrowanie historii komend

Atuin automatycznie szyfruje historię komend przed wysłaniem jej do chmury lub własnego serwera.

### ✅ **Zmiana klucza szyfrowania**

1. Wygeneruj nowy klucz szyfrowania:

```bash
atuin key new
```

2. Aby zobaczyć aktualny klucz:

```bash
atuin key show
```

3. Jeśli chcesz użyć własnego klucza:

```bash
atuin key set <twój_klucz>
```

---

## 🔑 Uwierzytelnianie za pomocą kluczy API

Możesz wygenerować klucz API, aby autoryzować urządzenia bez podawania hasła.

### ✅ **Tworzenie klucza API:**

```bash
atuin api-key create --name "moj_laptop"
```

### ✅ **Używanie klucza API do logowania:**

```bash
atuin login --api-key <twój_klucz_api>
```

---

## 🧹 Usuwanie historii z chmury

Aby całkowicie usunąć historię z chmury Atuin:

```bash
atuin history clear --remote
```

Aby jednocześnie wyczyścić lokalną historię:

```bash
atuin history clear --remote --local
```

---

## ✅ Podsumowanie

Dzięki synchronizacji możesz mieć dostęp do swojej historii komend z różnych urządzeń, a wbudowane szyfrowanie zapewnia bezpieczeństwo Twoich danych. W kolejnych rozdziałach dowiesz się, jak jeszcze bardziej spersonalizować Atuin oraz jak korzystać z zaawansowanych funkcji.

➡️ **Przejdź do kolejnego rozdziału:** [📊 Statystyki i personalizacja](./statystyki-personalizacja.md)
