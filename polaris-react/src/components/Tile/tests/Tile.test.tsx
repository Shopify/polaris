import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Tile} from '../Tile';

const Children = () => <p>This is a tile</p>;

describe('<Tile />', () => {
  it('renders children', () => {
    const tile = mountWithApp(
      <Tile spacing="1" columns="1">
        <Children />
      </Tile>,
    );

    expect(tile).toContainReactComponent(Children);
  });

  it('uses custom properties when passed in', () => {
    const tile = mountWithApp(
      <Tile spacing="1" columns="2">
        <Children />
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
