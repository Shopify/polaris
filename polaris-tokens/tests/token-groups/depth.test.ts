import {isKeyOf} from '../../src/utilities';
import {depth, depthShadowAlias} from '../../src/token-groups/depth';

describe('DepthShadowAlias', () => {
  it('extracts the depth alias from the depth token', () => {
    for (const alias of depthShadowAlias) {
      expect(isKeyOf(depth, `shadow-${alias}`)).toBe(true);
    }
  });
});
