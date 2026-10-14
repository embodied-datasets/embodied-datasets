import type { APIRoute } from 'astro';
import { getDatasets, sensorSummary, countries, primaryLicense, annotationHz } from '../../lib/data.ts';

const esc = (v: unknown) => {
  const s = v === undefined || v === null ? '' : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export const GET: APIRoute = async () => {
  const datasets = await getDatasets();
  const header = ['slug', 'name', 'family', 'organizations', 'release_date', 'status', 'last_verified', 'verified_by', 'access_methods', 'license', 'commercial_use', 'reality', 'countries', 'hours', 'km', 'logs', 'log_unit', 'cameras', 'camera_hz', 'lidars', 'lidar_hz', 'radar', 'hd_map', 'boxes_3d_hz', 'traffic_lights', 'modalities', 'homepage', 'py123d_configs'];
  const lines = [header.join(',')];
  for (const e of datasets) {
    const d = e.data;
    const cam = sensorSummary(d, 'camera');
    const lid = sensorSummary(d, 'lidar');
    const row = [
      e.id, d.name, d.family ?? '', d.organizations.join(';'), d.release_date ?? '', d.availability.status, d.availability.last_verified, d.availability.verified_by,
      d.availability.access_methods.join(';'), primaryLicense(d)?.id ?? '', d.legal.permissions.commercial ?? '', d.collection.reality, countries(d).join(';'),
      d.scale.hours ?? '', d.scale.km ?? '', d.scale.logs ?? '', d.scale.log_unit, cam?.count ?? '', cam?.hz ?? '', lid?.count ?? '', lid?.hz ?? '',
      d.modalities.includes('radar'), d.maps.available, annotationHz(d, 'boxes_3d') ?? '', d.modalities.includes('traffic_lights'), d.modalities.join(';'), d.homepage,
      d.tooling.py123d?.configs.join(';') ?? '',
    ];
    lines.push(row.map(esc).join(','));
  }
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
};
