import { RigidBody, CylinderCollider } from "@react-three/rapier";
import * as THREE from "three";

export function Course() {
  "use memo";
  return (
    <group position={[8, 0, 0]}>
      {/* Visual hole rim */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.75, 0.8, 32]} />
        <meshLambertMaterial color="#ffffff" side={THREE.DoubleSide} />
      </mesh>

      {/* Inner transparent hole opening */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial
          color="#000000"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.1}
        />
      </mesh>

      {/* Visual cylinder hole - much lighter */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry
          args={[0.75, 0.75, 1, 32, 1, false, 0, Math.PI * 2]}
        />
        <meshLambertMaterial
          color="#b8b8b8"
          side={THREE.DoubleSide}
          transparent={true}
          opacity={0.4}
        />
      </mesh>

      {/* Physics cylinder walls extending to bottom */}
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider
          args={[0.5, 0.75]}
          position={[0, -1, 0]}
          rotation={[0, 0, 0]}
        />
      </RigidBody>

      {/* Physics bottom to catch the ball */}
      <RigidBody type="fixed" colliders={false}>
        <CylinderCollider
          args={[0.05, 0.75]}
          position={[0, -1.45, 0]}
          rotation={[0, 0, 0]}
        />
      </RigidBody>
    </group>
  );
}
