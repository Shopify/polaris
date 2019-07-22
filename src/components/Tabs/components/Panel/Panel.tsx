import * as React from 'react';
import {classNames} from '@shopify/css-utilities';
import styles from '../../Tabs.scss';

export interface Props {
  hidden?: boolean;
  id: string;
  tabID: string;
  children?: React.ReactNode;
}

export default function Panel({hidden, id, tabID, children}: Props) {
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
