import {isKeyOf} from '../../src/utilities';
import {
  shape,
  shapeBorderRadiusScale,
  shapeBorderRadiusAlias,
} from '../../src/token-groups/shape';

describe('ShapeBorderRadiusScale', () => {
  it('extracts the border radius scale from the shape token', () => {
    for (const scale of shapeBorderRadiusScale) {
      expect(isKeyOf(shape, `border-radius-${scale}`)).toBe(true);
    }
  });
});

describe('ShapeBorderRadiusAlias', () => {
  it('extracts the border radius alias from the shape token', () => {
    for (const alias of shapeBorderRadiusAlias) {
      expect(isKeyOf(shape, `border-radius-${alias}`)).toBe(true);
    }
  });
});
