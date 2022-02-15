import {roundNumberToDecimalPlaces} from '../roundNumberToDecimalPlaces';

describe('roundNumberToDecimalPlaces', () => {
  it('rounds 1.004 to 1.00', () => {
    expect(roundNumberToDecimalPlaces(1.004, 2)).toBe(1.0);
  });

  it('rounds 1.005 to 1.01', () => {
    expect(roundNumberToDecimalPlaces(1.005, 2)).toBe(1.01);
  });
});
