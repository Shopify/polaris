import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Tile} from '../Tile';

const Children = () => <p>This is a tile</p>;

describe('<Tile />', () => {
  it('renders children', () => {
    const tile = mountWithApp(
      <Tile columns={{xs: 2, sm: 2, md: 2, lg: 2, xl: 2}} gap={{xs: '2'}}>
        <Children />
      </Tile>,
    );

    expect(tile).toContainReactComponent(Children);
  });

  it('uses custom properties when passed in', () => {
    const tile = mountWithApp(
      <Tile columns={{xs: 2, lg: 2}} gap={{xs: '2'}}>
        <Children />
      </Tile>,
    );

    expect(tile).toContainReactComponent('div', {
      style: {
        '--pc-tile-xs': 'repeat(2, 1fr)',
        '--pc-tile-lg': 'repeat(2, 1fr)',
        '--pc-tile-gap-xs': 'var(--p-space-2)',
      } as React.CSSProperties,
    });
  });
});
