import {isKeyOf} from '../../src/utilities';
import {border, borderRadiusScale} from '../../src/token-groups/border';

describe('BorderRadiusScale', () => {
  it('has a border token for each border radius scale', () => {
    for (const scale of borderRadiusScale) {
      expect(isKeyOf(border, `border-radius-${scale}`)).toBe(true);
    }
  });
});
