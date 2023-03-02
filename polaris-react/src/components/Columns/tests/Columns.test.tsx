import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Columns} from '..';

describe('Columns', () => {
  it('only renders custom properties that match the properties passed in', () => {
    const columns = mountWithApp(<Columns gap={{md: '1'}} />);

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-gap-md': 'var(--p-space-1)',
      } as React.CSSProperties,
    });
  });

  it('formats string columns', () => {
    const columns = mountWithApp(
      <Columns columns={{xs: '1fr 1fr', lg: '1.5fr 0.5fr'}} />,
    );

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-grid-template-columns-xs': '1fr 1fr',
        '--pc-columns-grid-template-columns-lg': '1.5fr 0.5fr',
      } as React.CSSProperties,
    });
  });

  it('formats number columns', () => {
    const columns = mountWithApp(<Columns columns={{xs: 1, md: 4}} />);

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-grid-template-columns-xs': 'repeat(1, minmax(0, 1fr))',
        '--pc-columns-grid-template-columns-md': 'repeat(4, minmax(0, 1fr))',
      } as React.CSSProperties,
    });
  });

  it('formats alias columns', () => {
    const columns = mountWithApp(
      <Columns
        columns={{xs: ['oneHalf', 'oneHalf'], md: ['oneThird', 'twoThirds']}}
      />,
    );

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-grid-template-columns-xs':
          'minmax(0, 1fr) minmax(0, 1fr)',
        '--pc-columns-grid-template-columns-md':
          'minmax(0, 1fr) minmax(0, 2fr)',
      } as React.CSSProperties,
    });
  });
});
