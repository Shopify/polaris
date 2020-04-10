import React from 'react';

import {useUniqueId} from '../../../../../../utilities/unique-id';
import {Collapsible} from '../../../../../Collapsible';
import styles from '../../../../Navigation.scss';

interface SecondaryProps {
  expanded: boolean;
  children?: React.ReactNode;
}

export function Secondary({children, expanded}: SecondaryProps) {
  const id = useUniqueId('SecondaryNavigation');
  return (
    <Collapsible id={id} open={expanded}>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
