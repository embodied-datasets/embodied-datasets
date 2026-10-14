import { z } from 'astro/zod';
import { CountryCode, FlexDate, IsoDate, Slug, Url } from './common.ts';
import {
  ACCESS_METHODS,
  ANNOTATION_TYPES,
  MODALITIES,
  RELATION_TYPES,
  SENSOR_TYPES,
  STATUS,
  TASKS,
  ids,
} from './vocab.ts';

export const StatusEnum = z.enum(ids(STATUS)).describe('Availability status, see vocabularies/status.yaml.');
export const ModalityEnum = z.enum(ids(MODALITIES));
export const AnnotationEnum = z.enum(ids(ANNOTATION_TYPES));
export const SensorTypeEnum = z.enum(ids(SENSOR_TYPES));
export const AccessMethodEnum = z.enum(ids(ACCESS_METHODS));
export const RelationEnum = z.enum(ids(RELATION_TYPES));
export const TaskEnum = z.enum(ids(TASKS));

export const Paper = z.strictObject({
  title: z.string(),
  venue: z.string().optional().describe('Venue as cited, e.g. "CVPR 2020" or "arXiv preprint".'),
  year: z.int().min(1990).max(2100),
  arxiv: z.string().regex(/^\d{4}\.\d{4,5}(v\d+)?$/).optional().describe('arXiv identifier, e.g. 1903.11027.'),
  doi: z.string().optional(),
  url: Url.optional(),
  bibtex: z.string().optional(),
  required_citation: z.boolean().default(false).describe('True if the terms of use require citing this paper.'),
});

export const Evidence = z.strictObject({
  url: Url.describe('The URL that was checked.'),
  checked: IsoDate.describe('When it was checked.'),
  wayback: Url.optional().describe('Wayback Machine snapshot backing the observation.'),
  http_status: z.int().optional(),
  note: z.string().optional().describe('What was observed, in one or two sentences.'),
});

export const Mirror = z.strictObject({
  host: z.string().describe('Who hosts the copy, e.g. "Hugging Face (georghess)".'),
  url: Url,
  official: z.boolean().describe('True if the copy is endorsed by the dataset authors.'),
  subset: z.string().optional().describe('Which part of the dataset the mirror holds, if not all of it.'),
  license: z.string().optional(),
  last_verified: IsoDate.optional(),
  note: z.string().optional(),
});

export const HistoryEvent = z.strictObject({
  date: FlexDate,
  status: StatusEnum.optional().describe('Status that applied from this date on, if the event changed it.'),
  event: z.string().describe('What happened.'),
  source: Url.optional(),
});

export const Availability = z.strictObject({
  status: StatusEnum,
  last_verified: IsoDate,
  verified_by: z.enum(['human', 'agent']),
  access_methods: z.array(AccessMethodEnum).min(1),
  cost: z.enum(['free', 'free-academic', 'paid']),
  eligibility: z.string().optional().describe('Who may download, if restricted (academic only, country limits, ...).'),
  registration_url: Url.optional(),
  evidence: z.array(Evidence).min(1).describe('At least one dated observation backing the status.'),
  discontinuation_announcement: Url.optional(),
  successor: Slug.optional().describe('Slug of the dataset that replaces this one.'),
  mirrors: z.array(Mirror).default([]),
  persistent_id: z
    .strictObject({ doi: z.string().optional(), zenodo: z.string().optional(), other: z.string().optional() })
    .optional(),
  download_size: z
    .strictObject({
      compressed_gb: z.number().nonnegative().optional(),
      uncompressed_gb: z.number().nonnegative().optional(),
      note: z.string().optional(),
    })
    .optional(),
  checksums_published: z.boolean().optional(),
  history: z.array(HistoryEvent).default([]).describe('Dated availability events, oldest first.'),
  notes: z.string().optional(),
});

export const License = z.strictObject({
  id: z.string().describe('SPDX identifier where one exists (CC-BY-NC-SA-4.0, MIT, Apache-2.0), otherwise a short custom id.'),
  name: z.string(),
  url: Url.optional(),
  applies_to: z.array(z.enum(['data', 'annotations', 'maps', 'code', 'reconstructions'])).min(1).default(['data']),
});

