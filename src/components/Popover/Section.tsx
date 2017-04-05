import * as React from 'react';
import * as styles from './Popover.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function Section({children}: Props) {
  return <section className={styles.Section}>{children}</section>;
}
