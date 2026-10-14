## Overview

PAI-AV is by far the largest dataset in this wiki: {{ scale.logs }} {{ scale.log_unit }} of about
{{ scale.scene_duration_s }} seconds, {{ scale.hours }} hours and {{ scale.km }} km recorded on NVIDIA's
Hyperion 8 platform. Each clip carries seven f-theta fisheye cameras at 30 fps, a 360° LiDAR at 10 Hz with
per-point timestamps, high-rate egomotion from two sources and auto-labelled 3D boxes. There are no HD maps
and no human labels; the dataset is meant for pretraining and world-model work at scale.

## History and availability

Published on the Hugging Face Hub in 2025 behind NVIDIA's dataset licence with automatic gating, and still
updated in 2026. Because the data is packed in archives of about a hundred clips per sensor, fetching even a
few clips means downloading large chunks; py123d therefore reads the chunk archives directly and NuRec's
downloader pulls single clips out of them with HTTP range requests.

## Access

Accept the licence on the Hugging Face page and export a token. Set the data root and run the
`physical-ai-av` conversion; archives do not need to be extracted. Clips that lack LiDAR or egomotion can be
skipped with a flag.

## Quirks and errata

- Boxes are auto-generated and noisier than human labels.
- Some clips are incomplete and fail conversion unless skipped.
- The f-theta camera model has five polynomial coefficients; py123d pads them to six for NCore compatibility.
