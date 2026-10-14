/**
 * Schematic placement of py123d sensor IDs on a top-down car outline.
 * Coordinates are in car units: x to the right, y forward; the car body spans
 * roughly x ∈ [-1, 1], y ∈ [-2.2, 2.2]. Yaw is in degrees, 0 = forward, positive = clockwise (to the right).
 */
export interface RigSensor {
  kind: 'camera' | 'lidar' | 'radar';
  x: number;
  y: number;
  yaw?: number;
  fov?: number;
  label: string;
}

export const RIG: Record<string, RigSensor> = {
  // Pinhole cameras
  PCAM_F0: { kind: 'camera', x: 0, y: 1.9, yaw: 0, fov: 70, label: 'front' },
  PCAM_F1: { kind: 'camera', x: 0, y: 1.6, yaw: 0, fov: 40, label: 'front (hi-res)' },
  PCAM_B0: { kind: 'camera', x: 0, y: -2.0, yaw: 180, fov: 90, label: 'back' },
  PCAM_L0: { kind: 'camera', x: -0.9, y: 1.4, yaw: -55, fov: 70, label: 'front left' },
  PCAM_L1: { kind: 'camera', x: -1.0, y: 0.1, yaw: -100, fov: 70, label: 'left' },
  PCAM_L2: { kind: 'camera', x: -0.9, y: -1.2, yaw: -140, fov: 70, label: 'rear left' },
  PCAM_R0: { kind: 'camera', x: 0.9, y: 1.4, yaw: 55, fov: 70, label: 'front right' },
  PCAM_R1: { kind: 'camera', x: 1.0, y: 0.1, yaw: 100, fov: 70, label: 'right' },
  PCAM_R2: { kind: 'camera', x: 0.9, y: -1.2, yaw: 140, fov: 70, label: 'rear right' },
  PCAM_STEREO_L: { kind: 'camera', x: -0.35, y: 1.7, yaw: 0, fov: 60, label: 'stereo left' },
  PCAM_STEREO_R: { kind: 'camera', x: 0.35, y: 1.7, yaw: 0, fov: 60, label: 'stereo right' },
  // Fisheye side cameras (KITTI-360)
  FMCAM_L: { kind: 'camera', x: -1.0, y: 0.4, yaw: -90, fov: 180, label: 'fisheye left' },
  FMCAM_R: { kind: 'camera', x: 1.0, y: 0.4, yaw: 90, fov: 180, label: 'fisheye right' },
  // f-theta cameras (NVIDIA Hyperion)
  FTCAM_F0: { kind: 'camera', x: 0, y: 1.9, yaw: 0, fov: 120, label: 'front wide' },
  FTCAM_TELE_F0: { kind: 'camera', x: 0, y: 1.6, yaw: 0, fov: 30, label: 'front tele' },
  FTCAM_L0: { kind: 'camera', x: -1.0, y: 0.6, yaw: -90, fov: 120, label: 'cross left' },
  FTCAM_R0: { kind: 'camera', x: 1.0, y: 0.6, yaw: 90, fov: 120, label: 'cross right' },
  FTCAM_L1: { kind: 'camera', x: -0.9, y: -1.0, yaw: -135, fov: 70, label: 'rear left' },
  FTCAM_R1: { kind: 'camera', x: 0.9, y: -1.0, yaw: 135, fov: 70, label: 'rear right' },
  FTCAM_TELE_B0: { kind: 'camera', x: 0, y: -2.0, yaw: 180, fov: 30, label: 'rear tele' },
  // LiDARs
  LIDAR_TOP: { kind: 'lidar', x: 0, y: 0.2, label: 'top' },
  LIDAR_DOWN: { kind: 'lidar', x: 0, y: -0.3, label: 'top (lower)' },
  LIDAR_FRONT: { kind: 'lidar', x: 0, y: 2.1, label: 'front' },
  LIDAR_BACK: { kind: 'lidar', x: 0, y: -2.2, label: 'rear' },
  LIDAR_SIDE_LEFT: { kind: 'lidar', x: -1.05, y: 0.9, label: 'side left' },
  LIDAR_SIDE_RIGHT: { kind: 'lidar', x: 1.05, y: 0.9, label: 'side right' },
  LIDAR_FRONT_LEFT: { kind: 'lidar', x: -0.95, y: 1.9, label: 'front left' },
  LIDAR_FRONT_RIGHT: { kind: 'lidar', x: 0.95, y: 1.9, label: 'front right' },
  // Radars
  RADAR_FRONT: { kind: 'radar', x: 0, y: 2.25, label: 'front' },
  RADAR_FRONT_LEFT: { kind: 'radar', x: -0.9, y: 2.1, label: 'front left' },
  RADAR_FRONT_RIGHT: { kind: 'radar', x: 0.9, y: 2.1, label: 'front right' },
  RADAR_BACK_LEFT: { kind: 'radar', x: -0.9, y: -2.1, label: 'rear left' },
  RADAR_BACK_RIGHT: { kind: 'radar', x: 0.9, y: -2.1, label: 'rear right' },
  RADAR_BACK: { kind: 'radar', x: 0, y: -2.25, label: 'rear' },
};
