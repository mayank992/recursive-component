// libs
import { screen, fireEvent } from '@testing-library/react';

export const toggleFolder = (folderName) => {
  const folder = screen.getByText(folderName);
  fireEvent.click(folder);
};
