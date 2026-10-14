import { z } from 'astro/zod';

/** YYYY, YYYY-MM or YYYY-MM-DD. Release dates are often only known to the month.
 *  A bare year may be written unquoted in YAML (it parses as a number) and is normalised to a string. */
const FLEX_DATE_RE = /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;
/** YAML parsers may turn an unquoted YYYY-MM-DD into a Date object; normalise it back to the ISO day. */
const dateToIso = (d: Date) => d.toISOString().slice(0, 10);

export const FlexDate = z
  .union([
    z.string().regex(FLEX_DATE_RE, 'Use YYYY, YYYY-MM or YYYY-MM-DD'),
    z.int().min(1900).max(2100).transform((n) => String(n)),
    z.date().transform(dateToIso),
  ])
  .describe('Date with flexible precision: YYYY, YYYY-MM or YYYY-MM-DD.');

/** Full ISO date, used wherever something was *checked* (verification, evidence). */
export const IsoDate = z
  .union([z.iso.date(), z.date().transform(dateToIso)])
  .describe('ISO date, YYYY-MM-DD.');

export const Url = z.url().describe('Absolute http(s) URL.');

export const Slug = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Slugs are lowercase, digits and single hyphens')
  .describe('Record identifier: lowercase letters, digits and hyphens.');

export const CountryCode = z
  .string()
  .regex(/^[A-Z]{2}$/, 'ISO 3166-1 alpha-2 country code, e.g. US, DE, SG')
  .describe('ISO 3166-1 alpha-2 country code.');
