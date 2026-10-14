import type { APIRoute } from 'astro';
import { getDatasets } from '../../lib/data.ts';
import { SITE } from '../../lib/site.ts';

export const GET: APIRoute = async () => {
  const datasets = await getDatasets();
  const body = {
    generated: new Date().toISOString(),
    schema_version: SITE.schemaVersion,
    license: 'CC-BY-4.0',
    source: SITE.repo,
    count: datasets.length,
    datasets: datasets.map((e) => ({ slug: e.id, ...e.data })),
  };
  return new Response(JSON.stringify(body, null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
