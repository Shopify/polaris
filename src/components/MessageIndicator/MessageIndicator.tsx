import type {ReactNode} from 'react';

import styles from './MessageIndicator.scss';

export interface MessageIndicatorProps {
  children?: ReactNode;
  active?: boolean;
}

export function MessageIndicator({children, active}: MessageIndicatorProps) {
  const indicatorMarkup = active && <div className={styles.MessageIndicator} />;

  return (
    <div className={styles.MessageIndicatorWrapper}>
      {indicatorMarkup}
      {children}
    </div>
  );
}
