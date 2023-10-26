import {render, screen} from '@testing-library/react';
import App from '../src/App';
import {BrowserRouter} from "react-router-dom";
import React from "react";

test('renders home page', () => {
  render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );
  const linkElement = screen.getByText(/Transcribe site/i);
  expect(linkElement).toBeInTheDocument();
});
