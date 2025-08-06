---
slug: yubikey-na-fedora
title: "Kompleksowy przewodnik konfiguracji YubiKey na Fedora Linux"
authors: [przemyslvw]
tags: ["yubikey", "fedora", "linux", "security"]
date: "2025-08-06"
---

YubiKey to uniwersalne urządzenie bezpieczeństwa, które może znacznie zwiększyć ochronę systemu Linux. Ten przewodnik przedstawia wszystkie aspekty konfiguracji YubiKey na Fedora, od podstawowej instalacji po zaawansowane scenariusze użytkowania.

## Wprowadzenie do YubiKey

YubiKey to fizyczny token bezpieczeństwa, który łączy w sobie kilka technologii uwierzytelniania:

- **FIDO U2F/FIDO2** - nowoczesne standardy uwierzytelniania
- **OTP (One-Time Password)** - jednorazowe hasła
- **PIV (Personal Identity Verification)** - przechowywanie certyfikatów i kluczy prywatnych
- **OpenPGP** - szyfrowanie i podpisy cyfrowe
- **OATH** - kompatybilność z TOTP/HOTP (Google Authenticator, itd.)


### Ograniczenia pamięci YubiKey

Każdy moduł ma swoje limity przechowywania:[^1]

- **OTP** - nielimitowane (jeden sekret na klucz)
- **FIDO U2F** - nielimitowane (jeden sekret na klucz)
- **FIDO2** - 25 poświadczeń
- **OATH** - 32 poświadczenia
- **PIV** - 24 certyfikaty X.509 z kluczami prywatnymi
- **OpenPGP** - 3 klucze (szyfrowanie, podpisywanie, uwierzytelnianie)


## Instalacja podstawowych pakietów

### Dla wszystkich funkcji

```bash
# Podstawowe narzędzia YubiKey
sudo dnf install yubikey-manager yubikey-manager-qt

# Dla uwierzytelniania PAM (starsze klucze bez FIDO2)
sudo dnf install pam_yubico

# Dla uwierzytelniania FIDO U2F/FIDO2
sudo dnf install pam-u2f pamu2fcfg

# Dla obsługi OpenPGP/smartcard
sudo dnf install pcsc-lite

# Dla SSH z PKCS#11
sudo dnf install opensc

# GUI do personalizacji (starsze narzędzie)
sudo dnf install yubikey-personalization-gui
```


### Uruchamianie usług

```bash
# Uruchomienie usługi smartcard
sudo systemctl enable --now pcscd
```


## Konfiguracja uwierzytelniania systemowego (PAM)

### Metoda 1: FIDO U2F/FIDO2 (zalecana dla nowych kluczy)

**Krok 1: Rejestracja klucza**

```bash
# Utworzenie katalogu
mkdir -p ~/.config/Yubico

# Rejestracja pierwszego klucza
pamu2fcfg > ~/.config/Yubico/u2f_keys

# Dodanie zapasowego klucza (zalecane!)
pamu2fcfg -n >> ~/.config/Yubico/u2f_keys
```

**Krok 2: Konfiguracja plików PAM**

Utwórz pliki konfiguracyjne w `/etc/pam.d/`:

```bash
# /etc/pam.d/u2f-required
#%PAM-1.0
auth required pam_u2f.so

# /etc/pam.d/u2f-sufficient  
#%PAM-1.0
auth sufficient pam_u2f.so
```


### Metoda 2: YubiCloud OTP (starsze klucze)

**Krok 1: Rejestracja klucza**

```bash
# Utworzenie katalogu
mkdir -p ~/.yubico

# Naciśnij YubiKey, aby uzyskać OTP - pierwsze 12 znaków to ID klucza
echo "fedora-user:cccccbcgebif" > ~/.yubico/authorized_keys
```

**Krok 2: Konfiguracja PAM** (wymaga API key od Yubico)[^2]

```bash
# /etc/pam.d/yubikey-required
#%PAM-1.0  
auth required pam_yubico.so id=[Your API Client ID] key=[Your API Client Key]

# /etc/pam.d/yubikey-sufficient
#%PAM-1.0
auth sufficient pam_yubico.so id=[Your API Client ID] key=[Your API Client Key]
```


### Metoda 3: Challenge-Response (offline)

**Krok 1: Konfiguracja YubiKey**

```bash
# Aktywacja challenge-response w slocie 2 (wymaga dotyku)
ykman otp chalresp --generate --touch 2

# Rejestracja klucza dla użytkownika
ykpamcfg -2
```

