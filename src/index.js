import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { data } from './mock';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App data={data} onFileSelect={() => {}} />
  </React.StrictMode>
);
