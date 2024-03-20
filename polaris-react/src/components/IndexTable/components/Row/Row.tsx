import React, {useMemo, memo, useRef, useCallback} from 'react';

import {useToggle} from '../../../../utilities/use-toggle';
import {
  useIndexRow,
  SelectionType,
  useIndexSelectionChange,
} from '../../../../utilities/index-provider';
import {Checkbox} from '../Checkbox';
import {classNames, variationName} from '../../../../utilities/css';
import {RowContext, RowHoveredContext} from '../../../../utilities/index-table';
import type {Range} from '../../../../utilities/index-provider/types';
import styles from '../../IndexTable.module.css';

type RowType = 'data' | 'subheader' | 'child';
type RowStatus = 'subdued' | 'success' | 'warning' | 'critical';
type TableRowElementType = HTMLTableRowElement & HTMLLIElement;

export interface RowProps {
  /** Table header or data cells */
  children: React.ReactNode;
  /** A unique identifier for the row */
  id: string;
  /** Whether the row is selected */
  selected?: boolean | 'indeterminate';
  /** The zero-indexed position of the row. Used for Shift key multi-selection */
  position: number;
  /** Whether the row should visually indicate its status with a background color */
  tone?: RowStatus;
  /** Whether the row should be disabled */
  disabled?: boolean;
  /** A tuple array with the first and last index of the range of other rows that this row describes. All rows in the range are selected when the selection range row is selected. */
  selectionRange?: Range;
  /**
   * Indicates the relationship or role of the row's contents. A "subheader" row displays the same as the table header. Rows of type "child" are indented.
   *  @default 'data' */
  rowType?: RowType;
  /** Label set on the row's checkbox
   * @default "Select {resourceName}"
   */
  accessibilityLabel?: string;
  /** Callback fired when the row is clicked and contains a data-primary-link */
  onNavigation?(id: string): void;
  /** Callback fired when the row is clicked. Overrides the default click behaviour. */
  onClick?(): void;
}

export const Row = memo(function Row({
  children,
  selected,
  id,
  position,
  tone,
  disabled,
  selectionRange,
  rowType = 'data',
  accessibilityLabel,
  onNavigation,
  onClick,
}: RowProps) {
  const {selectable, selectMode, condensed} = useIndexRow();
  const onSelectionChange = useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut,
  } = useToggle(false);

  const handleInteraction = useCallback(
    (event: React.MouseEvent | React.KeyboardEvent) => {
      event.stopPropagation();
      let selectionType = SelectionType.Single;

      if (('key' in event && event.key !== ' ') || !onSelectionChange) return;

      if (event.nativeEvent.shiftKey) {
        selectionType = SelectionType.Multi;
      } else if (selectionRange) {
        selectionType = SelectionType.Range;
      }

      const selection: string | Range = selectionRange ?? id;
      onSelectionChange(selectionType, !selected, selection, position);
    },
    [id, onSelectionChange, selected, selectionRange, position],
  );

  const contextValue = useMemo(
    () => ({
      itemId: id,
      selected,
      position,
      onInteraction: handleInteraction,
      disabled,
    }),
    [id, selected, disabled, position, handleInteraction],
  );

  const primaryLinkElement = useRef<HTMLAnchorElement | null>(null);
  const isNavigating = useRef<boolean>(false);
  const tableRowRef = useRef<TableRowElementType | null>(null);

  const tableRowCallbackRef = useCallback((node: TableRowElementType) => {
    tableRowRef.current = node;

    const el = node?.querySelector('[data-primary-link]');

    if (el) {
      primaryLinkElement.current = el as HTMLAnchorElement;
    }
  }, []);

  const rowClassName = classNames(
    styles.TableRow,
    rowType === 'subheader' && styles['TableRow-subheader'],
    rowType === 'child' && styles['TableRow-child'],
    selectable && condensed && styles.condensedRow,
    selected && styles['TableRow-selected'],
    hovered && !condensed && styles['TableRow-hovered'],
    disabled && styles['TableRow-disabled'],
    tone && styles[variationName('tone', tone)],
    !selectable &&
      !onClick &&
      !primaryLinkElement.current &&
      styles['TableRow-unclickable'],
  );

  let handleRowClick;

  if ((!disabled && selectable) || onClick || primaryLinkElement.current) {
    handleRowClick = (event: React.MouseEvent) => {
      if (rowType === 'subheader') return;

      if (!tableRowRef.current || isNavigating.current) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      if (onClick) {
        onClick();
        return;
      }

      if (primaryLinkElement.current && !selectMode && selectable) {
        isNavigating.current = true;
        const {ctrlKey, metaKey} = event.nativeEvent;

        if (onNavigation) {
          onNavigation(id);
        }

        if (
          (ctrlKey || metaKey) &&
          primaryLinkElement.current instanceof HTMLAnchorElement
        ) {
          isNavigating.current = false;
          window.open(primaryLinkElement.current.href, '_blank');
          return;
        }

        primaryLinkElement.current.dispatchEvent(
          new MouseEvent(event.type, event.nativeEvent),
        );
      } else {
        isNavigating.current = false;
        handleInteraction(event);
      }
    };
  }

  const RowWrapper = condensed ? 'li' : 'tr';
  const checkboxMarkup = selectable ? (
    <Checkbox accessibilityLabel={accessibilityLabel} />
  ) : null;

  return (
    <RowContext.Provider value={contextValue}>
      <RowHoveredContext.Provider value={hovered}>
        <RowWrapper
          key={id}
          id={id}
          className={rowClassName}
          onMouseEnter={setHoverIn}
          onMouseLeave={setHoverOut}
          onClick={handleRowClick}
          ref={tableRowCallbackRef}
        >
          {checkboxMarkup}
          {children}
        </RowWrapper>
      </RowHoveredContext.Provider>
    </RowContext.Provider>
  );
});
