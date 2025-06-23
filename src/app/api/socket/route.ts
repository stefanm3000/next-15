"use server";

import { Server } from "socket.io";
import { NextResponse } from "next/server";

let activeConnections = 0;
let io: Server | null = null;

function initializeSocketServer() {
  if (!io) {
    io = new Server({
      cors: {
        origin:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : process.env.NEXT_PUBLIC_APP_URL || "*",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      activeConnections++;

      io?.emit("userCount", activeConnections);

      socket.on("disconnect", () => {
        activeConnections--;
        io?.emit("userCount", activeConnections);
      });
    });

    if (process.env.NODE_ENV === "development") {
      io.listen(3001);
    } else {
      const port = process.env.SOCKET_PORT || process.env.PORT || 3001;
      io.listen(Number(port));
    }
  }
}

export async function GET() {
  try {
    initializeSocketServer();

    return NextResponse.json({
      success: true,
      connections: activeConnections,
      serverRunning: !!io,
    });
  } catch (error) {
    console.error("Error initializing Socket.IO server:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize Socket.IO server",
      },
      { status: 500 },
    );
  }
}
