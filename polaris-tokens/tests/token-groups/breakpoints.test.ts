import {isKeyOf} from '@shopify/polaris-migrator';

import {
  breakpoints,
  breakpointsAlias,
} from '../../src/token-groups/breakpoints';

describe('BreakpointsAlias', () => {
  it('extracts the breakpoint alias from the breakpoints token', () => {
    for (const alias of breakpointsAlias) {
      expect(isKeyOf(breakpoints, `breakpoints-${alias}`)).toBe(true);
    }
  });
});
