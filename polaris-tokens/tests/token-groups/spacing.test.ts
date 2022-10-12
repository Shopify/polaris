import {isKeyOf} from '../../src/utilities';
import {spacing, spacingSpaceScale} from '../../src/token-groups/spacing';

describe('SpacingSpaceScale', () => {
  it('has a space token for each spacing scale', () => {
    for (const scale of spacingSpaceScale) {
      expect(isKeyOf(spacing, `space-${scale}`)).toBe(true);
    }
  });
});
