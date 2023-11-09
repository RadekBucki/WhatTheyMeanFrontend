import React, {useState, useEffect} from 'react';
import {socket} from "./Socket";

export const UseSocketContainer: () => { isConnected: boolean; progress: string } = () => {
  const [progress, setProgress] = useState("0");
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
    socket.on("progress", onProgress);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('progress', onProgress);
    };
  }, []);

  return {
    isConnected,
    progress
  };
};

export default UseSocketContainer
