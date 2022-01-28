import React from 'react';

import {classNames} from '../../utilities/css';

import styles from './FooterHelp.scss';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {
  const className = classNames(styles.FooterHelp);

  return (
    <div className={className}>
      <div className={styles.Content}>
        <div className={styles.Text}>{children}</div>
      </div>
    </div>
  );
}
