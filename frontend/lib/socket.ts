'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

let socket: Socket | null = null;

export function useSocket() {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      socket = io(SOCKET_URL, {
        autoConnect: true,
      });
    }

    setSocketInstance(socket);

    return () => {
      // Keep connection alive across component remounts
    };
  }, []);

  return socketInstance;
}
