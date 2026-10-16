/**
 * Export the zod schemas as JSON Schema (draft 2020-12) into /schema, so editors and
 * non-JavaScript tooling can validate records without Astro.
 *   node scripts/export-schema.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { z } from 'astro/zod';
import { DatasetSchema } from '../src/schema/dataset.ts';
import { FamilySchema } from '../src/schema/family.ts';
import { OrganizationSchema } from '../src/schema/organization.ts';

const out = path.resolve(process.cwd(), 'schema');
fs.mkdirSync(out, { recursive: true });

const entries: [string, z.ZodType, string][] = [
  ['dataset.schema.json', DatasetSchema, 'Embodied Datasets – dataset record'],
  ['family.schema.json', FamilySchema, 'Embodied Datasets – dataset family record'],
  ['organization.schema.json', OrganizationSchema, 'Embodied Datasets – organization record'],
];
for (const [file, schema, title] of entries) {
  const json = z.toJSONSchema(schema, { target: 'draft-2020-12', io: 'input', unrepresentable: 'any' }) as Record<string, unknown>;
  const withMeta = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://github.com/embodied-datasets/embodied-datasets.github.io/blob/main/schema/${file}`,
    title,
    ...json,
  };
  fs.writeFileSync(path.join(out, file), JSON.stringify(withMeta, null, 2) + '\n');
  console.log(`wrote schema/${file}`);
}
