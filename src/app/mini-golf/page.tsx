import { Metadata } from "next";
import MiniGolfClientPage from "./_components/client-page";

export const metadata: Metadata = {
  title: "next 15 | mini golf",
  description: "mini golf game made with react three fiber and rapier",
};

export default function MiniGolfPage() {
  return <MiniGolfClientPage />;
}
