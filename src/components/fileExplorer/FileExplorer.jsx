import React from 'react';

export const FileExplorer = ({ data, onFileSelect }) => {
  return (
    <div>
      {data.map((datum) => {
        const isExpanded = false;

        if (datum.type === 'FOLDER') {
          return (
            <div key={datum.id}>
              <button
                className="folder-header"
                onClick={() => {
                  // handle toggle
                }}
              >
                {isExpanded ? '-' : '+'} {datum.name}
              </button>
              <div className="folder-content">
                {isExpanded ? 'Render children here...' : null}
              </div>
            </div>
          );
        }

        return (
          <button key={datum.id} className="file" onClick={() => onFileSelect(datum.id)}>{datum.name}</button>
        );
      })}
    </div>
  );
};
