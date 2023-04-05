import React from 'react';

import styles from '../../FormLayout.module.scss';

export interface ItemProps {
  children?: React.ReactNode;
}

export function Item({children}: ItemProps) {
  return children ? <div className={styles.Item}>{children}</div> : null;
}
