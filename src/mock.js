export const data = [
  {
    id: 1,
    type: 'FOLDER',
    name: 'Personal',
    children: [
      {
        id: 2,
        type: 'FOLDER',
        name: 'Work Documents',
        children: [{ id: 3, type: 'FILE', name: 'Resume.docx' }],
      },
      { id: 4, type: 'FILE', name: 'Personal Notes.txt' },
    ],
  },
  {
    id: 5,
    type: 'FOLDER',
    name: 'Media Library',
    children: [
      {
        id: 6,
        type: 'FOLDER',
        name: 'Photos and Videos',
        children: [{ id: 7, type: 'FILE', name: 'Nature Photo.docx' }],
      },
      { id: 8, type: 'FILE', name: 'Media Info.txt' },
    ],
  },
  { id: 9, type: 'FILE', name: 'General Info.txt' },
];
