import {isKeyOf} from '../../src/utilities';
import {
  breakpoints,
  breakpointsAlias,
} from '../../src/token-groups/breakpoints';

describe('BreakpointsAlias', () => {
  it('has a breakpoints token for each breakpoint alias', () => {
    for (const alias of breakpointsAlias) {
      expect(isKeyOf(breakpoints, `breakpoints-${alias}`)).toBe(true);
    }
  });
});
