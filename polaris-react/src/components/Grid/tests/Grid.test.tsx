import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {tokens} from '../../../tokens';
import {formatAreas, Grid} from '../Grid';
import {EventListener} from '../../EventListener';

const defaultProps = {
  '--pc-grid-columns-xs': 2,
  '--pc-grid-columns-sm': 4,
  '--pc-grid-columns-md': 6,
  '--pc-grid-columns-lg': 12,
  '--pc-grid-columns-xl': 12,
  '--pc-grid-gap-xs': 'var(--p-space-4)',
  '--pc-grid-gap-sm': 'var(--p-space-4)',
  '--pc-grid-gap-md': 'var(--p-space-4)',
  '--pc-grid-gap-lg': 'var(--p-space-4)',
  '--pc-grid-gap-xl': 'var(--p-space-4)',
};

describe('<Grid />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  const xsAreas = ['xs1 xs2 xs3'];
  const smAreas = ['sm1', 'sm2 sm3'];
  const mdAreas = ['md1', 'md2', 'md3'];
  const lgAreas = ['lg1', 'lg2', 'lg3'];
  const xlAreas = ['xl1', 'xl2', 'xl3'];

  it('applies small grid-template-areas as inline style when screenwidth is less than breakpoints-sm', () => {
    setMediaWidth(tokens.breakpoints['breakpoints-xs']);

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
        ...defaultProps,
        gridTemplateAreas: formatAreas(xsAreas),
      },
    });
  });

  it('applies medium grid-template-areas as inline style when screenwidth is less than breakpoints-md', () => {
    setMediaWidth(tokens.breakpoints['breakpoints-sm']);

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
        ...defaultProps,
        gridTemplateAreas: formatAreas(smAreas),
      },
    });
  });

  it('applies large grid-template-areas as inline style when screenwidth is less than breakpoints-lg', () => {
    setMediaWidth(tokens.breakpoints['breakpoints-md']);

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
        ...defaultProps,
        gridTemplateAreas: formatAreas(mdAreas),
      },
    });
  });

  it('renders an EventListener that handles resize', () => {
    const grid = mountWithApp(<Grid />);

    expect(grid).toContainReactComponent(EventListener, {
      event: 'resize',
    });
  });

  it('renders inline custom properties for custom columns', () => {
    const grid = mountWithApp(
      <Grid columns={{xs: 1, sm: 3, md: 7, lg: 12, xl: 12}} />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        ...defaultProps,
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
          xs: 'var(--p-space-1)',
          sm: 'var(--p-space-1)',
          md: 'var(--p-space-2)',
          lg: 'var(--p-space-4)',
          xl: 'var(--p-space-4)',
        }}
      />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        ...defaultProps,
        '--pc-grid-gap-xs': 'var(--p-space-1)',
        '--pc-grid-gap-sm': 'var(--p-space-1)',
        '--pc-grid-gap-md': 'var(--p-space-2)',
        '--pc-grid-gap-lg': 'var(--p-space-4)',
        '--pc-grid-gap-xl': 'var(--p-space-4)',
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

function setMediaWidth(width: string) {
  jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: query === `(min-width: ${width})`,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}
