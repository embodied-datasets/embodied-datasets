# Decisions log

Short, dated notes on decisions that are not obvious from the code. Newest first.

## 2026-10-16 – Organization, protected main, PR previews

- **Hosting moved to the `embodied-datasets` GitHub organization** so that the site is not tied to a personal
  account and contributors can be given repository access without access to anyone's profile. The repository
  is renamed `embodied-datasets.github.io` so that the site is the organization site at
  `https://embodied-datasets.github.io/` (base path `/`); a custom domain later only needs the
  `SITE_URL` and `CUSTOM_DOMAIN` variables.
- **Publishing is gated by branch protection, not by ownership:** pull request + review required on `main`,
  the `validate` CI job as required check, CODEOWNERS for schema, vocabularies and site code.
- **Pages switched from Actions-artifact deploys to the `gh-pages` branch** because GitHub Pages serves one site
  per repository and PR previews need to coexist with it. Production is written to the branch root with
  `pr-preview/` excluded from cleaning; previews are written to `pr-preview/pr-<n>/` by `rossjrw/pr-preview-action`.
- **No previews for fork PRs** (would require `pull_request_target` with write permissions on untrusted code).
  Forks get their own Pages site instead; the workflows derive URLs from the fork owner.

## 2026-10-14 – Initial slice

- **Name:** "Embodied Datasets" (repository `embodied-datasets`), chosen over "Robot Datasets Wiki" because the
  repository already existed under that name; the schema carries `domain: driving` so robotics can be added later.
  Domain and organization names were not registered.
- **Scope of the first release:** exactly the datasets supported by py123d (16 records including CARLA as the
  synthetic generator and L3AD). Reason: each record gets a working loader, measured scale figures and sensor
  timeline figures for free, and the maintainer knows these datasets.
- **Generator:** plain Astro 7 with content collections (YAML validated by zod, Markdown prose joined by slug),
  hand-written CSS, Pagefind for search, build-time SVG for timeline, map and rig diagrams. Starlight was rejected
  because the wiki needs infoboxes, banners and comparison tables rather than a docs layout.
- **Records as YAML, one directory per dataset**, never a single `data.json` (merge conflicts, as in ad-datasets).
  JSON only for the exported schema and the `/export/` endpoints.
- **Strict schema:** unknown keys fail validation. Costs a little friction, catches typos in field names, which
  are the most common error in hand-written records.
- **Dates:** flexible precision (`YYYY`, `YYYY-MM`, `YYYY-MM-DD`) for releases and history, full ISO dates for
  verification. Bare years are accepted unquoted and normalised to strings.
- **Status vocabulary:** taken from the planning handoff, with `deprecated-but-downloadable` requiring at least
  one mirror and `superseded` requiring a successor (enforced by `scripts/validate.ts`).
- **Scale figures:** prefer py123d's measurements from the released data over official marketing numbers for
  consistency across the comparison table; the source is named per record.
- **Shortcodes** `{{ path }}` in `page.md` are resolved at build time; an unresolved shortcode fails the build.
  Bare numbers in prose are warnings only (`npm run lint:prose`), not errors.
- **Agent drafting:** all initial records were drafted by an agent with live checks of download pages, the
  Hugging Face API and the Wayback Machine on 2026-10-14; `verified_by: agent` and `curation.confidence` record
  this. Human confirmation is the next step.
- **PandaSet** is the reference case for "official source gone, mirrors exist": scale.com page 404 since late
  2025, pandaset.org domain repurposed, two unofficial mirrors permitted by CC BY 4.0.
- **Hosting:** GitHub Pages via Actions; the workflow derives `SITE_URL`/`SITE_BASE` from the repository so that
  forks work and a custom domain only needs repository variables.
- **Licences:** MIT for code, CC BY 4.0 for records.

## Open

- Verify the records with a human pass (release months, class counts, version history).
- Scheduled link checker with Wayback archiving, opening pull requests with evidence.
- Issue-triggered agent drafting of new records.
- Import of the ad-datasets catalogue as `unverified` records once the authors agree.
- Register org/domain names if the project is announced.
