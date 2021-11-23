import type {ReactNode} from 'react';

import {useUniqueId} from '../../../../../../utilities/unique-id';
import {Collapsible} from '../../../../../Collapsible';
import styles from '../../../../Navigation.scss';

interface SecondaryProps {
  expanded: boolean;
  children?: ReactNode;
  id?: string;
}

export function Secondary({id, children, expanded}: SecondaryProps) {
  const uid = useUniqueId('SecondaryNavigation');
  return (
    <Collapsible
      id={id || uid}
      open={expanded}
      transition={{duration: '0ms', timingFunction: 'linear'}}
    >
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
