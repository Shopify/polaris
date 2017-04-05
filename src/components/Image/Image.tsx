import * as React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import * as styles from './Image.scss';

export type Size = 'small' | 'medium' | 'large' | 'extraLarge';

export interface Props {
  src: string,
  size?: Size,
}

export default function Image({src, size}: Props) {
  const className = classNames(
    size && styles[variationName('size', size)],
  );

  return (
    <img src={src} className={className} />
  );
}
