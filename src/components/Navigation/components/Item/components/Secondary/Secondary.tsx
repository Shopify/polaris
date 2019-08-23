import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Collapsible from '../../../../../Collapsible';

import styles from '../../../../Navigation.scss';

const createSecondaryNavigationId = createUniqueIDFactory(
  'SecondaryNavigation',
);

interface SecondaryProps {
  expanded: boolean;
  children?: React.ReactNode;
}

export function Secondary({children, expanded}: SecondaryProps) {
  const secondaryNavigationId = createSecondaryNavigationId();
  return (
    <Collapsible id={secondaryNavigationId} open={expanded}>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
