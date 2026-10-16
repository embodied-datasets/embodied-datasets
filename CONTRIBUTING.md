# Contributing

Thank you for helping keep track of driving datasets. Everything on the site is generated from the YAML files in
this repository, so every contribution is a pull request against a small, readable file.

## Ways to contribute

1. **Verify an availability status.** Open the dataset's page, click "Edit on GitHub", check the download page or
   hosting API yourself and update `availability.last_verified`, set `verified_by: human`, and add an `evidence`
   entry with the URL, the date, the HTTP status if you have it and one sentence on what you saw. Add a Wayback
   Machine snapshot (`https://web.archive.org/save/<url>` creates one) when you can.
2. **Fix a fact.** Change the field, add or update the matching entry in `sources`, bump `curation.updated` and add
   yourself to `curation.contributors`.
3. **Add a dataset.** Create `datasets/<slug>/dataset.yaml` (copy a similar record), optionally `page.md`, and the
   `organizations/` and `families/` records it references.
4. **Request a dataset** you cannot write up yourself with the "Add dataset" issue template.

## Before you open a pull request

```bash
npm install
npm run validate      # schema + cross-references; must pass
npm run lint:prose    # bare numbers in page.md; warnings, please fix the obvious ones
npm run build         # catches unresolved shortcodes and rendering errors
```

CI runs the same commands. A record that does not validate cannot be merged. For pull requests from branches in
this repository a preview of the whole site is published automatically and linked in a comment on the PR.

## Record conventions

- **Slugs** are lowercase letters, digits and hyphens: `nuscenes`, `av2-sensor`, `wod-perception`.
- **Dates** may be `YYYY`, `YYYY-MM` or `YYYY-MM-DD` for release and history dates. Verification and evidence
  dates are always full ISO dates.
- **Numbers and URLs live in `dataset.yaml`**, never in prose. In `page.md` write `{{ scale.logs }}` instead of
  the number; paths follow the YAML structure (`{{ availability.download_size.compressed_gb }}`,
  `{{ sensors.0.count }}`). The build fails on a shortcode that does not resolve.
- **Scale figures:** prefer values measured from the released data (for instance py123d's table) over marketing
  numbers; record which in `sources` and mention computed values in `scale.notes`.
- **Flow-style YAML** (`{ a: 1, b: two }`) is fine, but quote any value that contains a comma or a colon.
- **Sensors:** one entry per sensor group. Include the py123d IDs in `ids` when known; they draw the rig diagram.
- **Statuses** come from `vocabularies/status.yaml`:
  - `available`: public download, no account.
  - `available-registration`: free after creating an account or accepting terms (gated Hugging Face with automatic approval included).
  - `available-application`: manual approval, academic-only programmes.
  - `partially-available`: parts withdrawn.
  - `deprecated-but-downloadable`: official source gone, mirrors listed in the record (required).
  - `discontinued`: not obtainable anywhere known. Needs a human and a linked announcement or first failing snapshot.
  - `superseded`: withdrawn in favour of a successor (`availability.successor` required).
  - `unverified`: nobody has checked yet.
- **Licences:** use SPDX identifiers where they exist (`CC-BY-NC-SA-4.0`, `MIT`, `Apache-2.0`), otherwise a short
  custom id, and link the licence text. The `permissions` block is a plain-language reading, not legal advice;
  leave a permission out rather than guess.
- **Confidence and notes:** use `curation.confidence` and `curation.notes` to tell reviewers what to double-check.

## Vocabularies and schema changes

Adding a value to `vocabularies/*.yaml` or a field to `src/schema/*.ts` is a separate pull request from data
changes. Run `npm run schema` and commit the regenerated `schema/*.json`. Keep fields that can actually be filled.

## Code of conduct

Be kind, cite your sources, and assume that dataset authors are doing their best under constraints you cannot see.
