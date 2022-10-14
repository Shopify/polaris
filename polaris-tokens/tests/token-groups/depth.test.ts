import {isKeyOf} from '../../src/utilities';
import {depth, depthShadowAlias} from '../../src/token-groups/depth';

describe('DepthShadowAlias', () => {
  it('has a depth token for each shadow alias', () => {
    for (const alias of depthShadowAlias) {
      expect(isKeyOf(depth, `shadow-${alias}`)).toBe(true);
    }
  });
});
