## Overview

Griffin pairs a ground vehicle with a drone flying above it and asks how much a bird's-eye partner helps 3D
detection and tracking. It is rendered in CARLA with AirSim handling the drone, so every object comes with
exact boxes and an occlusion measure. The {{ scale.logs }} {{ scale.log_unit }} are organised in four subsets
by drone altitude, from a fixed low altitude up to randomised heights.

## History and availability

Released in 2025 under the MIT licence on the Hugging Face Hub, with a Baidu Netdisk copy for users in China.
No account or gating is involved, and the permissive licence allows redistribution.

## Access

Download the subset folders from Hugging Face and extract the `griffin-release` trees. py123d converts the
vehicle side by default and the drone side with the `griffin_drone` config; the official train and val
partitions are embedded in py123d.

## Quirks and errata

- Non-traffic CARLA categories such as props are outside the perception taxonomy and are skipped.
- The vehicle and drone logs of a scene share a global frame but are not yet modelled as one cooperative scene.
