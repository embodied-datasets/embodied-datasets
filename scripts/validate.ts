/**
 * Validate every record against the zod schemas and check cross-references.
 * Runs in plain Node (no Astro) so contributors and CI get fast feedback:
 *   node scripts/validate.ts
 * Exit code 1 on any error.
 */
import fs from 'node:fs';
import path from 'node:path';
import { load as loadYaml } from 'js-yaml';
import { DatasetSchema } from '../src/schema/dataset.ts';
import { FamilySchema } from '../src/schema/family.ts';
import { OrganizationSchema } from '../src/schema/organization.ts';

const root = process.cwd();
const errors: string[] = [];
const warnings: string[] = [];

function readYaml(file: string): unknown {
  try {
    return loadYaml(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    errors.push(`${rel(file)}: YAML parse error: ${(e as Error).message}`);
    return undefined;
  }
}
const rel = (f: string) => path.relative(root, f);

function formatIssues(issues: { path: PropertyKey[]; message: string }[]): string {
  return issues.map((i) => `  - ${i.path.map(String).join('.') || '(root)'}: ${i.message}`).join('\n');
}

// Organizations
const orgDir = path.join(root, 'organizations');
const orgs = new Map<string, unknown>();
for (const f of fs.readdirSync(orgDir).filter((f) => f.endsWith('.yaml'))) {
  const slug = f.replace(/\.yaml$/, '');
  const data = readYaml(path.join(orgDir, f));
  if (data === undefined) continue;
  const r = OrganizationSchema.safeParse(data);
  if (!r.success) errors.push(`organizations/${f}:\n${formatIssues(r.error.issues)}`);
  else orgs.set(slug, r.data);
}

// Families
const famDir = path.join(root, 'families');
const families = new Map<string, { organizations: string[] }>();
for (const f of fs.readdirSync(famDir).filter((f) => f.endsWith('.yaml'))) {
  const slug = f.replace(/\.yaml$/, '');
  const data = readYaml(path.join(famDir, f));
  if (data === undefined) continue;
  const r = FamilySchema.safeParse(data);
  if (!r.success) errors.push(`families/${f}:\n${formatIssues(r.error.issues)}`);
  else {
    families.set(slug, r.data);
    for (const o of r.data.organizations) if (!orgs.has(o)) errors.push(`families/${f}: unknown organization "${o}"`);
  }
}

// Datasets
const dsDir = path.join(root, 'datasets');
const datasets = new Map<string, ReturnType<typeof DatasetSchema.parse>>();
const slugs = fs.readdirSync(dsDir).filter((d) => fs.statSync(path.join(dsDir, d)).isDirectory());
for (const slug of slugs) {
  const file = path.join(dsDir, slug, 'dataset.yaml');
  if (!fs.existsSync(file)) {
    errors.push(`datasets/${slug}: missing dataset.yaml`);
    continue;
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push(`datasets/${slug}: directory name is not a valid slug`);
  const data = readYaml(file);
  if (data === undefined) continue;
  const r = DatasetSchema.safeParse(data);
  if (!r.success) {
    errors.push(`datasets/${slug}/dataset.yaml:\n${formatIssues(r.error.issues)}`);
    continue;
  }
  const d = r.data;
  datasets.set(slug, d);
  for (const o of d.organizations) if (!orgs.has(o)) errors.push(`datasets/${slug}: unknown organization "${o}"`);
  if (d.family && !families.has(d.family)) errors.push(`datasets/${slug}: unknown family "${d.family}"`);
  for (const [k, fig] of Object.entries(d.figures)) {
    if (fig && !fs.existsSync(path.join(dsDir, slug, fig.file)))
      errors.push(`datasets/${slug}: figure ${k} points to missing file ${fig.file}`);
  }
  if (d.curation.updated < d.curation.created) errors.push(`datasets/${slug}: curation.updated is before curation.created`);
  if (d.availability.last_verified > d.curation.updated)
    warnings.push(`datasets/${slug}: availability.last_verified is after curation.updated`);
  const needsMirrors = d.availability.status === 'deprecated-but-downloadable';
  if (needsMirrors && d.availability.mirrors.length === 0)
    errors.push(`datasets/${slug}: status deprecated-but-downloadable requires at least one mirror`);
  if (d.availability.status === 'superseded' && !d.availability.successor)
    errors.push(`datasets/${slug}: status superseded requires availability.successor`);
  const dup = new Set<string>();
  for (const s of d.sensors) for (const id of s.ids ?? []) {
    if (dup.has(id)) errors.push(`datasets/${slug}: sensor id ${id} listed twice`);
    dup.add(id);
  }
}

// Cross-record references (second pass)
for (const [slug, d] of datasets) {
  if (d.availability.successor && !datasets.has(d.availability.successor))
    errors.push(`datasets/${slug}: successor "${d.availability.successor}" has no record`);
  for (const r of d.relations) {
    if (!r.external && !datasets.has(r.target))
      errors.push(`datasets/${slug}: relation target "${r.target}" has no record (set external: true for datasets without a record)`);
  }
}
for (const [slug, fam] of families) {
  const members = [...datasets.values()].filter((d) => d.family === slug);
  if (members.length === 0) warnings.push(`families/${slug}.yaml: no dataset declares this family`);
}
for (const slug of orgs.keys()) {
  const used = [...datasets.values()].some((d) => d.organizations.includes(slug)) ||
    [...families.values()].some((f) => f.organizations.includes(slug));
  if (!used) warnings.push(`organizations/${slug}.yaml: not referenced by any dataset or family`);
}

for (const w of warnings) console.warn(`warning: ${w}`);
if (errors.length) {
  console.error(`\n${errors.length} error(s):\n`);
  for (const e of errors) console.error(`error: ${e}\n`);
  process.exit(1);
}
console.log(`ok: ${datasets.size} datasets, ${families.size} families, ${orgs.size} organizations validated` +
  (warnings.length ? ` (${warnings.length} warning(s))` : ''));
