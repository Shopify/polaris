import * as React from 'react';
import Icon from '../Icon';
import styles from './FooterHelp.scss';

export interface Props {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export default function FooterHelp({children}: Props) {
  return (
    <div className={styles.FooterHelp}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon source="help" color="teal" backdrop />
        </div>
        <div className={styles.Text}>{children}</div>
      </div>
    </div>
  );
}
