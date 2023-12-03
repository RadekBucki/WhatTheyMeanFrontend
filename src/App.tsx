import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/Home';
import {PostRequestHookInterface} from './communication/network/PostRequests';
import {GetRequestHookInterface} from './communication/network/GetRequests';
import {SocketContainerInterface} from './sockets/UseSocketContainer';

export default function App({ post, get, socketContainer }: PostRequestHookInterface & GetRequestHookInterface &  SocketContainerInterface) {
  return (
    <Routes>
      <Route path={'/'} element={<Home get={get} post={post} socketContainer={socketContainer}/>}></Route>
    </Routes>
  );
}
