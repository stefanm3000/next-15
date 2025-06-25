import * as THREE from "three";

interface AimingLineProps {
  start: THREE.Vector3;
  direction: THREE.Vector3;
  opacity?: number;
  power?: number;
}

export function AimingLine({
  start,
  direction,
  opacity = 1,
  power = 0.5,
}: AimingLineProps) {
  const baseLength = 3;
  const length = baseLength * (0.5 + power); // Scale length based on power
  const dashCount = 3;
  const totalGapSize = length * 0.4;
  const totalDashSize = length - totalGapSize;
  const dashSize = totalDashSize / dashCount;
  const gapSize = totalGapSize / (dashCount - 1);

  const color = new THREE.Color();
  color.r = power;
  color.g = 1 - power * 0.8;
  color.b = 0;

  const directionCopy = direction.clone().normalize().multiplyScalar(length);
  const end = start.clone().add(directionCopy);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [start.x, 0.2, start.z, end.x, 0.2, end.z],
      3,
    ),
  );

  const material = new THREE.LineDashedMaterial({
    color,
    dashSize,
    gapSize,
    opacity,
    transparent: true,
  });

  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();

  return <primitive object={line} />;
}
