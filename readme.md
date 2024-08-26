## Submission Instructions

1. Clicking "Run code" will compile and run your code against sample tests, but it will not generate scores. Click on "Execution Log" to better understand the test execution.
2. Clicking "Submit code" will run your code against multiple test cases, assessing different scenarios holistically. The score will be assigned accordingly.

To access the instructions, click on the "Question" button which can be found in the bottom left corner of the screen.

### Problem Statement

You need to implement a FileExplorer component in React that mimics the behavior of a typical file explorer system. This component should display a nested file and folder structure, provided as input data, with functionality for expanding/collapsing folders and selecting files.

### Requirements

Props:
data: An array representing the file system structure. Each element in the array can be either a file or a folder.

File Object:

- id (number): A unique identifier for the file.
- type (string): Should be "file".
- name (string): The name of the file.

Folder Object:

- id (number): A unique identifier for the folder.
- type (string): Should be "folder".
- name (string): The name of the folder.
- children (array): An array containing files or folders that are inside this folder.

onFileSelect: A callback function that gets called when a file is selected. The function should receive the id of the selected file as its argument.

Component Behavior:

1. The FileExplorer component should render the data prop recursively, displaying folders and files in a nested structure.
2. Folders: Can be expanded or collapsed by clicking on them. When expanded, the folder's children (files and subfolders) should be visible. When collapsed, the children should be hidden.
3. Files: Clicking on a file should trigger the onFileSelect callback, passing the file's id.
4. The expanded/collapsed state of each folder should be maintained independently, meaning that expanding one folder does not affect the state of other folders.
5. If a folder is collapsed and then re-expanded, the previously expanded/collapsed state of its child folders should be retained.
