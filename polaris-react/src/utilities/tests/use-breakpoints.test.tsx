import React from 'react';
import {mount} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {tokens, getMediaConditions} from '@shopify/polaris-tokens';

import {
  useBreakpoints,
  getBreakpointsQueryEntries,
  getMatches,
} from '../breakpoints';

const mediaConditions = getMediaConditions(tokens.breakpoints);

describe('useBreakpoints', () => {
  beforeEach(() => {
    matchMedia.mock();
  });

  afterEach(() => {
    matchMedia.restore();
  });

  it('breakpoints-xs', () => {
    setMediaWidth('breakpoints-xs');
    mount(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints();

      expect(breakpoints).toMatchObject({
        xsDown: true,
        xsOnly: true,
        xsUp: true,
      });

      return null;
    }
  });

  it('breakpoints-sm', () => {
    setMediaWidth('breakpoints-sm');
    mount(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints();

      expect(breakpoints).toMatchObject({
        smDown: true,
        smOnly: true,
        smUp: true,
      });

      return null;
    }
  });

  it('breakpoints-md', () => {
    setMediaWidth('breakpoints-md');
    mount(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints();

      expect(breakpoints).toMatchObject({
        mdDown: true,
        mdOnly: true,
        mdUp: true,
      });

      return null;
    }
  });

  it('breakpoints-lg', () => {
    setMediaWidth('breakpoints-lg');
    mount(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints();

      expect(breakpoints).toMatchObject({
        lgDown: true,
        lgOnly: true,
        lgUp: true,
      });

      return null;
    }
  });

  it('breakpoints-xl', () => {
    setMediaWidth('breakpoints-xl');
    mount(<MockComponent />);

    function MockComponent() {
      const breakpoints = useBreakpoints();

      expect(breakpoints).toMatchObject({
        xlDown: true,
        xlOnly: true,
        xlUp: true,
      });

      return null;
    }
  });
});

function setMediaWidth(alias: keyof typeof mediaConditions) {
  const aliasConditions = Object.values(mediaConditions[alias]);

  jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: aliasConditions.includes(query),
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
}

describe('getBreakpointsQueryEntries', () => {
  it('converts breakpoints tokens into entries with aliases/direction names', () => {
    const breakpointsQueryNames = getBreakpointsQueryEntries(
      tokens.breakpoints,
    ).map(([name]) => name);

    expect(breakpointsQueryNames).toStrictEqual([
      'xsUp',
      'xsDown',
      'xsOnly',
      'smUp',
      'smDown',
      'smOnly',
      'mdUp',
      'mdDown',
      'mdOnly',
      'lgUp',
      'lgDown',
      'lgOnly',
      'xlUp',
      'xlDown',
      'xlOnly',
    ]);
  });
});

describe('getMatches SSR', () => {
  const {window} = global;

  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete global.window;
  });

  afterAll(() => {
    global.window = window;
  });

  it('applies false as the default value for each breakpoint aliases', () => {
    const matches = getMatches(false);

    expect(Object.values(matches).every((match) => match === false)).toBe(true);
  });

  it('applies true as the default value for each breakpoint aliases', () => {
    const matches = getMatches(true);

    expect(Object.values(matches).every((match) => match === true)).toBe(true);
  });

  it('applies select defaults to all breakpoint aliases', () => {
    const matches = getMatches({
      mdUp: true,
    });

    expect(
      Object.entries(matches).every(([aliasDirection, match]) => {
        if (aliasDirection === 'mdUp') return match === true;

        return match === false;
      }),
    ).toBe(true);
  });
});
