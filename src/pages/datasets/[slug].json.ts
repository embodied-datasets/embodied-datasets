import type { APIRoute, GetStaticPaths } from 'astro';
import { getDatasets } from '../../lib/data.ts';

export const getStaticPaths: GetStaticPaths = async () => {
  const datasets = await getDatasets();
  return datasets.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
};

export const GET: APIRoute = ({ props }) => {
  const { entry } = props as { entry: Awaited<ReturnType<typeof getDatasets>>[number] };
  return new Response(JSON.stringify({ slug: entry.id, ...entry.data }, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
