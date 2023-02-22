import React, {memo, ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  className?: string;
  flush?: boolean;
  type?: 'currency';
}

export const Cell = memo(function Cell({
  children,
  className,
  flush,
  type,
}: CellProps) {
  const cellClassName = classNames(
    className,
    styles.TableCell,
    flush && styles['TableCell-flush'],
    type === 'currency' && styles['TableCell-type-currency'],
  );

  return <td className={cellClassName}>{children}</td>;
});