export const Legal = z.strictObject({
  licenses: z.array(License).min(1),
  terms_url: Url.optional(),
  permissions: z
    .strictObject({
      commercial: z.boolean().optional(),
      redistribution: z.boolean().optional(),
      derivatives: z.boolean().optional(),
      attribution_required: z.boolean().optional(),
      share_alike: z.boolean().optional(),
    })
    .default({})
    .describe('Plain-language reading of the data license. Null/absent means not assessed.'),
  privacy: z.string().optional().describe('Anonymisation measures (face/plate blurring, GDPR notes).'),
  export_control: z.string().optional(),
  notes: z.string().optional(),
});

export const Location = z.strictObject({
  city: z.string().optional(),
  region: z.string().optional(),
  country: CountryCode,
  lat: z.number().min(-90).max(90).optional(),
  lon: z.number().min(-180).max(180).optional(),
});

export const Collection = z.strictObject({
  reality: z.enum(['real', 'synthetic', 'hybrid']),
  simulator: z.strictObject({ name: z.string(), version: z.string().optional() }).optional(),
  platform: z.string().optional().describe('Sensor platform or vehicle class, e.g. "NVIDIA Hyperion 8", "heavy truck", "UAV + ground vehicle".'),
  vehicle: z.string().optional(),
  num_vehicles: z.int().positive().optional(),
  driving_mode: z.enum(['human', 'autonomous', 'teleoperated', 'mixed', 'expert-policy']).optional(),
  period: z.strictObject({ start: FlexDate.optional(), end: FlexDate.optional() }).optional(),
  locations: z.array(Location).default([]),
  locations_note: z.string().optional().describe('Use when the exact cities are not published.'),
  environment: z.array(z.string()).optional().describe('urban, suburban, highway, rural, parking, ...'),
  conditions: z.array(z.string()).optional().describe('day, night, rain, snow, fog, ...'),
});

export const Scale = z.strictObject({
  logs: z.number().nonnegative().optional().describe('Number of logs / scenes / clips / sequences.'),
  log_unit: z.string().default('logs').describe('What a log is called in this dataset: scenes, clips, segments, sequences, routes.'),
  scene_duration_s: z.number().positive().optional(),
  hours: z.number().nonnegative().optional(),
  km: z.number().nonnegative().optional(),
  frames: z.number().nonnegative().optional(),
  annotated_frames: z.number().nonnegative().optional(),
  boxes_3d: z.number().nonnegative().optional(),
  instances: z.number().nonnegative().optional(),
  map_area_km2: z.number().nonnegative().optional(),
  storage_tb: z.number().nonnegative().optional(),
  notes: z.string().optional(),
});

export const Sensor = z.strictObject({
  type: SensorTypeEnum,
  count: z.int().positive().optional().describe('Number of sensors of this kind. Leave out when the dataset does not publish it.'),
  name: z.string().optional().describe('Role or group name, e.g. "ring cameras", "top LiDAR".'),
  model: z.string().optional(),
  hz: z.number().positive().optional(),
  resolution: z.string().optional(),
  fov_deg: z.number().positive().max(360).optional(),
  beams: z.int().positive().optional(),
  range_m: z.number().positive().optional(),
  ids: z.array(z.string()).optional().describe('py123d sensor IDs (PCAM_F0, LIDAR_TOP, ...), used to draw the rig diagram.'),
  notes: z.string().optional(),
});

export const Annotation = z.strictObject({
  type: AnnotationEnum,
  classes: z.int().positive().optional(),
  hz: z.number().positive().optional(),
  method: z.enum(['human', 'auto', 'hybrid']).optional(),
  coverage: z.string().optional().describe('Which part of the data carries this annotation, if not all.'),
  notes: z.string().optional(),
});

