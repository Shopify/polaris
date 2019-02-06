import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import Image from '../Image';
import styles from './Thumbnail.scss';

export type Size = 'small' | 'medium' | 'large';

export interface Props {
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

export default function Thumbnail({source, alt, size = 'medium'}: Props) {
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
