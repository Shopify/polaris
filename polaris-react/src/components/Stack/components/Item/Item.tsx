import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Stack.scss';

export interface ItemProps {
  /** Elements to display inside item */
  children?: React.ReactNode;
  /** Fill the remaining horizontal space in the stack with the item  */
  fill?: boolean;
  /**
   * @default false
   */
}

/** @deprecated Use LegacyStack or AlphaStack instead. */
export function Item({children, fill}: ItemProps) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: <Stack /> is deprecated. This component will be removed in a future major version of Polaris. Use <LegacyStack /> or <AlphaStack /> instead.',
    );
  }

  const className = classNames(styles.Item, fill && styles['Item-fill']);

  return <div className={className}>{children}</div>;
}
