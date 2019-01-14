import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import Image from '../Image';
import * as styles from './AppIcon.scss';

export type Size = 'small' | 'medium' | 'large';

export interface Props {
  /**
   * Size of AppIcon
   * @default 'medium'
   */
  size?: Size;
  /** URL for the image */
  source: string;
  /** Alt text for the AppIcon image */
  alt: string;
}

export default function AppIcon({source, alt, size = 'medium'}: Props) {
  const className = classNames(
    styles.AppIcon,
    size && styles[variationName('size', size)],
  );

  return (
    <span className={className}>
      <Image alt={alt} source={source} className={styles.Image} />
    </span>
  );
}
