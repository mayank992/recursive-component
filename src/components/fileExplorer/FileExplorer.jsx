import React from 'react';

// icons
import fileIcon from '../../public/file.png';
import folderIcon from '../../public/folder.png';
import openFolderIcon from '../../public/open-folder.png';

export const FileExplorer = ({ data, onFileSelect }) => {
  return (
    <div className="file-explorer">
      <ul>
        {data.map((datum) => {
          if (datum.type === 'FOLDER') {
            const isExpanded = false;

            return (
              <div key={datum.id}>
                <li
                  onClick={() => {
                    // handle toggle
                  }}
                >
                  <img
                    className="folder-icon"
                    src={isExpanded ? openFolderIcon : folderIcon}
                  />
                  {datum.name}
                </li>
                {isExpanded ? (
                  <div className="folder-content nested">
                    Render children here...
                  </div>
                ) : null}
              </div>
            );
          }

          return (
            <li key={datum.id} onClick={() => onFileSelect(datum.id)}>
              <img className="file-icon" src={fileIcon} />
              {datum.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
