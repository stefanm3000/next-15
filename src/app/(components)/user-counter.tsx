"use client";

import { use } from "react";
import { Users } from "lucide-react";
import { SocketContext } from "../contexts/socket-context";

export function UserCounter() {
  const { userCount } = use(SocketContext);

  const message =
    userCount === 1 ? "1 active user" : `${userCount} active users`;

  return (
    <div className="fixed top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg flex items-center gap-2 border border-white/20 backdrop-blur-sm">
      <Users size={20} />
      <span>{message}</span>
    </div>
  );
}
