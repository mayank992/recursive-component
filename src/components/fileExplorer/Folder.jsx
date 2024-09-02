// libs
import React from 'react';

// icons
import folderIcon from '../../public/folder.png';
import openFolderIcon from '../../public/open-folder.png';

export const Folder = ({ isExpanded, name, children }) => {
  return (
    <li className="folder">
      <div
        className="folder-header"
        onClick={() => {
          // Handle toggle
        }}
      >
        <img className="icon" src={isExpanded ? openFolderIcon : folderIcon} />
        {name}
      </div>
      {isExpanded ? <div className="nested">{children}</div> : null}
    </li>
  );
};
