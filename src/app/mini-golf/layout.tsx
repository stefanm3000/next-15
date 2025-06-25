import { unstable_ViewTransition as ViewTransition } from "react";

export default function MiniGolfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ViewTransition name="mini-golf">
        <h1 className="text-2xl font-bold mb-8 text-white font-mono">
          mini-golf
        </h1>
      </ViewTransition>
      <p className="text-white font-mono mb-2 text-sm">
        a mini-golf game built with @react-three/fiber, @react/three-rapier.
        drag the ball back and release to shoot. obstacles are randomly
        generated
      </p>
      {children}
    </div>
  );
}
