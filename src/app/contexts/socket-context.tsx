"use client";

import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  userCount: number;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  userCount: 0,
});

const getSocketUrl = () => {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = process.env.NEXT_PUBLIC_WEBSOCKET_HOST || window.location.host;
  return `${protocol}//${host}`;
};

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const socketInstance = io(getSocketUrl(), {
      transports: ["websocket"],
      path: "/api/socket",
    });

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("userCount", (count: number) => {
      setUserCount(count);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, userCount }}>
      {children}
    </SocketContext.Provider>
  );
}
