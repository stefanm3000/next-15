import { RigidBody, CylinderCollider } from "@react-three/rapier";
import * as THREE from "three";

interface CourseProps {
  onBallInHole: () => void;
}

export function Course({ onBallInHole }: CourseProps) {
  "use memo";
  return (
    <group position={[8, 0, 0]}>
      {/* Visual hole rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.75, 0.8, 32]} />
        <meshLambertMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Inner black hole */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>

      {/* Invisible funnel to guide the ball */}
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider
          args={[0.5, 0.75]}
          position={[0, -0.25, 0]}
          rotation={[0, 0, 0]}
          sensor
          onIntersectionEnter={onBallInHole}
        />
      </RigidBody>
    </group>
  );
}
