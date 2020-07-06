import React, {useMemo, memo, useRef, useCallback} from 'react';

import {classNames} from '../../../../../utilities/css';
import {useToggle} from '../../../../../utilities/use-toggle';
import {
  useIndexRow,
  SelectionType,
  useIndexSelectionChange,
} from '../../../IndexProvider';
import styles from '../../IndexTable.scss';

import {RowContext, RowHoveredContext} from './context';

export interface RowProps {
  children: React.ReactNode;
  id: string;
  selected: boolean;
  position: number;
  subdued?: boolean;
}

export const Row = memo(function Row({
  children,
  selected,
  id,
  position,
  subdued,
}: RowProps) {
  const {selectMode} = useIndexRow();
  const onSelectionChange = useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut,
  } = useToggle(false);

  const rowClassName = classNames(
    styles.TableRow,
    selected && styles['TableRow--selected'],
    subdued && styles['TableRow--subdued'],
    hovered && styles['TableRow--hovered'],
  );

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
      onInteraction: handleInteraction,
    }),
    [id, selected, handleInteraction],
  );

  const tableRowRef = useRef<HTMLTableRowElement>(null);
  const isNavigating = useRef<boolean>(false);

  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    if (!tableRowRef.current || isNavigating.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const primaryLinkElement = tableRowRef.current.querySelector(
      '[data-primary-link]',
    );

    isNavigating.current = true;

    if (primaryLinkElement && !selectMode) {
      const {ctrlKey, metaKey} = event.nativeEvent;

      if (
        (ctrlKey || metaKey) &&
        primaryLinkElement instanceof HTMLAnchorElement
      ) {
        isNavigating.current = false;
        window.open(primaryLinkElement.href, '_blank');
        return;
      }

      primaryLinkElement.dispatchEvent(
        new MouseEvent(event.type, event.nativeEvent),
      );
    } else if (selectMode) {
      isNavigating.current = false;
      handleInteraction(event);
    }
  };

  return (
    <RowContext.Provider value={contextValue}>
      <RowHoveredContext.Provider value={hovered}>
        <tr
          key={id}
          className={rowClassName}
          onMouseEnter={setHoverIn}
          onMouseLeave={setHoverOut}
          onClick={handleRowClick}
          ref={tableRowRef}
        >
          {children}
        </tr>
      </RowHoveredContext.Provider>
    </RowContext.Provider>
  );
});
