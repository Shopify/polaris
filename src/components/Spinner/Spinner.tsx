import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import * as styles from './Spinner.scss';

export type Size = 'small' | 'large';

export interface Props {
  size?: Size,
}

export default function Spinner({size}: Props) {
  const className = classNames(
    styles.Spinner,
    size && styles[variationName('size', size)]
  );

  return <span className={className}></span>;
}
