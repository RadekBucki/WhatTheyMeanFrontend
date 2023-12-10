import {act, renderHook} from '@testing-library/react';
import useTranscriptDataSaver from '../../src/hooks/useAnalyseDataSaver';
import {Analyse} from "../../src/communication/Types";

const mockJsPDF = {
  setFillColor: jest.fn(),
  setTextColor: jest.fn(),
  getLineHeight: jest.fn(() => 16),
  splitTextToSize: jest.fn((text: string, width: number) => {
    return text.match(/.{1,62}(\s|$)/g);
  }),
  rect: jest.fn(),
  addImage: jest.fn(),
  text: jest.fn(),
  output: jest.fn(() => 'mocked-pdf-output'),
};

jest.mock('jspdf', () => {
  return {
    jsPDF: jest.fn(() => mockJsPDF),
  }
});

describe('useTranscriptDataSaver', () => {
  it('should save transcript data to PDF', () => {
    const mockAnalyse: Analyse = {
      uuid: '1',
      name: 'Analyse 1',
      start_date: '2023-04-21 13:45:00',
      finish_date: '2023-04-21 13:48:00',
      status: 'Success',
      file_type: 'mp4',
      link: 'https://www.youtube.com/watch?v=1',
      raw_file: 'base64',
      full_transcription: 'Full transcription',
      video_summary: 'Video summary',
      author_attitude: 'Author attitude',
    };

    const {result} = renderHook(() => useTranscriptDataSaver());

    act(() => {
      result.current.saveToPdf(mockAnalyse);
    });

    expect(mockJsPDF.setFillColor).toHaveBeenCalledWith(expect.stringMatching(/#([0-9a-f]{3}){1,2}\b/i));
    expect(mockJsPDF.setTextColor).toHaveBeenCalledWith(expect.stringMatching(/#([0-9a-f]{3}){1,2}\b/i));
    expect(mockJsPDF.rect).toHaveBeenCalledWith(0, 0, 210, 297, 'F');
    expect(mockJsPDF.addImage).toHaveBeenCalledWith(expect.anything(), 'PNG', 10, 10, 190, 125);

    expect(mockJsPDF.text).toHaveBeenCalledWith('Analyse Details: ', 10, 135);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Name: Analyse 1', 10, 145);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Start date: 2023-04-21 13:45:00', 10, 155);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Finish date: 2023-04-21 13:48:00', 10, 165);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Status: Success', 10, 175);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Full transcription: Full transcription', 10, 185);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Video summary: Video summary', 10, 195);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Author attitude: Author attitude', 10, 205);
    expect(mockJsPDF.output).toHaveBeenCalled();


    jest.clearAllMocks();
    jest.unmock('jspdf');
  });

  it('should save transcript data to PDF with breaklines if attribute + label has more than page width', () => {
    const mockAnalyse: Analyse = {
      uuid: '1',
      name: 'Analyse 1',
      start_date: '2023-04-21 13:45:00',
      finish_date: '2023-04-21 13:48:00',
      status: 'Success',
      file_type: 'mp4',
      link: 'https://www.youtube.com/watch?v=1',
      raw_file: 'base64',
      full_transcription: 'Very long full transcription with more than 62 characters to test breaklines',
      video_summary: 'Very long video summary with more than 62 characters to test breaklines',
      author_attitude: 'Very long author attitude with more than 62 characters to test breaklines',
    };

    const {result} = renderHook(() => useTranscriptDataSaver());

    act(() => {
      result.current.saveToPdf(mockAnalyse);
    });

    expect(mockJsPDF.setFillColor).toHaveBeenCalledWith(expect.stringMatching(/#([0-9a-f]{3}){1,2}\b/i));
    expect(mockJsPDF.setTextColor).toHaveBeenCalledWith(expect.stringMatching(/#([0-9a-f]{3}){1,2}\b/i));
    expect(mockJsPDF.rect).toHaveBeenCalledWith(0, 0, 210, 297, 'F');
    expect(mockJsPDF.addImage).toHaveBeenCalledWith(expect.anything(), 'PNG', 10, 10, 190, 125);

    expect(mockJsPDF.text).toHaveBeenCalledWith('Analyse Details: ', 10, 135);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Name: Analyse 1', 10, 145);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Start date: 2023-04-21 13:45:00', 10, 155);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Finish date: 2023-04-21 13:48:00', 10, 165);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Status: Success', 10, 175);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Full transcription: Very long full transcription with more ', 10, 185);
    expect(mockJsPDF.text).toHaveBeenCalledWith('than 62 characters to test breaklines', 10, 193);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Video summary: Very long video summary with more than 62 ', 10, 203);
    expect(mockJsPDF.text).toHaveBeenCalledWith('characters to test breaklines', 10, 211);
    expect(mockJsPDF.text).toHaveBeenCalledWith('Author attitude: Very long author attitude with more than 62 ', 10, 221);
    expect(mockJsPDF.text).toHaveBeenCalledWith('characters to test breaklines', 10, 229);

    expect(mockJsPDF.output).toHaveBeenCalled();

    jest.clearAllMocks();
    jest.unmock('jspdf');
  });
});
