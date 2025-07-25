---
slug: n8ndev-2025-07-25
title: "Rozdzielone środowiska n8n w sieci lokalnej – przewodnik najlepszych praktyk"
authors: [przemyslvw]
tags: ["automation", "n8n", "raspberry-pi", "ci-cd"]
date: "2025-07-25"
---

Pierwsza zasada stabilnej automatyzacji brzmi: **Projektuj i testuj w bezpiecznym miejscu, a produkcję trzymaj z dala od klawiatury dewelopera**. W przypadku n8n najprostszy sposób to uruchomić edytor z UI na komputerze stacjonarnym (Windows / Linux), a gotowe, aktywne workflow wykonywać na Raspberry Pi pracującym w trybie headless. Poniższy przewodnik krok po kroku pokazuje, jak zbudować taką infrastrukturę, jak przenosić workflow oraz poświadczenia, a także jak zadbać o bezpieczeństwo i utrzymanie[^1][^2].

<!-- truncate -->

## 1. Koncepcja i architektura rozdzielonych środowisk

W proponowanym układzie każda maszyna pełni wyraźnie określoną rolę:

* **Dev PC** – pełny edytor n8n z interfejsem graficznym, konteneryzowany w Dockerze; lokalna baza SQLite lub PostgreSQL na potrzeby testów.
* **Git / CLI** – repozytorium (np. GitLab CE) oraz CLI n8n do eksportu-importu workflow i credentiali[^3].
* **Raspberry Pi** – pojedyncza instancja n8n uruchamiana jako usługa systemd lub kontener Docker-Compose, pozbawiona UI (N8N_DISABLE_UI=true)[^4][^5]; stały klucz szyfrowania oraz wolumeny Docker zabezpieczają dane[^6][^7].

![Local development–production separation for n8n: design on desktop, deploy to Raspberry Pi via Git/CLI.](/img/blog/n8ndev.png)

Local development–production separation for n8n: design on desktop, deploy to Raspberry Pi via Git/CLI.

## 2. Środowisko deweloperskie – komputer Windows / Linux

### 2.1 Instalacja i konfiguracja

1. Zainstaluj Docker Desktop lub Podman.
2. Utwórz katalog projektu i plik `compose.yaml` w wersji uproszczonej:

```yaml
services:
  n8n-dev:
    image: n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - ./data:/home/node/.n8n
    environment:
      - GENERIC_TIMEZONE=Europe/Warsaw
      - N8N_EDITOR_BASE_URL=http://localhost:5678
```

Domyślna konfiguracja UI pozwala bezpiecznie testować lokalnie[^7].

### 2.2 Kontrola wersji i migracje

* W edycji **Enterprise** możesz skorzystać z funkcji *Source Control* i powiązać instancję z gałęzią Git; n8n przechowuje wtedy kopie workflow w repozytorium[^1][^8][^9].
* W licencji OSS najprościej użyć **CLI**:

```bash
n8n export:workflow --backup --output=./backups/workflows --separate --pretty
n8n export:credentials --backup --decrypted --output=./backups/creds
```

Polecenia tworzą czytelne pliki JSON gotowe do commitowania[^3][^10].


### 2.3 Stały klucz szyfrowania

Aby przy przenoszeniu credentiali uniknąć błędu *“Credentials could not be decrypted”*, ustaw zmienną `N8N_ENCRYPTION_KEY` zarówno w dev, jak i prod – najlepiej wygenerowaną raz losową wartość base64[^6][^11].

## 3. Środowisko produkcyjne – Raspberry Pi headless

### 3.1 Instalacja systemd lub Docker-Compose

Na Raspberry Pi (64-bit, Debian/Ubuntu) wykonaj:

```bash
sudo apt update && sudo apt install -y docker docker-compose
sudo usermod -aG docker pi
```

Następnie sklonuj plik `compose.yaml` (przykład z traefik + PostgreSQL)[^12][^7]:

```yaml
services:
  n8n:
    image: n8nio/n8n:latest
    restart: unless-stopped
    environment:
      - N8N_DISABLE_UI=true
      - N8N_ENCRYPTION_KEY=${N8N_ENCRYPTION_KEY}
      - WEBHOOK_URL=https://pi.local/webhook/
      - N8N_HOST=pi.local
      - N8N_PROTOCOL=https
      - EXECUTIONS_MODE=queue
      - QUEUE_BULL_REDIS_HOST=redis
    volumes:
      - ./data:/home/node/.n8n
    networks: [backend]
  redis:
    image: redis:7-alpine
    networks: [backend]
networks:
  backend:
```

