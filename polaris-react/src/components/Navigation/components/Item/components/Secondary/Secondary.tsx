import React from 'react';

import {useUniqueId} from '../../../../../../utilities/unique-id';
import {Collapsible} from '../../../../../Collapsible';
import styles from '../../../../Navigation.scss';

interface SecondaryProps {
  expanded: boolean;
  children?: React.ReactNode;
  id?: string;
}

export function Secondary({id, children, expanded}: SecondaryProps) {
  const uid = useUniqueId('SecondaryNavigation');
  return (
    <Collapsible id={id || uid} open={expanded} transitionDisabled>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
