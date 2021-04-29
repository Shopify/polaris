import React, {memo, ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  flush?: boolean;
  last?: boolean;
}

export const Cell = memo(function Cell({children, flush, last}: CellProps) {
  const cellClassName = classNames(
    styles.TableCell,
    flush && styles['TableCell-flush'],
    last && styles['TableCell-last'],
  );

  return <td className={cellClassName}>{children}</td>;
});
