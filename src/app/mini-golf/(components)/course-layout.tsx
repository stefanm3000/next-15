import { RigidBody } from "@react-three/rapier";
import { Plane, Box } from "@react-three/drei";
import { gradientMaterial } from "./materials";
import * as THREE from "three";

interface Obstacle {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
}

interface CourseLayoutProps {
  resetKey: number;
}

function generateRandomObstacles(count: number): Obstacle[] {
  return Array.from({ length: count }, () => {
    const x = Math.random() * 12 - 4;
    const z = Math.random() * 10 - 5;

    const rotation = Math.random() * Math.PI;
    const length = 2 + Math.random() * 2;

    return {
      position: [x, 0.25, z] as [number, number, number],
      rotation: [0, rotation, 0] as [number, number, number],
      length,
    };
  });
}

export function CourseLayout({ resetKey }: CourseLayoutProps) {
  "use memo";
  const obstacles = generateRandomObstacles(3);

  return (
    <>
      <RigidBody type="fixed">
        <Plane
          args={[20, 12]}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          material={gradientMaterial}
        />
      </RigidBody>

      <group position={[8, 0, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
          <ringGeometry args={[0.75, 0.8, 32]} />
          <meshLambertMaterial color="#ffffff" side={THREE.DoubleSide} />
        </mesh>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[0.75, 32]} />
          <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
        </mesh>
      </group>

      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box args={[0.5, 0.5, 12]} position={[10, 0.25, 0]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box args={[0.5, 0.5, 12]} position={[-10, 0.25, 0]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box args={[20, 0.5, 0.5]} position={[0, 0.25, 6]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box args={[20, 0.5, 0.5]} position={[0, 0.25, -6]}>
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>

      {obstacles.map((obstacle, index) => (
        <RigidBody
          key={`${resetKey}-${index}`}
          type="fixed"
          colliders="cuboid"
          restitution={1.0}
          friction={0.2}
        >
          <Box
            args={[obstacle.length, 0.5, 0.3]}
            position={obstacle.position}
            rotation={obstacle.rotation}
          >
            <meshLambertMaterial color="#ffffff" />
          </Box>
        </RigidBody>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[8, -1, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
