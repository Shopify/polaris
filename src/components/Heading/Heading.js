// @flow

import React from 'react';
import styles from './Heading.scss';

type Props = {
  level?: 2 | 3,
};

export default function Heading({level = 2, ...rest}: Props) {
  rest.className = styles.Heading;

  return level === 2
    ? <h2 {...rest} />
    : <h3 {...rest} />;
}
