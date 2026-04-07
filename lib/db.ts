'use client';

import Dexie, { type Table } from 'dexie';

export type ProjectRecord = {
  id: string;
  name: string;
  createdAt: string;
};

export type FileRecord = {
  id: string;
  projectId: string;
  path: string;
  isFolder: boolean;
  parentId: string | null;
  content: string;
};

class VercelControlDB extends Dexie {
  projects!: Table<ProjectRecord, string>;
  files!: Table<FileRecord, string>;

  constructor() {
    super('vercel-control-vfs');

    this.version(1).stores({
      projects: 'id, name, createdAt',
      files: 'id, projectId, path, isFolder, parentId'
    });
  }
}

export const db = new VercelControlDB();
