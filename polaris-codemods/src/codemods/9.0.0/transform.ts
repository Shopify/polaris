import path from 'node:path';

import type {FileInfo, API, Options} from 'jscodeshift';

import * as v9ScssReplaceBorder from '../v9-scss-replace-border/transform';
import * as v9ScssReplaceBorderRadius from '../v9-scss-replace-border-radius/transform';
import * as v9ScssReplaceBorderWidth from '../v9-scss-replace-border-width/transform';
import * as v9ScssReplaceBreakpoints from '../v9-scss-replace-breakpoints/transform';
import * as v9ScssReplaceColor from '../v9-scss-replace-color/transform';
import * as v9ScssReplaceDuration from '../v9-scss-replace-duration/transform';
import * as v9ScssReplaceEasing from '../v9-scss-replace-easing/transform';
import * as v9ScssReplaceFontFamily from '../v9-scss-replace-font-family/transform';
import * as v9ScssReplaceFontSize from '../v9-scss-replace-font-size/transform';
import * as v9ScssReplaceLineHeight from '../v9-scss-replace-line-height/transform';
import * as v9ScssReplaceSpacing from '../v9-scss-replace-spacing/transform';
import * as v9ScssReplaceTextEmphasis from '../v9-scss-replace-text-emphasis/transform';
import * as v9ScssReplaceZIndex from '../v9-scss-replace-z-index/transform';
import {typescript} from '../../utilities/constants';

const transforms = [
  v9ScssReplaceBorder,
  v9ScssReplaceBorderRadius,
  v9ScssReplaceBorderWidth,
  v9ScssReplaceBreakpoints,
  v9ScssReplaceColor,
  v9ScssReplaceDuration,
  v9ScssReplaceEasing,
  v9ScssReplaceFontFamily,
  v9ScssReplaceFontSize,
  v9ScssReplaceLineHeight,
  v9ScssReplaceSpacing,
  v9ScssReplaceTextEmphasis,
  v9ScssReplaceZIndex,
];

const defaultExtensions = typescript.extensions;

export default function transformer(
  fileInfo: FileInfo,
  api: API,
  options: Options,
) {
  return transforms.reduce(
    (source, {default: transform, extensions = defaultExtensions}) => {
      const extname = path.extname(fileInfo.path).replace('.', '');
      if (!extensions.includes(extname)) return fileInfo.source;
      return transform({...fileInfo, source}, api, options);
    },
    fileInfo.source,
  );
}

export const extensions = Array.from(
  new Set([
    ...v9ScssReplaceBorder.extensions,
    ...v9ScssReplaceBorderRadius.extensions,
    ...v9ScssReplaceBorderWidth.extensions,
    ...v9ScssReplaceBreakpoints.extensions,
    ...v9ScssReplaceColor.extensions,
    ...v9ScssReplaceDuration.extensions,
    ...v9ScssReplaceEasing.extensions,
    ...v9ScssReplaceFontFamily.extensions,
    ...v9ScssReplaceFontSize.extensions,
    ...v9ScssReplaceLineHeight.extensions,
    ...v9ScssReplaceSpacing.extensions,
    ...v9ScssReplaceTextEmphasis.extensions,
    ...v9ScssReplaceZIndex.extensions,
  ]),
);
export const options = {
  ...v9ScssReplaceBorder.options,
  ...v9ScssReplaceBorderRadius.options,
  ...v9ScssReplaceBorderWidth.options,
  ...v9ScssReplaceBreakpoints.options,
  ...v9ScssReplaceColor.options,
  ...v9ScssReplaceDuration.options,
  ...v9ScssReplaceEasing.options,
  ...v9ScssReplaceFontFamily.options,
  ...v9ScssReplaceFontSize.options,
  ...v9ScssReplaceLineHeight.options,
  ...v9ScssReplaceSpacing.options,
  ...v9ScssReplaceTextEmphasis.options,
  ...v9ScssReplaceZIndex.options,
};
