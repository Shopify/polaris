import {clamp} from '../clamp';

describe('clamp', () => {
  it('adjusts the given number to be at least the min', () => {
    const min = 10;
    const number = clamp(9, min, 50);
    expect(number).toBe(min);
  });

  it('adjusts the given number to be no more than the max', () => {
    const max = 100;
    const number = clamp(101, 0, max);
    expect(number).toBe(max);
  });

  it('does not change the given number if it is between the min and max', () => {
    const value = 50;
    const min = 0;
    const max = 100;
    const number = clamp(value, min, max);
    expect(number).toBe(value);
  });
});
