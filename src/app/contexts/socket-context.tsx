"use client";

import { createContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  userCount: number;
  loading: boolean;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  userCount: 0,
  loading: true,
});

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/socket")
      .then(() => {
        const socketUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin;

        const socketInstance = io(socketUrl, {
          transports: ["websocket", "polling"],
          autoConnect: true,
        });

        socketInstance.on("connect", () => {
          console.log("Connected to WebSocket server");
        });

        socketInstance.on("connect_error", (error) => {
          console.error("Socket connection error:", error);
        });

        socketInstance.on("userCount", (count: number) => {
          setUserCount(count);
        });

        setSocket(socketInstance);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to initialize WebSocket server:", err);
        setLoading(false);
      });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={{ socket, userCount, loading }}>
      {children}
    </SocketContext.Provider>
  );
}
