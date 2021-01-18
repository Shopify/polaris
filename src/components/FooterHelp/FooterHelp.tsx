import React from 'react';
import {InfoMinor} from '@shopify/polaris-icons';

import {classNames} from '../../utilities/css';
import {Icon, IconProps} from '../Icon';

import styles from './FooterHelp.scss';

export interface FooterHelpProps {
  /** The content to display inside the layout. */
  children?: React.ReactNode;
}

export function FooterHelp({children}: FooterHelpProps) {
  const className = classNames(styles.FooterHelp);

  const iconProps: IconProps = {
    source: InfoMinor,
    color: 'highlight',
  };

  return (
    <div className={className}>
      <div className={styles.Content}>
        <div className={styles.Icon}>
          <Icon {...iconProps} />
        </div>
        <div className={styles.Text}>{children}</div>
      </div>
    </div>
  );
}
