import {socket} from "./Socket";

export interface SocketHook {
  startAnal: (uuid: string) => void;
}

export const useSocketHooks = (): SocketHook => {
  const startAnal = (uuid: string): void => {
    socket.emit('analyse', uuid)
  };

  return {
    startAnal
  };
};

export default useSocketHooks
