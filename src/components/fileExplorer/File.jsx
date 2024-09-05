// libs
import React from 'react';

// icons
import fileIcon from '../../public/file.png';

export const File = ({ id, name, onClick }) => (
  <li className="file" onClick={() => onClick(id)}>
    <img className="icon" src={fileIcon} />
    {name}
  </li>
);
