import React from 'react';
import {mountWithApp} from 'tests/utilities';

import {InlineGrid} from '..';

describe('InlineGrid', () => {
  it('only renders custom properties that match the properties passed in', () => {
    const inlineGrid = mountWithApp(
      <InlineGrid gap={{md: '100'}} alignItems="start" />,
    );

    expect(inlineGrid).toContainReactComponent('div', {
      style: {
        '--pc-inline-grid-gap-md': 'var(--p-space-100)',
        '--pc-inline-grid-align-items': 'start',
      } as React.CSSProperties,
    });
  });

  it('formats string columns', () => {
    const inlineGrid = mountWithApp(
      <InlineGrid columns={{xs: '1fr 1fr', lg: '1.5fr 0.5fr'}} />,
    );

    expect(inlineGrid).toContainReactComponent('div', {
      style: {
        '--pc-inline-grid-grid-template-columns-xs': '1fr 1fr',
        '--pc-inline-grid-grid-template-columns-lg': '1.5fr 0.5fr',
      } as React.CSSProperties,
    });
  });

  it('formats number columns', () => {
    const inlineGrid = mountWithApp(<InlineGrid columns={{xs: 1, md: 4}} />);

    expect(inlineGrid).toContainReactComponent('div', {
      style: {
        '--pc-inline-grid-grid-template-columns-xs':
          'repeat(1, minmax(0, 1fr))',
        '--pc-inline-grid-grid-template-columns-md':
          'repeat(4, minmax(0, 1fr))',
      } as React.CSSProperties,
    });
  });

  it('formats alias columns', () => {
    const inlineGrid = mountWithApp(
      <InlineGrid
        columns={{xs: ['oneHalf', 'oneHalf'], md: ['oneThird', 'twoThirds']}}
      />,
    );

    expect(inlineGrid).toContainReactComponent('div', {
      style: {
        '--pc-inline-grid-grid-template-columns-xs':
          'minmax(0, 1fr) minmax(0, 1fr)',
        '--pc-inline-grid-grid-template-columns-md':
          'minmax(0, 1fr) minmax(0, 2fr)',
      } as React.CSSProperties,
    });
  });
});
