import React, {memo} from 'react';
import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../IndexTable.scss';

export interface CellProps {
  children?: ReactNode;
  className?: string;
  flush?: boolean;
  colSpan?: HTMLTableCellElement['colSpan'];
  header?: boolean;
}

export const Cell = memo(function Cell({
  children,
  className,
  flush,
  colSpan,
  header,
}: CellProps) {
  const cellClassName = classNames(
    className,
    styles.TableCell,
    flush && styles['TableCell-flush'],
  );

  const CellElement = header ? 'th' : 'td';

  return (
    <CellElement
      className={cellClassName}
      colSpan={colSpan}
      scope={colSpan ? 'colgroup' : undefined}
    >
      {children}
    </CellElement>
  );
});
