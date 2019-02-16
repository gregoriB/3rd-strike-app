import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './contexts/stateContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <StateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StateProvider>,
  document.getElementById('root')
);
