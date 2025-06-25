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
  const baseLength = 1.5;
  const length = baseLength * (0.3 + power * 1.7);
  const dotCount = Math.max(3, Math.min(8, Math.ceil(power * 8))); // More dots for longer lines

  const dots = [];
  const baseRadius = 0.15;
  const color = new THREE.Color("#ffffff");
  const normalizedDirection = direction.clone().normalize();

  for (let i = 0; i < dotCount; i++) {
    const t = i / (dotCount - 1); // Position along the line (0 to 1)
    const position = start
      .clone()
      .add(normalizedDirection.clone().multiplyScalar(length * t));

    const dotOpacity = opacity * (1 - t * 0.9);
    const dotRadius = baseRadius * (1 - t * 0.7);
    const sphereGeometry = new THREE.SphereGeometry(dotRadius, 8, 8);

    const material = new THREE.MeshBasicMaterial({
      color,
      opacity: dotOpacity,
      transparent: true,
    });

    dots.push(
      <mesh
        key={i}
        geometry={sphereGeometry}
        material={material}
        position={[position.x, 0.2, position.z]}
      />,
    );
  }

  return <group>{dots}</group>;
}
