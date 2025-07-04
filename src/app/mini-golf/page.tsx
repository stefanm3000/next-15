"use client";

import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import MiniGolfGame from "./_components/mini-golf";

function LoadingScreen() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-black/80 text-white  rounded-lg px-4 py-2">
        loading...
      </div>
    </div>
  );
}

export default function MiniGolfPage() {
  "use memo";

  const [isLoading, setIsLoading] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  return (
    <div className="w-full h-[calc(100dvh-20rem)] rounded relative">
      <button
        onClick={() => setResetKey(resetKey + 1)}
        className="absolute top-2 right-2 z-20 p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white  text-sm cursor-pointer"
      >
        reset
      </button>
      {isLoading && <LoadingScreen />}
      <div
        className={`w-full h-full transition-opacity rounded-lg overflow-hidden duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <Canvas
          camera={{ position: [0, 8, 12], fov: 75 }}
          onCreated={() => setIsLoading(false)}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <MiniGolfGame key={resetKey} />
        </Canvas>
      </div>
    </div>
  );
}
