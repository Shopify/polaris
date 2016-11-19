// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from './Subheading.scss';

type Props = {
  level?: 3 | 4,
  children?: any,
  subdued?: boolean,
};

export default function Subheading({level = 3, children, subdued}: Props) {
  const className = classNames(
    styles.Subheading,
    subdued && styles.subdued,
  );

  return level === 3
    ? <h3 className={className}>{children}</h3>
    : <h4 className={className}>{children}</h4>;
}
