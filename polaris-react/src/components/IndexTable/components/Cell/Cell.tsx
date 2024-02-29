import React, {memo} from 'react';
import type {ReactNode} from 'react';

import {Popover} from '../../../Popover';
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
  previewContent?: React.ReactNode;
  /** Whether the cell previewContent should render on hover */
  showPreviewOnHover?: boolean;
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
  showPreviewOnHover,
  previewContent,
  onMouseEnter,
  onMouseLeave,
}: CellProps) {
  const [popoverActive, setPopoverActive] = React.useState(false);
  const indexCellContext = useIndexCell();
  const hasHoverPreview =
    showPreviewOnHover && previewContent && indexCellContext !== undefined;

  const className = classNames(
    customClassName,
    styles.TableCell,
    flush && styles['TableCell-flush'],
    hasHoverPreview && indexCellContext.previewActivatorWrapperClassName,
  );

  const handleHoverCardOpen =
    hasHoverPreview && indexCellContext?.onMouseEnterCell
      ? indexCellContext?.onMouseEnterCell(previewContent)
      : undefined;

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (handleHoverCardOpen) handleHoverCardOpen(event);
    onMouseEnter?.();
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (hasHoverPreview && indexCellContext?.onMouseLeaveCell) {
      indexCellContext?.onMouseLeaveCell(event);
    }

    onMouseLeave?.();
  };

  const handlePopoverToggle = () => {
    setPopoverActive((popoverActive) => !popoverActive);
  };

  const hoverCardProps =
    hasHoverPreview && showPreviewOnHover
      ? {
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          'data-hovercard-activator': true,
        }
      : {};

  const previewActivator = previewContent ? (
    <button
      onKeyUp={handlePopoverToggle}
      onClick={!showPreviewOnHover ? handlePopoverToggle : undefined}
      {...hoverCardProps}
    >
      {children}
    </button>
  ) : null;

  const childContent = previewActivator ? (
    <Popover
      activator={previewActivator}
      active={popoverActive}
      onClose={handlePopoverToggle}
    >
      {previewContent}
    </Popover>
  ) : (
    children
  );

  return React.createElement(
    as,
    {
      id,
      colSpan,
      headers,
      scope,
      className,
    },
    childContent,
  );
});
