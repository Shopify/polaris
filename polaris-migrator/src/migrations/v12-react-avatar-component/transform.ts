import type {API, FileInfo, Options} from 'jscodeshift';

import {
  getImportSpecifierName,
  hasImportDeclaration,
  hasImportSpecifier,
  normalizeImportSourcePaths,
} from '../../utilities/imports';
import {replaceJSXAttributes} from '../../utilities/jsx';

export interface MigrationOptions extends Options {
  relative?: boolean;
}

export default function transformer(
  file: FileInfo,
  {jscodeshift: j}: API,
  options: MigrationOptions,
) {
  const source = j(file.source);

  if (
    !options.relative &&
    !hasImportDeclaration(j, source, '@shopify/polaris')
  ) {
    return file.source;
  }

  const sourcePaths = normalizeImportSourcePaths(j, source, {
    relative: options.relative,
    from: 'Avatar',
    to: 'Avatar',
  });

  if (!sourcePaths) return;
  if (
    !hasImportSpecifier(j, source, 'Avatar', sourcePaths.from) &&
    !hasImportSpecifier(j, source, 'AvatarProps', sourcePaths.from)
  ) {
    return;
  }

  const localElementName =
    getImportSpecifierName(j, source, 'Avatar', sourcePaths.from) || 'Avatar';

  // Find all JSX elements with the name 'Avatar'
  source.findJSXElements(localElementName).forEach((element) => {
    // Replace the 'size' prop value with the new size
    replaceJSXAttributes(j, element, 'size', 'size', sizeMapping);
  });

  return source.toSource();
}

// Define the mapping of old sizes to new sizes
const sizeMapping = {
  extraSmall: 'xs',
  small: 'sm',
  medium: 'md',
  large: 'lg',
  'xl-experimental': 'xl',
  // 2xl-experimental is not supported in the new Avatar component
  '2xl-experimental': 'xl',
};
