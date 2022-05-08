import React from 'react';

import {classNames} from '../../../../utilities/css';
import styles from '../../Grid.scss';

interface Columns {
  /** Number of columns the section should span on small screens */
  small?: 1 | 2;
  /** Number of columns the section should span on medium screens */
  medium?: 1 | 2 | 3 | 4;
  /** Number of columns the section should span on large screens */
  large?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface ColumnProps {
  columns?: Columns;
  area?: string;
  children?: React.ReactNode;
}

export function Column({area: gridArea, children, columns}: ColumnProps) {
  const className = classNames(
    styles.Column,
    columns?.small && styles[`grid-${columns?.small}-column`],
    columns?.medium && styles[`grid-${columns?.medium}-column-md`],
    columns?.large && styles[`grid-${columns?.large}-column-lg`],
  );
  return (
    <div className={className} style={{gridArea}}>
      {children}
    </div>
  );
}
