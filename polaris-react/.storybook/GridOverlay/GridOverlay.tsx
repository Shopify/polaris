import React, {useState} from 'react';
import {EventListener} from '../../src';
import {tokens} from '../../src/tokens';
import {classNames} from '../../src/utilities/css';

import styles from './GridOverlay.scss';

const COLUMNS_SMALL = 2;
const COLUMNS_MEDIUM = 4;
const COLUMNS_LARGE = 12;

type Layer = 'above' | 'below';

interface Props {
  inFrame?: boolean;
  maxWidth?: string;
  layer?: Layer;
  children?: React.ReactNode;
}

export function GridOverlay({inFrame, maxWidth, layer, children}: Props) {
  const [columns, setColumns] = useState(getColumns());
  const handleResize = () => setColumns(getColumns());

  const className = classNames(styles.GridOverlay, inFrame && styles.inFrame);

  const style = {
    maxWidth,
    zIndex: layer === 'above' || inFrame ? 1 : -1,
  } as React.CSSProperties;

  return (
    <div className={className} style={style}>
      {[...Array(columns).keys()].map((key) => (
        <div key={key} className={styles.Cell} />
      ))}
      {children}
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}

function getColumns() {
  const medium = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-md']})`,
  ).matches;
  const small = window.matchMedia(
    `(min-width: ${tokens.breakpoints['breakpoints-sm']})`,
  ).matches;

  switch (true) {
    case medium:
      return COLUMNS_LARGE;

    case small:
      return COLUMNS_MEDIUM;

    default:
      return COLUMNS_SMALL;
  }
}
