import type {ReactNode} from 'react';

import styles from '../../Card.scss';

export interface CardSubsectionProps {
  children?: ReactNode;
}

export function Subsection({children}: CardSubsectionProps) {
  return <div className={styles.Subsection}>{children}</div>;
}