**Krok 2: Konfiguracja PAM**

```bash
# /etc/pam.d/yubikey-required
#%PAM-1.0
auth required pam_yubico.so mode=challenge-response

# /etc/pam.d/yubikey-sufficient  
#%PAM-1.0
auth sufficient pam_yubico.so mode=challenge-response
```


## Konfiguracja konkretnych usług

### Sudo z YubiKey

**Opcja A: Wymaga hasła + YubiKey (2FA)**

```bash
# Edytuj /etc/pam.d/sudo
sudo visudo /etc/pam.d/sudo

# Dodaj AFTER linii "auth substack system-auth":
auth include u2f-required

# lub yubikey-required dla OTP
```

**Opcja B: Tylko YubiKey (1FA)**

```bash
# Dodaj BEFORE linii "auth substack system-auth":
auth include u2f-sufficient
```

**Konfiguracja cache sudo** (rozwiązanie problemu z powtarzającym się żądaniem YubiKey):

```bash
# Edytuj sudoers
sudo visudo

# Dodaj na końcu pliku:
Defaults timestamp_timeout=15      # Cache na 15 minut
Defaults timestamp_timeout=-1      # Cache do końca sesji terminala  
Defaults timestamp_type=global     # Wspólny cache dla wszystkich terminali (opcjonalnie)
```


### Login GDM/graficzny

**Metoda authselect (zalecana)**[^3]

```bash
# Sprawdzenie aktualnego profilu
sudo authselect current

# Włączenie U2F dla profilu sssd
sudo authselect select sssd with-pam-u2f

# Lub dla profilu local
sudo authselect select local with-pam-u2f

# Zastosowanie zmian
sudo authselect apply-changes
```

**Metoda manualna** (edycja `/etc/pam.d/gdm-password`):

```bash
# Dodaj BEFORE "auth substack password-auth":
auth include u2f-sufficient

# Lub AFTER dla 2FA:
auth include u2f-required
```


### Login konsolowy

```bash
# Edytuj /etc/pam.d/login
# Dodaj przed "auth substack system-auth":
auth include u2f-sufficient
```


### SSH z YubiKey

**Opcja A: FIDO2 SSH keys (nowoczesne)**

```bash
# Generowanie klucza wymagającego obecności YubiKey
ssh-keygen -t ed25519-sk

# Generowanie klucza rezydentnego (przenośnego)
ssh-keygen -t ed25519-sk -O resident -O application=ssh:fedora -O verify-required

# Kopiowanie klucza publicznego na serwer
ssh-copy-id -i ~/.ssh/id_ed25519_sk.pub user@server
```

**Opcja B: PIV/PKCS\#11 (starsze klucze)**

```bash
# Generowanie klucza w module PIV
ykman piv keys generate --algorithm ED25519 --pin-policy ONCE --touch-policy ALWAYS 9a public.pem

# Tworzenie certyfikatu
ykman piv certificates generate --subject "CN=OpenSSH" --hash-algorithm SHA384 9a public.pem

# Eksport klucza publicznego
ssh-keygen -D /usr/lib64/libykcs11.so -e

# Logowanie z PKCS#11
ssh -I /usr/lib64/libykcs11.so user@server
```


## Konfiguracja OpenPGP/GPG

### Instalacja i przygotowanie

```bash
# Instalacja wymaganych pakietów (jeśli nie zainstalowano wcześniej)
sudo dnf install pcsc-lite gnupg2

# Uruchomienie usługi
sudo systemctl enable --now pcscd

# Sprawdzenie połączenia z kartą
gpg --card-status
```


### Podstawowa konfiguracja GPG

```bash
# Utwórz plik konfiguracyjny scdaemon
echo "disable-ccid" >> ~/.gnupg/scdaemon.conf

# Restart agenta GPG
gpg-connect-agent reloadagent /bye
```


### Zmiana PIN-ów PIV

```bash
# Zmiana PIN-u użytkownika (domyślnie: 123456)
ykman piv access change-pin

# Zmiana PUK (domyślnie: 12345678)  
ykman piv access change-puk

# Zmiana klucza zarządzania
ykman piv access change-management-key --generate --protect
```


### Konfiguracja dotykania dla operacji OpenPGP

```bash
# Wymaganie dotyku dla podpisywania
ykman openpgp keys set-touch sig on

# Wymaganie dotyku dla szyfrowania  
ykman openpgp keys set-touch dec on

# Wymaganie dotyku dla uwierzytelniania
ykman openpgp keys set-touch aut on
```


