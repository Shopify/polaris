import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Cell} from '../Cell';

describe('<Cell />', () => {
  it('renders children', () => {
    const children = 'children';
    const cell = mountWithApp(<Cell>{children}</Cell>);

    expect(cell).toContainReactComponent('div', {children});
  });

  it('applies a grid-area style attribute', () => {
    const cell = mountWithApp(<Cell area="area1" />);

    expect(cell).toContainReactComponent('div', {
      style: {gridArea: 'area1'},
    });
  });

  it('applies classes when columnSpan is passed in', () => {
    const cell = mountWithApp(
      <Cell columnSpan={{xs: 2, sm: 4, md: 6, lg: 12, xl: 12}} />,
    );

    expect(cell).toContainReactComponent('div', {
      className:
        'Cell Cell-2-column-xs Cell-4-column-sm Cell-6-column-md Cell-12-column-lg Cell-12-column-xl',
    });
  });

  it('renders custom properties when column is passed in', () => {
    const cell = mountWithApp(
      <Cell column={{xs: '2 / span 1', lg: 'span 12'}} />,
    );

    expect(cell).toContainReactComponent('div', {
      style: {
        '--pc-column-xs': '2 / span 1',
        '--pc-column-lg': 'span 12',
      } as React.CSSProperties,
    });
  });

  it('renders custom properties when row is passed in', () => {
    const cell = mountWithApp(
      <Cell row={{xs: '2 / span 3', lg: '1 / span 2'}} />,
    );

    expect(cell).toContainReactComponent('div', {
      style: {
        '--pc-row-xs': '2 / span 3',
        '--pc-row-lg': '1 / span 2',
      } as React.CSSProperties,
    });
  });
});
