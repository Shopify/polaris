import React, {memo, ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  className?: string;
  flush?: boolean;
}

export const Cell = memo(function Cell({
  children,
  className,
  flush,
}: CellProps) {
  const cellClassName = classNames(
    className,
    styles.TableCell,
    flush && styles['TableCell-flush'],
  );

  return <td className={cellClassName}>{children}</td>;
});
