import {isKeyOf} from '../../src/utilities';
import {
  shape,
  shapeBorderRadiusScale,
  shapeBorderRadiusAlias,
} from '../../src/token-groups/shape';

describe('ShapeBorderRadiusScale', () => {
  it('has a shape token for each border radius scale', () => {
    for (const scale of shapeBorderRadiusScale) {
      expect(isKeyOf(shape, `border-radius-${scale}`)).toBe(true);
    }
  });
});

describe('ShapeBorderRadiusAlias', () => {
  it('has a shape token for each border radius alias', () => {
    for (const alias of shapeBorderRadiusAlias) {
      expect(isKeyOf(shape, `border-radius-${alias}`)).toBe(true);
    }
  });
});
