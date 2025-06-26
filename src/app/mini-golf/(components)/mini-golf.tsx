"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";

import { GameState } from "./types";
import { backgroundMaterial } from "./materials";
import { AimingLine } from "./aiming-line";
import { Ball } from "./ball";
import { Course } from "./course";
import { CourseLayout } from "./course-layout";
import { ScoreUI } from "./score";

const INITIAL_CAMERA_POSITION = new THREE.Vector3(-12, 4, 2);
const INITIAL_CAMERA_TARGET = new THREE.Vector3(0, 0, 0);
const INITIAL_BALL_POSITION = new THREE.Vector3(-8, 0.2, 0);

export default function MiniGolfGame() {
  "use memo";
  const ballRef = useRef<RapierRigidBody>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const [resetKey, setResetKey] = useState(0);

  // Set initial camera position
  useEffect(() => {
    camera.position.copy(INITIAL_CAMERA_POSITION);
    camera.lookAt(INITIAL_CAMERA_TARGET);
  }, [camera]);

  const [ballPosition, setBallPosition] = useState<THREE.Vector3>(
    INITIAL_BALL_POSITION.clone(),
  );

  const [gameState, setGameState] = useState<GameState>({
    strokes: 0,
    gameComplete: false,
    isAiming: false,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [aimDirection, setAimDirection] = useState<THREE.Vector3>(
    new THREE.Vector3(1, 0, 0),
  );

  useFrame(() => {
    if (!ballRef.current) return;

    // Update ball position from physics
    const physicsPosition = ballRef.current.translation();
    const newPosition = new THREE.Vector3(
      physicsPosition.x,
      physicsPosition.y,
      physicsPosition.z,
    );
    setBallPosition(newPosition);

    // Update controls target to follow ball
    if (controlsRef.current) {
      controlsRef.current.target.copy(newPosition);
      controlsRef.current.update();
    }
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (!ballRef.current) return;
    const velocity = ballRef.current.linvel();
    if (Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z) > 0.1)
      return;

    event.stopPropagation();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    setGameState((prev) => ({ ...prev, isAiming: true }));
    setIsDragging(true);
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !ballRef.current) return;
    const velocity = ballRef.current.linvel();
    if (Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z) > 0.1)
      return;

    // Project pointer ray onto ground plane (y = 0)
    const { origin, direction } = event.ray;
    const t = -origin.y / direction.y;
    const hitPoint = origin.clone().add(direction.clone().multiplyScalar(t));

    // Current ball position from physics
    const ballPos = ballRef.current.translation();
    const ballVec = new THREE.Vector3(ballPos.x, 0, ballPos.z);

    // Vector from ball to cursor
    const dragVector = hitPoint.clone().setY(0).sub(ballVec);
    const arrowDir = dragVector.clone().multiplyScalar(-1).normalize();

    setDragDistance(dragVector.length());
    setAimDirection(arrowDir);
  };

  const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
    if (!isDragging || !ballRef.current) return;
    const velocity = ballRef.current.linvel();
    if (Math.sqrt(velocity.x * velocity.x + velocity.z * velocity.z) > 0.1)
      return;

    event.stopPropagation();
    (event.target as HTMLElement).releasePointerCapture(event.pointerId);

    const power = Math.min(dragDistance / 5, 1);

    ballRef.current.applyImpulse(
      {
        x: aimDirection.x * power * 2,
        y: 0,
        z: aimDirection.z * power * 2,
      },
      true,
    );

    setGameState((prev) => ({
      ...prev,
      isAiming: false,
      strokes: prev.strokes + 1,
    }));
    setIsDragging(false);

    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  const resetGame = () => {
    if (!ballRef.current) return;

    // Reset ball position and physics
    ballRef.current.setTranslation(
      {
        x: INITIAL_BALL_POSITION.x,
        y: INITIAL_BALL_POSITION.y,
        z: INITIAL_BALL_POSITION.z,
      },
      true,
    );
    ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

    // Reset game state
    setGameState({
      strokes: 0,
      gameComplete: false,
      isAiming: false,
    });

    // Reset camera and controls
    camera.position.copy(INITIAL_CAMERA_POSITION);
    if (controlsRef.current) {
      controlsRef.current.target.copy(INITIAL_CAMERA_TARGET);
      controlsRef.current.enabled = true;
      controlsRef.current.update();
    }

    // Reset UI states
    setDragDistance(0);
    setIsDragging(false);
    setBallPosition(INITIAL_BALL_POSITION.clone());

    // Regenerate obstacles
    setResetKey((prev) => prev + 1);
  };

  const handleBallInHole = () => {
    if (gameState.gameComplete) return;

    setGameState((prev) => ({ ...prev, gameComplete: true }));
    if (ballRef.current) {
      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  return (
    <>
      <Physics gravity={[0, -9.81, 0]}>
        {/* Background sphere */}
        <mesh>
          <sphereGeometry args={[100, 32, 32]} />
          <primitive object={backgroundMaterial} />
        </mesh>

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={2}
          maxDistance={15}
          target={ballPosition}
        />

        <CourseLayout resetKey={resetKey} />
        <Course onBallInHole={handleBallInHole} />

        <Ball
          ref={ballRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        {isDragging && (
          <AimingLine
            start={new THREE.Vector3(ballPosition.x, 0.2, ballPosition.z)}
            direction={aimDirection}
            opacity={Math.max(0.2, 1 - dragDistance / 10)}
            power={Math.min(dragDistance / 5, 1)}
          />
        )}

        <ScoreUI
          strokes={gameState.strokes}
          gameComplete={gameState.gameComplete}
          onReset={resetGame}
        />
      </Physics>
    </>
  );
}
