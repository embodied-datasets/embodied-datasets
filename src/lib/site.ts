export const SITE = {
  name: 'Embodied Datasets',
  shortName: 'Embodied Datasets',
  tagline: 'A community-maintained wiki of autonomous driving datasets, with availability as a first-class, dated, evidence-backed field.',
  description:
    'Structured records of autonomous driving datasets: sensors, annotations, maps, licences, and above all whether the data can still be downloaded today, with dated evidence.',
  repo: 'https://github.com/DanielDauner/embodied-datasets',
  py123d: 'https://kesai.eu/py123d/',
  schemaVersion: '0.1.0',
};

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefix a site-absolute path with the configured base (GitHub Pages serves under /<repo>/). */
export function url(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

export function fmtNum(n: number | undefined | null, digits = 1): string {
  if (n === undefined || n === null || Number.isNaN(n)) return '–';
  if (Number.isInteger(n)) return n.toLocaleString('en-US');
  return n.toLocaleString('en-US', { maximumFractionDigits: digits });
}

/** Compact number for tiles and tables: 1.7k, 69.3k, 1.2M. */
export function fmtCompact(n: number | undefined | null): string {
  if (n === undefined || n === null) return '–';
  if (n >= 1e6) return `${(n / 1e6).toLocaleString('en-US', { maximumFractionDigits: 1 })}M`;
  if (n >= 1e4) return `${(n / 1e3).toLocaleString('en-US', { maximumFractionDigits: 1 })}k`;
  return fmtNum(n);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Render a flexible date (YYYY, YYYY-MM, YYYY-MM-DD) for humans. */
export function fmtDate(d: string | number | undefined | null): string {
  if (d === undefined || d === null) return '–';
  const s = String(d);
  const [y, m, day] = s.split('-');
  if (!m) return y;
  const mon = MONTHS[Number(m) - 1] ?? m;
  return day ? `${day} ${mon} ${y}` : `${mon} ${y}`;
}

export function yearOf(d: string | number | undefined | null): number | undefined {
  if (d === undefined || d === null) return undefined;
  const y = Number(String(d).slice(0, 4));
  return Number.isFinite(y) ? y : undefined;
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
export function countryName(code: string): string {
  try {
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

/** Regional-indicator emoji flag for an ISO 3166-1 alpha-2 code. */
export function flag(code: string): string {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function pluralize(n: number, one: string, many = `${one}s`): string {
  return `${fmtNum(n)} ${n === 1 ? one : many}`;
}
