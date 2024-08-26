import { screen, fireEvent } from '@testing-library/react';

export const toggleFolder = (folderName) => {
  const folder = screen.getByText(new RegExp(folderName));
  fireEvent.click(folder);
};
