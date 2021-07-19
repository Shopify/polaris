import React, {memo, ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  flush?: boolean;
}

export const Cell = memo(function Cell({children, flush}: CellProps) {
  const cellClassName = classNames(
    styles.TableCell,
    flush && styles['TableCell-flush'],
  );

  return <td className={cellClassName}>{children}</td>;
});
