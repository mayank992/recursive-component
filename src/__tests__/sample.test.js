// libs
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// components
import { FileExplorer } from '../components/fileExplorer';

// helpers
import { toggleFolder } from './helpers';

const DATA = [
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
    render(<FileExplorer data={DATA} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root

    // Root, Documents, and Notes.txt should be visible
    expect(screen.getByText('Root')).toBeVisible();
    expect(screen.getByText('Documents')).toBeVisible();
    expect(screen.getByText('Notes.txt')).toBeVisible();
  });

  // Test for toggling folder expansion
  test('toggles folder expansion correctly', () => {
    render(<FileExplorer data={DATA} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root
    toggleFolder('Documents'); // Expand Documents

    expect(screen.getByText(/Resume.docx/)).toBeVisible(); // Resume.docx should be visible

    toggleFolder('Documents'); // Collapse Documents
    expect(screen.queryByText(/Resume.docx/)).toBeNull(); // Resume.docx should be hidden
  });

  // Test for file selection callback
  test('calls onFileSelect with the correct file id', () => {
    const mockOnFileSelect = jest.fn();
    render(<FileExplorer data={DATA} onFileSelect={mockOnFileSelect} />);

    toggleFolder('Root'); // Expand Root
    const notesFile = screen.getByText(/Notes.txt/);
    fireEvent.click(notesFile);

    expect(mockOnFileSelect).toHaveBeenCalledWith(4); // Notes.txt file id is 4
  });
});
