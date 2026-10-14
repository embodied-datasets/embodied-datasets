import { z } from 'astro/zod';
import { Slug, Url } from './common.ts';

export const FamilySchema = z
  .strictObject({
    name: z.string(),
    aliases: z.array(z.string()).default([]),
    tagline: z.string().max(220),
    organizations: z.array(Slug).default([]),
    homepage: Url.optional(),
    description: z.string().optional().describe('A paragraph of Markdown.'),
    not_yet_recorded: z
      .array(z.string())
      .default([])
      .describe('Members of the family that have no record yet, so visitors know the gap is known.'),
  })
  .describe('A group of related datasets, e.g. Argoverse 2 with its Sensor, Lidar and Motion Forecasting releases. Membership is declared on the dataset records.');

export type Family = z.infer<typeof FamilySchema>;
