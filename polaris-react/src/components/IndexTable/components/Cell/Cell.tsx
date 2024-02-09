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
  /** Callback fired when mouse enters cell */
  onMouseEnter?(): void;
  /** Callback fired when mouse leaves cell */
  onMouseLeave?(): void;
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
  onMouseEnter,
  onMouseLeave,
}: CellProps) {
  const indexCellContext = useIndexCell();
  console.log('indexCellContext', indexCellContext);
  const hasPreview = preview && indexCellContext !== undefined;
  const className = classNames(
    customClassName,
    styles.TableCell,
    flush && styles['TableCell-flush'],
    hasPreview && indexCellContext.previewActivatorWrapperClassName,
  );

  const handlePreviewOpen =
    hasPreview && indexCellContext?.onMouseEnterCell
      ? indexCellContext?.onMouseEnterCell(preview)
      : undefined;

  const handleMouseEnter = (event: React.MouseEvent<HTMLTableCellElement>) => {
    if (handlePreviewOpen) handlePreviewOpen(event);
    onMouseEnter?.();
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLTableCellElement>) => {
    if (hasPreview && indexCellContext?.onMouseLeaveCell) {
      indexCellContext?.onMouseLeaveCell(event);
    }

    onMouseLeave?.();
  };

  return React.createElement(
    as,
    {
      id,
      colSpan,
      headers,
      scope,
      className,
      'data-hovercard-activator': preview ? true : undefined,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    children,
  );
});
