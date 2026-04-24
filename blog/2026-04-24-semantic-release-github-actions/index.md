---
slug: semantic-release-github-actions
title: "Automatyzacja wydań i changeloga: Semantic Release + GitHub Actions"
authors: [przemyslvw]
tags: [devops, automation, cicd, git, github-actions, semantic-release]
date: "2026-04-24"
---

Ręczne zarządzanie wersjonowaniem (SemVer) i pisanie notatek do wydań (changelog) to procesy podatne na błędy i niepotrzebnie angażujące czas dewelopera. W podejściu **Automation First** proces ten powinien dziać się "w tle". Poniżej przedstawiam implementację w pełni zautomatyzowanego potoku CI/CD opartego o `semantic-release` oraz GitHub Actions.

<!-- truncate -->

## Architektura procesu Release

Proces opiera się na analizie historii Git i standardzie **Conventional Commits**. System automatycznie decyduje, czy zmiana wymaga podbicia wersji i jakiej klasy będzie to zmiana (major, minor czy patch).

### Kluczowe składowe konfiguracji

Sercem rozwiązania jest plik `.releaserc.json`. Konfiguracja ta zapewnia analizę commitów i generowanie notatek bez ryzyka konfliktów z uprawnieniami gałęzi chronionych.

```json
{
  "branches": ["master"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github"
  ]
}
```

**Dlaczego brak wtyczki `@semantic-release/git`?**
W wielu projektach produkcyjnych gałąź `master` jest objęta **Branch Protection**. Automatyczne commitowanie pliku `CHANGELOG.md` z powrotem do repozytorium wymagałoby obejścia tych zabezpieczeń lub użycia kluczy z uprawnieniami administratora. Zamiast tego, dynamiczny changelog trafia bezpośrednio do zakładki **Releases** na GitHubie, co jest rozwiązaniem czystszym i bezpieczniejszym (**Secure by Design**).

## Workflow GitHub Actions

Proces jest wyzwalany automatycznie po każdym scaleniu kodu (merge) do gałęzi `master`.

```yaml
name: Release
on:
  push:
    branches:
      - master

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'

      - name: Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release
```

## Jak system oblicza wersję (SemVer)?

Narzędzie skanuje commity od ostatniego taga i mapuje ich typy na schemat **Semantic Versioning**:

| Typ Commita | Wynikowy wzrost wersji | Przykład |
| :--- | :--- | :--- |
| `fix:` | **Patch** | 1.0.0 -> 1.0.1 |
| `feat:` | **Minor** | 1.0.0 -> 1.1.0 |
| `BREAKING CHANGE:` | **Major** | 1.0.0 -> 2.0.0 |

Jeśli commit nie spełnia standardu Conventional Commits (np. "update readme"), `semantic-release` zignoruje go, a nowa wersja nie zostanie wydana.

## Korzyści z wdrożenia

1.  **Single Source of Truth:** Notatki o zmianach w zakładce Releases są zawsze aktualne i generowane automatycznie na podstawie `release-notes-generator`.
2.  **Automatyczny Deployment:** Utworzenie nowego taga przez GitHub Actions może wyzwalać kolejny etap pipeline'u (np. `deploy-production.yml`), co domyka cykl Continuous Delivery.
3.  **Dyscyplina w zespole:** Wymuszenie standardu wiadomości commitów poprawia czytelność historii projektu i ułatwia onboarding nowych deweloperów.

## Podsumowanie i zasady współpracy

Aby system działał bezawaryjnie, każdy deweloper musi stosować się do prostej konwencji:
* `feat(ui): dodano tryb ciemny`
* `fix(api): poprawiono walidację tokena`
* `docs: aktualizacja instrukcji wdrożenia`

Wdrożenie tego procesu eliminuje "human error" z procesu release managementu i pozwala skupić się na dostarczaniu kodu, a nie na zarządzaniu tagami.