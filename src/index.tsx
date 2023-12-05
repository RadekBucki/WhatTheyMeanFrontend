import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from '../tests/reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {useGetRequests} from './communication/network/GetRequests';
import useSocketContainer from './sockets/UseSocketContainer';
import {usePostRequests} from './communication/network/PostRequests';

const RootComponent = () => {
  const get = useGetRequests();
  const post = usePostRequests();
  const socketContainer = useSocketContainer();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <App get={get} post={post} socketContainer={socketContainer} />
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
