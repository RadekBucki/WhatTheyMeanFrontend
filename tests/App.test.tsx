import {render, screen} from '@testing-library/react';
import App from '../src/App';
import {BrowserRouter} from "react-router-dom";
import React from "react";

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
