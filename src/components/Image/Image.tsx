import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './Image.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface SourceSet {
  src: string,
  descriptor?: string,
}

export interface Props {
  src: string,
  size?: Size,
  sourceSet?: SourceSet[],
  sourceSetSizes?: string,
}

export default function Image({src, size, sourceSet, sourceSetSizes}: Props) {
  let finalSourceSet;

  const className = classNames(
    size && styles[variationName('size', size)],
  );
  if (sourceSet) {
    finalSourceSet = sourceSet.map((source) => {
      return `${source.src} ${source.descriptor}`;
    }).join(',');
  }

  return sourceSet
    ? <img src={src} srcSet={finalSourceSet} sizes={sourceSetSizes} />
    : <img src={src} className={className} />;
}

