import {socket} from "./Socket";

export default () => {
  const startAnal = (uuid: string): void => {
    socket.emit('analyse', uuid)
  };

  return {
    startAnal
  };
};
