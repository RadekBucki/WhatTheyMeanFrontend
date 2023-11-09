import {TranscriptData} from '../types';

export default () => {
  return {
    requestPermission: async (): Promise<void> => {
      await Notification.requestPermission();
    },
    sendSystemNotification: async (transcription: TranscriptData): Promise<void> => {
      if (Notification.permission === 'granted') {
        new Notification(`Transcript ${transcription.name} updated`, {
          body: `Status: ${transcription.status}`,
          lang: 'en',
        });
      } else {
        alert(`Transcript ${transcription.name} Status updated: ${transcription.status}.\n\n Please enable notifications in your browser settings.`);
      }
    }
  };
};
