import React from 'react';
import {classNames, variationName} from '../../utilities/css';
import {Image} from '../Image';
import styles from './Thumbnail.scss';

type Size = 'small' | 'medium' | 'large';

export interface ThumbnailProps {
  /**
   * Size of thumbnail
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string;
  /** Alt text for the thumbnail image */
  alt: string;
}

export function Thumbnail({source, alt, size = 'medium'}: ThumbnailProps) {
  const className = classNames(
    styles.Thumbnail,
    size && styles[variationName('size', size)],
  );

  return (
    <span className={className}>
      <Image alt={alt} source={source} className={styles.Image} />
    </span>
  );
}