export const Maps = z.strictObject({
  available: z.boolean(),
  type: z.enum(['hd_vector', 'raster', 'semantic', 'lanelet2', 'opendrive', 'none']).optional(),
  dimensions: z.enum(['2d', '3d']).optional(),
  scope: z.enum(['per_location', 'per_log', 'global']).optional(),
  format: z.string().optional(),
  georeferenced: z.boolean().optional(),
  layers: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export const Split = z.strictObject({
  name: z.string(),
  count: z.number().nonnegative().optional(),
  unit: z.string().optional(),
  hidden_ground_truth: z.boolean().optional(),
  notes: z.string().optional(),
});

export const Benchmark = z.strictObject({
  task: TaskEnum,
  name: z.string().optional(),
  url: Url.optional(),
  eval_server: z.enum(['open', 'closed', 'unknown']).optional().describe('Whether the evaluation server still accepts submissions.'),
  notes: z.string().optional(),
});

export const Formats = z.strictObject({
  raw: z.array(z.string()).optional().describe('On-disk formats of the release: rosbag, TFRecord, parquet, JPEG folders, ...'),
  devkit: z
    .strictObject({
      name: z.string(),
      url: Url,
      language: z.string().optional(),
      maintained: z.boolean().optional(),
      notes: z.string().optional(),
    })
    .optional(),
  loaders: z.array(z.strictObject({ name: z.string(), url: Url, notes: z.string().optional() })).default([]),
  known_issues: z.array(z.string()).optional(),
});

export const Tooling = z.strictObject({
  py123d: z
    .strictObject({
      configs: z.array(z.string()).min(1).describe('Hydra dataset configs, e.g. nuscenes, nuscenes-stream.'),
      extra: z.string().optional().describe('pip extra, e.g. py123d[nuscenes].'),
      docs: Url,
      status: z.enum(['stable', 'experimental']).default('stable'),
      notes: z.string().optional(),
    })
    .optional(),
});

export const Relation = z.strictObject({
  type: RelationEnum,
  target: z.string().describe('Slug of another record, or a free-text name when external is true.'),
  external: z.boolean().default(false),
  url: Url.optional(),
  note: z.string().optional(),
});

export const Figure = z.strictObject({
  file: z.string().describe('Path relative to the record directory, e.g. assets/sensor_timeline.svg.'),
  caption: z.string().optional(),
  source: Url.describe('Where the figure comes from.'),
  license: z.string().optional(),
});

export const Figures = z.strictObject({
  sensor_timeline: Figure.optional(),
  rig: Figure.optional(),
});

export const Community = z.strictObject({
  semantic_scholar: z.string().optional(),
  openalex: z.string().optional(),
  papers_with_code: Url.optional(),
  huggingface: z.string().optional().describe('Hugging Face dataset id, e.g. nvidia/PhysicalAI-Autonomous-Vehicles.'),
});

export const Curation = z.strictObject({
  created: IsoDate,
  updated: IsoDate,
  contributors: z.array(z.string()).min(1),
  schema_version: z.string(),
  tags: z.array(z.string()).optional(),
  confidence: z.enum(['high', 'medium', 'low']).optional().describe('Overall confidence in the record.'),
  notes: z.string().optional(),
});

export const DatasetSchema = z
  .strictObject({
    name: z.string(),
    aliases: z.array(z.string()).default([]),
    tagline: z.string().max(220).describe('One sentence, shown on cards and in search results.'),
    domain: z.enum(['driving']).describe('Robotics domain. Only driving for now; more will follow.'),
    family: Slug.optional().describe('Slug of the family record this dataset belongs to.'),
    version: z.string().optional(),
    release_date: FlexDate.optional(),
    last_update: FlexDate.optional(),
    organizations: z.array(Slug).min(1).describe('Slugs of organization records.'),
    homepage: Url,
    links: z
      .strictObject({
        download: z.array(Url).optional(),
        code: z.array(Url).optional(),
        docs: Url.optional(),
        challenge: Url.optional(),
        leaderboard: Url.optional(),
        discussion: Url.optional(),
      })
      .default({}),
    papers: z.array(Paper).default([]),
    availability: Availability,
    legal: Legal,
    collection: Collection,
    scale: Scale.default({ log_unit: 'logs' }),
    modalities: z.array(ModalityEnum).min(1),
    sensors: z.array(Sensor).default([]),
    annotations: z.array(Annotation).default([]),
    maps: Maps,
    splits: z.array(Split).default([]),
    benchmarks: z.array(Benchmark).default([]),
    formats: Formats.default({ loaders: [] }),
    tooling: Tooling.default({}),
    relations: z.array(Relation).default([]),
    figures: Figures.default({}),
    community: Community.default({}),
    sources: z
      .record(z.string(), Url)
      .default({})
      .describe('Field path -> URL that backs it, e.g. "scale.hours": "https://...". Record-level evidence lives in availability.evidence.'),
    curation: Curation,
  })
  .describe('One autonomous-driving (or robotics) dataset. One file per dataset at datasets/<slug>/dataset.yaml.');

export type Dataset = z.infer<typeof DatasetSchema>;
export type DatasetInput = z.input<typeof DatasetSchema>;
