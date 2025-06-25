import { RigidBody } from "@react-three/rapier";
import { Plane, Box } from "@react-three/drei";
import { gradientMaterial } from "./materials";

export function CourseLayout() {
  return (
    <>
      {/* Ground */}
      <RigidBody type="fixed" colliders="cuboid">
        <Plane
          args={[20, 12]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          material={gradientMaterial}
        />
      </RigidBody>

      {/* Walls */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[0.2, 0.5, 12]} position={[10, 0.25, 0]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[0.2, 0.5, 12]} position={[-10, 0.25, 0]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[20, 0.5, 0.2]} position={[0, 0.25, 6]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid">
        <Box args={[20, 0.5, 0.2]} position={[0, 0.25, -6]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
    </>
  );
}
