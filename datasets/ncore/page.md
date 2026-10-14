## Overview

NCore is a {{ scale.logs }}-clip slice of NVIDIA's Hyperion 8.1 recordings published in the NCore V4
component format: indexed-tar zarr archives, one per modality, read by the open-source `ncore` library. The
sensor content matches Physical AI AV (seven fisheye cameras at 30 fps, a 360° LiDAR, auto-labelled cuboids),
with rig-to-world poses at roughly 100 Hz and no HD map.

## History and availability

Released in March 2026 on the Hugging Face Hub behind the NVIDIA AV dataset licence with automatic gating.
The whole collection is about {{ scale.storage_tb }} TB.

## Access

Accept the licence, export a Hugging Face token and use `py123d-download dataset=ncore` to fetch a random
subset or single modalities. The stream config converts clips as they are downloaded.

## Quirks and errata

- Cuboids are auto-labelled.
- The f-theta model adds an affine term that py123d's isotropic model absorbs approximately; strong shear raises an error.
