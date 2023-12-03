import {render, screen} from '@testing-library/react';
import App from '../src/App';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {useSocketContainerMock, useGetRequestsMock, usePostRequestsMock} from "./transcribe/TranscribePage.test";
import {MockNotification} from "./hooks/UseSystemNotificationSender.test";

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

test('renders transcribe page', () => {
  render(
      <BrowserRouter>
        <App  get={useGetRequestsMock()} post={usePostRequestsMock()} socketContainer={useSocketContainerMock()}/>
      </BrowserRouter>
  );
  const linkElement = screen.getByText(/Choose audio type/i);
  expect(linkElement).toBeInTheDocument();
});

