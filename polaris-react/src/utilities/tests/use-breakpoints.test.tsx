import {mount} from 'tests/utilities';
import {matchMedia} from '@shopify/jest-dom-mocks';
import {
  BreakpointsTokenName,
  breakpoints,
  getMediaConditions,
} from '@shopify/polaris-tokens';

import {
  BreakpointsDirectionAlias,
  useBreakpoints,
  getBreakpointsQueryEntries,
} from '../breakpoints';

const mediaConditions = getMediaConditions(breakpoints);

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

function setMediaWidth(breakpointsTokenName: BreakpointsTokenName) {
  const aliasDirectionConditions = Object.values(
    mediaConditions[breakpointsTokenName],
  );

  jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: aliasDirectionConditions.includes(query),
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
  it('converts breakpoints tokens into entries with direction/alias names', () => {
    const directionAliases: BreakpointsDirectionAlias[] =
      getBreakpointsQueryEntries(breakpoints).map(
        ([directionAlias]) => directionAlias,
      );

    expect(directionAliases).toStrictEqual([
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
