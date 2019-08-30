import React from 'react';
import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';

import Collapsible from '../../../../../Collapsible';

import styles from '../../../../Navigation.scss';

const createSecondaryNavigationId = createUniqueIDFactory(
  'SecondaryNavigation',
);

interface Props {
  expanded: boolean;
  children?: React.ReactNode;
}

export default function Secondary({children, expanded}: Props) {
  const secondaryNavigationId = createSecondaryNavigationId();
  return (
    <Collapsible id={secondaryNavigationId} open={expanded}>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
