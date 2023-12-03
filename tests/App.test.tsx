import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../src/App';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import useSocketContainer from "../src/sockets/UseSocketContainer";

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

test('renders transcribe page', () => {
  render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );
  const linkElement = screen.getByText(/Choose audio type/i);
  expect(linkElement).toBeInTheDocument();
});

test('gets transcription', async () => {
  render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  );
  const linkButton = screen.getByTestId('webLinkButton');
  fireEvent.click(linkButton);

  const webLinkInput = screen.getByTestId('webLinkInput');
  fireEvent.change(webLinkInput, {target: {value: 'https://www.tiktok.com/@dzidzia_dziadzia/video/7271698811439828256'}});

  const confirmButton = screen.getByTestId('confirmButton');
  fireEvent.click(confirmButton);

  const progress = screen.getByTestId('progress');

  await waitFor(() => {
    expect(progress).toHaveTextContent('100%');
  }, { timeout: 20000 });

  const finalAnalysis = screen.getByTestId('finalAnalysis') as HTMLTextAreaElement

  await waitFor(() => {
    expect(finalAnalysis.textContent).not.toBe('');
  }, { timeout: 20000 });
});

