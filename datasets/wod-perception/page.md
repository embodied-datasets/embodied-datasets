## Overview

The Perception dataset is the sensor-level half of the Waymo Open Dataset: {{ scale.logs }} {{ scale.log_unit }}
of {{ scale.scene_duration_s }} seconds with five cameras and five LiDARs, all labelled at 10 Hz with 3D boxes,
2D boxes and tracking identities, later extended with 3D semantic segmentation, camera panoptic labels, human
keypoints and HD map features. The dense labels and the long-range top LiDAR made it the reference benchmark
for 3D detection for several years.

## History and availability

Waymo has kept the dataset online since 2019 and keeps adding label types and format variants. Access
requires a Google account and acceptance of a non-commercial licence that also forbids redistribution, so
there are no legitimate mirrors. The Google Cloud bucket is not anonymously readable; both the website and
py123d's streaming mode need an authenticated client.

## Access

Sign in on the Waymo Open Dataset portal, accept the licence and download the v1.4.3 TFRecords (py123d does
not read the modular v2.0.1 release because it lacks map data). Segments are about a gigabyte each, the whole
dataset about {{ availability.download_size.compressed_gb }} GB. The `wod-perception-stream` config converts
individual segments without keeping the TFRecords.

## Quirks and errata

- Map features are present only for the frames that carry 3D segmentation labels.
- The map's polyline-to-polygon conversion in py123d can leave artefacts.
