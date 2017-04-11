import * as React from 'react';
import * as styles from './FeatureAction.scss';

export interface Props {
  action?: React.ReactNode,
  children?: React.ReactNode,
}

export default function FeatureAction({action, children}: Props) {
  return (
    <div className={styles.FeatureAction}>
      <div className={styles.Feature}>
        {children}
      </div>
      <div className={styles.Action}>
        {action}
      </div>
    </div>
  );
}
