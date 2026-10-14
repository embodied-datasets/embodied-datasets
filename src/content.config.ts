import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { DatasetSchema } from './schema/dataset.ts';
import { FamilySchema } from './schema/family.ts';
import { OrganizationSchema } from './schema/organization.ts';

/** datasets/<slug>/dataset.yaml — the schema-validated facts. The slug is the directory name. */
const datasets = defineCollection({
  loader: glob({
    pattern: '*/dataset.yaml',
    base: './datasets',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: DatasetSchema,
});

/** datasets/<slug>/page.md — optional prose, joined to the record by slug. */
const datasetPages = defineCollection({
  loader: glob({
    pattern: '*/page.md',
    base: './datasets',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.strictObject({}),
});

const families = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './families' }),
  schema: FamilySchema,
});

const organizations = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './organizations' }),
  schema: OrganizationSchema,
});

export const collections = { datasets, datasetPages, families, organizations };
