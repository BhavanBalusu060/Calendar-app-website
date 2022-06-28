import React from 'react';
import ReactDOM from 'react-dom/client';
import Input from './Components/Input';
import './Defaults.css'
import SignIn from './Components/SignIn';
import App from './App';
import Events from './Components/Events';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
