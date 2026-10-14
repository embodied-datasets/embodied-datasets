## Overview

The Argoverse 2 Sensor dataset is the perception half of Argo AI's second data release. Each of its
{{ scale.logs }} {{ scale.log_unit }} covers {{ scale.scene_duration_s }} seconds in one of six US cities with
seven ring cameras, a forward stereo pair, two stacked LiDARs and a 3D HD map with lane geometry and ground
height. Objects are annotated as 3D cuboids in a long-tailed taxonomy that goes well beyond the usual
car-pedestrian-cyclist split, which was one of the dataset's stated goals.

## History and availability

Argoverse 2 is the clearest example in this wiki of a dataset outliving its creator. Argo AI closed in
October 2022, yet the website is maintained and the data sits on a public, anonymously readable S3 bucket.
There is no login and no application: a plain S3 client is enough, which is why py123d uses it as its demo
dataset. The non-commercial licence still applies.

## Access

Copy logs from the public bucket with any S3 client or use py123d's downloader, which can fetch a handful of
validation logs for a quick look. The complete dataset is about
{{ availability.download_size.compressed_gb }} GB.

## Quirks and errata

- The ego-vehicle parameters in py123d are partially estimated.
- Map polygons are derived from polylines and can carry conversion artefacts.
