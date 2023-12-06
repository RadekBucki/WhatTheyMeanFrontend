import {jsPDF} from 'jspdf';
import {Analyse} from '../communication/Types';

export default () => {
  return {
    saveToPdf: (analyse: Analyse): void => {
      const attributes : {[key: string]: string} = {
        'Name': analyse.name,
        'Start date': analyse.start_date,
        'Finish date': analyse.finish_date,
        'Status': analyse.status,
        'Full transcription': analyse.full_transcription,
        'Video summary': analyse.video_summary,
        'Author attitude': analyse.author_attitude,
      };
      let pdfContent: string = 'Analyse Details:\n';
      Object.keys(attributes).forEach((key: string) => {
        let attributeLines: string = key + ': ' + attributes[key];

        // break line after first space after 62 characters
        attributeLines = attributeLines.replace(/(.{62}) /g, '$1\n');

        pdfContent = pdfContent.concat(attributeLines + '\n');
      });

      const pdf = new jsPDF();
      pdf.setFillColor('#151E3F');
      pdf.setTextColor('#FFFFFF');
      pdf.rect(0, 0, 210, 297, 'F');
      pdf.addImage('/src/assets/WTM_Logo-2.png', 'PNG', 10, 10, 190, 125);
      pdf.text(pdfContent, 10, 150);

      const fileChooser = document.createElement('a');
      fileChooser.href = 'data:application/pdf;base64,' + btoa(pdf.output());
      fileChooser.download = 'analyse.pdf';
      fileChooser.click();
    }
  };
};
