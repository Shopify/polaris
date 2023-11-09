import type {API, FileInfo, Options} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';
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

  if (!hasImportDeclaration(j, source, '@shopify/polaris-icons')) {
    return fileInfo.source;
  }

  // Replace all usages of deprecated icons
  source
    .find(j.Identifier)
    .filter((path) => iconRenamesNames.includes(path.node.name))
    .forEach((path) => {
      const iconName = path.node.name;
      if (isKeyOf(iconRenames, iconName)) {
        j(path).replaceWith(j.identifier(iconRenames[iconName]));
      } else {
        insertCommentBefore(j, path, POLARIS_MIGRATOR_COMMENT);
      }
    });

  return source.toSource();
}

const iconRenamesNames = Object.keys(iconRenames);
