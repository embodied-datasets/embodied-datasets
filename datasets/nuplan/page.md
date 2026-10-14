## Overview

nuPlan trades nuScenes' human annotations for scale. It ships {{ scale.logs }} logs from Boston, Pittsburgh,
Las Vegas and Singapore with auto-labelled agent tracks, inferred traffic-light states and city-wide HD maps,
plus a simulator that replays or reacts to the logged traffic. It was built for closed-loop planning
research: the benchmark scores how a planner drives when its own actions change the scene, not how well it
imitates a recorded trajectory.

Only a {{ availability.download_size.compressed_gb }} GB core of databases and maps is needed for planning
work. Raw cameras and LiDAR exist for a roughly 120-hour subset and add hundreds of gigabytes per split.

## History and availability

nuPlan is one of the few large datasets served from an anonymously readable cloud bucket, so no account
stands between you and the data. The licence is still non-commercial. The 2023 challenge has concluded, but
the data and the devkit remain online and the ecosystem (NAVSIM, py123d, many planners) keeps the format
alive. The devkit itself is no longer actively maintained and pins old dependencies, which is the most likely
future failure mode.

## Access

Download the log databases, the map package and optionally the camera and LiDAR shards from the public S3
bucket. py123d's downloader fetches and extracts them into the expected layout; the `nuplan-mini-stream`
config is an end-to-end smoke test, and `nuplan-tar` converts the sensor archives without extracting their
roughly 150 million files.

## Quirks and errata

- Boxes come from an auto-labelling pipeline and can be noisy; traffic-light states are inferred from traffic flow.
- Sensors and ego state show small synchronisation offsets in the sensor subset.
- The HD maps are 2D.
