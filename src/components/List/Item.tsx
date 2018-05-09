import * as React from 'react';
import * as styles from './List.scss';

export interface Props {
  /** Content to display inside the item */
  children?: React.ReactNode;
}

export default function Item({children}: Props) {
  return <li className={styles.Item}>{children}</li>;
}
