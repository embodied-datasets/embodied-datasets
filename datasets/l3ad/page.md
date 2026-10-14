## Overview

L3AD is the dataset behind the LEAD paper: {{ scale.logs }} CARLA Leaderboard 2.0 {{ scale.log_unit }}
driven by LEAD's privileged rule-based expert and stored directly in the 123D Arrow format, one file per
modality. Compared with earlier TransFuser-lineage datasets the recordings are denser, cover the full
surround view and include more modalities, and the whole thing fits on a single disk.

## History and availability

Published on the Hugging Face Hub in spring 2026 under the MIT licence with no gating. The LEAD main branch
has since released a larger, incompatible successor; this record tracks the CVPR 2026 dataset because that
is what py123d's downloader fetches.

## Access

Run `py123d-download dataset=lead123d` or clone the Hugging Face repository with git LFS. The logs are plain
123D data, so the whole py123d API works without any CARLA dependency.
