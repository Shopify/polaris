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
        '--polaris-test-1': '#d6dbe1',
        '--polaris-test-10': '#8695a7',
        '--polaris-test-11': '#7d8da1',
        '--polaris-test-12': '#74859a',
        '--polaris-test-13': '#6b7d94',
        '--polaris-test-14': '#65768b',
        '--polaris-test-15': '#5e6e82',
        '--polaris-test-16': '#586779',
        '--polaris-test-17': '#515f70',
        '--polaris-test-18': '#4b5868',
        '--polaris-test-19': '#45505f',
        '--polaris-test-2': '#cdd3db',
        '--polaris-test-20': '#3e4956',
        '--polaris-test-21': '#38414d',
        '--polaris-test-22': '#313a44',
        '--polaris-test-23': '#2b323b',
        '--polaris-test-24': '#242b32',
        '--polaris-test-25': '#1e2329',
        '--polaris-test-26': '#181c21',
        '--polaris-test-27': '#111418',
        '--polaris-test-28': '#0b0d0f',
        '--polaris-test-29': '#040506',
        '--polaris-test-3': '#c4cbd4',
        '--polaris-test-4': '#bbc3ce',
        '--polaris-test-5': '#b2bcc7',
        '--polaris-test-6': '#a9b4c1',
        '--polaris-test-7': '#a0acba',
        '--polaris-test-8': '#97a4b4',
        '--polaris-test-9': '#8f9dae',
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
        '--polaris-test-opposingOpacified05': 'hsl(210, 20%, 2%, 0.05)',
        '--polaris-test-opposingOpacified1': 'hsl(210, 20%, 2%, 0.1)',
        '--polaris-test-opposingOpacified2': 'hsl(210, 20%, 2%, 0.2)',
        '--polaris-test-opposingOpacified3': 'hsl(210, 20%, 2%, 0.3)',
        '--polaris-test-opposingOpacified4': 'hsl(210, 20%, 2%, 0.4)',
        '--polaris-test-opposingOpacified5': 'hsl(210, 20%, 2%, 0.5)',
        '--polaris-test-opposingOpacified6': 'hsl(210, 20%, 2%, 0.6)',
        '--polaris-test-opposingOpacified7': 'hsl(210, 20%, 2%, 0.7)',
        '--polaris-test-opposingOpacified8': 'hsl(210, 20%, 2%, 0.8)',
        '--polaris-test-opposingOpacified9': 'hsl(210, 20%, 2%, 0.9)',
      });
    });

    it('creates a range of greys when given a dark grey', () => {
      expect(createSurfaceRange('#212B36', 'test')).toStrictEqual({
        '--polaris-test-0': '#212B36',
        '--polaris-test-1': '#27333f',
        '--polaris-test-10': '#5b7795',
        '--polaris-test-11': '#617e9e',
        '--polaris-test-12': '#6a86a4',
        '--polaris-test-13': '#748eaa',
        '--polaris-test-14': '#7d96b0',
        '--polaris-test-15': '#879db5',
        '--polaris-test-16': '#90a5bb',
        '--polaris-test-17': '#9aadc1',
        '--polaris-test-18': '#a3b4c7',
        '--polaris-test-19': '#adbccd',
        '--polaris-test-2': '#2d3a49',
        '--polaris-test-20': '#b6c4d2',
        '--polaris-test-21': '#c0ccd8',
        '--polaris-test-22': '#c9d3de',
        '--polaris-test-23': '#d3dbe4',
        '--polaris-test-24': '#dce3ea',
        '--polaris-test-25': '#e6eaef',
        '--polaris-test-26': '#eff2f5',
        '--polaris-test-27': '#f9fafb',
        '--polaris-test-28': '#ffffff',
        '--polaris-test-29': '#ffffff',
        '--polaris-test-3': '#324252',
        '--polaris-test-4': '#38495c',
        '--polaris-test-5': '#3e5165',
        '--polaris-test-6': '#44596f',
        '--polaris-test-7': '#4a6078',
        '--polaris-test-8': '#4f6882',
        '--polaris-test-9': '#556f8b',
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
        '--polaris-test-1': '#8996a4',
        '--polaris-test-10': '#47525c',
        '--polaris-test-11': '#404a54',
        '--polaris-test-12': '#3a424b',
        '--polaris-test-13': '#333b42',
        '--polaris-test-14': '#2c333a',
        '--polaris-test-15': '#262b31',
        '--polaris-test-16': '#1f2428',
        '--polaris-test-17': '#181c20',
        '--polaris-test-18': '#121417',
        '--polaris-test-19': '#0b0d0e',
        '--polaris-test-2': '#808f9d',
        '--polaris-test-20': '#040506',
        '--polaris-test-21': '#000000',
        '--polaris-test-22': '#000000',
        '--polaris-test-23': '#000000',
        '--polaris-test-24': '#000000',
        '--polaris-test-25': '#000000',
        '--polaris-test-26': '#000000',
        '--polaris-test-27': '#000000',
        '--polaris-test-28': '#000000',
        '--polaris-test-29': '#000000',
        '--polaris-test-3': '#788797',
        '--polaris-test-4': '#6f8090',
        '--polaris-test-5': '#687887',
        '--polaris-test-6': '#62707f',
        '--polaris-test-7': '#5b6976',
        '--polaris-test-8': '#54616d',
        '--polaris-test-9': '#4e5965',
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
