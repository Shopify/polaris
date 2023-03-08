import React, {useId} from 'react';

import {Collapsible} from '../../../../../Collapsible';
import styles from '../../../../Navigation.scss';

interface SecondaryProps {
  expanded: boolean;
  children?: React.ReactNode;
  id?: string;
}

export function Secondary({id, children, expanded}: SecondaryProps) {
  const uid = useId();
  return (
    <Collapsible id={id || uid} open={expanded} transition={false}>
      <ul className={styles.List}>{children}</ul>
    </Collapsible>
  );
}
