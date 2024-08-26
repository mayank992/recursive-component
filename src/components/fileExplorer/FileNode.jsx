import React from 'react';

export const FileNode = ({ node, state, onFileSelect, onToggleFolder }) => {
  const isExpanded = !!state[node.id];

  const handleToggle = () => {
    if (node.type === 'FOLDER') {
      onToggleFolder(node.id);
    } else {
      onFileSelect(node.id);
    }
  };

  return (
    <li>
      {node.type === 'FOLDER' ? (
        <>
          <button onClick={handleToggle}>
            {isExpanded ? '-' : '+'} {node.name}
          </button>
          {isExpanded && node.children && (
            <ul>
              {node.children.map((child) => (
                <FileNode
                  key={child.id}
                  node={child}
                  state={state}
                  onFileSelect={onFileSelect}
                  onToggleFolder={onToggleFolder}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <button onClick={() => onFileSelect(node.id)}>{node.name}</button>
      )}
    </li>
  );
};
