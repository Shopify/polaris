import * as React from 'react';
import Icon from '../Icon';
import * as styles from './FooterHelp.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function FooterHelp({children}: Props) {
  return (
    <div className={styles.FooterHelp}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon source="help" color="teal" backdrop />
        </div>
        <div className={styles.Text}>
          {children}
        </div>
      </div>
    </div>
  );
}
