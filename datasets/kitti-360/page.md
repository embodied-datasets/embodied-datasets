## Overview

KITTI-360 revisits the KITTI recording setup with full 360° coverage: a perspective stereo pair, two fisheye
side cameras and a 64-beam LiDAR on the same Karlsruhe streets, driven in a single day in 2013. Instead of
per-frame boxes it provides 3D primitives annotated once in the global frame and dense semantic and
instance labels in 2D and 3D, which makes it a reference for scene understanding, scene completion and novel
view synthesis. Its {{ scale.logs }} {{ scale.log_unit }} are long, which is unusual among driving datasets
built from 20-second snippets.

## History and availability

The data has been served from the cvlibs servers since its release and needs only a free account. The
licence is non-commercial and share-alike. In September 2026 the servers had to be restored from a backup,
which is a reminder that even stable academic hosting depends on one group's infrastructure.

## Access

Register on the cvlibs website and download the raw 2D and 3D data, poses, calibration and 3D boxes. py123d
expects the official directory layout and converts all sequences with a single command; semantic labels are
not converted yet.

## Quirks and errata

- Boxes are annotated globally; per-frame visibility is derived from the number of LiDAR points inside a box.
- The ground primitives describe surfaces, not lanes.
- Ego-vehicle parameters are partially estimated.
