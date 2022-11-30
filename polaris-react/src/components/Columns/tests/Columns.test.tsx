import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {Columns} from '..';

describe('Columns', () => {
  it('renders custom properties with default values', () => {
    const columns = mountWithApp(<Columns />);

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-xs': 'repeat(6, minmax(0, 1fr))',
        '--pc-columns-gap-xs': 'var(--p-space-4)',
      } as React.CSSProperties,
    });
  });

  it('only renders custom properties that match the properties passed in', () => {
    const columns = mountWithApp(<Columns gap={{md: '1'}} />);

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-xs': 'repeat(6, minmax(0, 1fr))',
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
        '--pc-columns-xs': '1fr 1fr',
        '--pc-columns-lg': '1.5fr 0.5fr',
        '--pc-columns-gap-xs': 'var(--p-space-4)',
      } as React.CSSProperties,
    });
  });

  it('formats number columns', () => {
    const columns = mountWithApp(<Columns columns={{xs: 1, md: 4}} />);

    expect(columns).toContainReactComponent('div', {
      style: {
        '--pc-columns-xs': 'repeat(1, minmax(0, 1fr))',
        '--pc-columns-md': 'repeat(4, minmax(0, 1fr))',
        '--pc-columns-gap-xs': 'var(--p-space-4)',
      } as React.CSSProperties,
    });
  });
});
