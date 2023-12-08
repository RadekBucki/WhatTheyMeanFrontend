import {useState, useEffect} from 'react';
import {socket} from './Socket';

export interface SocketContainerInterface {
  socketContainer: SocketContainer
}

export interface SocketContainer {
  isConnected: boolean;
  progress: string;
  resetSockets: () => void;
}

export const useSocketContainer: () => SocketContainer = () => {
  const [progress, setProgress] = useState('0');
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onProgress(value: string) {
      setProgress(value);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('progress', onProgress);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('progress', onProgress);
    };
  }, []);

  function resetSockets() {
    setProgress('0');
  }

  return {
    isConnected,
    progress,
    resetSockets
  };
};

export default useSocketContainer;
