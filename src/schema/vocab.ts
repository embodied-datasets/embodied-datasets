/**
 * Controlled vocabularies, loaded from the YAML files in /vocabularies.
 * The YAML files are the source of truth so that non-developers can extend them in a PR.
 * Paths are resolved from the project root (process.cwd()), which is where `astro build`
 * and the scripts in /scripts run.
 */
import fs from 'node:fs';
import path from 'node:path';
import { load as loadYaml } from 'js-yaml';

export interface VocabItem {
  id: string;
  label: string;
  short?: string;
  color?: string;
  description?: string;
  downloadable?: boolean;
}

function load(name: string): VocabItem[] {
  const file = path.resolve(process.cwd(), 'vocabularies', `${name}.yaml`);
  const items = loadYaml(fs.readFileSync(file, 'utf8')) as VocabItem[];
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error(`Vocabulary ${name} is empty or malformed (${file})`);
  }
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !item.label) throw new Error(`Vocabulary ${name}: every item needs id and label`);
    if (seen.has(item.id)) throw new Error(`Vocabulary ${name}: duplicate id ${item.id}`);
    seen.add(item.id);
  }
  return items;
}

export const STATUS = load('status');
export const MODALITIES = load('modalities');
export const ANNOTATION_TYPES = load('annotation_types');
export const SENSOR_TYPES = load('sensor_types');
export const ACCESS_METHODS = load('access_methods');
export const RELATION_TYPES = load('relation_types');
export const TASKS = load('tasks');

export type EnumTuple = [string, ...string[]];
export const ids = (v: VocabItem[]): EnumTuple => v.map((i) => i.id) as EnumTuple;
export const byId = (v: VocabItem[]): Record<string, VocabItem> =>
  Object.fromEntries(v.map((i) => [i.id, i]));

export const STATUS_BY_ID = byId(STATUS);
export const MODALITY_BY_ID = byId(MODALITIES);
export const ANNOTATION_BY_ID = byId(ANNOTATION_TYPES);
export const SENSOR_BY_ID = byId(SENSOR_TYPES);
export const ACCESS_BY_ID = byId(ACCESS_METHODS);
export const RELATION_BY_ID = byId(RELATION_TYPES);
export const TASK_BY_ID = byId(TASKS);
