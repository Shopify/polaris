// @flow

import React from 'react';
import {classNames, variationName} from '@shopify/react-utilities/styles';
import styles from './Icon.scss';

type Props = {
  size?: 'small' | 'large',
};

export default function Icon({size}: Props) {
  const className = classNames(
    styles.Icon,
    size && styles[variationName('size', size)],
  );

  return (
    <div className={className} />
  );
}
