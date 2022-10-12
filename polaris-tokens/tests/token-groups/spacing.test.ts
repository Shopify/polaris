import {isKeyOf} from '../../src/utilities';
import {spacing, spacingSpaceScale} from '../../src/token-groups/spacing';

describe('SpacingSpaceScale', () => {
  it('extracts the spacing scale from the spacing token', () => {
    for (const scale of spacingSpaceScale) {
      expect(isKeyOf(spacing, `space-${scale}`)).toBe(true);
    }
  });
});
