import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/home/Home";

export default function App() {
  return (
      <Routes>
          <Route path={"/"} element={<Home />}></Route>
      </Routes>
  );
}
