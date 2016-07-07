// @flow

import React from 'react';
import styles from './Subheading.scss';

type Props = {
  level?: 3 | 4,
  children?: any,
};

export default function Subheading({level = 3, ...rest}: Props) {
  rest.className = styles.Subheading;

  return level === 3
    ? <h3 {...rest} />
    : <h4 {...rest} />;
}
