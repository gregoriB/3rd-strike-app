import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import App from './App';
import { StateProvider } from './contexts/stateContext'

ReactDOM.render(
    <StateProvider>
      <App />
    </StateProvider>,
  document.getElementById('root')
);
