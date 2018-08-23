import tokens from '@shopify/polaris-tokens';

import {documentHasStyle} from '../../../../tests/utilities';
import {needsVariant, setColors, setTextColor, setTheme} from '../utils';
import {needsVariantList} from '../config';

describe('setTextColor', () => {
  it('sets a css variable to white if the variant is dark', () => {
    setTextColor('topBar', 'dark', null);
    expect(documentHasStyle('topBar', tokens.colorWhiteBase)).toBe(true);
  });

  it('sets a css variable to ink if the variant is light', () => {
    setTextColor('topBar', 'light', null);
    expect(documentHasStyle('topBar', tokens.colorInkBase)).toBe(true);
  });
});

describe('setTheme', () => {
  it('sets a base theme', () => {
    setTheme(
      {hue: 184, saturation: 100, lightness: 28},
      'topBar',
      'background',
      'dark',
      null,
    );
    // document will have the variables in pascal case
    expect(
      documentHasStyle('TopBarBackgroundDarker', 'hsl(184, 95%, 23%, 1)'),
    ).toBe(true);
    expect(
      documentHasStyle('TopBarBackgroundLighter', 'hsl(184, 120%, 38%, 1)'),
    ).toBe(true);
    expect(documentHasStyle('TopBarColor', 'rgb(255, 255, 255)')).toBe(true);
  });
});

describe('needsVariant', () => {
  it('will return false if the parameter is not on the list', () => {
    const hasVariant = needsVariant('frame');
    expect(hasVariant).toBe(needsVariantList.includes('frame'));
  });

  it('will return true if the paramater is on the list', () => {
    const hasVariant = needsVariant('topBar');
    expect(hasVariant).toBe(needsVariantList.includes('topBar'));
  });
});

describe('setColors', () => {
  it('iterates over colors when a theme is passed', () => {
    const theme = {colors: {topBar: {background: '#eeeeee'}}};
    const spy = jest.spyOn(Object, 'entries');
    setColors(theme, null);
    expect(spy).toHaveBeenCalledWith(theme.colors);
  });
});
