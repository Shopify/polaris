import React from 'react';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {Button} from '../../../Button';
import type {ColumnVisibilityData} from '../../types';
import styles from '../../DataTable.module.scss';

export interface NavigationProps {
  columnVisibilityData: ColumnVisibilityData[];
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  fixedFirstColumns: number;
  navigateTableLeft?(): void;
  navigateTableRight?(): void;
  setRef?: (ref: HTMLDivElement | null) => void;
}

export function Navigation({
  columnVisibilityData,
  isScrolledFarthestLeft,
  isScrolledFarthestRight,
  navigateTableLeft,
  navigateTableRight,
  fixedFirstColumns,
  setRef = () => {},
}: NavigationProps) {
  const i18n = useI18n();

  const pipMarkup = columnVisibilityData.map((column, index) => {
    if (index < fixedFirstColumns) return;
    const className = classNames(
      styles.Pip,
      column.isVisible && styles['Pip-visible'],
    );

    return <div className={className} key={`pip-${index}`} />;
  });

  const leftA11yLabel = i18n.translate(
    'Polaris.DataTable.navAccessibilityLabel',
    {direction: 'left'},
  );

  const rightA11yLabel = i18n.translate(
    'Polaris.DataTable.navAccessibilityLabel',
    {direction: 'right'},
  );

  return (
    <div className={styles.Navigation} ref={setRef}>
      <Button
        plain
        icon={ChevronLeftMinor}
        disabled={isScrolledFarthestLeft}
        accessibilityLabel={leftA11yLabel}
        onClick={navigateTableLeft}
      />
      {pipMarkup}
      <Button
        plain
        icon={ChevronRightMinor}
        disabled={isScrolledFarthestRight}
        accessibilityLabel={rightA11yLabel}
        onClick={navigateTableRight}
      />
    </div>
  );
}
