
import {Analyse} from "../communication/Types";

export default () => {
  return {
    requestPermission: async (): Promise<void> => {
      await Notification.requestPermission();
    },
    sendSystemNotification: async (analyse: Analyse): Promise<void> => {
      if (Notification.permission === 'granted') {
        new Notification(`Analyse ${analyse.name} updated`, {
          body: `Status: ${analyse.status}`,
          lang: 'en',
        });
      } else {
        alert(`Analyse ${analyse.name} Status updated: ${analyse.status}.\n\n Please enable notifications in your browser settings.`);
      }
    }
  };
};
