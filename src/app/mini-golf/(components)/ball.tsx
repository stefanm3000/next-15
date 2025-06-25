import { ThreeEvent } from "@react-three/fiber";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

interface BallProps {
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void;
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void;
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void;
  ref: React.RefObject<RapierRigidBody | null>;
}

export const Ball = ({
  onPointerDown,
  onPointerMove,
  onPointerUp,
  ref,
}: BallProps) => {
  return (
    <RigidBody
      ref={ref}
      position={[-8, 0.2, 0]}
      colliders="ball"
      restitution={0.7}
      friction={0.2}
      linearDamping={0.5}
      angularDamping={0.5}
    >
      <mesh
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshLambertMaterial color="#ffffff" />
      </mesh>
    </RigidBody>
  );
};

export { type RapierRigidBody };
