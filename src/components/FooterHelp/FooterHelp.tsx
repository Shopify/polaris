import React from 'react';
import {QuestionMarkMajorTwotone} from '@shopify/polaris-icons';
import {Icon} from '../Icon';
import styles from './FooterHelp.scss';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {
  return (
    <div className={styles.FooterHelp}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon source={QuestionMarkMajorTwotone} color="teal" backdrop />
        </div>
        <div className={styles.Text}>{children}</div>
      </div>
    </div>
  );
}
