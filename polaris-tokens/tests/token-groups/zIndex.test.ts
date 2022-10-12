import {isKeyOf} from '../../src/utilities';
import {zIndex, zIndexZScale} from '../../src/token-groups/zIndex';

describe('ZIndexZScale', () => {
  it('has a zIndex token for each z-index scale', () => {
    for (const scale of zIndexZScale) {
      expect(isKeyOf(zIndex, `z-${scale}`)).toBe(true);
    }
  });
});
