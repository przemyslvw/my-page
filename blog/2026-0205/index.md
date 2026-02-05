---
slug: black-hat-bash
title: "Black Hat Bash: Jak zamienić terminal w centrum dowodzenia cyberbezpieczeństwem (Recenzja i Przykłady)"
authors: [przemyslvw]
tags: ["cybersecurity", "secops", "bash-scripting", "black-hat-bash", "port-scanning", "rustscan", "automation", "red-teaming"]
date: "2026-02-05"
---


W świecie cyberbezpieczeństwa, zdominowanym przez drogiego oprogramowania EDR, SIEM i skanery podatności napędzane przez AI, łatwo zapomnieć o narzędziu, które jest dostępne na każdym systemie Linux od dekad. Mowa o Bashu.
Właśnie skończyłem lekturę "Black Hat Bash" (Dolev Farhi & Nick Aleks) i muszę przyznać: to nie jest kolejny podręcznik dla początkujących uczący komendy ls. To podręcznik taktycznej automatyzacji dla pentesterów i zespołów Red/Blue Team. Autorzy pokazują, jak przestać być biernym operatorem narzędzi, a stać się architektem własnych rozwiązań.
<!-- truncate -->

Oto dlaczego ta książka jest kluczowa dla specjalistów SecOps w 2025 roku i kilka technicznych przykładów tego, czego się z niej nauczysz.

## 1. Filozofia "Cyfrowego Hydraulika"

Kluczowym przesłaniem książki jest umiejętność łączenia narzędzi (piping). Zamiast ręcznie przeglądać wyniki z Nmapa, RustScana czy Nuclei, książka uczy, jak parsować dane w locie.

Bash posiada trzy standardowe strumienie danych: wejście (stdin), wyjście (stdout) i błędy (stderr). Prawdziwa magia dzieje się, gdy przekierowujemy wyjście jednego narzędzia bezpośrednio na wejście drugiego.

Przykład z książki: Szybkie czyszczenie wyników Nmapa

Zamiast czytać surowy output Nmapa, możemy jednym poleceniem wyciągnąć tylko żywe hosty w sieci. Autorzy pokazują, jak połączyć `grep` i `awk` do natychmiowej ekstrakcji IP:

```bash
nmap -sn 172.16.10.0/24 | grep "Nmap scan" | awk -F'report for ' '{print $2}'
```

To polecenie wykonuje "ping sweep" (-sn), filtruje linie zawierające raport skanowania, a następnie używa `awk` do wycięcia samego adresu IP. To prosty, ale potężny blok budulcowy do większych skryptów.

## 2. Automatyzacja Skanowania Podatności (Nuclei + Bash)

Książka poświęca sporo miejsca nowoczesnym skanerom, takim jak Nuclei. Nuclei jest świetne, ale ręczne uruchamianie go dla setek hostów jest stratą czasu.

"Black Hat Bash" uczy, jak zamknąć Nuclei w pętli `while` lub `for`, aby automatycznie skanować całe podsieci i filtrować wyniki pod kątem krytyczności.

Przykład skryptu: Możemy napisać skrypt, który iteruje przez listę adresów IP, uruchamia Nuclei w trybie cichym (`-silent`), a następnie parsuje wynik, aby wysłać powiadomienie tylko wtedy, gdy znajdzie podatność o statusie "medium", "high" lub "critical":

```bash
# Fragment logiki ze strony 389
result=$(nuclei -u "${ip_address}" -silent -severity medium,high,critical)

if [[ -n "${result}" ]]; then
    # Logika wysyłania powiadomienia lub logowania
    echo "Znaleziono krytyczną podatność na ${ip_address}!"
fi
```

Dzięki temu, zamiast tonąć w logach, otrzymujesz precyzyjne informacje tylko wtedy, gdy jest to konieczne.

## 3. Budowanie "Watchdogów" – Monitorowanie w czasie rzeczywistym

To moim zdaniem najciekawsza koncepcja w książce, idealna dla dynamicznych środowisk chmurowych w 2025 roku. Watchdog to skrypt działający w nieskończonej pętli, który monitoruje zasób i reaguje na zmianę jego stanu.

Zamiast skanować sieć raz dziennie, możesz napisać skrypt, który co 5 sekund sprawdza, czy na danym serwerze otworzył się konkretny port. Jeśli tak – natychmiast uruchamia głębokie skanowanie usług.

Przykład Watchdoga (uproszczony): Skrypt wykorzystuje ultra-szybki RustScan do ciągłego odpytywania hosta. Dopiero gdy port zostanie wykryty, uruchamiany jest `nmap -sV` w celu identyfikacji wersji usługi.

```bash
while true; do
    # Sprawdź czy port jest otwarty używając RustScan
    port_scan=$("${RUST_SCAN_BIN}" -a "${IP_ADDRESS}" -g -p "${WATCHED_PORT}")
    
    if [[ -n "${port_scan}" ]]; then
        echo "Port ${WATCHED_PORT} został otwarty! Uruchamiam Nmap..."
        nmap -sV -p "${WATCHED_PORT}" "${IP_ADDRESS}" >> watchdog.log
        break # Przerwij pętlę po wykryciu
    else
        sleep 5 # Czekaj 5 sekund przed kolejnym sprawdzeniem
    fi
done
```

To podejście, opisane szczegółowo w rozdziale 4, pozwala wykryć "okna serwisowe" lub błędy konfiguracji, które trwają zaledwie kilka minut i umknęłyby standardowym audytom.

## 4. Parsowanie JSON i analiza technologii

Współczesny web hacking to często analiza JSON-ów. Książka świetnie wprowadza w użycie narzędzia `jq` w połączeniu z Wappalyzerem lub Gitjackerem.

Autorzy pokazują, jak wyciągnąć konkretne wersje oprogramowania z outputu Wappalyzera, co pozwala na błyskawiczne sprawdzenie, czy wersja np. Pythona lub serwera Apache jest podatna na ataki, bez konieczności ręcznego przeklikiwania się przez przeglądarkę.

## Podsumowanie

"Black Hat Bash" to pozycja obowiązkowa, jeśli chcesz:

- Zrozumieć, jak działają potoki (pipelines) i przekierowania.
- Pisać własne narzędzia do Reconu, zamiast polegać na gotowcach.
- Zautomatyzować nudne zadania i skupić się na analizie.

W 2025 roku umiejętność szybkiego napisania "one-linera" w Bashu, który przeanalizuje logi lub przeskanuje sieć, nadal będzie supermocą, której nie zastąpi żadne GUI.

---

> Źródło: Wszystkie przykłady i koncepcje pochodzą z książki "Black Hat Bash" autorstwa Dolev Farhi & Nick Aleks.