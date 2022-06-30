import React, {useState} from 'react';
import {tokens} from '@shopify/polaris-tokens';

import {useEventListener} from '../../src';
import {classNames} from '../../src/utilities/css';

import './GridOverlay.css';

const COLUMNS_SMALL = 6;
const COLUMNS_LARGE = 12;
const BREAKPOINT = tokens.breakpoints['breakpoints-lg'].value;

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

  useEventListener('resize', handleResize);

  const className = classNames('GridOverlay', inFrame && 'inFrame');
  const style = {
    maxWidth,
    zIndex: layer === 'above' || inFrame ? 1 : -1,
  } as React.CSSProperties;

  return (
    <div className={className} style={style}>
      {[...Array(columns).keys()].map((key) => (
        <div key={key} className="Cell" />
      ))}
      {children}
    </div>
  );
}
