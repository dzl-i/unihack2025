"use client";

import { useEffect, useState } from "react";
import socket from "../socket";

export type SocketConnectionEvents = [string, (...args: any[]) => void];

export default function useSocket(connectionEvents: SocketConnectionEvents[]) {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    connectionEvents.forEach(([event, eventFn]) => {
      socket.on(event, eventFn);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, isConnected };
}