## OATH/TOTP (Google Authenticator replacement)

### Instalacja aplikacji

```bash
# Aplikacja desktopowa
sudo dnf install yubioath-desktop

# Lub użyj Yubico Authenticator z oficjalnej strony
```


### Zarządzanie kontami TOTP

```bash
# Ustawienie hasła dla aplikacji OATH
ykman oath access change

# Zapamiętanie hasła (żeby nie pytało za każdym razem)
ykman oath access remember

# Dodanie konta TOTP  
ykman oath accounts add google <TOTP_SECRET>

# Generowanie kodu
ykman oath accounts code google

# Lista wszystkich kont
ykman oath accounts list

# Usuwanie konta
ykman oath accounts delete google
```


## Zaawansowane konfiguracje

### Blokowanie ekranu po wyjęciu YubiKey

```bash
# Utwórz regułę udev w /etc/udev/rules.d/85-yubikey-lock.rules
ACTION=="remove", ENV{ID_BUS}=="usb", ENV{ID_MODEL_ID}=="0407", ENV{ID_VENDOR_ID}=="1050", RUN+="/usr/bin/loginctl lock-sessions"

# Przeładuj reguły
sudo udevadm control --reload
```


### Konfiguracja różnych trybów dla różnych usług

**Przykład: Password + YubiKey dla sudo, tylko YubiKey dla terminala**

```bash
# /etc/pam.d/sudo - 2FA
auth substack system-auth
auth include u2f-required

# /etc/pam.d/login - 1FA  
auth include u2f-sufficient
auth substack system-auth
```


### Cache i timeout konfiguracja

```bash
# W /etc/sudoers (visudo):
Defaults timestamp_timeout=900     # 15 minut cache
Defaults passwd_timeout=5          # 5 sekund na wprowadzenie hasła
Defaults passwd_tries=3            # 3 próby wprowadzenia hasła
```


## Rozwiązywanie problemów

### Sprawdzanie statusu YubiKey

```bash
# Podstawowe informacje
ykman info

# Status wszystkich aplikacji  
ykman --list

# Status karty OpenPGP
gpg --card-status

# Status FIDO2
ykman fido info

# Logi PAM
journalctl -f | grep pam
```


### Typowe problemy

**Problem: YubiKey nie jest rozpoznawany**[^4]

```bash
# Sprawdź czy zainstalowany pcsc-lite
sudo dnf install pcsc-lite
sudo systemctl restart pcscd

# Sprawdź uprawnienia
ls -la /dev/bus/usb/
```

**Problem: GPG nie widzi YubiKey**

```bash
# Sprawdź scdaemon
echo "disable-ccid" >> ~/.gnupg/scdaemon.conf
gpg-connect-agent "scd serialno" "scd learn" /bye
```

**Problem: Sudo przy każdym użyciu wymaga YubiKey**

```bash
# Ustaw timestamp_timeout w sudoers
echo "Defaults timestamp_timeout=900" | sudo tee -a /etc/sudoers
```


## Backup i bezpieczeństwo

### Konfiguracja zapasowego klucza

Zawsze konfiguruj drugi YubiKey jako backup:[^1][^2]

```bash
# Dla U2F - dodaj drugi klucz
pamu2fcfg -n >> ~/.config/Yubico/u2f_keys

# Dla OTP - dodaj ID drugiego klucza
echo "fedora-user:cccccbcgebif:dddddddddddd" > ~/.yubico/authorized_keys

# Dla SSH - wygeneruj klucze na obu urządzeniach
ssh-keygen -t ed25519-sk    # Na pierwszym kluczu
ssh-keygen -t ed25519-sk    # Na zapasowym kluczu
```


### Testowanie konfiguracji

**ZAWSZE testuj w drugim terminalu przed zamknięciem bieżącego!**

```bash
# Test sudo w nowym terminalu
sudo echo "test"

# Test logowania w nowej sesji SSH
ssh localhost

# Test logowania GDM - zablokuj i odblokuj ekran
```


## Podsumowanie

YubiKey oferuje wielopoziomową ochronę systemu Fedora Linux. Najważniejsze zalecenia:

