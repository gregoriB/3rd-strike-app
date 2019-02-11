import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './contexts/stateContext'
import './normalize.css';

ReactDOM.render(
    <StateProvider>
      <App />
    </StateProvider>,
  document.getElementById('root')
);
