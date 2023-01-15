import { createContext, useContext } from "react";

export type ServerStatus = "on" | "off" | "unknown";

export type LiliContextContent = {
  serverStatus: ServerStatus;
  setServerStatus: (status: ServerStatus) => void;
};

export const LiliContext = createContext<LiliContextContent>({
  serverStatus: "unknown",
  setServerStatus: (status: ServerStatus) => {},
});

export const useLiliContext = () => useContext(LiliContext);
