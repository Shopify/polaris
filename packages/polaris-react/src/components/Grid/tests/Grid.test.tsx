import React from 'react';
import {matchMedia, timer} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {formatAreas, Grid} from '../Grid';

describe('<Grid />', () => {
  beforeEach(() => {
    matchMedia.mock();
    timer.mock();
  });

  afterEach(() => {
    matchMedia.restore();
    timer.restore();
  });

  const xsAreas = ['xs1 xs2 xs3'];
  const smAreas = ['sm1', 'sm2 sm3'];
  const mdAreas = ['md1', 'md2', 'md3'];
  const lgAreas = ['lg1', 'lg2', 'lg3'];
  const xlAreas = ['xl1', 'xl2', 'xl3'];

  it('applies grid-template-areas as custom properties', () => {
    const grid = mountWithApp(
      <Grid
        areas={{
          xs: xsAreas,
          sm: smAreas,
          md: mdAreas,
          lg: lgAreas,
          xl: xlAreas,
        }}
      />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        '--pc-grid-areas-xs': formatAreas(xsAreas),
        '--pc-grid-areas-sm': formatAreas(smAreas),
        '--pc-grid-areas-md': formatAreas(mdAreas),
        '--pc-grid-areas-lg': formatAreas(lgAreas),
        '--pc-grid-areas-xl': formatAreas(xlAreas),
      } as React.CSSProperties,
    });
  });

  it('renders inline custom properties for custom columns', () => {
    const grid = mountWithApp(
      <Grid columns={{xs: 1, sm: 3, md: 7, lg: 12, xl: 12}} />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        '--pc-grid-columns-xs': 1,
        '--pc-grid-columns-sm': 3,
        '--pc-grid-columns-md': 7,
        '--pc-grid-columns-lg': 12,
        '--pc-grid-columns-xl': 12,
      } as React.CSSProperties,
    });
  });

  it('renders inline custom properties for custom gap', () => {
    const grid = mountWithApp(
      <Grid
        gap={{
          xs: 'var(--p-space-100)',
          sm: 'var(--p-space-100)',
          md: 'var(--p-space-200)',
          lg: 'var(--p-space-400)',
          xl: 'var(--p-space-400)',
        }}
      />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        '--pc-grid-gap-xs': 'var(--p-space-100)',
        '--pc-grid-gap-sm': 'var(--p-space-100)',
        '--pc-grid-gap-md': 'var(--p-space-200)',
        '--pc-grid-gap-lg': 'var(--p-space-400)',
        '--pc-grid-gap-xl': 'var(--p-space-400)',
      } as React.CSSProperties,
    });
  });

  describe('formatAreas', () => {
    it('formats a single area', () => {
      const areas = ['area1'];
      expect(formatAreas(areas)).toBe("'area1'");
    });

    it('formats multiple areas', () => {
      const areas = ['area1 area2 area3'];
      expect(formatAreas(areas)).toBe("'area1 area2 area3'");
    });

    it('formats multiple grouped areas', () => {
      const areas = ['area1 area2 area3', 'area4 area5 area6'];
      expect(formatAreas(areas)).toBe(
        "'area1 area2 area3' 'area4 area5 area6'",
      );
    });
  });
});
