import * as React from 'react';

import * as styles from './MessageIndicator.scss';

export interface Props {
  children?: React.ReactNode;
  active?: boolean;
}

export default function MessageIndicator({children, active}: Props) {
  const indicatorMarkup = active && (
    <div testID="indicator" className={styles.MessageIndicator} />
  );

  return (
    <div className={styles.MessageIndicatorWrapper}>
      {indicatorMarkup}
      {children}
    </div>
  );
}
