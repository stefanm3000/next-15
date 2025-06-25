import { RigidBody, CylinderCollider } from "@react-three/rapier";
import * as THREE from "three";

interface CourseProps {
  onBallInHole: () => void;
}

export function Course({ onBallInHole }: CourseProps) {
  return (
    <group position={[8, 0, 0]}>
      {/* Visual hole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.75, 0.8, 32]} />
        <meshLambertMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Sensor collider */}
      <RigidBody type="fixed" sensor onIntersectionEnter={onBallInHole}>
        <CylinderCollider args={[0.1, 0.8]} />
      </RigidBody>
    </group>
  );
}
