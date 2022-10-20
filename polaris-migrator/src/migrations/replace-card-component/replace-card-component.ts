import type {API, FileInfo} from 'jscodeshift';

import {hasImportDeclaration} from '../../utilities/imports';

import {replaceCard} from './steps/replace-card';

/**
 * Replace <Card> with the <AlphaCard> component
 */
export default function replaceCardComponent(
  fileInfo: FileInfo,
  {jscodeshift: j}: API,
) {
  const source = j(fileInfo.source);
  // eslint-disable-next-line no-useless-escape
  const sourcePathRegex = /(?:\@shopify\/polaris|components)/gi;

  if (!hasImportDeclaration(j, source, sourcePathRegex)) {
    return fileInfo.source;
  }

  // TODO: create a replaceCardSection step
  replaceCard(j, source, sourcePathRegex);

  return source.toSource();
}
