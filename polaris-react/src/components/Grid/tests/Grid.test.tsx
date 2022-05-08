import React from 'react';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {tokens} from '../../../tokens';
import {formatAreas, Grid} from '../Grid';
import {EventListener} from '../../EventListener';

const defaultProps = {
  '--pc-grid-columns-large': 12,
  '--pc-grid-columns-medium': 4,
  '--pc-grid-columns-small': 2,
  gap: 'var(--p-space-4)',
};

describe('<Grid />', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  const smallAreas = ['small1', 'small2 small3'];
  const mediumAreas = ['medium1', 'medium2 medium3'];
  const largeAreas = ['large1', 'large2 large3'];

  it('applies small grid-template-areas as inline style when screenwidth is less than breakpoints-sm', () => {
    setMediaWidth(tokens.breakpoints['breakpoints-xs']);

    const grid = mountWithApp(
      <Grid
        areas={{
          small: smallAreas,
          medium: mediumAreas,
          large: largeAreas,
        }}
      />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        ...defaultProps,
        gridTemplateAreas: formatAreas(smallAreas),
      },
    });
  });

  it('applies medium grid-template-areas as inline style when screenwidth is less than breakpoints-md', () => {
    setMediaWidth(tokens.breakpoints['breakpoints-sm']);

    const grid = mountWithApp(
      <Grid
        areas={{
          small: smallAreas,
          medium: mediumAreas,
          large: largeAreas,
        }}
      />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        ...defaultProps,
        gridTemplateAreas: formatAreas(mediumAreas),
      },
    });
  });

  it('applies large grid-template-areas as inline style when screenwidth is less than breakpoints-lg', () => {
    setMediaWidth(tokens.breakpoints['breakpoints-md']);

    const grid = mountWithApp(
      <Grid
        areas={{
          small: smallAreas,
          medium: mediumAreas,
          large: largeAreas,
        }}
      />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        ...defaultProps,
        gridTemplateAreas: formatAreas(largeAreas),
      },
    });
  });

  it('renders an EventListener that hanles resize', () => {
    const grid = mountWithApp(<Grid />);

    expect(grid).toContainReactComponent(EventListener, {
      event: 'resize',
    });
  });

  it('renders inline custom properties for custom columns', () => {
    const grid = mountWithApp(
      <Grid columns={{small: 1, medium: 3, large: 7}} />,
    );

    expect(grid).toContainReactComponent('div', {
      style: {
        ...defaultProps,
        '--pc-grid-columns-small': 1,
        '--pc-grid-columns-medium': 3,
        '--pc-grid-columns-large': 7,
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
