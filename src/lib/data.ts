import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { STATUS_BY_ID, MODALITY_BY_ID, type VocabItem } from '../schema/vocab.ts';
import { yearOf } from './site.ts';

export type DatasetEntry = CollectionEntry<'datasets'>;
export type FamilyEntry = CollectionEntry<'families'>;
export type OrgEntry = CollectionEntry<'organizations'>;
export type Dataset = DatasetEntry['data'];

export async function getDatasets(): Promise<DatasetEntry[]> {
  const all = await getCollection('datasets');
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name, 'en', { sensitivity: 'base' }));
}

export async function getFamilies(): Promise<FamilyEntry[]> {
  const all = await getCollection('families');
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getOrganizations(): Promise<OrgEntry[]> {
  const all = await getCollection('organizations');
  return all.sort((a, b) => a.data.name.localeCompare(b.data.name));
}

export async function getProse(slug: string): Promise<string | undefined> {
  const entry = await getEntry('datasetPages', slug);
  return entry?.body ?? undefined;
}

export function statusOf(d: Dataset): VocabItem {
  return STATUS_BY_ID[d.availability.status] ?? { id: d.availability.status, label: d.availability.status };
}

export function modalityLabel(id: string): string {
  return MODALITY_BY_ID[id]?.label ?? id;
}

export function releaseYear(d: Dataset): number | undefined {
  return yearOf(d.release_date);
}

export function sensorSummary(d: Dataset, type: string): { count: number; hz?: number } | undefined {
  const s = d.sensors.filter((x) => x.type === type);
  if (s.length === 0) return undefined;
  const count = s.reduce((acc, x) => acc + (x.count ?? 0), 0);
  const hz = s.find((x) => x.hz)?.hz;
  return { count, hz };
}

export function annotationHz(d: Dataset, type: string): number | undefined {
  return d.annotations.find((a) => a.type === type)?.hz;
}

export function hasAnnotation(d: Dataset, type: string): boolean {
  return d.annotations.some((a) => a.type === type);
}

export function countries(d: Dataset): string[] {
  return [...new Set(d.collection.locations.map((l) => l.country))];
}

export function primaryLicense(d: Dataset) {
  return d.legal.licenses.find((l) => l.applies_to.includes('data')) ?? d.legal.licenses[0];
}

export function commercialOk(d: Dataset): boolean | undefined {
  return d.legal.permissions.commercial;
}

export function isDownloadable(d: Dataset): boolean {
  return statusOf(d).downloadable !== false;
}

/** Group datasets by a key, keeping insertion order of first appearance. */
export function groupBy<T, K extends string | number>(items: T[], key: (t: T) => K): Map<K, T[]> {
  const m = new Map<K, T[]>();
  for (const it of items) {
    const k = key(it);
    if (!m.has(k)) m.set(k, []);
    m.get(k)!.push(it);
  }
  return m;
}
