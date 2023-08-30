import type {API, FileInfo, Options} from 'jscodeshift';

import {
  getImportSpecifierName,
  hasImportDeclaration,
  hasImportSpecifier,
  normalizeImportSourcePaths,
} from '../../utilities/imports';
import {
  getJSXAttributes,
  removeJSXAttributes,
  replaceJSXAttributes,
} from '../../utilities/jsx';

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
  const avatarElements = source.findJSXElements(localElementName);

  // Define the mapping of old sizes to new sizes
  const sizeMapping: {[key: string]: string} = {
    extraSmall: 'small',
    small: 'large',
    medium: 'xl',
    large: '2xl',
  };

  avatarElements.forEach((element) => {
    // Remove the 'customer' prop
    removeJSXAttributes(j, element, 'customer');

    // Replace the 'size' prop value with the new size
    const sizeAttribute = getJSXAttributes(j, element, 'size').at(0).get();
    const oldSize = sizeAttribute.value.value;
    const newSize = sizeMapping[oldSize] || oldSize;
    replaceJSXAttributes(j, element, 'size', 'size', newSize);
  });

  return source.toSource();
}
