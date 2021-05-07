import React, {useMemo, memo, useRef, useCallback} from 'react';

import {useToggle} from '../../../../utilities/use-toggle';
import {
  useIndexRow,
  SelectionType,
  useIndexSelectionChange,
} from '../../../../utilities/index-provider';
import {Checkbox} from '../Checkbox';
import {classNames} from '../../../../utilities/css';
import {RowContext, RowHoveredContext} from '../../../../utilities/index-table';
import styles from '../../IndexTable.scss';

export interface RowProps {
  children: React.ReactNode;
  id: string;
  selected: boolean;
  position: number;
  subdued?: boolean;
  onNavigation?(id: string): void;
}

export const Row = memo(function Row({
  children,
  selected,
  id,
  position,
  subdued,
  onNavigation,
}: RowProps) {
  const {selectMode, condensed} = useIndexRow();
  const onSelectionChange = useIndexSelectionChange();
  const {
    value: hovered,
    setTrue: setHoverIn,
    setFalse: setHoverOut,
  } = useToggle(false);

  const rowClassName = classNames(
    styles.TableRow,
    condensed && styles.condensedRow,
    selected && styles['TableRow-selected'],
    subdued && styles['TableRow-subdued'],
    hovered && styles['TableRow-hovered'],
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

  const tableRowRef = useRef<HTMLTableRowElement & HTMLLIElement>(null);
  const isNavigating = useRef<boolean>(false);

  const handleRowClick = (event: React.MouseEvent) => {
    if (!tableRowRef.current || isNavigating.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const targetParent = (event.target as Element).parentNode;

    if (!selectMode && targetParent instanceof HTMLAnchorElement) {
      isNavigating.current = true;
      const hrefUrl = targetParent.href;

      if (onNavigation) {
        onNavigation(id);
      }

      isNavigating.current = false;
      window.open(hrefUrl, '_blank');
      return;

    } else {
      isNavigating.current = false;
      handleInteraction(event);
    }
  };

  const RowWrapper = condensed ? 'li' : 'tr';

  return (
    <RowContext.Provider value={contextValue}>
      <RowHoveredContext.Provider value={hovered}>
        <RowWrapper
          key={id}
          className={rowClassName}
          onMouseEnter={setHoverIn}
          onMouseLeave={setHoverOut}
          onClick={handleRowClick}
          ref={tableRowRef}
        >
          <Checkbox />
          {children}
        </RowWrapper>
      </RowHoveredContext.Provider>
    </RowContext.Provider>
  );
});
