## Overview

nuReasoning extends the nuScenes recipe towards language. Every clip is a self-contained
{{ scale.scene_duration_s }}-second long-tail scenario with eight cameras, ego state, a per-clip HD map and
traffic-signal context, and about one frame per second carries human-verified reasoning annotations in three
categories: spatial reasoning (what is where), driving decisions (what to do and why) and counterfactuals
(what would happen if). Two benchmarks build on this: a reasoning VQA task and a planning task.

## History and availability

The authors release the data in stages. A mini release accompanied the paper in spring 2026; the full
staged release with {{ scale.logs }} {{ scale.log_unit }} followed on the Hugging Face Hub in August 2026.
The remaining clips are announced for after the nuReasoning Challenge 2026. Access is gated: accept the
terms with a Hugging Face account and approval is automatic. The licence is the non-commercial nuScenes terms
of use.

## Access

Request access on the Hugging Face dataset page, then provide a token. py123d's downloader selects clips by
split, part or name and extracts the per-clip archives; the stream configs download, convert and delete in one
go. Plan for about {{ scale.storage_tb }} TB if you want everything.

## Quirks and errata

- The test split has no ground truth: cameras, ego states and route only, plus the challenge questions on
  the key frame.
- Most clips list their key frame twice; py123d stores it once, so converted frame indices can be one lower
  than the upstream `frame_index`.
- LiDAR is present only in some clips and never in the test split.
