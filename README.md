# Embodied Datasets

**A community-maintained wiki of autonomous driving (and, later, robotics) datasets, with availability as a first-class, dated, evidence-backed field.**

Live site: https://embodied-datasets.github.io/

Datasets disappear quietly: download pages vanish, companies shut down, licences change. Survey papers and awesome-lists
capture a snapshot and rot. This repository keeps **one schema-validated record per dataset** (sensors, annotations,
maps, licences, scale) and, above all, a **status that says whether you can still get the data**, when that was last
checked, by whom, and with what evidence. The records are rendered into a static site with per-dataset pages, a
filterable comparison table, an availability report, family and organization pages, a release timeline, a world map
of recording sites and JSON/CSV exports.

The first release covers every dataset supported by [py123d](https://kesai.eu/py123d/), which gives each record a
working loader and measured scale figures.

## Repository layout

```
datasets/<slug>/dataset.yaml   # schema-validated facts, one file per dataset (the source of truth)
datasets/<slug>/page.md        # optional prose: overview, history, access tips, quirks
datasets/<slug>/assets/        # figures, e.g. sensor_timeline.svg
families/<slug>.yaml           # groups of related datasets (nuScenes, Waymo Open Dataset, ...)
organizations/<slug>.yaml      # creators and hosts; `defunct: true` is an availability risk signal
vocabularies/*.yaml            # controlled vocabularies: status, modalities, annotation types, ...
schema/*.schema.json           # generated JSON Schema (npm run schema) for editors and other tooling
src/                           # Astro site: schemas (zod), layout, components, pages
scripts/                       # validate.ts, lint-prose.ts, export-schema.ts (plain Node, no build needed)
docs/DECISIONS.md              # short decisions log
```

Rules that keep the data trustworthy:

- A number or URL lives only in `dataset.yaml`. Prose references it with shortcodes such as `{{ scale.hours }}`;
  a shortcode that does not resolve fails the build, and `npm run lint:prose` flags bare numbers.
- Unknown fields are rejected (strict schema), enumerations come from `vocabularies/`, and cross-references
  (families, organizations, successors, relations, figures) are checked by `npm run validate`.
- Every availability status carries `last_verified`, `verified_by` (human or agent) and at least one dated
  `evidence` entry. A dataset whose official source is gone keeps its `mirrors` and a dated `history`.
- A status change to `discontinued` and every licence interpretation are confirmed by a human.

## Working locally

Requirements: Node.js 24 or newer (the scripts run TypeScript directly).

```bash
npm install
npm run validate      # schema + cross-reference checks for all records (fast, no build)
npm run lint:prose    # warn about bare numbers in page.md files
npm run dev           # http://localhost:4321/embodied-datasets/
npm run build         # static site in dist/ plus the Pagefind search index
npm run preview
```

The site is served at the organization root because the repository is named `embodied-datasets.github.io`;
the deploy workflow sets `SITE_URL`/`SITE_BASE` from the owner and repository name (a fork becomes
`https://<you>.github.io/embodied-datasets.github.io/` automatically). Both can be overridden with repository variables.

## Deployment and previews

- **Production:** every push to `main` runs `.github/workflows/deploy.yml`, which validates, builds and publishes
  `dist/` to the `gh-pages` branch. GitHub Pages serves that branch (Settings → Pages → Source: *Deploy from a
  branch*, `gh-pages`, `/ (root)`). `main` is protected, so only reviewed pull requests reach the site.
- **Pull-request previews:** `.github/workflows/pr-preview.yml` builds every PR from a branch in this repository
  and publishes it to `https://embodied-datasets.github.io/pr-preview/pr-<number>/`, posts the
  link as a PR comment and removes the preview when the PR closes. PRs from forks are validated by `ci.yml`
  but not previewed, because that would run untrusted code with a write token.
- **Your own copy:** fork the repository and enable Pages on the fork (Source: *Deploy from a branch*,
  `gh-pages`). The workflows derive the site URL from the fork's owner and name, so
  `https://<you>.github.io/embodied-datasets.github.io/` works without changing anything.
- **Custom domain:** set the repository variables `SITE_URL` (e.g. `https://robotdatasets.wiki`),
  `SITE_BASE=/` and `CUSTOM_DOMAIN` (writes the `CNAME` file on every deploy).

## Adding or fixing a record

See [CONTRIBUTING.md](CONTRIBUTING.md) (humans) and [AGENTS.md](AGENTS.md) (coding agents). The short version:
copy an existing `datasets/<slug>/` directory, edit, run `npm run validate`, open a pull request. The
[Add dataset](https://github.com/embodied-datasets/embodied-datasets.github.io/issues/new?template=add-dataset.yml) issue template
is for requests without a record.

## Status

Milestone 1 of the [plan](docs/DECISIONS.md): site live with validated records and working filters.
Next: scheduled link checking with Wayback archiving, agent-drafted records from issues, import of the
ad-datasets catalogue marked as unverified.

## Licences

Records and exports: [CC BY 4.0](LICENSE-DATA.md). Code: [MIT](LICENSE). Sensor timeline figures: py123d (Apache 2.0).
The datasets themselves remain under their own licences, listed in each record.
