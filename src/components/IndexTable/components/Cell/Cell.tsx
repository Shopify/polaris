import React, {memo, ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  flush?: boolean;
  first?: boolean;
}

export const Cell = memo(function Cell({children, flush, first}: CellProps) {
  const cellClassName = classNames(
    styles.TableCell,
    flush && styles['TableCell-flush'],
    first && styles['TableCell-first-no-checkbox'],
  );

  return <td className={cellClassName}>{children}</td>;
});
