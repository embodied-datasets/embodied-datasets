## Overview

NuRec is a dataset of simulators rather than recordings. Each of its {{ scale.logs }} {{ scale.log_unit }} is a
`.usdz` archive covering about {{ scale.scene_duration_s }} seconds of a real Hyperion drive, with the ego
trajectory, auto-labelled cuboid tracks, an HD map and a 3D Gaussian reconstruction that renders camera views
from any pose. No recorded frames are shipped; cameras are rendered, which is what makes closed-loop
end-to-end evaluation in AlpaSim possible. py123d converts the log and the map and leaves the reconstruction
assets alone, or adds the real sensors of the underlying Physical AI AV clip with the `nurec-pai` config.

## History and availability

The Hugging Face repository dates from mid-2025; the data used today comes from the 26.01 and 26.04 releases,
the latter with complete clipgt map layers for every scene. Access is gated with automatic approval under the
NVIDIA AV dataset licence.

## Access

Accept the licence, export a token and fetch scenes with `py123d-download dataset=nurec-curated` (the
AlpaSim train and val scenes) or per release. Scenes are about two gigabytes each.

## Quirks and errata

- Traffic-light states are not recorded; stop zones are typed by the light or sign that controls them.
- Some scenes of release 26.01 only carry an OpenDRIVE map, which is sparser and mislabels km/h limits as mph.
- Frames are placed on an exact 10 Hz grid by interpolation because the source timestamps are only nominally uniform.
