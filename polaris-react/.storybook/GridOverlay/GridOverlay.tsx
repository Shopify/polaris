import React, {useEffect, useState} from 'react';
import debounce from 'lodash/debounce';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../../src';
import {classNames} from '../../src/utilities/css';

import './GridOverlay.css';

const COLUMNS_SMALL = 4;
const COLUMNS_LARGE = 12;
const BREAKPOINT = 768;

type Layer = 'above' | 'below';
interface Props {
  inFrame?: boolean;
  maxWidth?: string;
  layer?: Layer;
  children?: React.ReactNode;
}

export function GridOverlay({inFrame, maxWidth, layer, children}: Props) {
  const [columns, setColumns] = useState(
    window.innerWidth < BREAKPOINT ? COLUMNS_SMALL : COLUMNS_LARGE,
  );

  const handleResize = () =>
    setColumns(window.innerWidth < BREAKPOINT ? COLUMNS_SMALL : COLUMNS_LARGE);

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
      <EventListener event="resize" handler={handleResize} />
    </div>
  );
}
