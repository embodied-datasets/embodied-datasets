import { marked } from 'marked';
import { fmtNum } from './site.ts';

const SHORTCODE = /\{\{\s*([a-zA-Z0-9_.]+)\s*\}\}/g;

function resolve(record: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc === null || acc === undefined) return undefined;
    if (Array.isArray(acc)) return acc[Number(key)];
    return (acc as Record<string, unknown>)[key];
  }, record);
}

function format(value: unknown): string {
  if (typeof value === 'number') return fmtNum(value);
  if (typeof value === 'string') return value;
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (Array.isArray(value)) return value.map(format).join(', ');
  return String(value);
}

/**
 * Replace {{ field.path }} shortcodes with values from the record, then render Markdown.
 * Unknown paths throw at build time so a stale shortcode cannot reach the published site.
 */
export function renderProse(body: string, record: unknown, context: string): string {
  const substituted = body.replace(SHORTCODE, (_, path: string) => {
    const v = resolve(record, path);
    if (v === undefined || v === null) {
      throw new Error(`${context}: shortcode {{ ${path} }} does not resolve to a value in dataset.yaml`);
    }
    return format(v);
  });
  return marked.parse(substituted, { async: false, gfm: true }) as string;
}

/** Render a plain Markdown string (family descriptions, about pages). */
export function renderMarkdown(body: string): string {
  return marked.parse(body, { async: false, gfm: true }) as string;
}
