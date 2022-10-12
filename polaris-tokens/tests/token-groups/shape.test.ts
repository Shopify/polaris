import {isKeyOf} from '@shopify/polaris-migrator';

import {
  shape,
  borderRadiusScale,
  borderRadiusAlias,
} from '../../src/token-groups/shape';

describe('ShapeBorderRadiusScale', () => {
  it('extracts the border radius scale from the shape token', () => {
    for (const scale of borderRadiusScale) {
      expect(isKeyOf(shape, `border-radius-${scale}`)).toBe(true);
    }
  });
});

describe('ShapeBorderRadiusAlias', () => {
  it('extracts the border radius alias from the shape token', () => {
    for (const alias of borderRadiusAlias) {
      expect(isKeyOf(shape, `border-radius-${alias}`)).toBe(true);
    }
  });
});
