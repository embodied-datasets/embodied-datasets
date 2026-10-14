## Overview

KITScenes Multimodal is built for Level 4 robotaxi requirements in European cities: nine high-resolution
global-shutter cameras with full surround coverage, seven dense long-range LiDARs, three 4D imaging radars
and Lanelet2 HD maps covering {{ scale.map_area_km2 }} km² with full topology between lanes, signs and
traffic lights. The maps have been validated in closed-loop drives with Autoware. The early release holds
more than {{ scale.logs }} {{ scale.log_unit }} of {{ scale.scene_duration_s }} seconds from Karlsruhe,
Frankfurt and Sindelfingen and ships without object boxes; map perception, novel view synthesis and
end-to-end driving are the intended benchmarks.

## History and availability

Published as an early release on the Hugging Face Hub in May 2026 with the paper following in June. Access
is gated with automatic approval after accepting the CC BY-NC terms. Expect the dataset to grow and change;
py123d marks its support as experimental for the same reason.

## Access

Accept the terms on the Hugging Face page and log in. Every scene is one archive of a few gigabytes; py123d's
downloader extracts scenes into the expected layout and the stream config converts them in one go.

## Quirks and errata

- The ego vehicle's generation and dimensions are not published; py123d assumes a long-wheelbase BMW 7 Series.
- Corner LiDARs see parts of the ego vehicle; those points are not removed.
- Lanelet2 has no intersection primitive, so intersections are derived from crossing lanes.
