import {isKeyOf} from '../../src/utilities';
import {zIndex, zIndexZScale} from '../../src/token-groups/zIndex';

describe('ZIndexZScale', () => {
  it('extracts the z-index scale from the zIndex token', () => {
    for (const scale of zIndexZScale) {
      expect(isKeyOf(zIndex, `z-${scale}`)).toBe(true);
    }
  });
});
