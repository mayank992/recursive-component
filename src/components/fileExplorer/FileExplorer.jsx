// libs
import React from 'react';

// components
import { File } from './File';
import { Folder } from './Folder';

export const FileExplorer = ({ data, onFileSelect }) => (
  <div className="file-explorer">
    <ul>
      {data.map((datum) => {
        const { id, name } = datum;

        if (datum.type === 'FOLDER') {
          return (
            <Folder key={id} isExpanded={false} name={name}>
              Render children here...
            </Folder>
          );
        }

        return <File id={id} key={id} name={name} onClick={onFileSelect} />;
      })}
    </ul>
  </div>
);
