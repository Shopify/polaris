import type {MigrationFn} from '../../types';

export const migration: MigrationFn = (fileContent: string) => {
  const newContent = fileContent;

  return newContent;
};

migration.extensions = ['.tsx', '.ts', '.jsx', '.js'];
