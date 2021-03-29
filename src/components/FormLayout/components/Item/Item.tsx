import React from 'react';

import styles from '../../FormLayout.scss';
import {classNames} from '../../../../utilities/css';

export interface ItemProps {
  children?: React.ReactNode;
  index: number;
}

export function Item(props: ItemProps) {
  return (
    <div className={classNames(styles.Item, props.index === 0 && styles.First)}>
      {props.children}
    </div>
  );
}
