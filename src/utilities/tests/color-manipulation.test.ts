import {
  lightenColor,
  darkenColor,
  saturateColor,
  createDarkColor,
  createLightColor,
} from '../color-manipulation';
import {HSLColor} from '../../components/ColorPicker';

describe('lightenColor', () => {
  it("will return the color if it's of type string", () => {
    const lightColor = lightenColor('papayawhip', 5);
    expect(lightColor).toBe('papayawhip');
  });

  it('will return a lighter color', () => {
    const lightColor = lightenColor(
      {hue: 50, saturation: 50, lightness: 50},
      5,
    );
    expect((lightColor as HSLColor).lightness).toBeGreaterThan(50);
  });
});

describe('darkenColor', () => {
  it("will return the color if it's of type string", () => {
    const darkColor = darkenColor('papayawhip', 5);
    expect(darkColor).toBe('papayawhip');
  });

  it('will return a darker color', () => {
    const darkColor = darkenColor({hue: 50, saturation: 50, lightness: 50}, 5);
    expect((darkColor as HSLColor).lightness).toBeLessThan(50);
  });
});

describe('saturateColor', () => {
  it("will return the color if it's of type string", () => {
    const color = saturateColor('papayawhip', 5);
    expect(color).toBe('papayawhip');
  });

  it('will return a color with an increased saturation', () => {
    const color = saturateColor({hue: 50, saturation: 50, lightness: 50}, 5);
    expect((color as HSLColor).saturation).toBeGreaterThan(50);
  });

  it('will return a color with a decreased saturation', () => {
    const color = saturateColor({hue: 50, saturation: 50, lightness: 50}, -5);
    expect((color as HSLColor).saturation).toBeLessThan(50);
  });
});

describe('createDarkColor', () => {
  it("will return the color if it's of type string", () => {
    const darkColor = createDarkColor('papayawhip', 5, 5);
    expect(darkColor).toBe('papayawhip');
  });

  it('will return a color with an increased saturation and decreased lightness', () => {
    const darkColor = createDarkColor(
      {hue: 50, saturation: 50, lightness: 50},
      5,
      5,
    );
    const {lightness, saturation} = darkColor as HSLColor;

    expect(lightness).toBeLessThan(50);
    expect(saturation).toBeGreaterThan(50);
  });
});

describe('createLightColor', () => {
  it("will return the color if it's of type string", () => {
    const lightColor = createDarkColor('papayawhip', 5, 5);
    expect(lightColor).toBe('papayawhip');
  });

  it('will return a color with an decreased saturation and increased lightness', () => {
    const lightColor = createLightColor(
      {hue: 50, saturation: 50, lightness: 50},
      5,
      5,
    );
    const {lightness, saturation} = lightColor as HSLColor;

    expect(lightness).toBeGreaterThan(50);
    expect(saturation).toBeLessThan(50);
  });
});
