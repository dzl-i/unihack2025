"use client";

import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
  withCredentials: true,
});

export default socket;