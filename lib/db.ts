import Dexie, { Table } from 'dexie';

export interface ProjectRecord {
  id: string;
  name: string;
  createdAt: string;
}

export interface FileRecord {
  id: string;
  projectId: string;
  path: string;
  isFolder: boolean;
  parentId?: string;
  content?: string;
}

class VFSDatabase extends Dexie {
  projects!: Table<ProjectRecord, string>;
  files!: Table<FileRecord, string>;

  constructor() {
    super('vfs_db');
    this.version(1).stores({
      projects: 'id, name, createdAt',
      files: 'id, projectId, path, isFolder, parentId'
    });
  }
}

export const db = new VFSDatabase();
