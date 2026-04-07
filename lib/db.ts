import Dexie, { type Table } from 'dexie';

export type ProjectEntity = {
  id: string;
  name: string;
  createdAt: string;
};

export type FileEntity = {
  id: string;
  projectId: string;
  path: string;
  isFolder: boolean;
  parentId?: string;
  content?: string;
};

class VfsDatabase extends Dexie {
  projects!: Table<ProjectEntity, string>;
  files!: Table<FileEntity, string>;

  constructor() {
    super('vercel_control_vfs');

    this.version(1).stores({
      projects: 'id, name, createdAt',
      files: 'id, projectId, path, isFolder, parentId'
    });
  }
}

export const db = new VfsDatabase();
