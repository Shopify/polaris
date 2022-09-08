import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Tile} from '../Tile';

const text = 'This is a tile';
const children = <p>{text}</p>;

describe('<Tile />', () => {
  it('renders children', () => {
    const tile = mountWithApp(
      <Tile spacing="1" columns="1">
        {children}
      </Tile>,
    );

    expect(tile).toContainReactComponent('p', {children: text});
  });

  it('uses custom properties when passed in', () => {
    const tile = mountWithApp(
      <Tile spacing="1" columns="2">
        {children}
      </Tile>,
    );

    expect(tile).toContainReactComponent('div', {
      style: {
        '--pc-tile-column-number': 'repeat(2, 1fr)',
        '--pc-tile-spacing': 'var(--p-space-1)',
      } as React.CSSProperties,
    });
  });
});
