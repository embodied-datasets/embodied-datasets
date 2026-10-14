## Overview

The Motion dataset drops raw sensors in favour of scale: {{ scale.logs }} {{ scale.log_unit }} of
{{ scale.scene_duration_s }} seconds, each with auto-labelled 3D tracks for every agent, a 3D map and
traffic-light states at 10 Hz. It was designed for motion forecasting and interaction prediction and has since
become the standard testbed for occupancy and flow prediction and for learned traffic simulation agents.

## History and availability

Released in 2021 together with the first Motion Prediction Challenge, the dataset has been continuously
available behind the Waymo licence. Later versions added LiDAR for a subset and camera embeddings. Unlike
the Perception bucket, the motion bucket can be read anonymously once the licence has been accepted, which
is what py123d's streaming mode relies on.

## Access

Accept the licence on the Waymo portal, then download the TFRecord shards per split or let
py123d stream selected shards. The Waymo tooling needs TensorFlow; py123d replaces it with lightweight
protobuf definitions.

## Quirks and errata

- py123d's WOD-Motion support is experimental and its documentation is incomplete.
- The map features contain known bugs and polyline-to-polygon conversion artefacts.
