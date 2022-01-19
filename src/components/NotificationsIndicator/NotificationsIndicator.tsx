import React from 'react';

import styles from './NotificationsIndicator.scss';

export interface NotificationsIndicatorProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
}

export function NotificationsIndicator({
  children,
  content,
}: NotificationsIndicatorProps) {
  const indicatorMarkup = content && (
    <div className={styles.NotificationsIndicator}>{content}</div>
  );

  return (
    <div className={styles.NotificationsIndicatorWrapper}>
      {children}
      {indicatorMarkup}
    </div>
  );
}
