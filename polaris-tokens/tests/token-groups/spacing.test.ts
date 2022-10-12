import {isKeyOf} from '@shopify/polaris-migrator';

import {spacing, spaceScale} from '../../src/token-groups/spacing';

describe('SpacingSpaceScale', () => {
  it('extracts the spacing scale from the spacing token', () => {
    for (const scale of spaceScale) {
      expect(isKeyOf(spacing, `space-${scale}`)).toBe(true);
    }
  });
});
