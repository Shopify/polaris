import React, {useEffect, useState} from 'react';
import debounce from 'lodash/debounce';
import {EventListener} from '../../src';
import {classNames} from '../../src/utilities/css';

import styles from './GridOverlay.scss';

const COLUMNS_SMALL = 4;
const COLUMNS_LARGE = 12;
const BREAKPOINT = 769;

interface Props {
  inset?: boolean;
  inFrame?: boolean;
}

export function GridOverlay({inset, inFrame}: Props) {
  const [columns, setColumns] = useState(
    window.innerWidth < BREAKPOINT ? COLUMNS_SMALL : COLUMNS_LARGE,
  );

  const handleResize = debounce(() => {
    setColumns(window.innerWidth < BREAKPOINT ? COLUMNS_SMALL : COLUMNS_LARGE);
  }, 50);

  const className = classNames(
    styles.GridOverlay,
    inset && styles.inset,
    inFrame && styles.inFrame,
  );

  return (
    <div className={className}>
      {[...Array(columns).keys()].map((key) => (
        <div key={key} className={styles.Cell} />
      ))}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}
