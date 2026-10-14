# Notes for coding agents

This repository is a database of autonomous driving datasets rendered as a static site. Agents are welcome to
draft records, verify availability and fix the site. Humans review every pull request.

## Where things live

- `datasets/<slug>/dataset.yaml`: the record. Strict schema in `src/schema/dataset.ts` (zod); enumerations in
  `vocabularies/*.yaml`; a generated JSON Schema in `schema/dataset.schema.json`.
- `datasets/<slug>/page.md`: optional prose. Use `{{ field.path }}` shortcodes for every number.
- `families/`, `organizations/`: referenced by slug from records; `scripts/validate.ts` checks the references.
- `src/`: Astro 7 site. `src/content.config.ts` loads the YAML collections; pages live in `src/pages/`.

## Commands

```bash
npm install
npm run validate     # must pass before any commit touching data
npm run lint:prose   # warnings for bare numbers in prose
npm run schema       # regenerate schema/*.json after changing src/schema
npm run build        # full site build; fails on unresolved shortcodes
```

Node 24 is required; the scripts run TypeScript directly with Node's type stripping (no `enum`, no parameter
properties in scripts or `src/schema`).

## What counts as a source

- The dataset's own homepage, download page, paper or dataset card.
- A hosting API response, for example `https://huggingface.co/api/datasets/<id>` (`gated`, `private`, `lastModified`).
- An archived snapshot (`https://archive.org/wayback/available?url=<url>` or the CDX API) for anything historical.
- py123d documentation and its supported-datasets table for measured scale and sensor facts.

Record the URL in `sources` (field path to URL) or in `availability.evidence` (for status observations). Do not
invent values; leave a field out and mention the gap in `curation.notes`.

## What agents may and may not set

- May: draft complete records, set any status except `discontinued`, add evidence with `verified_by: agent`,
  add mirrors with `official: false`, fill `scale`, `sensors`, `annotations` from documentation, fix typos.
- Must leave to humans: `status: discontinued`, every `legal.permissions` interpretation that is not spelled out
  in the licence text, merging, schema and vocabulary changes.
- Always set `curation.confidence` honestly and list open questions in `curation.notes`.

## Style of the site

Plain Astro with hand-written CSS in `src/styles/global.css` (design tokens, light and dark mode). No UI framework.
Components are small; data access helpers are in `src/lib/data.ts`; `url()` in `src/lib/site.ts` prefixes the
GitHub Pages base path and must wrap every internal link.
