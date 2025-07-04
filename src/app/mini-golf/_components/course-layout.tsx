import { RigidBody } from "@react-three/rapier";
import { Box } from "@react-three/drei";
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

function CourseWithHole() {
  "use memo";

  const getGeometry = () => {
    // Create a rectangular shape for the course
    const shape = new THREE.Shape();
    shape.moveTo(-10, -6);
    shape.lineTo(10, -6);
    shape.lineTo(10, 6);
    shape.lineTo(-10, 6);
    shape.lineTo(-10, -6);

    // Create a circular hole at position [8, 0, 0] with radius 0.75
    const hole = new THREE.Path();
    hole.absarc(8, 0, 0.75, 0, Math.PI * 2, false);
    shape.holes.push(hole);

    // Create geometry from the shape
    const geometry = new THREE.ShapeGeometry(shape);
    return geometry;
  };

  const geometry = getGeometry();

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        material={gradientMaterial}
      />
    </RigidBody>
  );
}

function CourseBorder() {
  "use memo";

  const borderHeight = 0.8;
  const borderThickness = 0.5;

  return (
    <>
      {/* Four straight walls meeting at corners */}
      {/* Right wall */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box
          args={[borderThickness, borderHeight, 12.5]}
          position={[10, borderHeight / 2, 0]}
        >
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>

      {/* Left wall */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box
          args={[borderThickness, borderHeight, 12.5]}
          position={[-10, borderHeight / 2, 0]}
        >
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>

      {/* Top wall */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box
          args={[20, borderHeight, borderThickness]}
          position={[0, borderHeight / 2, 6]}
        >
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>

      {/* Bottom wall */}
      <RigidBody
        type="fixed"
        colliders="cuboid"
        restitution={1.2}
        friction={0.1}
      >
        <Box
          args={[20, borderHeight, borderThickness]}
          position={[0, borderHeight / 2, -6]}
        >
          <meshLambertMaterial color="#ffffff" />
        </Box>
      </RigidBody>
    </>
  );
}

export function CourseLayout({ resetKey }: CourseLayoutProps) {
  "use memo";
  const obstacles = generateRandomObstacles(3);

  return (
    <>
      <CourseWithHole />
      <CourseBorder />

      {/* Random obstacles */}
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
    </>
  );
}
