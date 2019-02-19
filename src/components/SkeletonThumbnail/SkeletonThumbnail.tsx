import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import styles from './SkeletonThumbnail.scss';

export type Size = 'small' | 'medium' | 'large';

export interface Props {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
}

export default function SkeletonThumbnail({size = 'medium'}: Props) {
  const className = classNames(
    styles.SkeletonThumbnail,
    size && styles[variationName('size', size)],
  );

  return <div className={className} />;
}
