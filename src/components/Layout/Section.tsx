import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import * as styles from './Layout.scss';

export interface Props {
  children?: React.ReactNode,
  secondary?: boolean,
}

export default function Section({children, secondary}: Props) {
  const className = classNames(
    styles.Section,
    secondary && styles.secondary,
  );

  return (
    <div className={className}>
      {children}
    </div>
  );
}
