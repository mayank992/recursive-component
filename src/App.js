// libs
import React from 'react';

// components
import { FileExplorer } from './components/fileExplorer';

// styles
import './styles.css';

// mocks
import { data } from './mock';

export default function App() {
  return <FileExplorer data={data} onFileSelect={() => {}} />;
}
