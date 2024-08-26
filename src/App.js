import React from 'react';
import { FileExplorer } from './components/fileExplorer';

export default function App({ data, onFileSelect }) {
  return <FileExplorer data={data} onFileSelect={onFileSelect} />;
}
