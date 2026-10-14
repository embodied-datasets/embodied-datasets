## Overview

nuScenes was the first large-scale driving dataset to ship the full sensor suite of a production-style
autonomous vehicle: six cameras, a LiDAR and five radars, all calibrated and synchronised, together with
HD maps and {{ scale.boxes_3d }} human-annotated 3D boxes across {{ scale.logs }} {{ scale.log_unit }} of
{{ scale.scene_duration_s }} seconds each. It set the template that nuPlan, Argoverse 2 and many later datasets
followed: short self-contained scenes, keyframe annotations and a Python devkit with an official evaluation
server.

The scenes were recorded in Boston and Singapore, which gives left- and right-hand traffic, two climates and
dense urban driving at day and night, in sun and in rain.

## History and availability

The dataset has been continuously available since its full release in 2019, always behind a free account.
Later expansions added point-wise LiDAR segmentation and panoptic labels without changing the terms. The
non-commercial licence is the main constraint for industry users; Motional offers commercial licences
separately.

## Access

Create an account on the nuScenes website and accept the terms of use. The download page lists the archives
(trainval metadata and ten blob archives, test, mini, map expansion and CAN bus). The whole dataset is about
{{ availability.download_size.compressed_gb }} GB; the mini split is small enough for a laptop.

With py123d installed with the `nuscenes` extra, the downloader handles the login flow and the archives for you
and the conversion produces the unified Arrow format. The `nuscenes-interpolated` configs lift the 2 Hz
annotations to 10 Hz for training that needs denser supervision.

## Quirks and errata

- Annotations exist only at the 2 Hz keyframes; the sweeps in between carry ego poses but no boxes.
- The HD maps are 2D. Height information has to come from the LiDAR.
- Radar point clouds are sparse and were ignored by most early work, which is worth knowing when comparing
  published baselines.
