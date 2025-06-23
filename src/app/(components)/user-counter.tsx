"use client";

import { use } from "react";
import { Users } from "lucide-react";
import { SocketContext } from "../contexts/socket-context";

export function UserCounter() {
  const { userCount, loading } = use(SocketContext);

  if (loading || userCount === 0) return null;

  const message =
    userCount === 1 ? "1 active user" : `${userCount} active users`;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20 backdrop-blur-sm">
      <Users size={20} />
      <span>{message}</span>
    </div>
  );
}
