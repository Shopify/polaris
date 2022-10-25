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
import styles from '../../IndexTable.scss';

type RowStatus = 'success' | 'subdued';
type TableRowElementType = HTMLTableRowElement & HTMLLIElement;

export interface RowProps {
  children: React.ReactNode;
  id: string;
  selected?: boolean;
  position: number;
  subdued?: boolean;
  status?: RowStatus;
  disabled?: boolean;
  onNavigation?(id: string): void;
  onClick?(): void;
}

export const Row = memo(function Row({
  children,
  selected,
  id,
  position,
  subdued,
  status,
  disabled,
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

      if (('key' in event && event.key !== ' ') || !onSelectionChange) return;
      const selectionType = event.nativeEvent.shiftKey
        ? SelectionType.Multi
        : SelectionType.Single;

      onSelectionChange(selectionType, !selected, id, position);
    },
    [id, onSelectionChange, position, selected],
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
    selectable && condensed && styles.condensedRow,
    selected && styles['TableRow-selected'],
    subdued && styles['TableRow-subdued'],
    hovered && styles['TableRow-hovered'],
    disabled && styles['TableRow-disabled'],
    status && styles[variationName('status', status)],
    !selectable &&
      !primaryLinkElement.current &&
      styles['TableRow-unclickable'],
  );

  let handleRowClick;

  if ((!disabled && selectable) || primaryLinkElement.current) {
    handleRowClick = (event: React.MouseEvent) => {
      if (!tableRowRef.current || isNavigating.current) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();

      if (onClick) {
        onClick();
        return;
      }

      if (primaryLinkElement.current && !selectMode) {
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

  const checkboxMarkup = selectable ? <Checkbox /> : null;

  return (
    <RowContext.Provider value={contextValue}>
      <RowHoveredContext.Provider value={hovered}>
        <RowWrapper
          key={id}
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
