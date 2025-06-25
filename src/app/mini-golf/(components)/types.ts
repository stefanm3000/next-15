import * as THREE from "three";

export interface GameState {
  strokes: number;
  gameComplete: boolean;
  isAiming: boolean;
}

export interface BallState {
  position: THREE.Vector3;
  isDragging: boolean;
  dragDistance: number;
  aimDirection: THREE.Vector3;
}
