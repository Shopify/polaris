import tokens from '@shopify/polaris-tokens';

import {
  needsVariant,
  setColors,
  setTextColor,
  setTheme,
  createColorRange,
  createSurfaceRange,
} from '../utils';
import {needsVariantList} from '../config';

describe('setTextColor', () => {
  it('sets a css variable to white if the variant is dark', () => {
    const textColor = setTextColor('topBar', 'dark');
    expect(textColor).toStrictEqual(['topBar', tokens.colorWhite]);
  });

  it('sets a css variable to ink if the variant is light', () => {
    const textColor = setTextColor('topBar', 'light');
    expect(textColor).toStrictEqual(['topBar', tokens.colorInk]);
  });
});

describe('setTheme', () => {
  it('returns a base theme', () => {
    const theme = setTheme(
      {hue: 184, saturation: 100, lightness: 28},
      'topBar',
      'background',
      'dark',
    );

    expect(theme).toStrictEqual([
      ['--top-bar-color', 'rgb(255, 255, 255)'],
      ['--top-bar-background-lighter', 'hsl(184, 85%, 43%, 1)'],
    ]);
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
    setColors(theme);
    expect(spy).toHaveBeenCalledWith(theme.colors);
  });
});

describe('createColorRange', () => {
  it('returns an object full of colors by default', () => {
    expect(createColorRange('#5C6AC4', 'test')).toStrictEqual({
      '--polaris-test': '#5C6AC4',
      '--polaris-test-darkened1': '#2e397f',
      '--polaris-test-darkened2': '#10142d',
      '--polaris-test-lightened1': '#adb4e1',
      '--polaris-test-lightened2': '#ffffff',
      '--polaris-test-on': '#292f58',
    });
  });

  it('returns an object full of colors with opacity', () => {
    expect(createColorRange('#5C6AC4', 'test', {opacify: true})).toStrictEqual({
      '--polaris-test': '#5C6AC4',
      '--polaris-test-darkened1': '#2e397f',
      '--polaris-test-darkened2': '#10142d',
      '--polaris-test-lightened1': '#adb4e1',
      '--polaris-test-lightened2': '#ffffff',
      '--polaris-test-on': '#292f58',
      '--polaris-test-opacified05': 'hsl(232, 47%, 56.00000000000001%, 0.05)',
      '--polaris-test-opacified1': 'hsl(232, 47%, 56.00000000000001%, 0.1)',
      '--polaris-test-opacified2': 'hsl(232, 47%, 56.00000000000001%, 0.2)',
      '--polaris-test-opacified3': 'hsl(232, 47%, 56.00000000000001%, 0.3)',
      '--polaris-test-opacified4': 'hsl(232, 47%, 56.00000000000001%, 0.4)',
      '--polaris-test-opacified5': 'hsl(232, 47%, 56.00000000000001%, 0.5)',
      '--polaris-test-opacified6': 'hsl(232, 47%, 56.00000000000001%, 0.6)',
      '--polaris-test-opacified7': 'hsl(232, 47%, 56.00000000000001%, 0.7)',
      '--polaris-test-opacified8': 'hsl(232, 47%, 56.00000000000001%, 0.8)',
      '--polaris-test-opacified9': 'hsl(232, 47%, 56.00000000000001%, 0.9)',
    });
  });

  describe('createSurfaceRange', () => {
    it('creates a range of greys when given a light grey', () => {
      expect(createSurfaceRange('#DFE3E8', 'test')).toStrictEqual({
        '--polaris-test-0': '#DFE3E8',
        '--polaris-test-1': '#c1c9d2',
        '--polaris-test-2': '#a3afbd',
        '--polaris-test-3': '#8695a7',
        '--polaris-test-4': '#697b91',
        '--polaris-test-5': '#546273',
        '--polaris-test-6': '#3e4956',
        '--polaris-test-7': '#293038',
        '--polaris-test-8': '#13171b',
        '--polaris-test-9': '#000000',
        '--polaris-test-baseOpacified05': 'hsl(213, 16%, 89%, 0.05)',
        '--polaris-test-baseOpacified1': 'hsl(213, 16%, 89%, 0.1)',
        '--polaris-test-baseOpacified2': 'hsl(213, 16%, 89%, 0.2)',
        '--polaris-test-baseOpacified3': 'hsl(213, 16%, 89%, 0.3)',
        '--polaris-test-baseOpacified4': 'hsl(213, 16%, 89%, 0.4)',
        '--polaris-test-baseOpacified5': 'hsl(213, 16%, 89%, 0.5)',
        '--polaris-test-baseOpacified6': 'hsl(213, 16%, 89%, 0.6)',
        '--polaris-test-baseOpacified7': 'hsl(213, 16%, 89%, 0.7)',
        '--polaris-test-baseOpacified8': 'hsl(213, 16%, 89%, 0.8)',
        '--polaris-test-baseOpacified9': 'hsl(213, 16%, 89%, 0.9)',
        '--polaris-test-opposingOpacified05': 'hsl(0, 0%, 0%, 0.05)',
        '--polaris-test-opposingOpacified1': 'hsl(0, 0%, 0%, 0.1)',
        '--polaris-test-opposingOpacified2': 'hsl(0, 0%, 0%, 0.2)',
        '--polaris-test-opposingOpacified3': 'hsl(0, 0%, 0%, 0.3)',
        '--polaris-test-opposingOpacified4': 'hsl(0, 0%, 0%, 0.4)',
        '--polaris-test-opposingOpacified5': 'hsl(0, 0%, 0%, 0.5)',
        '--polaris-test-opposingOpacified6': 'hsl(0, 0%, 0%, 0.6)',
        '--polaris-test-opposingOpacified7': 'hsl(0, 0%, 0%, 0.7)',
        '--polaris-test-opposingOpacified8': 'hsl(0, 0%, 0%, 0.8)',
        '--polaris-test-opposingOpacified9': 'hsl(0, 0%, 0%, 0.9)',
      });
    });

    it('creates a range of greys when given a dark grey', () => {
      expect(createSurfaceRange('#212B36', 'test')).toStrictEqual({
        '--polaris-test-0': '#212B36',
        '--polaris-test-1': '#344455',
        '--polaris-test-2': '#485e75',
        '--polaris-test-3': '#5b7795',
        '--polaris-test-4': '#7790ac',
        '--polaris-test-5': '#97aabf',
        '--polaris-test-6': '#b6c4d2',
        '--polaris-test-7': '#d6dee6',
        '--polaris-test-8': '#f6f7f9',
        '--polaris-test-9': '#ffffff',
        '--polaris-test-baseOpacified05': 'hsl(211, 24%, 17%, 0.05)',
        '--polaris-test-baseOpacified1': 'hsl(211, 24%, 17%, 0.1)',
        '--polaris-test-baseOpacified2': 'hsl(211, 24%, 17%, 0.2)',
        '--polaris-test-baseOpacified3': 'hsl(211, 24%, 17%, 0.3)',
        '--polaris-test-baseOpacified4': 'hsl(211, 24%, 17%, 0.4)',
        '--polaris-test-baseOpacified5': 'hsl(211, 24%, 17%, 0.5)',
        '--polaris-test-baseOpacified6': 'hsl(211, 24%, 17%, 0.6)',
        '--polaris-test-baseOpacified7': 'hsl(211, 24%, 17%, 0.7)',
        '--polaris-test-baseOpacified8': 'hsl(211, 24%, 17%, 0.8)',
        '--polaris-test-baseOpacified9': 'hsl(211, 24%, 17%, 0.9)',
        '--polaris-test-opposingOpacified05': 'hsl(0, 0%, 100%, 0.05)',
        '--polaris-test-opposingOpacified1': 'hsl(0, 0%, 100%, 0.1)',
        '--polaris-test-opposingOpacified2': 'hsl(0, 0%, 100%, 0.2)',
        '--polaris-test-opposingOpacified3': 'hsl(0, 0%, 100%, 0.3)',
        '--polaris-test-opposingOpacified4': 'hsl(0, 0%, 100%, 0.4)',
        '--polaris-test-opposingOpacified5': 'hsl(0, 0%, 100%, 0.5)',
        '--polaris-test-opposingOpacified6': 'hsl(0, 0%, 100%, 0.6)',
        '--polaris-test-opposingOpacified7': 'hsl(0, 0%, 100%, 0.7)',
        '--polaris-test-opposingOpacified8': 'hsl(0, 0%, 100%, 0.8)',
        '--polaris-test-opposingOpacified9': 'hsl(0, 0%, 100%, 0.9)',
      });
    });

    it('creates a range of greys when given a medium dark grey', () => {
      expect(createSurfaceRange('#919EAB', 'test')).toStrictEqual({
        '--polaris-test-0': '#919EAB',
        '--polaris-test-1': '#758595',
        '--polaris-test-2': '#5d6b79',
        '--polaris-test-3': '#47525c',
        '--polaris-test-4': '#31383f',
        '--polaris-test-5': '#1b1f23',
        '--polaris-test-6': '#040506',
        '--polaris-test-7': '#000000',
        '--polaris-test-8': '#000000',
        '--polaris-test-9': '#000000',
        '--polaris-test-baseOpacified05': 'hsl(210, 13%, 62%, 0.05)',
        '--polaris-test-baseOpacified1': 'hsl(210, 13%, 62%, 0.1)',
        '--polaris-test-baseOpacified2': 'hsl(210, 13%, 62%, 0.2)',
        '--polaris-test-baseOpacified3': 'hsl(210, 13%, 62%, 0.3)',
        '--polaris-test-baseOpacified4': 'hsl(210, 13%, 62%, 0.4)',
        '--polaris-test-baseOpacified5': 'hsl(210, 13%, 62%, 0.5)',
        '--polaris-test-baseOpacified6': 'hsl(210, 13%, 62%, 0.6)',
        '--polaris-test-baseOpacified7': 'hsl(210, 13%, 62%, 0.7)',
        '--polaris-test-baseOpacified8': 'hsl(210, 13%, 62%, 0.8)',
        '--polaris-test-baseOpacified9': 'hsl(210, 13%, 62%, 0.9)',
        '--polaris-test-opposingOpacified05': 'hsl(0, 0%, 0%, 0.05)',
        '--polaris-test-opposingOpacified1': 'hsl(0, 0%, 0%, 0.1)',
        '--polaris-test-opposingOpacified2': 'hsl(0, 0%, 0%, 0.2)',
        '--polaris-test-opposingOpacified3': 'hsl(0, 0%, 0%, 0.3)',
        '--polaris-test-opposingOpacified4': 'hsl(0, 0%, 0%, 0.4)',
        '--polaris-test-opposingOpacified5': 'hsl(0, 0%, 0%, 0.5)',
        '--polaris-test-opposingOpacified6': 'hsl(0, 0%, 0%, 0.6)',
        '--polaris-test-opposingOpacified7': 'hsl(0, 0%, 0%, 0.7)',
        '--polaris-test-opposingOpacified8': 'hsl(0, 0%, 0%, 0.8)',
        '--polaris-test-opposingOpacified9': 'hsl(0, 0%, 0%, 0.9)',
      });
    });
  });
});
