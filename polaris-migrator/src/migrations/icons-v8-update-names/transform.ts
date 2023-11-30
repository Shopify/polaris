import type {API, FileInfo, Options} from 'jscodeshift';

import {
  getImportAllSpecifiers,
  hasImportDeclaration,
  hasImportSpecifier,
  insertImportSpecifier,
  removeImportSpecifier,
} from '../../utilities/imports';
import {insertCommentBefore} from '../../utilities/jsx';
import {POLARIS_MIGRATOR_COMMENT} from '../../utilities/constants';
import {isKeyOf} from '../../utilities/types';

import {iconRenames} from './icon-renames';

const iconRenamesNames = Object.keys(iconRenames);

export interface MigrationOptions extends Options {}

export default function transformer(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
  _: MigrationOptions,
) {
  const source = j(fileInfo.source);

  const sourcePath = '@shopify/polaris-icons';

  // Don't do anything if the file doesn't import Polaris icons
  if (!hasImportDeclaration(j, source, sourcePath)) {
    return fileInfo.source;
  }

  // Get only the imported name of Polaris icons used in the file
  const iconNames = getImportAllSpecifiers(j, source, sourcePath)
    .nodes()
    .map((node) => node.imported.name);

  // Don't do anything if the file doesn't use any of the icons we want to rename
  if (!iconNames) {
    return fileInfo.source;
  }

  // Replace the imports and remove duplicates
  iconNames.forEach((iconName) => {
    if (isKeyOf(iconRenames, iconName)) {
      // If there is a legacy import
      if (hasImportSpecifier(j, source, iconName, sourcePath)) {
        // If the new import is not already there add it
        if (!hasImportSpecifier(j, source, iconRenames[iconName], sourcePath)) {
          insertImportSpecifier(j, source, iconRenames[iconName], sourcePath);
        }

        // Remove legacy import
        removeImportSpecifier(j, source, iconName, sourcePath);
      }
    }
  });

  // Replace all remaining usages in the file
  source.find(j.Identifier).forEach((path) => {
    const iconName = path.node.name;
    const shouldRenameIcon =
      iconNames.includes(iconName) && iconRenamesNames.includes(iconName);

    if (!shouldRenameIcon) return;

    if (isKeyOf(iconRenames, iconName)) {
      j(path).replaceWith(j.identifier(iconRenames[iconName]));
    } else {
      insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
    }
  });

  return source.toSource();
}
