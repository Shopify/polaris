import React from 'react';

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
  const length = lgUp ? COLUMNS_LARGE : COLUMNS_SMALL;
  const className = classNames('GridOverlay', inFrame && 'inFrame');
  const style = {maxWidth, zIndex: layer === 'above' || inFrame ? 1 : -1};

  return (
    <div className={className} style={style}>
      {Array.from({length}).map((_, index) => (
        <div key={index} className="Cell" />
      ))}
      {children}
    </div>
  );
}
