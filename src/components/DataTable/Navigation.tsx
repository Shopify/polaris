import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Button from '../Button';
import Stack from '../Stack';
import {ColumnVisibilityData} from './DataTable';
import * as styles from './DataTable.scss';

export interface Props {
  currentColumn?: ColumnVisibilityData;
  columnVisibilityData: ColumnVisibilityData[];
  navigateTableLeft?(): void;
  navigateTableRight?(): void;
}

export default function Navigation({
  currentColumn,
  columnVisibilityData,
  navigateTableLeft,
  navigateTableRight,
}: Props) {
  const pipMarkup = columnVisibilityData.map((column, index) => {
    const className = classNames(
      styles.Pip,
      column.isVisible && styles['Pip-visible'],
    );

    return <div className={className} key={`pip-${index}`} />;
  });

  function reachedTableEnd(direction: string) {
    if (currentColumn) {
      return direction === 'left'
        ? currentColumn.isScrolledFarthestLeft
        : currentColumn.isScrolledFarthestRight;
    }

    return false;
  }

  return (
    <Stack alignment="center" spacing="tight">
      <Button
        plain
        icon="chevronLeft"
        disabled={reachedTableEnd('left')}
        accessibilityLabel="Scroll table left one column"
        onClick={navigateTableLeft}
      />
      {pipMarkup}
      <Button
        plain
        icon="chevronRight"
        disabled={reachedTableEnd('right')}
        accessibilityLabel="Scroll table right one column"
        onClick={navigateTableRight}
      />
    </Stack>
  );
}
