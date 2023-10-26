import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from "@material-tailwind/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <h1 className="text-3xl font-bold underline">
          Hello world!
        </h1>
        <Button>Button</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