1. **Zawsze konfiguruj zapasowy klucz** - hardware token może się zepsuć lub zgubić
2. **Testuj każdą zmianę** w osobnej sesji przed zamknięciem obecnej
3. **Używaj FIDO2** dla nowych kluczy (bezpieczniejsze i wygodniejsze)
4. **Konfiguruj cache sudo** - unikniesz frustracji z ciągłym dotykaniem klucza
5. **Regularnie twórz kopie zapasowe** konfiguracji PAM i plików autoryzacji

Dzięki odpowiedniej konfiguracji YubiKey może znacznie zwiększyć bezpieczeństwo bez nadmiernego wpływu na wygodę użytkowania. Kluczem jest znalezienie równowagi między bezpieczeństwem a praktycznością dla konkretnego środowiska i przypadku użycia.

[^1]: https://docs.fedoraproject.org/en-US/quick-docs/using-yubikeys/

[^2]: https://discussion.fedoraproject.org/t/how-to-configure-yubico-key-for-system-login/154317

[^3]: https://devblog.jpcaparas.com/use-your-yubikey-as-a-system-level-authentication-pam-module-on-fedora-40-457ae7375254

[^4]: https://solenberg.dev/yubikey-setup/

[^5]: https://www.linkedin.com/pulse/yubikey-2fa-fedora-39-magnus-glantz-9tcyf

[^6]: https://fedoramagazine.org/use-fido-u2f-security-keys-with-fedora-linux/

[^7]: https://221b.uk/using-yubikey-as-factor-in-linux-pam

[^8]: https://www.yubico.com/support/download/yubikey-manager/

[^9]: https://fedoramagazine.org/how-to-use-a-yubikey-with-fedora-linux/

[^10]: https://www.cyberciti.biz/security/how-to-set-up-ssh-keys-with-yubikey-as-two-factor-authentication-u2f-fido2/

[^11]: https://www.reddit.com/r/Fedora/comments/xd32z6/login_with_yubikey_instead_of_password/

[^12]: https://www.cyberciti.biz/faq/how-to-install-yubikey-manager-gui-on-linux/

[^13]: https://www.procustodibus.com/blog/2023/04/how-to-set-up-a-yubikey/

[^14]: https://oitkb.siu.edu/knowledge-base/yubikey-hardware-instructions-linux/

[^15]: https://221b.uk/exploring-use-of-yubikeys-in-fedora-linux

[^16]: https://fedoramagazine.org/how-to-use-authselect-to-configure-pam-in-fedora-linux/

[^17]: https://discussion.fedoraproject.org/t/complete-fido2-integration-with-fedora-42-luks2-unlock-gui-login-and-sudo-auth/153942

[^18]: https://discussion.fedoraproject.org/t/pam-u2f-module-dont-work-after-the-first-log-in-using-yubikey/146919

[^19]: https://github.com/Zer0CoolX/Fedora-KDE-Yubikey-U2F-2FA-Logins-Guide

[^20]: https://docs.yubico.com/software/yubikey/tools/ykman/Install_ykman.html

[^21]: https://developers.yubico.com/pam-u2f/

[^22]: https://docs.yubico.com/yesdk/users-manual/application-oath/oath-use-case.html

[^23]: https://github.com/drduh/YubiKey-Guide

[^24]: https://riedstra.dev/2021/08/pgp-yubikey

[^25]: https://docs.yubico.com/software/yubikey/tools/authenticator/auth-guide/oath.html

[^26]: https://www.reddit.com/r/yubikey/comments/w6v4o0/using_yubikey_for_ssh_always_asking_for_password/

[^27]: https://fedoramagazine.org/using-the-yubikey4-with-fedora/

[^28]: https://support.yubico.com/hc/en-us/articles/360015669179-Using-YubiKeys-with-Microsoft-Entra-ID-MFA-OATH-TOTP

[^29]: https://docs.fedoraproject.org/en-US/quick-docs/create-gpg-keys/

[^30]: https://developers.yubico.com/OATH/OATH_Walk-Through.html

[^31]: https://discussion.fedoraproject.org/t/gpg-agent-and-yubikey/83741

[^32]: https://docs.secureauth.com/0903/en/yubikey-oath-totp-device-provisioning-and-multi-factor-authentication-guide.html

[^33]: https://support.yubico.com/hc/en-us/articles/360013790259-Using-Your-YubiKey-with-OpenPGP

[^34]: https://www.youtube.com/watch?v=kDw0S2SxLa4

[^35]: https://rynkowski.pl/en/posts/setup-of-yubikey-pgp-module/

<div style={{textAlign: "center"}}>⁂</div>