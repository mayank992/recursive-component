import React, { useState } from 'react';

import { FileNode } from './FileNode';

export const FileExplorer = ({ data, onFileSelect }) => {
  const [state, setState] = useState({});

  const handleToggleFolder = (id) => {
    setState((curState) => ({ ...curState, [id]: !curState[id] }));
  };

  return (
    <ul>
      {data.map((node) => (
        <FileNode
          key={node.id}
          node={node}
          state={state}
          onFileSelect={onFileSelect}
          onToggleFolder={handleToggleFolder}
        />
      ))}
    </ul>
  );
};
