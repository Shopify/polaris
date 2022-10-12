import {isKeyOf} from '@shopify/polaris-migrator';

import {
  font,
  fontSizeScale,
  fontLineHeightScale,
  fontWeightAlias,
} from '../../src/token-groups/font';

describe('FontSizeScale', () => {
  it('extracts the font size scale from the font token', () => {
    for (const sizeScale of fontSizeScale) {
      expect(isKeyOf(font, `font-size-${sizeScale}`)).toBe(true);
    }
  });
});

describe('FontLineHeightScale', () => {
  it('extracts the font line height scale from the font token', () => {
    for (const lineHeightScale of fontLineHeightScale) {
      expect(isKeyOf(font, `font-line-height-${lineHeightScale}`)).toBe(true);
    }
  });
});

describe('FontWeightAlias', () => {
  it('extracts the font weight alias from the font token', () => {
    for (const alias of fontWeightAlias) {
      expect(isKeyOf(font, `font-weight-${alias}`)).toBe(true);
    }
  });
});