* `N8N_DISABLE_UI` usuwa frontend z produkcji, zmniejszając powierzchnię ataku[^4][^5].
* Ten sam klucz szyfrowania gwarantuje poprawny import poświadczeń[^11].


### 3.2 Uruchomienie i hardening

1. `docker compose up -d` – instancja startuje w tle.
2. Zablokuj port 5678 w zapórze, otwórz tylko 443 (reverse proxy) i 22 (SSH).
3. Włącz zmienne `N8N_PUBLIC_API_DISABLED=true` i `N8N_DIAGNOSTICS_ENABLED=false`, jeżeli nie potrzebujesz publicznego API ani telemetrii[^13][^14].

## 4. Transfer workflow i poświadczeń

### 4.1 Eksportowanie w środowisku dev

```bash
n8n export:workflow --backup --output=dist/workflows --separate --pretty
n8n export:credentials --backup --decrypted --output=dist/creds
```

Flagę `--decrypted` można stosować tylko wtedy, gdy docelowa instancja ma **ten sam** `N8N_ENCRYPTION_KEY`; inaczej import się nie powiedzie[^15][^16][^17].

### 4.2 Import na Raspberry Pi

Kopiujemy pliki (np. `scp`) i wykonujemy w kontenerze:

```bash
docker exec -u node -it rpi_n8n n8n import:credentials --separate --input=/files/creds
docker exec -u node -it rpi_n8n n8n import:workflow   --separate --input=/files/workflows
```

n8n aktywuje domyślnie webhooki w trybie **production**, więc nie trzeba ręcznie przełączać URL-i[^18].

## 5. Konfiguracja WEBHOOK_URL i reverse proxy

n8n buduje adres webhooku z kombinacji `N8N_PROTOCOL`, `N8N_HOST` i `N8N_PORT`; za reverse proxy port 5678 jest niewidoczny, dlatego dodaj `WEBHOOK_URL=https://pi.local/`[^19][^20][^21]. Używasz Nginx Proxy Manager? Utwórz dwa vhosty:


| Host | Zastosowanie | Nagłówek `proxy_set_header Host` |
| :-- | :-- | :-- |
| `devpc.local:5678` | UI w sieci deweloperskiej | `localhost` |
| `https://pi.local` | Produkcyjne webhooki | `pi.local` |

Takie przekierowanie rozwiązuje problem „localhost:5678” w callbackach OAuth[^22][^23].

## 6. Bezpieczeństwo i utrzymanie

1. **Aktualizacje** – kontenery n8n aktualizują się bezboleśnie; sprawdź changelog i przed aktualizacją zrób `docker compose pull && docker compose up -d`[^7].
2. **Backup** – raz dziennie kopiuj wolumen `/home/node/.n8n` oraz bazę Postgres/SQlite; wbudowany CLI ma flagę `--backup`[^3].
3. **Monitoring** – w queue mode sprawdzaj metryki Redis i czas wykonania; dzięki `DB_POSTGRESDB_POOL_SIZE` i `--concurrency` możesz regulować liczbę równoległych zadań[^24][^25].
4. **Ograniczenia sieci** – produkcyjny serwer powinien przyjmować ruch tylko z zaufanych podsieci i od reverse proxy; reguły iptables/ufw oraz ACL w NGINX skutecznie blokują nieautoryzowany dostęp[^26].

## 7. Skalowanie i wydajność

Dla większej liczby aktywnych workflow uruchom Raspberry Pi w **queue mode** i dodaj kolejny kontener worker (`n8n worker --concurrency=2`), pozostawiając dev-PC wyłącznie jako edytor[^27][^28]. Współużytkowanie bazy danych przez wiele instancji main nie jest wspierane – zmiany statusu workflow propagują się dopiero po restarcie[^29][^30].

## 8. Podsumowanie

Oddzielenie edytora od środowiska produkcyjnego pozwala:

* **zminimalizować ryzyko** – UI znikające z produkcji to mniej ataków i przypadkowych zmian[^4].
* **ułatwić migracje** – CLI plus wspólny klucz szyfrowania przenoszą workflow i credentiale w ciągu sekund[^3][^10].
* **skalować** – Raspberry Pi może działać jako worker w kolejce, a cięższe testy zostają na PC[^24].

Stosując powyższe praktyki, zyskujesz solidny, lekki i w pełni kontrolowany system automatyzacji w sieci lokalnej – dokładnie taki, jakiego wymaga produkcyjny workflow.

