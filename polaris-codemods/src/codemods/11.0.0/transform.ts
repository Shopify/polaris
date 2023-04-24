import path from 'node:path';

import type {FileInfo, API, Options} from 'jscodeshift';

import {scss, typescript} from '../../utilities/constants';
import type {TransformInfoOptions} from '../../utilities/types';
import * as v11ReactUpdatePageBreadcrumbs from '../v11-react-update-page-breadcrumbs/transform';
import * as v11StylesReplaceCustomPropertyBorder from '../v11-styles-replace-custom-property-border/transform';
import * as v11StylesReplaceCustomPropertyDepth from '../v11-styles-replace-custom-property-depth/transform';
import * as v11StylesReplaceCustomPropertyLegacy from '../v11-styles-replace-custom-property-legacy/transform';
import * as v11StylesReplaceCustomPropertyMotion from '../v11-styles-replace-custom-property-motion/transform';
import * as v11StylesReplaceCustomPropertyZIndex from '../v11-styles-replace-custom-property-z-index/transform';

const transforms = [
  v11ReactUpdatePageBreadcrumbs,
  v11StylesReplaceCustomPropertyBorder,
  v11StylesReplaceCustomPropertyDepth,
  v11StylesReplaceCustomPropertyLegacy,
  v11StylesReplaceCustomPropertyMotion,
  v11StylesReplaceCustomPropertyZIndex,
];

const defaultExtensions = [...typescript.extensions, ...scss.extensions];

export default function transformer(
  fileInfo: FileInfo,
  api: API,
  options: Options,
) {
  return transforms.reduce(
    (source, {default: transform, extensions = defaultExtensions}) => {
      const extname = path.extname(fileInfo.path);
      if (!extensions.includes(extname)) return fileInfo.source;
      return transform({...fileInfo, source}, api, options);
    },
    fileInfo.source,
  );
}

export const extensions = Array.from(
  new Set([
    ...v11ReactUpdatePageBreadcrumbs.extensions,
    ...v11StylesReplaceCustomPropertyBorder.extensions,
    ...v11StylesReplaceCustomPropertyDepth.extensions,
    ...v11StylesReplaceCustomPropertyLegacy.extensions,
    ...v11StylesReplaceCustomPropertyMotion.extensions,
    ...v11StylesReplaceCustomPropertyZIndex.extensions,
  ]),
);
export const options: TransformInfoOptions = {};
