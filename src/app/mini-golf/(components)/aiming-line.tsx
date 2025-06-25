import * as THREE from "three";

interface AimingLineProps {
  start: THREE.Vector3;
  direction: THREE.Vector3;
  opacity?: number;
}

export function AimingLine({ start, direction, opacity = 1 }: AimingLineProps) {
  const fixedLength = 3;
  const dashCount = 3;
  const totalGapSize = fixedLength * 0.4;
  const totalDashSize = fixedLength - totalGapSize;
  const dashSize = totalDashSize / dashCount;
  const gapSize = totalGapSize / (dashCount - 1);

  const directionCopy = direction
    .clone()
    .normalize()
    .multiplyScalar(fixedLength);
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
    color: "#ffffff",
    dashSize,
    gapSize,
    opacity,
    transparent: true,
  });

  const line = new THREE.Line(geometry, material);
  line.computeLineDistances();

  return <primitive object={line} />;
}
