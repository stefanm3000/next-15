import { Html } from "@react-three/drei";

interface ScoreUIProps {
  strokes: number;
  gameComplete: boolean;
  onReset: () => void;
}

export function ScoreUI({ strokes, gameComplete, onReset }: ScoreUIProps) {
  if (gameComplete)
    return (
      <Html position={[8, 1.5, 0]} center>
        <div className="bg-black/80 p-4 rounded-md text-white text-center backdrop-blur-lg border border-white/20 opacity-80 w-[250px] flex flex-col items-center justify-center">
          <h2 className="mb-2 text-2xl">👏</h2>
          <p className="mb-4">
            completed in {strokes} {strokes === 1 ? "shot" : "shots"}
          </p>
          <button
            onClick={onReset}
            className="cursor-pointer bg-white text-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300"
          >
            play again
          </button>
        </div>
      </Html>
    );
}
