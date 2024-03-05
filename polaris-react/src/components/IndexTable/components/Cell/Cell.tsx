import React, {memo, useRef, useId} from 'react';
import type {ReactNode} from 'react';
import {ChevronDownIcon} from '@shopify/polaris-icons';

import {Box} from '../../../Box';
import {Icon} from '../../../Icon';
import {Popover} from '../../../Popover';
import {classNames} from '../../../../utilities/css';
import {useIndexCell} from '../../../../utilities/index-provider';
import {useI18n} from '../../../../utilities/i18n';
import {useBreakpoints} from '../../../../utilities/breakpoints';
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
  /** Label set on the previewContent activator the button when showPreviewOnHover is false
   * @default 'View details'
   */
  previewAccessibilityLabel?: string;
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
  previewAccessibilityLabel,
  onMouseEnter,
  onMouseLeave,
}: CellProps) {
  const activatorRef = useRef<HTMLButtonElement>(null);
  const i18n = useI18n();
  const previewActivatorId = `'IndexTable-CellPreview-Activator'-${useId()}`;
  const [popoverActive, setPopoverActive] = React.useState(false);
  const indexCellContext = useIndexCell();
  const {mdUp} = useBreakpoints();
  const hasHoverPreview =
    showPreviewOnHover && previewContent && indexCellContext !== undefined;

  const className = classNames(
    customClassName,
    styles.TableCell,
    flush && styles['TableCell-flush'],
    previewContent && styles.hasPreview,
  );

  const handleHoverCardOpen =
    hasHoverPreview && indexCellContext?.onMouseEnterCell
      ? indexCellContext?.onMouseEnterCell(previewContent)
      : undefined;

  const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (handleHoverCardOpen) handleHoverCardOpen(event);
    onMouseEnter?.();
  };

  const handleMouseLeave = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event && hasHoverPreview && indexCellContext?.onMouseLeaveCell) {
      indexCellContext?.onMouseLeaveCell(event);
    }

    onMouseLeave?.();
  };

  const handlePopoverToggle = () => {
    setPopoverActive((popoverActive) => !popoverActive);
  };

  const handleClick = () => {
    if (showPreviewOnHover) return;
    handlePopoverToggle();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      handlePopoverToggle();
    } else if (event.key === 'Escape') {
      handleMouseLeave();
    }
  };

  const hoverCardActivatorProps = hasHoverPreview
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onKeyUp: handleKeyPress,
        'data-hovercard-activator': true,
      }
    : {};

  const popoverActivatorProps =
    previewContent && !showPreviewOnHover
      ? {
          onClick: handleClick,
          'data-popover-activator': true,
        }
      : {};

  const disclosureIcon = !showPreviewOnHover ? (
    <Box>
      <Icon tone="inherit" source={ChevronDownIcon} />
    </Box>
  ) : null;

  const activatorClassNames = classNames(
    styles.PreviewActivator,
    popoverActive && styles.popoverActive,
    hasHoverPreview && styles.showPreviewOnHover,
    hasHoverPreview && indexCellContext.previewActivatorWrapperClassName,
  );

  const activatorLabel = previewAccessibilityLabel
    ? previewAccessibilityLabel
    : i18n.translate(
        'Polaris.IndexTable.Cell.previewActivatorAccessibilityLabel',
      );

  const previewActivator = previewContent ? (
    <button
      id={previewActivatorId}
      ref={activatorRef}
      aria-label={activatorLabel}
      className={activatorClassNames}
      {...popoverActivatorProps}
      {...hoverCardActivatorProps}
    >
      <div className={styles.PreviewActivatorContent}>
        {children}
        {disclosureIcon}
      </div>
    </button>
  ) : null;

  let childContent = children;

  if (mdUp && previewActivator) {
    childContent = (
      <Popover
        flush
        preferredPosition="right"
        activator={previewActivator}
        active={popoverActive}
        onClose={handlePopoverToggle}
      >
        {previewContent}
      </Popover>
    );
  }

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
