import {isKeyOf} from '../../src/utilities';
import {
  motion,
  motionDurationScale,
  motionKeyframesAlias,
} from '../../src/token-groups/motion';

describe('MotionDurationScale', () => {
  it('has a motion token for each duration scale', () => {
    for (const scale of motionDurationScale) {
      expect(isKeyOf(motion, `duration-${scale}`)).toBe(true);
    }
  });
});

describe('MotionKeyframesAlias', () => {
  it('has a motion token for each keyframes alias', () => {
    for (const alias of motionKeyframesAlias) {
      expect(isKeyOf(motion, `keyframes-${alias}`)).toBe(true);
    }
  });
});
