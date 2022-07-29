import type {ReactNode} from 'react';

import styles from '../../Popover.scss';

export interface SectionProps {
  children?: ReactNode;
}

export function Section({children}: SectionProps) {
  return <div className={styles.Section}>{children}</div>;
}
