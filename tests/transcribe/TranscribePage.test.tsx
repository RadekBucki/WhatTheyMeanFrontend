import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {Analyse, AnalyseResponse} from "../../src/communication/Types";
import React from "react";
import {GetRequestsHook} from "../../src/communication/network/GetRequests";
import {PostRequestsHook} from "../../src/communication/network/PostRequests";
import {BrowserRouter} from "react-router-dom";
import App from "../../src/App";
import {SocketContainer} from "../../src/sockets/UseSocketContainer";
import {MockNotification} from "../hooks/UseSystemNotificationSender.test";

export const useGetRequestsMock = (): GetRequestsHook => {

  const getAnalyze = jest.fn(async (uuid: string): Promise<Analyse> => {
    return {
      uuid: uuid,
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
    }
  });

  const getAnalyzeHistory = jest.fn(async (): Promise<Analyse[]> => {
    return [
      {
        uuid: '2',
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
      },
      {
        uuid: '3',
        name: 'Analyse 2',
        start_date: '2023-04-21 13:45:00',
        finish_date: '2023-04-21 13:48:00',
        status: 'Success',
        file_type: 'mp4',
        link: 'https://www.youtube.com/watch?v=1',
        raw_file: 'base64',
        full_transcription: 'Full transcription',
        video_summary: 'Video summary',
        author_attitude: 'Author attitude',
      }
    ]
  });

  return {
    getAnalyze,
    getAnalyzeHistory,
  };
}

export const usePostRequestsMock = (): PostRequestsHook => {

  const postRegisterUrl = jest.fn(async (url: string): Promise<AnalyseResponse> => {
    return {
      analysis_uuid: "656c8656fc8b5b40d68f92eb"
    };
  });

  const postRegisterFile = jest.fn(async (file: File): Promise<AnalyseResponse> => {
    return {
      analysis_uuid: "656c8656fc8b5b40d68f92eb"
    };
  });

  return {
    postRegisterUrl,
    postRegisterFile,
  };
}

export const useSocketContainerMock: () => SocketContainer = () => {
  const progress = '100'
  const isConnected = true
  const resetSockets = () => {}

  return {
    isConnected,
    progress,
    resetSockets
  };
}

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

globalThis.Notification = MockNotification as any;

test('gets transcription by url', async () => {
  render(
    <BrowserRouter>
      <App get={useGetRequestsMock()} post={usePostRequestsMock()} socketContainer={useSocketContainerMock()}/>
    </BrowserRouter>
  );


  const linkButton = screen.getByTestId('webLinkButton');
  fireEvent.click(linkButton);

  const webLinkInput = screen.getByTestId('webLinkInput');
  fireEvent.change(webLinkInput, {target: {value: 'https://www.tiktok.com/@dzidzia_dziadzia/video/7271698811439828256'}});

  const confirmButton = screen.getByTestId('confirmButton');
  fireEvent.click(confirmButton);

  const finalAnalysis = screen.getByTestId('finalAnalysis') as HTMLTextAreaElement

  await waitFor(() => {
    expect(finalAnalysis.textContent).toBe('Video summary');
  }, { timeout: 5000 });
});
