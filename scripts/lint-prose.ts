/**
 * Flag bare numbers in datasets/<slug>/page.md. Numbers and URLs belong in dataset.yaml;
 * prose should reference them through shortcodes such as {{ scale.hours }}.
 * Years (1990-2099), numbers inside shortcodes, inline code, links and headings are allowed.
 * Warnings only; the check never fails the build.
 */
import fs from 'node:fs';
import path from 'node:path';

const dsDir = path.resolve(process.cwd(), 'datasets');
let count = 0;
for (const slug of fs.readdirSync(dsDir)) {
  const file = path.join(dsDir, slug, 'page.md');
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let inCode = false;
  lines.forEach((line, i) => {
    if (line.trim().startsWith('```')) inCode = !inCode;
    if (inCode || line.startsWith('#')) return;
    const stripped = line
      .replace(/\{\{[^}]*\}\}/g, '')
      .replace(/`[^`]*`/g, '')
      .replace(/\]\([^)]*\)/g, ']()')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\b(19|20)\d{2}\b/g, '')
      // tokens glued to letters or symbols are descriptors, not facts: 3D, 123D, 360°, 64-beam, v1.4.3, 0.9.x, 26.04
      .replace(/\b\d+(\.\d+)+(\.x)?\b/g, '')
      .replace(/\b\d+[°%]|\b\d+-[A-Za-z]|\b\d+[A-Za-z]+/g, '');
    // standalone numbers with at least two digits
    const m = stripped.match(/(?<![\w.])\d{2,}(?:[,.]\d+)*(?![\w.])/g);
    if (m) {
      count++;
      console.warn(`${slug}/page.md:${i + 1}: bare number(s) ${m.join(', ')} — move to dataset.yaml and use a shortcode`);
    }
  });
}
console.log(count ? `${count} line(s) with bare numbers` : 'ok: no bare numbers in prose');
