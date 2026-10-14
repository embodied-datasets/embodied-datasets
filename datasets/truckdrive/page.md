## Overview

TruckDrive targets a gap in public data: highway driving from the perspective of a heavy truck, where
reliable perception hundreds of metres ahead is needed for anticipatory planning and safe braking. The rig
combines multiple cameras with a long-range FMCW LiDAR and three Ouster LiDARs, and the labels include 3D
boxes and lane-level map annotations per scene.

## History and availability

The paper appeared in March 2026 and the data followed on the Hugging Face Hub in June under a custom
non-commercial licence with automatic gating.

## Access

Request access on the Hugging Face page, export a token and download selected scenes with
`py123d-download dataset=truckdrive`. Test scenes carry no annotations and are skipped by py123d.

## Quirks and errata

- Sensor frequencies and annotation completeness vary by scene.
- This record is a stub: scale and sensor details still need to be filled from the paper.
