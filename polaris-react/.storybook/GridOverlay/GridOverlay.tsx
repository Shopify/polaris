import React, {useState} from 'react';

import {useEventListener} from '../../src';
import {classNames} from '../../src/utilities/css';
import {useBreakpoints} from '../../src/utilities/breakpoints';

import './GridOverlay.css';

const COLUMNS_SMALL = 6;
const COLUMNS_LARGE = 12;

type Layer = 'above' | 'below';
interface Props {
  inFrame?: boolean;
  maxWidth?: string;
  layer?: Layer;
  children?: React.ReactNode;
}

export function GridOverlay({inFrame, maxWidth, layer, children}: Props) {
  const {lgUp} = useBreakpoints();
  const [columns, setColumns] = useState(lgUp ? COLUMNS_LARGE : COLUMNS_SMALL);

  const handleResize = () => setColumns(lgUp ? COLUMNS_LARGE : COLUMNS_SMALL);

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
