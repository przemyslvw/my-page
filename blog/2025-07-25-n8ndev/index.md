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

<!-- Custom footnotes section to bypass Docusaurus's 30-footnote limit -->
<div class="footnotes">
  <h3>References</h3>
  <ol>
    <li id="fn1"><a href="https://docs.n8n.io/source-control-environments/understand/environments/" target="_blank" rel="noopener noreferrer">n8n Source Control Environments</a></li>
    <li id="fn2"><a href="https://docs.n8n.io/source-control-environments/" target="_blank" rel="noopener noreferrer">n8n Source Control Environments</a></li>
    <li id="fn3"><a href="https://docs.n8n.io/hosting/cli-commands/" target="_blank" rel="noopener noreferrer">n8n CLI Commands</a></li>
    <li id="fn4"><a href="https://community.n8n.io/t/how-do-you-disable-the-ui-when-running-in-docker/10104" target="_blank" rel="noopener noreferrer">Disable UI in Docker</a></li>
    <li id="fn5"><a href="https://nguyenthanhluan.com/en/glossary/deployment-environment-variables-en/" target="_blank" rel="noopener noreferrer">Deployment Environment Variables</a></li>
    <li id="fn6"><a href="https://docs.n8n.io/hosting/configuration/configuration-examples/encryption-key/" target="_blank" rel="noopener noreferrer">n8n Encryption Key</a></li>
    <li id="fn7"><a href="https://docs.n8n.io/hosting/installation/server-setups/docker-compose/" target="_blank" rel="noopener noreferrer">n8n Docker Compose</a></li>
    <li id="fn8"><a href="https://docs.n8n.io/source-control-environments/create-environments/" target="_blank" rel="noopener noreferrer">Create Environments</a></li>
    <li id="fn9"><a href="https://docs.n8n.io/source-control-environments/using/copy-work/" target="_blank" rel="noopener noreferrer">Copy Work</a></li>
    <li id="fn10"><a href="https://community.n8n.io/t/import-export-credentials/2172" target="_blank" rel="noopener noreferrer">Import/Export Credentials</a></li>
    <li id="fn11"><a href="https://community.n8n.io/t/encryption-key/29669" target="_blank" rel="noopener noreferrer">Encryption Key</a></li>
    <li id="fn12"><a href="https://www.pisugar.com/blogs/tutorial/hosting-n8n-on-raspberry-pi" target="_blank" rel="noopener noreferrer">Hosting n8n on Raspberry Pi</a></li>
    <li id="fn13"><a href="https://docs.n8n.io/hosting/securing/disable-public-api/" target="_blank" rel="noopener noreferrer">Disable Public API</a></li>
    <li id="fn14"><a href="https://docs.n8n.io/hosting/securing/telemetry-opt-out/" target="_blank" rel="noopener noreferrer">Telemetry Opt-out</a></li>
    <li id="fn15"><a href="https://github.com/n8n-io/n8n/issues/1546" target="_blank" rel="noopener noreferrer">n8n Issue #1546</a></li>
    <li id="fn16"><a href="https://community.n8n.io/t/credentials-export-import-bug/4399" target="_blank" rel="noopener noreferrer">Credentials Export/Import Bug</a></li>
    <li id="fn17"><a href="https://community.n8n.io/t/self-hosted-ai-starter-kit-error-message-mismatching-encryption-keys/56652" target="_blank" rel="noopener noreferrer">Self-Hosted AI Starter Kit Error</a></li>
    <li id="fn18"><a href="https://community.n8n.io/t/test-production-url-toggle-does-not-stay-in-production-working-in-n8n-io-in-the-browser/34224" target="_blank" rel="noopener noreferrer">Test Production URL Toggle</a></li>
    <li id="fn19"><a href="https://docs.n8n.io/hosting/configuration/configuration-examples/webhook-url/" target="_blank" rel="noopener noreferrer">n8n Webhook URL</a></li>
    <li id="fn20"><a href="https://community.n8n.io/t/how-to-change-webhook-url-for-self-host-n8n-npm-on-windows-10/23210" target="_blank" rel="noopener noreferrer">Change Webhook URL</a></li>
    <li id="fn21"><a href="https://community.n8n.io/t/issue-with-oauth-redirect-url-and-webhook-url-configuration-in-n8n-running-behind-nginx-reverse-proxy/68333" target="_blank" rel="noopener noreferrer">OAuth Redirect URL and Webhook URL Configuration</a></li>
    <li id="fn22"><a href="https://community.n8n.io/t/reverse-proxy-and-custom-webhook-domain-without-port/24072" target="_blank" rel="noopener noreferrer">Reverse Proxy and Custom Webhook Domain</a></li>
    <li id="fn23"><a href="https://github.com/n8n-io/n8n/issues/1449" target="_blank" rel="noopener noreferrer">n8n Issue #1449</a></li>
    <li id="fn24"><a href="https://docs.n8n.io/hosting/scaling/queue-mode/" target="_blank" rel="noopener noreferrer">n8n Queue Mode</a></li>
    <li id="fn25"><a href="https://www.hostinger.com/tutorials/n8n-queue-mode" target="_blank" rel="noopener noreferrer">n8n Queue Mode Tutorial</a></li>
    <li id="fn26"><a href="https://community.n8n.io/t/feature-to-restrict-webhook-url-for-n8n/14247" target="_blank" rel="noopener noreferrer">Restrict Webhook URL</a></li>
    <li id="fn27"><a href="https://community.n8n.io/t/queue-mode-main-process-worker-processes-on-same-machine/29724" target="_blank" rel="noopener noreferrer">Queue Mode Main Process Worker Processes</a></li>
    <li id="fn28"><a href="https://community.n8n.io/t/execute-one-workflow-instance-at-a-time/18618" target="_blank" rel="noopener noreferrer">Execute One Workflow Instance at a Time</a></li>
    <li id="fn29"><a href="https://community.n8n.io/t/several-n8n-instances-main-mode-on-kubernetes/15096" target="_blank" rel="noopener noreferrer">Several n8n Instances Main Mode on Kubernetes</a></li>
    <li id="fn30"><a href="https://community.n8n.io/t/can-i-run-multiple-instances-on-the-same-postgres-db/5524" target="_blank" rel="noopener noreferrer">Can I Run Multiple Instances on the Same Postgres DB</a></li>
    <li id="fn31"><a href="https://groovetechnology.com/blog/software-development/n8n-deployment-guide-how-to-set-up-scale-and-maintain-your-automation-infrastructure/" target="_blank" rel="noopener noreferrer">n8n Deployment Guide: How to Set Up, Scale, and Maintain Your Automation Infrastructure</a></li>
    <li id="fn32"><a href="https://osher.com.au/blog/guide-to-n8n-configuration-settings/" target="_blank" rel="noopener noreferrer">Guide to n8n Configuration Settings</a></li>
    <li id="fn33"><a href="https://github.com/n8n-io/n8n-nodes-starter" target="_blank" rel="noopener noreferrer">n8n Nodes Starter Kit</a></li>
    <li id="fn34"><a href="https://www.reddit.com/r/n8n/comments/1k47ats/n8n_best_practices_for_clean_profitable/" target="_blank" rel="noopener noreferrer">n8n Best Practices for Clean & Profitable Workflows</a></li>
    <li id="fn35"><a href="https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/" target="_blank" rel="noopener noreferrer">n8n Node Development Environment</a></li>
    <li id="fn36"><a href="https://www.youtube.com/watch?v=ASnwt2ilg28" target="_blank" rel="noopener noreferrer">n8n Development Environment Setup</a></li>
    <li id="fn37"><a href="https://community.n8n.io/t/how-to-setup-a-dev-environment-for-node-building/77150" target="_blank" rel="noopener noreferrer">How to Setup a Dev Environment for Node Building</a></li>
    <li id="fn38"><a href="https://docs.n8n.io/user-management/best-practices/" target="_blank" rel="noopener noreferrer">n8n User Management Best Practices</a></li>
    <li id="fn39"><a href="https://community.n8n.io/t/development-and-production-environments/59464" target="_blank" rel="noopener noreferrer">Development and Production Environments in n8n</a></li>
    <li id="fn40"><a href="https://www.youtube.com/watch?v=BvBa_npD4Og" target="_blank" rel="noopener noreferrer">n8n Configuration Guide</a></li>
    <li id="fn41"><a href="https://docs.n8n.io/hosting/configuration/environment-variables/deployment/" target="_blank" rel="noopener noreferrer">n8n Deployment Environment Variables</a></li>
    <li id="fn42"><a href="https://docs.n8n.io/embed/deployment/" target="_blank" rel="noopener noreferrer">n8n Embed Deployment Guide</a></li>
    <li id="fn43"><a href="https://community.n8n.io/t/development-environment/5283" target="_blank" rel="noopener noreferrer">n8n Development Environment</a></li>
    <li id="fn44"><a href="https://community.n8n.io/t/best-practices-for-multiple-environments-and-deployment/2263" target="_blank" rel="noopener noreferrer">Best Practices for Multiple Environments and Deployment</a></li>
    <li id="fn45"><a href="https://pixeljets.com/blog/n8n/" target="_blank" rel="noopener noreferrer">n8n Workflow Automation</a></li>
    <li id="fn46"><a href="https://blog.n8n.io/ai-orchestration/" target="_blank" rel="noopener noreferrer">AI Orchestration with n8n</a></li>
    <li id="fn47"><a href="https://community.n8n.io/t/how-to-run-development-environment/6696" target="_blank" rel="noopener noreferrer">How to Run Development Environment</a></li>
    <li id="fn48"><a href="https://community.n8n.io/t/bugs-n8n-import-and-export-cli-command/146968" target="_blank" rel="noopener noreferrer">n8n Import and Export CLI Command</a></li>
    <li id="fn49"><a href="https://docs.n8n.io/courses/level-one/chapter-6/" target="_blank" rel="noopener noreferrer">n8n Course: Level 1, Chapter 6</a></li>
    <li id="fn50"><a href="https://community.n8n.io/t/n8n-installation-script-for-raspberry-pi-n8n-pi/1392" target="_blank" rel="noopener noreferrer">n8n Installation Script for Raspberry Pi</a></li>
    <!-- Continue with remaining footnotes in the same format -->
  </ol>
</div>

<div style={{textAlign: "center"}}>⁂</div>