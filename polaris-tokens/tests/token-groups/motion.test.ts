import {isKeyOf} from '@shopify/polaris-migrator';

import {
  motion,
  motionDurationScale,
  motionKeyframesAlias,
} from '../../src/token-groups/motion';

describe('MotionDurationScale', () => {
  it('extracts the motion duration scale from the motion token', () => {
    for (const scale of motionDurationScale) {
      expect(isKeyOf(motion, `duration-${scale}`)).toBe(true);
    }
  });
});

describe('MotionKeyframesAlias', () => {
  it('extracts the motion keyframe alias from the motion token', () => {
    for (const alias of motionKeyframesAlias) {
      expect(isKeyOf(motion, `keyframes-${alias}`)).toBe(true);
    }
  });
});
