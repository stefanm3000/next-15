import { Server } from "socket.io";
import { NextResponse } from "next/server";

let activeConnections = 0;
let io: Server | null = null;

const corsOrigin =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_APP_URL);

if (!io) {
  io = new Server({
    cors: {
      origin: corsOrigin,
      methods: ["GET", "POST"],
    },
    path: "/api/socket",
  });

  io.on("connection", (socket) => {
    activeConnections++;
    io?.emit("userCount", activeConnections);

    socket.on("disconnect", () => {
      activeConnections--;
      io?.emit("userCount", activeConnections);
    });
  });
}

export async function GET() {
  if (io && !io.engine) {
    io.listen(3001);
  }

  return NextResponse.json({
    success: true,
    connections: activeConnections,
  });
}
