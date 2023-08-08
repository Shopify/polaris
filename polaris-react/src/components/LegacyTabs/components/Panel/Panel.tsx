import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../LegacyTabs.module.scss';

export interface PanelProps {
  hidden?: boolean;
  id: string;
  tabID: string;
  children?: React.ReactNode;
}

export function Panel({hidden, id, tabID, children}: PanelProps) {
  const className = classNames(styles.Panel, hidden && styles['Panel-hidden']);
  return (
    <div
      className={className}
      id={id}
      role="tabpanel"
      aria-labelledby={tabID}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}
