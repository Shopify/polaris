import * as React from 'react';
import styles from '../../FormLayout.scss';

export interface Props {
  children?: React.ReactNode;
}

export default function Item(props: Props) {
  return <div className={styles.Item}>{props.children}</div>;
}
