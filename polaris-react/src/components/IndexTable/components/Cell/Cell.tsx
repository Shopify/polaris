import React, {memo} from 'react';
import type {ReactNode} from 'react';

import {classNames} from '../../../../utilities/css';
import {useIndexCell} from '../../../../utilities/index-provider';
import styles from '../../IndexTable.module.scss';

export interface CellProps {
  /** The table cell element to render. Render the cell as a `th` if it serves as a subheading
   * @default 'td'
   */
  as?: 'th' | 'td';
  /** The unique ID to set on the cell element */
  id?: string;
  /** The cell contents */
  children?: ReactNode;
  /** Custom class name to apply to the cell element */
  className?: string;
  /** Whether the cell padding should be removed
   * @default false
   */
  flush?: boolean;
  /** For subheader cells -- The number of the columns that the cell element should extend to */
  colSpan?: HTMLTableCellElement['colSpan'];
  /**  For subheader cells -- Indicates the cells that the `th` element relates to */
  scope?: HTMLTableCellElement['scope'];
  /** A space-separated list of the `th` cell IDs that describe or apply to it. Use for cells within a row that relate to a subheader cell in addition to their column header. */
  headers?: HTMLTableCellElement['headers'];
  /** Markup to render on cell hover */
  preview?: React.ReactNode;
}

export const Cell = memo(function Cell({
  children,
  className: customClassName,
  flush,
  colSpan,
  headers,
  scope,
  as = 'td',
  id,
  preview,
}: CellProps) {
  const indexCellContext = useIndexCell();
  const hasPreview = preview && indexCellContext;
  const className = classNames(
    customClassName,
    styles.TableCell,
    flush && styles['TableCell-flush'],
    hasPreview && indexCellContext.previewActivatorWrapperClassName,
  );

  return React.createElement(
    as,
    {
      id,
      colSpan,
      headers,
      scope,
      className,
      onMouseEnter: indexCellContext?.onMouseEnterCell(preview),
      onMouseLeave: indexCellContext.onMouseLeaveCell,
    },
    children,
  );
});