<div style="text-align: center">⁂</div>

[^1]: https://docs.n8n.io/source-control-environments/understand/environments/

[^2]: https://docs.n8n.io/source-control-environments/

[^3]: https://docs.n8n.io/hosting/cli-commands/

[^4]: https://community.n8n.io/t/how-do-you-disable-the-ui-when-running-in-docker/10104

[^5]: https://nguyenthanhluan.com/en/glossary/deployment-environment-variables-en/

[^6]: https://docs.n8n.io/hosting/configuration/configuration-examples/encryption-key/

[^7]: https://docs.n8n.io/hosting/installation/server-setups/docker-compose/

[^8]: https://docs.n8n.io/source-control-environments/create-environments/

[^9]: https://docs.n8n.io/source-control-environments/using/copy-work/

[^10]: https://community.n8n.io/t/import-export-credentials/2172

[^11]: https://community.n8n.io/t/encryption-key/29669

[^12]: https://www.pisugar.com/blogs/tutorial/hosting-n8n-on-raspberry-pi

[^13]: https://docs.n8n.io/hosting/securing/disable-public-api/

[^14]: https://docs.n8n.io/hosting/securing/telemetry-opt-out/

[^15]: https://github.com/n8n-io/n8n/issues/1546

[^16]: https://community.n8n.io/t/credentials-export-import-bug/4399

[^17]: https://community.n8n.io/t/self-hosted-ai-starter-kit-error-message-mismatching-encryption-keys/56652

[^18]: https://community.n8n.io/t/test-production-url-toggle-does-not-stay-in-production-working-in-n8n-io-in-the-browser/34224

[^19]: https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url/

[^20]: https://community.n8n.io/t/how-to-change-webhook-url-for-self-host-n8n-npm-on-windows-10/23210

[^21]: https://community.n8n.io/t/issue-with-oauth-redirect-url-and-webhook-url-configuration-in-n8n-running-behind-nginx-reverse-proxy/68333

[^22]: https://community.n8n.io/t/reverse-proxy-and-custom-webhook-domain-without-port/24072

[^23]: https://github.com/n8n-io/n8n/issues/1449

[^24]: https://docs.n8n.io/hosting/scaling/queue-mode/

[^25]: https://www.hostinger.com/tutorials/n8n-queue-mode

[^26]: https://community.n8n.io/t/feature-to-restrict-webhook-url-for-n8n/14247

[^27]: https://community.n8n.io/t/queue-mode-main-process-worker-processes-on-same-machine/139263

[^28]: https://community.n8n.io/t/execute-one-workflow-instance-at-a-time/18618

[^29]: https://community.n8n.io/t/several-n8n-instances-main-mode-on-kubernetes/15096

[^30]: https://community.n8n.io/t/can-i-run-multiple-instances-on-the-same-postgres-db/5524

[^31]: https://groovetechnology.com/blog/software-development/n8n-deployment-guide-how-to-set-up-scale-and-maintain-your-automation-infrastructure/

[^32]: https://osher.com.au/blog/guide-to-n8n-configuration-settings/

[^33]: https://github.com/n8n-io/n8n-nodes-starter

[^34]: https://www.reddit.com/r/n8n/comments/1k47ats/n8n_best_practices_for_clean_profitable/

[^35]: https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/

[^36]: https://www.youtube.com/watch?v=ASnwt2ilg28

[^37]: https://community.n8n.io/t/how-to-setup-a-dev-environment-for-node-building/77150

[^38]: https://docs.n8n.io/user-management/best-practices/

[^39]: https://community.n8n.io/t/development-and-production-environments/59464

[^40]: https://www.youtube.com/watch?v=BvBa_npD4Og

[^41]: https://docs.n8n.io/hosting/configuration/environment-variables/deployment/

[^42]: https://docs.n8n.io/embed/deployment/

[^43]: https://community.n8n.io/t/development-environment/5283

[^44]: https://community.n8n.io/t/best-practices-for-multiple-environments-and-deployment/2263

[^45]: https://pixeljets.com/blog/n8n/

[^46]: https://blog.n8n.io/ai-orchestration/

[^47]: https://community.n8n.io/t/how-to-run-development-environment/6696

[^48]: https://community.n8n.io/t/bugs-n8n-import-and-export-cli-command/146968

[^49]: https://docs.n8n.io/courses/level-one/chapter-6/

[^50]: https://community.n8n.io/t/n8n-installation-script-for-raspberry-pi-n8n-pi/1392

[^51]: https://github.com/n8n-io/n8n/issues/7881

