import path from 'node:path';

import type {FileInfo, API, Options} from 'jscodeshift';

import {typescript} from '../../utilities/constants';
import type {TransformInfoOptions} from '../../utilities/types';
import * as v10ReactReplaceTextComponents from '../v10-react-replace-text-components/transform';

const transforms = [v10ReactReplaceTextComponents];

const defaultExtensions = typescript.extensions;

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
  new Set([...v10ReactReplaceTextComponents.extensions]),
);
export const options: TransformInfoOptions = {
  ...v10ReactReplaceTextComponents.options,
};
