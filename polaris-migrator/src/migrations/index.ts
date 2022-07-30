import {migration as templateBabel} from './template-babel';
// import {migration as replaceSassSpacing} from './replace-sass-spacing';
// import {migration as replaceTextComponent} from './replace-text-component';

export const migrations = {
  templateBabel,
  // replaceSassSpacing,
  // replaceTextComponent,
};

type Migrations = typeof migrations;
type MigrationKey = keyof Migrations;

const migrationKeys = Object.keys(migrations) as MigrationKey[];

export const isMigrationKey = (key: string): key is MigrationKey => {
  return migrationKeys.includes(key as MigrationKey);
};
