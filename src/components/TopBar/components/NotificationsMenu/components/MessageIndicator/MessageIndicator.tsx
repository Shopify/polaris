import React from 'react';

import {Badge} from '../Badge';

import styles from './MessageIndicator.scss';

export interface MessageIndicatorProps {
  children?: React.ReactNode;
  unreadCount?: number;
}

export function MessageIndicator({
  children,
  unreadCount,
}: MessageIndicatorProps) {
  const indicatorMarkup =
    unreadCount && unreadCount > 0 ? (
      <span className={styles.UnreadCount}>
        <Badge status="critical" size="small">
          {unreadCount.toString()}
        </Badge>
      </span>
    ) : null;

  return (
    <div className={styles.MessageIndicatorWrapper}>
      {children}
      {indicatorMarkup}
    </div>
  );
}
