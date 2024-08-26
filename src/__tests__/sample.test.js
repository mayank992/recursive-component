import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from '../App';

import { toggleFolder } from './helpers';

const fileSystemData = [
  {
    id: 1,
    type: 'FOLDER',
    name: 'Root',
    children: [
      {
        id: 2,
        type: 'FOLDER',
        name: 'Documents',
        children: [{ id: 3, type: 'FILE', name: 'Resume.docx' }],
      },
      { id: 4, type: 'FILE', name: 'Notes.txt' },
    ],
  },
];

describe('Sample Tests', () => {
  // Test for rendering top-level nodes
  test('renders the correct number of top-level nodes', () => {
    render(<App data={fileSystemData} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root

    const topLevelNodes = screen.getAllByText(/Root|Documents|Notes.txt/);
    expect(topLevelNodes).toHaveLength(3); // Root, Documents, and Notes.txt
  });

  // Test for toggling folder expansion
  test('toggles folder expansion correctly', () => {
    render(<App data={fileSystemData} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root
    toggleFolder('Documents'); // Expand Documents

    const resumeFile = screen.getByText(/Resume.docx/);
    expect(resumeFile).toBeInTheDocument(); // Resume.docx should be visible

    toggleFolder('Documents'); // Collapse Documents
    expect(resumeFile).not.toBeVisible(); // Resume.docx should be hidden
  });

  // Test for file selection callback
  test('calls onFileSelect with the correct file id', () => {
    const mockOnFileSelect = jest.fn();
    render(<App data={fileSystemData} onFileSelect={mockOnFileSelect} />);

    toggleFolder('Root'); // Expand Root
    const notesFile = screen.getByText(/Notes.txt/);
    fireEvent.click(notesFile);

    expect(mockOnFileSelect).toHaveBeenCalledWith(4); // Notes.txt file id is 4
  });
});
