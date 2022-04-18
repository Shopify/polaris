import React, {useMemo, useState} from 'react';
import debounce from 'lodash/debounce';
import {EventListener} from '../../src';

import styles from './GridOverlay.scss';

const COLUMNS_SMALL = 4;
const COLUMNS_LARGE = 12;

export function GridOverlay() {
  const [columns, setColumns] = useState(12);

  const handleResize = debounce(
    () => setColumns(window.innerWidth < 769 ? COLUMNS_SMALL : COLUMNS_LARGE),
    50,
  );

  return (
    <div className={styles.GridOverlay}>
      {[...Array(columns).keys()].map((key) => (
        <div key={key} className={styles.Cell} />
      ))}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}
