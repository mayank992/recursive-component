// libs
import React from 'react';

// components
import { File } from './File';
import { Folder } from './Folder';

export const FileExplorer = ({ data, onFileSelect }) => {
  return (
    <div className="file-explorer">
      <ul>
        {data.map((datum) => {
          if (datum.type === 'FOLDER') {
            return (
              <Folder key={datum.id} isExpanded={false} name={datum.name}>
                Render children here...
              </Folder>
            );
          }

          return (
            <File id={datum.id} name={datum.name} onClick={onFileSelect} />
          );
        })}
      </ul>
    </div>
  );
};
