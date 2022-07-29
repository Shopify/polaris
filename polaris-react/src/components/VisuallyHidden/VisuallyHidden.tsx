import type {ReactNode} from 'react';

import styles from './VisuallyHidden.scss';

export interface VisuallyHiddenProps {
  /** The content to be hidden visually */
  children?: ReactNode;
}

export function VisuallyHidden({children}: VisuallyHiddenProps) {
  return <span className={styles.VisuallyHidden}>{children}</span>;
}
