import {isLight, isDark} from '../color-validation';

describe('isLight', () => {
  it('will return true if the color is light', () => {
    const isColorLight = isLight({red: 255, green: 255, blue: 255});
    expect(isColorLight).toBe(true);
  });

  it('will return false if the color is dark', () => {
    const isColorLight = isLight({red: 0, green: 0, blue: 0});
    expect(isColorLight).toBe(false);
  });
});

describe('isDark', () => {
  it('will return true if the color is dark', () => {
    const isColorDark = isDark({red: 0, green: 0, blue: 0});
    expect(isColorDark).toBe(true);
  });

  it('will return false if the color is light', () => {
    const isColorLight = isDark({red: 255, green: 255, blue: 255});
    expect(isColorLight).toBe(false);
  });
});
