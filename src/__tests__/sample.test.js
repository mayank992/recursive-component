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
    name: 'Home',
    children: [
      {
        id: 2,
        type: 'FOLDER',
        name: 'Documents',
        children: [
          {
            id: 3,
            type: 'FOLDER',
            name: 'Work',
            children: [
              { id: 4, type: 'FILE', name: 'Project.docx' },
              { id: 5, type: 'FILE', name: 'Report.pdf' },
            ],
          },
          { id: 6, type: 'FILE', name: 'Resume.docx' },
          { id: 7, type: 'FILE', name: 'CoverLetter.docx' },
        ],
      },
      {
        id: 8,
        type: 'FOLDER',
        name: 'Photos',
        children: [
          {
            id: 9,
            type: 'FOLDER',
            name: 'Vacations',
            children: [
              { id: 10, type: 'FILE', name: 'Beach.jpg' },
              { id: 11, type: 'FILE', name: 'Mountains.png' },
            ],
          },
          { id: 12, type: 'FILE', name: 'Family.png' },
        ],
      },
      { id: 13, type: 'FILE', name: 'Notes.txt' },
    ],
  },
  { id: 14, type: 'FILE', name: '.zshrc' },
];

describe('Sample Tests', () => {
  test('Deeply nested files and folders should render correctly', () => {
    render(<FileExplorer data={DATA} onFileSelect={() => {}} />);

    // Home and .zshrc should be visible
    expect(screen.getByText('Home')).toBeVisible();
    expect(screen.getByText('.zshrc')).toBeVisible();

    toggleFolder('Home'); // Expand Home
    toggleFolder('Documents'); // Expand Documents
    toggleFolder('Work'); // Expand Work

    // Both Project.docx and Report.pdf should be visible
    expect(screen.getByText('Project.docx')).toBeVisible();
    expect(screen.getByText('Report.pdf')).toBeVisible();

    toggleFolder('Photos'); // Expand Photos
    toggleFolder('Vacations'); // Expand Vacations

    // Both Beach.jpg and Mountains.png should be visible
    expect(screen.getByText('Beach.jpg')).toBeVisible();
    expect(screen.getByText('Mountains.png')).toBeVisible();
  });

  test('File selection deeper in the nested structure', () => {
    const mockOnFileSelect = jest.fn();

    render(<FileExplorer data={DATA} onFileSelect={mockOnFileSelect} />);

    toggleFolder('Home'); // Expand Home
    toggleFolder('Documents'); // Expand Documents
    toggleFolder('Work'); // Expand Work

    const projectFile = screen.getByText('Project.docx');
    fireEvent.click(projectFile);

    expect(mockOnFileSelect).toHaveBeenCalledWith(4); // Project.docx file id is 4
  });

  test('While toggling folders at multiple levels, independent folder states should be preserved', () => {
    render(<FileExplorer data={DATA} onFileSelect={() => {}} />);

    toggleFolder('Home'); // Expand Home
    toggleFolder('Documents'); // Expand Documents
    toggleFolder('Work'); // Expand Work

    expect(screen.getByText('Project.docx')).toBeVisible(); // Project.docx should be visible

    toggleFolder('Photos'); // Expand Photos
    toggleFolder('Vacations'); // Expand Vacations

    expect(screen.getByText('Beach.jpg')).toBeVisible(); // Beach.jpg should be visible

    // Collapse and expand individual folders to check independent state
    toggleFolder('Documents'); // Collapse Documents
    expect(screen.queryByText('Project.docx')).toBeNull(); // Project.docx should be hidden
    expect(screen.getByText('Beach.jpg')).toBeVisible(); // Beach.jpg should still be visible

    toggleFolder('Documents'); // Expand Documents again
    expect(screen.getByText('Project.docx')).toBeVisible(); // Project.docx should be visible again
  });

  test('when parent is collapsed/expanded across multiple levels, child folder state should be preserved', () => {
    render(<FileExplorer data={DATA} onFileSelect={() => {}} />);

    toggleFolder('Home'); // Expand Home
    toggleFolder('Documents'); // Expand Documents
    toggleFolder('Work'); // Expand Work
    toggleFolder('Photos'); // Expand Photos
    toggleFolder('Vacations'); // Expand Vacations

    expect(screen.getByText('Project.docx')).toBeVisible();
    expect(screen.getByText('Beach.jpg')).toBeVisible();

    // Collapse and check visibility at multiple levels
    toggleFolder('Documents'); // Collapse Documents
    expect(screen.queryByText('Project.docx')).toBeNull(); // Project.docx should be hidden
    toggleFolder('Photos'); // Collapse Photos
    expect(screen.queryByText('Beach.jpg')).toBeNull(); // Beach.jpg should be hidden

    // Re-expand and check visibility again
    toggleFolder('Documents'); // Expand Documents again
    expect(screen.getByText('Project.docx')).toBeVisible(); // Project.docx should be visible
    toggleFolder('Photos'); // Expand Photos again
    expect(screen.getByText('Beach.jpg')).toBeVisible(); // Beach.jpg should be visible

    // Collapse Home and ensure state is preserved for child folders
    toggleFolder('Home'); // Collapse Home
    expect(screen.queryByText('Project.docx')).toBeNull(); // Project.docx should be hidden
    toggleFolder('Home'); // Expand Home again
    expect(screen.getByText('Project.docx')).toBeVisible(); // Project.docx should still be visible
  });
});
