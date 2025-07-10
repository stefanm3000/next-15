import { unstable_ViewTransition as ViewTransition } from "react";
import { ConvexClientProvider } from "../comments/_components/convex-client-provider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ViewTransition name="chat">
        <h1 className="text-2xl font-bold">chat</h1>
      </ViewTransition>
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </div>
  );
}
