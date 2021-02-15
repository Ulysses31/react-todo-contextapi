import React from 'react';

import { debugContextDevtool } from 'react-context-devtool';
import ReactDOM from 'react-dom';

import './index.css';
import App from './app';

const container = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);

// Attach root container
const options = {
  debugReducer: true,
  debugContext: true,
  disable: false,
  disableAutoMode: false
};
debugContextDevtool(container, options);
