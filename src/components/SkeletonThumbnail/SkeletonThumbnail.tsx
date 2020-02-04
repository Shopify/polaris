import React from 'react';
import {classNames, variationName} from '../../utilities/css';
import styles from './SkeletonThumbnail.scss';

type Size = 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
  /**
   * Size of the thumbnail
   * @default 'medium'
   */
  size?: Size;
}

export function SkeletonThumbnail({size = 'medium'}: SkeletonThumbnailProps) {
  const className = classNames(
    styles.SkeletonThumbnail,
    size && styles[variationName('size', size)],
  );

  return <div className={className} />;
}
