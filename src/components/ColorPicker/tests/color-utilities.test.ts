import {hsbToRgb, rgbToHex} from '../color-utilities';

describe('colorUtilities', () => {
  describe('rgbToHex()', () => {
    it('returns hex strings for rgb', () => {
      expect(rgbToHex({red: 132, green: 11, blue: 2})).toMatch('#840b02');
    });
  });

  describe('hsbToRgb()', () => {
    it('returns the correct rgb value for an hsb color', () => {
      const {red, green, blue} = hsbToRgb({hue: 300, saturation: 0.5, brightness: 0.5});
      expect(red).toBe(128);
      expect(green).toBe(64);
      expect(blue).toBe(128);
    });

    it('returns the correct rgb value for black', () => {
      const {red, green, blue} = hsbToRgb({hue: 23, saturation: 0, brightness: 0});
      expect(red).toBe(0);
      expect(green).toBe(0);
      expect(blue).toBe(0);
    });

    it('returns the correct rgb value for white', () => {
      const {red, green, blue} = hsbToRgb({hue: 23, saturation: 0, brightness: 1});
      expect(red).toBe(255);
      expect(green).toBe(255);
      expect(blue).toBe(255);
    });
  });
});
