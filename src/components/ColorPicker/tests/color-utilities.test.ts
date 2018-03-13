import {hsbToRgb, rgbToHex, rgbToHsb, rgbString, hsbToHex} from '../color-utilities';

describe('colorUtilities', () => {
  describe('rgbString', () => {
    it('returns rgb string for rgb', () => {
      expect(rgbString({red: 132, green: 11, blue: 2})).toMatch('rgb(132, 11, 2)');
    });

    it('returns rgb string for rgb with alpha', () => {
      expect(rgbString({red: 132, green: 11, blue: 2, alpha: 0.2})).toMatch('rgba(132, 11, 2, 0.2)');
    });
  });

  describe('rgbToHex()', () => {
    it('returns hex strings for rgb', () => {
      expect(rgbToHex({red: 132, green: 11, blue: 2})).toMatch('#840b02');
    });
  });

  describe('hsbToHex', () => {
    it('returns a hex for hsb', () => {
      expect(hsbToHex({hue: 300, saturation: 0.5, brightness: 0.5})).toMatch('#804080');
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

  describe('rgbToHsb', () => {
    it('returns the correct hsb value for white', () => {
      const {hue, saturation, brightness} = rgbToHsb({red: 255, green: 255, blue: 255});
      expect(hue).toBe(0);
      expect(saturation).toBe(0);
      expect(brightness).toBe(1);
    });

    it('returns the correct hsb value for black', () => {
      const {hue, saturation, brightness} = rgbToHsb({red: 0, green: 0, blue: 0});
      expect(hue).toBe(0);
      expect(saturation).toBe(0);
      expect(brightness).toBe(0);
    });

    // Corner case that was misscalculating hue
    it('returns the correct hsb value when red is the largest number', () => {
      const {hue, saturation, brightness} = rgbToHsb({red: 255, green: 0, blue: 0});
      expect(hue).toBe(0);
      expect(saturation).toBe(1);
      expect(brightness).toBe(1);
    });
  });
});
