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
      <Column columns={{xs: 2, sm: 4, md: 6, lg: 12, xl: 12}} />,
    );

    expect(column).toContainReactComponent('div', {
      className:
        'Column grid-2-column-xs grid-4-column-sm grid-6-column-md grid-12-column-lg grid-12-column-xl',
    });
  });
});
