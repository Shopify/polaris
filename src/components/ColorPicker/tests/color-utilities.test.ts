import {hsbToRgb, rgbToHex} from '../color-utilities';

describe('colorUtilities', () => {
  describe('rgbToHex()', () => {
    it('returns hex strings for rgb', () => {
      expect(rgbToHex([132, 11, 2])).toMatch('#840b02');
    });
  });

  describe('hsbToRgb()', () => {
    it('returns the correct rgb value for an hsb color', () => {
      const [r, g, b] = hsbToRgb(300, 0.5, 0.5);
      expect(r).toBe(128);
      expect(g).toBe(64);
      expect(b).toBe(128);
    });

    it('returns the correct rgb value for black', () => {
      const [r, g, b] = hsbToRgb(23, 0, 0);
      expect(r).toBe(0);
      expect(g).toBe(0);
      expect(b).toBe(0);
    });

    it('returns the correct rgb value for white', () => {
      const [r, g, b] = hsbToRgb(23, 0, 1);
      expect(r).toBe(255);
      expect(g).toBe(255);
      expect(b).toBe(255);
    });
  });
});
