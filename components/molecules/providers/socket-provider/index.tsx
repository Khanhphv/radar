"use client";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketContextIntercae {
  socket: Socket;
  setSocket: (val: Socket) => void;
}

const SocketContext = createContext<SocketContextIntercae | undefined>(
  undefined
);

const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    return {
      socket: null,
      setSocket: null,
    };
  }
  return context;
};

export { useSocket, SocketContext };
