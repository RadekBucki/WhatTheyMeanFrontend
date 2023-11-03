import { act, renderHook } from '@testing-library/react';
import useTranscriptDataSaver from '../../src/hooks/useTranscriptDataSaver';

// Mocking jsPDF
const mockJsPDF = {
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
