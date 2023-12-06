import {act, renderHook} from '@testing-library/react';
import useTranscriptDataSaver from '../../src/hooks/useAnalyseDataSaver';
import {Analyse} from "../../src/communication/Types";

const mockJsPDF = {
  setFillColor: jest.fn(),
  setTextColor: jest.fn(),
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
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Analyse Details'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Name: Analyse 1'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Start date: 2023-04-21 13:45:00'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Finish date: 2023-04-21 13:48:00'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Status: Success'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Full transcription: Full transcription'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Video summary: Video summary'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Author attitude: Author attitude'), expect.anything(), expect.anything());
    expect(mockJsPDF.output).toHaveBeenCalled();

    jest.clearAllMocks();
    jest.unmock('jspdf');
  });

  it('should save transcript data to PDF with breaklines if attribute + label has more than 62 characters', () => {
    const mockAnalyse: Analyse = {
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
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Analyse Details'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Name: Analyse 1'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Start date: 2023-04-21 13:45:00'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Finish date: 2023-04-21 13:48:00'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Status: Success'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Full transcription: Very long full transcription with more than\n62 characters to test breaklines'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Video summary: Very long video summary with more than 62 characters\nto test breaklines'), expect.anything(), expect.anything());
    expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Author attitude: Very long author attitude with more than 62 characters\nto test breaklines'), expect.anything(), expect.anything());
    expect(mockJsPDF.output).toHaveBeenCalled();

    jest.clearAllMocks();
    jest.unmock('jspdf');
  });
});
