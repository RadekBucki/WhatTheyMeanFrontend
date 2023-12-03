import {render, screen} from '@testing-library/react';
import App from '../src/App';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {useGetRequestsMock, usePostRequestsMock} from "./transcribe/TranscribePage.test";

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
        <App  get={useGetRequestsMock()} post={usePostRequestsMock()}/>
      </BrowserRouter>
  );
  const linkElement = screen.getByText(/Choose audio type/i);
  expect(linkElement).toBeInTheDocument();
});

