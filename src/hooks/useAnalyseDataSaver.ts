import {jsPDF} from 'jspdf';
import {Analyse} from '../communication/Types';

export default () => {
  return {
    saveToPdf: (analyse: Analyse): void => {
      const dataToDisplay : {[key: string]: string} = {
        'Analyse Details': '',
        'Name': analyse.name,
        'Start date': analyse.start_date,
        'Finish date': analyse.finish_date,
        'Status': analyse.status,
        'Full transcription': analyse.full_transcription,
        'Video summary': analyse.video_summary,
        'Author attitude': analyse.author_attitude,
      };

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const interline = 2;

      const imageWidth = pageWidth - 2 * margin;
      const imageHeight = 125;

      const pdf = new jsPDF();
      pdf.setFillColor('#151E3F');
      pdf.setTextColor('#FFFFFF');
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
      pdf.addImage('/src/assets/WTM_Logo-2.png', 'PNG', margin, margin, imageWidth, imageHeight);

      const textHeight = pdf.getLineHeight() / 2;

      let reservedPageHeight = imageHeight + 2 * margin;
      Object.keys(dataToDisplay).forEach((key: string) => {
        const lines = pdf.splitTextToSize(`${key}: ${dataToDisplay[key]}`, pageWidth - 2 * margin);

        lines.forEach((line: string) => {
          if (reservedPageHeight + textHeight > pageHeight) {
            pdf.addPage();
            pdf.setFillColor('#151E3F');
            pdf.setTextColor('#FFFFFF');
            pdf.rect(0, 0, pageWidth, pageHeight, 'F');
            reservedPageHeight = 2 * margin;
          }
          pdf.text(line, margin, reservedPageHeight - margin);
          reservedPageHeight += textHeight;
        });
        reservedPageHeight += interline;
      });

      const fileChooser = document.createElement('a');
      fileChooser.href = 'data:application/pdf;base64,' + btoa(pdf.output());
      fileChooser.download = 'analyse.pdf';
      fileChooser.click();
    }
  };
};
