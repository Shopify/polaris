import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Column} from '../Column';

describe('<Column />', () => {
  it('renders children', () => {
    const children = 'children';
    const column = mountWithApp(<Column>{children}</Column>);

    expect(column).toContainReactComponent('div', {children});
  });

  it('applies a grid-area style attribute', () => {
    const column = mountWithApp(<Column area="area1" />);

    expect(column).toContainReactComponent('div', {
      style: {gridArea: 'area1'},
    });
  });

  it('applies classes when columns are passed in', () => {
    const column = mountWithApp(
      <Column columns={{small: 1, medium: 2, large: 6}} />,
    );

    expect(column).toContainReactComponent('div', {
      className: 'Column grid-1-column grid-2-column-md grid-6-column-lg',
    });
  });
});
