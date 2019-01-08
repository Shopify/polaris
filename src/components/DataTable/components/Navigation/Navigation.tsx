import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Button from '../../../Button';

import {ColumnVisibilityData} from '../../types';

import * as styles from '../../DataTable.scss';

export interface Props {
  columnVisibilityData: ColumnVisibilityData[];
  isScrolledFarthestLeft?: boolean;
  isScrolledFarthestRight?: boolean;
  navigateTableLeft?(): void;
  navigateTableRight?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

function Navigation({
  columnVisibilityData,
  isScrolledFarthestLeft,
  isScrolledFarthestRight,
  navigateTableLeft,
  navigateTableRight,
  polaris: {
    intl: {translate},
  },
}: CombinedProps) {
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
        icon="chevronLeft"
        disabled={isScrolledFarthestLeft}
        accessibilityLabel={leftA11yLabel}
        onClick={navigateTableLeft}
      />
      {pipMarkup}
      <Button
        plain
        icon="chevronRight"
        disabled={isScrolledFarthestRight}
        accessibilityLabel={rightA11yLabel}
        onClick={navigateTableRight}
      />
    </div>
  );
}

export default withAppProvider<Props>()(Navigation);
