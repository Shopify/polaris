import React, {ReactNode} from 'react';
import {classNames} from '../../../../utilities/css';
import {useResourceManagerForList} from '../../../../utilities/resources';

import styles from './List.scss';

export interface ListProps {
  children: ReactNode;
}

export function List({children}: ListProps) {
  const {selectMode, loading} = useResourceManagerForList();

  const listClassNames = classNames(
    styles.List,
    selectMode && styles.disableTextSelection,
  );

  return (
    <ul className={listClassNames} aria-live="polite" aria-busy={loading}>
      {children}
    </ul>
  );
}
