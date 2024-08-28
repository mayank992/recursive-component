export const data = [
  {
    id: 1,
    type: 'FOLDER',
    name: 'Folder 1',
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
  {
    id: 5,
    type: 'FOLDER',
    name: 'Folder 2',
    children: [
      {
        id: 6,
        type: 'FOLDER',
        name: 'Sub Folder',
        children: [{ id: 7, type: 'FILE', name: 'Nature.docx' }],
      },
      { id: 8, type: 'FILE', name: 'Creds.txt' },
    ],
  },
  { id: 9, type: 'FILE', name: 'File.txt' },
];
