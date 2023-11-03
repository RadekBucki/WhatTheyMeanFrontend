import {TranscriptData} from '../types';
import {jsPDF} from 'jspdf';

export default () => {
  return {
    saveToPdf: (transcript: TranscriptData): void => {
      const pdfContent: string = `
                Transcript Details:
                Name: ${transcript.name}
                Start Date: ${transcript.start_date}
                Status: ${transcript.status}
                Duration: ${transcript.duration}
            `;

      const pdf = new jsPDF();
      pdf.text(pdfContent, 10, 10);

      const fileChooser = document.createElement('a');
      fileChooser.href = 'data:application/pdf;base64,' + btoa(pdf.output());
      fileChooser.download = 'transcript.pdf';
      fileChooser.click();
    }
  };
};
