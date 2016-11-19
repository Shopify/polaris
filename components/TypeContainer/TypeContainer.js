// @flow

import React from 'react';
import {classNames} from '@shopify/react-utilities/styles';
import styles from './TypeContainer.scss';

type Props = {
  children?: any,
  subdued?: boolean,
};

export default function TypeContainer({children, subdued}: Props) {
  const className = classNames(
    styles.TypeContainer,
    subdued && styles.subdued,
  );

  return (
    <div className={className}>{children}</div>
  );
}
