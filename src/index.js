import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import axios from "axios"
import { store } from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL = "http://localhost:9001";
root.render(
  <React.StrictMode>
    <Provider  store={store}>
    <BrowserRouter>

    <App />
    
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

