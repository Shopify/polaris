import {isKeyOf} from '../../src/utilities';
import {
  font,
  fontSizeScale,
  fontLineHeightScale,
  fontWeightAlias,
} from '../../src/token-groups/font';

describe('FontSizeScale', () => {
  it('has a font token for each font size scale', () => {
    for (const sizeScale of fontSizeScale) {
      expect(isKeyOf(font, `font-size-${sizeScale}`)).toBe(true);
    }
  });
});

describe('FontLineHeightScale', () => {
  it('has a font token for each font line height scale', () => {
    for (const lineHeightScale of fontLineHeightScale) {
      expect(isKeyOf(font, `font-line-height-${lineHeightScale}`)).toBe(true);
    }
  });
});

describe('FontWeightAlias', () => {
  it('has a font token for each font weight alias', () => {
    for (const alias of fontWeightAlias) {
      expect(isKeyOf(font, `font-weight-${alias}`)).toBe(true);
    }
  });
});
