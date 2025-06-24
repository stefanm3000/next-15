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
      {children}
    </div>
  );
}
