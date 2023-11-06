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
      pdf.setFillColor('#151E3F');
      pdf.setTextColor('#FFFFFF');
      pdf.rect(0, 0, 210, 297, 'F');
      pdf.addImage('/src/assets/WTM_Logo-2.png', 'PNG', 10, 10, 190, 125);
      pdf.text(pdfContent, 10, 150);

      const fileChooser = document.createElement('a');
      fileChooser.href = 'data:application/pdf;base64,' + btoa(pdf.output());
      fileChooser.download = 'transcript.pdf';
      fileChooser.click();
    }
  };
};
