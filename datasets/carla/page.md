## Overview

CARLA is not a dataset but the simulator most synthetic driving datasets are generated with. It ships towns
as OpenDRIVE maps with 3D assets, a traffic manager, configurable weather and a sensor suite of RGB, depth,
semantic and instance cameras, LiDAR, radar, GNSS and IMU, all exposed through a Python API. Ground truth for
every actor and traffic light is free, which is why the CARLA Leaderboard became the standard closed-loop
benchmark for end-to-end driving.

This record exists so that CARLA-generated datasets can point at their origin and so that the wiki covers the
synthetic case from day one. Scale fields are empty on purpose: they belong to the datasets collected with it.

## History and availability

Open source since 2017 under the MIT licence, with CC BY assets. Packaged releases live on GitHub; the 0.9.x
line is still what leaderboards and most datasets use, with 0.10 on Unreal Engine 5 alongside.

## Access

Download a packaged release or build from source. To collect data in the 123D format, use the LEAD framework,
which drives CARLA with a privileged expert and writes py123d logs; py123d's own CARLA support covers the
OpenDRIVE map parser and demo data.
