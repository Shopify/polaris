import {
  isLight,
  isDark,
  isHexString,
  isHashlessHex,
  isRgbString,
  coerceToValidUserInput,
} from '../color-validation';

describe('isLight', () => {
  it('returns true if the color is light', () => {
    const isColorLight = isLight({red: 255, green: 255, blue: 255});
    expect(isColorLight).toBe(true);
  });

  it('returns false if the color is dark', () => {
    const isColorLight = isLight({red: 0, green: 0, blue: 0});
    expect(isColorLight).toBe(false);
  });
});

describe('isDark', () => {
  it('returns true if the color is dark', () => {
    const isColorDark = isDark({red: 0, green: 0, blue: 0});
    expect(isColorDark).toBe(true);
  });

  it('returns false if the color is light', () => {
    const isColorLight = isDark({red: 255, green: 255, blue: 255});
    expect(isColorLight).toBe(false);
  });
});

describe('isHexString', () => {
  it('returns true if the value is a valid 3-digit hex value', () => {
    const isHex = isHexString('#fff');
    expect(isHex).toBe(true);
  });

  it('returns true if the value is a valid 6-digit hex value', () => {
    const isHex = isHexString('#AABBCC');
    expect(isHex).toBe(true);
  });

  it('returns false if the value is not a hex value', () => {
    const isHex = isHexString('banana');
    expect(isHex).toBe(false);
  });
});

describe('isHashlessHex', () => {
  it('returns true if the value is a valid 3-digit hex value without hash', () => {
    const isHex = isHashlessHex('fff');
    expect(isHex).toBe(true);
  });

  it('returns true if the value is a valid 6-digit hex value without hash', () => {
    const isHex = isHashlessHex('AABBCC');
    expect(isHex).toBe(true);
  });

  it('returns false if the value is not a hex value', () => {
    const isHex = isHashlessHex('apple');
    expect(isHex).toBe(false);
  });
});

describe('isRgbString', () => {
  it('returns true if the value is a valid rgb string', () => {
    const isRgb = isRgbString('rgb(255,255,255)');
    expect(isRgb).toBe(true);
  });

  it('returns true if the value is a valid rgb string with whitespace', () => {
    const isRgb = isRgbString('rgb(0  ,   0   , 0 )');
    expect(isRgb).toBe(true);
  });

  it('returns false if the value is not a rgb string', () => {
    const isRgb = isRgbString('orange');
    expect(isRgb).toBe(false);
  });
});

describe('coerceToValidUserInput', () => {
  it('returns a 6 digit hex value with hash if the value is a valid hex value', () => {
    const coercedValue = coerceToValidUserInput('#456');
    expect(coercedValue).toBe('#445566');
  });

  it('returns a 6 digit hex value with hash if the value is a valid hex value without hash', () => {
    const coercedValue = coerceToValidUserInput('002233');
    expect(coercedValue).toBe('#002233');
  });

  it('returns a 6 digit hex value with hash equivalent to the value if it is a valid rgb string', () => {
    const coercedValue = coerceToValidUserInput('rgb(250, 202, 222)');
    expect(coercedValue).toBe('#facade');
  });
});
