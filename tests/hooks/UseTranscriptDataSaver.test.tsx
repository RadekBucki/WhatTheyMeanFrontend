import { act, renderHook } from '@testing-library/react';
import useTranscriptDataSaver from '../../src/hooks/useTranscriptDataSaver';

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
        const transcriptData = {
            uid: 1,
            name: 'Transcript 1',
            status: 'Success',
            start_date: '2023-04-21 13:45:00',
            duration: '3 min'
        }

        const { result } = renderHook(() => useTranscriptDataSaver());

        act(() => {
            result.current.saveToPdf(transcriptData);
        });

        expect(mockJsPDF.setFillColor).toHaveBeenCalledWith(expect.stringMatching(/#([0-9a-f]{3}){1,2}\b/i));
        expect(mockJsPDF.setTextColor).toHaveBeenCalledWith(expect.stringMatching(/#([0-9a-f]{3}){1,2}\b/i));
        expect(mockJsPDF.rect).toHaveBeenCalledWith(0, 0, 210, 297, 'F');
        expect(mockJsPDF.addImage).toHaveBeenCalledWith(expect.anything(), 'PNG', 10, 10, 190, 125);
        expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Transcript Details'), expect.anything(), expect.anything());
        expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Name: Transcript 1'), expect.anything(), expect.anything());
        expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Start Date: 2023-04-21 13:45:00'), expect.anything(), expect.anything());
        expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Status: Success'), expect.anything(), expect.anything());
        expect(mockJsPDF.text).toHaveBeenCalledWith(expect.stringContaining('Duration: 3 min'), expect.anything(), expect.anything());
        expect(mockJsPDF.output).toHaveBeenCalled();

        jest.clearAllMocks();
        jest.unmock('jspdf');
    });
});
