import type {API, FileInfo, Options} from 'jscodeshift';

import {
  getImportAllSpecifiers,
  hasImportDeclaration,
} from '../../utilities/imports';
import {insertCommentBefore} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import {isKeyOf} from '../../utilities/types';

import {iconRenames} from './icon-renames';

export interface MigrationOptions extends Options {}

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: MigrationOptions,
) {
  const source = j(fileInfo.source);

  // Don't do anything if the file doesn't import Polaris icons
  if (!hasImportDeclaration(j, source, '@shopify/polaris-icons')) {
    return fileInfo.source;
  }

  // Get only the imported name of Polaris icons used in the file
  const iconsInFile = getImportAllSpecifiers(
    j,
    source,
    '@shopify/polaris-icons',
  )
    .nodes()
    .map((node) => node.imported.name);

  // Don't do anything if the file doesn't use any of the icons we want to rename
  if (!iconsInFile) {
    return fileInfo.source;
  }

  // Replace all usages of imported icons with the new names
  source.find(j.Identifier).forEach((path) => {
    const iconName = path.node.name;
    const shouldRenameIcon =
      iconsInFile.includes(iconName) && iconRenamesNames.includes(iconName);

    if (!shouldRenameIcon) return;

    if (isKeyOf(iconRenames, iconName)) {
      j(path).replaceWith(j.identifier(iconRenames[iconName]));
    } else {
      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
    }
  });

  return source.toSource();
}

const iconRenamesNames = Object.keys(iconRenames);
