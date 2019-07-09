import React from 'react';
import {ChevronLeftMinor, ChevronRightMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import Button from '../../../Button';

import {ColumnVisibilityData} from '../../types';

import styles from '../../DataTable.scss';

export interface Props {
  columnVisibilityData: ColumnVisibilityData[];
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  navigateTableLeft?(): void;
  navigateTableRight?(): void;
}

export default function Navigation({
  columnVisibilityData,
  isScrolledFarthestLeft,
  isScrolledFarthestRight,
  navigateTableLeft,
  navigateTableRight,
}: Props) {
  const {translate} = useI18n();

  const pipMarkup = columnVisibilityData.map((column, index) => {
    const className = classNames(
      styles.Pip,
      column.isVisible && styles['Pip-visible'],
    );

    return <div className={className} key={`pip-${index}`} />;
  });

  const leftA11yLabel = translate('Polaris.DataTable.navAccessibilityLabel', {
    direction: 'left',
  });

  const rightA11yLabel = translate('Polaris.DataTable.navAccessibilityLabel', {
    direction: 'right',
  });

  return (
    <div className={styles.Navigation}>
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
