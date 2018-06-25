import * as React from 'react';

import * as styles from './Indicator.scss';

export interface Props {
  children?: React.ReactNode;
  active?: boolean;
}

export default function Indicator({children, active}: Props) {
  const indicatorMarkup = active && (
    <div testID="indicator" className={styles.Indicator} />
  );

  return (
    <div className={styles.IndicatorWrapper}>
      {indicatorMarkup}
      {children}
    </div>
  );
}
