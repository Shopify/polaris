import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import Image from '../Image';
import * as styles from './Thumbnail.scss';

export type Size = 'small' | 'medium' | 'large';

export interface Props {
  source: string,
  alt: string,
  size?: Size,
}

export default function Thumbnail({
  source,
  alt,
  size = 'medium',
}: Props) {
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