[^52]: https://community.n8n.io/t/cli-exporting-decrypted-credentials-with-authentication/103024

[^53]: https://www.youtube.com/watch?v=MD4_RgcyCNk

[^54]: https://n8n.io/integrations/browserless/and/headless-testing/

[^55]: https://www.reddit.com/r/n8n/comments/1kuuym3/run_n8n_on_a_raspberry_pi_5_10_min_setup/

[^56]: https://community.n8n.io/t/export-credentials/22211

[^57]: https://community.n8n.io/t/error-when-using-cli-to-import-workflows/49584

[^58]: https://www.youtube.com/watch?v=9Po584wKXAM

[^59]: https://mathias.rocks/blog/2024-09-19-how-to-install-n8n-on-raspberry-pi

[^60]: https://community.n8n.io/t/cli-export-credentials/27109

[^61]: https://community.n8n.io/t/import-workflow-through-cli-in-n8n/34122

[^62]: https://community.n8n.io/t/disable-the-annoying-connect-a-trigger-to-run-this-node/109374

[^63]: https://www.youtube.com/watch?v=uUrkH2FSSbg

[^64]: https://community.n8n.io/t/problem-with-encryption-key/24687

[^65]: https://thewebsiteengineer.com/blog/how-to-run-n8n-with-docker-compose-to-use-custom-npm-modules/

[^66]: https://github.com/danilopinotti/n8n-docker

[^67]: https://www.reddit.com/r/selfhosted/comments/1ixu23e/n8n_alternative_with_a_free_software_license_such/

[^68]: https://www.gptbots.ai/blog/n8n-alternatives

[^69]: https://github.com/n8n-io/n8n/issues/12949

[^70]: https://osher.com.au/blog/how-to-host-n8n-with-docker/

[^71]: https://www.rayven.io/n8n-alternatives

[^72]: https://github.com/n8n-io/n8n/issues/15491

[^73]: https://community.n8n.io/t/encryption-key-not-persisting/32347

[^74]: https://docs.n8n.io/hosting/configuration/configuration-methods/

[^75]: https://www.oneskyapp.com/blog/n8n-alternatives/

[^76]: https://www.reddit.com/r/n8n/comments/1l7x6k3/can_i_use_a_single_n8n_startup_license_for/

[^77]: https://www.linkedin.com/posts/alexanderkim_clone-n8n-workflows-between-instances-using-activity-7303299164497420288-yzYx

[^78]: https://community.n8n.io/t/self-hosted-ai-starter-kit-error-message-mismatching-encryption-keys/56652/4

[^79]: https://community.n8n.io/t/how-to-export-all-my-workflows/9012

[^80]: https://n8n.io/workflows/3048-clone-n8n-workflows-between-instances-using-n8n-api/

[^81]: https://www.tva.sg/fixing-n8n-webhook-problems-the-complete-troubleshooting-guide-for-self-hosted-instances/

[^82]: https://www.youtube.com/watch?v=sm9x55k90F0

[^83]: https://community.n8n.io/t/cli-backup-import-errors/51259

[^84]: https://docs.n8n.io/workflows/export-import/

[^85]: https://www.linkedin.com/pulse/14-environment-variables-later-my-n8n-webhook-finally-magdy-mba-8hnnf

[^86]: https://community.n8n.io/t/export-credientials-encrypted/50549

[^87]: https://community.n8n.io/t/webhook-url-not-working/57451

[^88]: https://community.n8n.io/t/change-webhook-url-doesnt-work/69666

[^89]: https://community.n8n.io/t/n8n-queue-mode-with-workers-pointing-to-multiple-editors/29724

[^90]: https://devsnit.com/en/n8n-workflows-and-credentials-migration-tutorial/

[^91]: https://community.n8n.io/t/credentials-transfer-using-dumped-sql-table/125766

[^92]: https://github.com/community-scripts/ProxmoxVE/issues/2554

[^93]: https://community.n8n.io/t/ui-doesnt-work-properly-without-javascript-enabled-pleaseenable-it-to-continue/71038

[^94]: https://community.n8n.io/t/n8n-behind-nginx-reverse-proxy/134875

[^95]: https://docs.n8n.io/embed/configuration/

[^96]: https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/

[^97]: https://community.n8n.io/t/setup-a-webhook-url-in-n8n-running-on-docker-desktop-linux/33058

[^98]: https://community.n8n.io/t/disabling-the-ratings-ui/62635

[^99]: https://community.n8n.io/t/environment-variable-to-specify-webhook-test-domain/14140

