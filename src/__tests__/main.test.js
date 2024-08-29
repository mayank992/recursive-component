import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { FileExplorer } from '../components/fileExplorer';

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
        children: [
          { id: 3, type: 'FILE', name: 'Resume.docx' },
          { id: 4, type: 'FILE', name: 'CoverLetter.docx' },
        ],
      },
      {
        id: 5,
        type: 'FOLDER',
        name: 'Photos',
        children: [
          { id: 6, type: 'FILE', name: 'Vacation.jpg' },
          { id: 7, type: 'FILE', name: 'Family.png' },
        ],
      },
      { id: 8, type: 'FILE', name: 'Notes.txt' },
    ],
  },
];

describe('Main Tests', () => {
  // Test for rendering top-level nodes
  test('Test 1', () => {
    render(<FileExplorer data={fileSystemData} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root

    const topLevelNodes = screen.getAllByText(
      /Root|Documents|Photos|Notes.txt/
    );

    expect(topLevelNodes).toHaveLength(4); // Root, Documents, Photos, and Notes.txt
  });

  // Test for toggling folder expansion and preserving state
  test('Test 2', () => {
    render(<FileExplorer data={fileSystemData} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root
    toggleFolder('Documents'); // Expand Documents
    const resumeFile = screen.getByText('Resume.docx');
    expect(resumeFile).toBeInTheDocument(); // Resume.docx should be visible

    toggleFolder('Photos'); // Expand Photos
    expect(screen.getByText('Vacation.jpg')).toBeInTheDocument(); // Vacation.jpg should be visible

    toggleFolder('Documents'); // Collapse Documents
    expect(resumeFile).not.toBeVisible(); // Resume.docx should be hidden

    toggleFolder('Documents'); // Expand Documents
    expect(screen.getByText('Resume.docx')).toBeInTheDocument(); // Resume.docx should be visible
  });

  // Test for file selection callback
  test('Test 3', () => {
    const mockOnFileSelect = jest.fn();
    render(
      <FileExplorer data={fileSystemData} onFileSelect={mockOnFileSelect} />
    );

    toggleFolder('Root'); // Expand Root
    const notesFile = screen.getByText('Notes.txt');
    fireEvent.click(notesFile);

    expect(mockOnFileSelect).toHaveBeenCalledWith(8); // Notes.txt file id is 8
  });

  // Test for independent folder state management
  test('Test 4', () => {
    render(<FileExplorer data={fileSystemData} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root

    toggleFolder('Documents'); // Expand Documents
    const resumeFile = screen.getByText('Resume.docx');
    expect(resumeFile).toBeInTheDocument();

    toggleFolder('Photos'); // Expand Photos
    const vacationFile = screen.getByText('Vacation.jpg');
    expect(vacationFile).toBeInTheDocument();

    toggleFolder('Documents'); // Collapse Documents
    expect(resumeFile).not.toBeVisible(); // Resume.docx should be hidden
    expect(vacationFile).toBeVisible(); // Vacation.jpg should still be visible

    toggleFolder('Documents'); // Expand Documents again
    expect(screen.getByText('Resume.docx')).toBeInTheDocument(); // Resume.docx should be visible again
  });

  // Test to check that clicking on an already expanded folder does not reset the state of its children
  test('Test 5', () => {
    render(<FileExplorer data={fileSystemData} onFileSelect={() => {}} />);

    toggleFolder('Root'); // Expand Root
    toggleFolder('Documents'); // Expand Documents

    expect(screen.queryByText('Resume.docx')).toBeInTheDocument(); // Resume.docx should be visible

    toggleFolder('Root'); // Collapse Root
    expect(screen.queryByText('Resume.docx')).not.toBeInTheDocument(); // Resume.docx should be hidden

    toggleFolder('Root'); // Expand Root again
    expect(screen.queryByText('Resume.docx')).toBeInTheDocument(); // Resume.docx should still be visible
  });
});
