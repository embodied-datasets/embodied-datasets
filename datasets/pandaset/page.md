## Overview

PandaSet is small ({{ scale.logs }} {{ scale.log_unit }} of {{ scale.scene_duration_s }} seconds) but unusually
complete for its size: a 64-beam spinning LiDAR and a forward-facing solid-state LiDAR, six cameras, 3D
cuboids with tracking identities in 28 classes and point-wise semantic labels in 37 classes for most scenes. Its
real distinction is legal: the data is CC BY 4.0 with explicit no-cost commercial use, which almost no other
real-world driving dataset offers.

## History and availability

PandaSet is the wiki's reference case for a dataset that lost its official home. The project domain and
Scale AI's download page carried the data from 2020; users reported the download as broken in late 2023,
Scale's page disappeared during 2025, and by 2026 the pandaset.org domain served unrelated content. Because
the licence permits redistribution, unofficial full copies on the Hugging Face Hub and on Kaggle keep the
dataset usable, and py123d downloads from the Hugging Face copy. The status here is "official source gone,
mirrors exist" rather than "discontinued"; it would flip to discontinued only if the mirrors vanished.

## Access

Download the single archive from the Hugging Face mirror (about {{ availability.download_size.compressed_gb }} GB)
or use `py123d-download dataset=pandaset`, which fetches, extracts and deletes the archive. Streaming
mode also needs the whole archive, even for a few logs.

## Quirks and errata

- LiDAR sweeps are not motion-compensated, so moving objects smear at speed.
- Objects in the overlap of the two LiDARs are annotated twice; py123d keeps the top-LiDAR boxes.
- Ego-vehicle dimensions and the IMU position are estimates.
