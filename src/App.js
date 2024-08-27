import React from 'react';
import { FileExplorer } from './components/fileExplorer';

import { data } from './mock';

export default function App() {
  return <FileExplorer data={data} onFileSelect={() => {}} />;
}
