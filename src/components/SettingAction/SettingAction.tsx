import * as React from 'react';
import * as styles from './SettingAction.scss';

export interface Props {
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export default function SettingAction({action, children}: Props) {
  return (
    <div className={styles.SettingAction}>
      <div className={styles.Setting}>{children}</div>
      <div className={styles.Action}>{action}</div>
    </div>
  );
}
