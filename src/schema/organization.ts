import { z } from 'astro/zod';
import { CountryCode, Url } from './common.ts';

export const OrganizationSchema = z
  .strictObject({
    name: z.string(),
    aliases: z.array(z.string()).default([]),
    type: z.enum(['company', 'university', 'research_institute', 'lab', 'government', 'community', 'individual']),
    country: CountryCode.optional(),
    url: Url.optional(),
    description: z.string().optional(),
    defunct: z.boolean().default(false).describe('True if the organization no longer exists; matters for availability risk.'),
    notes: z.string().optional(),
  })
  .describe('An organization that created, hosts or maintains datasets.');

export type Organization = z.infer<typeof OrganizationSchema>;
