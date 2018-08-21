import * as React from 'react';
import * as styles from '../../Popover.scss';

export interface Props {
  children?: React.ReactNode;
}

export default function Section({children}: Props) {
  return <div className={styles.Section}>{children}</div>;
}
