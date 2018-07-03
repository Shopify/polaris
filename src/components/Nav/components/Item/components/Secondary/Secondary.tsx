import * as React from 'react';

import {createUniqueIDFactory} from '@shopify/javascript-utilities/other';
import {Collapsible} from '../../../../../../components';

import styles from './Secondary.scss';

const createSecondaryNavId = createUniqueIDFactory('SecondaryNav');

interface Props {
  expanded: boolean;
  children?: React.ReactNode;
}

export default function Secondary({children, expanded}: Props) {
  const secondaryNavId = createSecondaryNavId();
  return (
    <Collapsible id={secondaryNavId} open={expanded}>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
