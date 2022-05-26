import React, {useState} from 'react';

import {classNames} from '../../src/utilities/css';
import {useEventListener} from '../../src';
import {tokens} from '../../src/tokens';

import styles from './GridOverlay.scss';

const COLUMNS_SMALL = 6;
const COLUMNS_LARGE = 12;
const BREAKPOINT = tokens.breakpoints['breakpoints-lg'];

type Layer = 'above' | 'below';

interface Props {
  inFrame?: boolean;
  maxWidth?: string;
  layer?: Layer;
  children?: React.ReactNode;
}

export function GridOverlay({inFrame, maxWidth, layer, children}: Props) {
  const [columns, setColumns] = useState(
    window.matchMedia(`(min-width: ${BREAKPOINT})`).matches
      ? COLUMNS_LARGE
      : COLUMNS_SMALL,
  );

  const handleResize = () =>
    setColumns(
      window.matchMedia(`(min-width: ${BREAKPOINT})`).matches
        ? COLUMNS_LARGE
        : COLUMNS_SMALL,
    );

  const className = classNames(styles.GridOverlay, inFrame && styles.inFrame);
  const style = {
    maxWidth,
    zIndex: layer === 'above' || inFrame ? 1 : -1,
  } as React.CSSProperties;

  useEventListener('resize', handleResize);

  return (
    <div className={className} style={style}>
      {[...Array(columns).keys()].map((key) => (
        <div key={key} className={styles.Cell} />
      ))}
      {children}
    </div>
  );
}
