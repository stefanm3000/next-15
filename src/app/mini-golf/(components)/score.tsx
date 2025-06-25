import { Html } from "@react-three/drei";

interface ScoreUIProps {
  strokes: number;
  gameComplete: boolean;
  onReset: () => void;
}

export function ScoreUI({ strokes, gameComplete, onReset }: ScoreUIProps) {
  return (
    <Html position={[4, 4, 10]} center>
      {gameComplete ? (
        <div
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            padding: "20px",
            borderRadius: "10px",
            color: "white",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <h2 style={{ margin: "0 0 10px 0", fontSize: "24px" }}>SCORE!</h2>
          <p style={{ margin: "0 0 15px 0" }}>
            Completed in {strokes} {strokes === 1 ? "stroke" : "strokes"}!
          </p>
          <button
            onClick={onReset}
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            width: "150px",
            flexWrap: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "rgba(0, 0, 0, 0.8)",
            padding: "10px",
            borderRadius: "5px",
            color: "white",
            fontFamily: "Arial, sans-serif",
          }}
        >
          shots taken: {strokes}
        </div>
      )}
    </Html>
  );
}
