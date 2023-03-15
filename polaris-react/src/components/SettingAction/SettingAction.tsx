import styles from './SettingAction.scss';

export interface SettingActionProps {
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function SettingAction({action, children}: SettingActionProps) {
  return (
    <div className={styles.SettingAction}>
      <div className={styles.Setting}>{children}</div>
      <div className={styles.Action}>{action}</div>
    </div>
  );
}
