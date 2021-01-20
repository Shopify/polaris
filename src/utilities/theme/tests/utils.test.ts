import {buildThemeContext, buildCustomProperties} from '../utils';
import type {ProcessedThemeConfig, RoleColors} from '../types';

const DefaultColorScheme: ProcessedThemeConfig['colorScheme'] = 'light';

describe('buildCustomProperties', () => {
  it('creates new custom properties', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}, surface: '#ffffff'},
      colorScheme: DefaultColorScheme,
    };

    const colors = Object.keys(buildCustomProperties(theme, true));
    expect(colors).toContain('--p-surface');
    expect(colors).not.toContain('--top-bar-background');
  });

  it('creates default custom property of 0px for frameOffset when frameOffset is undefined', () => {
    const theme = {
      colors: {topBar: {background: '#eeeeee'}, surface: '#ffffff'},
      colorScheme: DefaultColorScheme,
    };

    const colors = buildCustomProperties(theme, false);
    expect(colors).toMatchObject({'--p-frame-offset': '0px'});
  });

  it('creates custom property with value for frameOffset when frameOffset is provided', () => {
    const theme = {
      frameOffset: '60px',
      colors: {topBar: {background: '#eeeeee'}, surface: '#ffffff'},
      colorScheme: DefaultColorScheme,
    };

    const colors = buildCustomProperties(theme, false);
    expect(colors).toMatchObject({'--p-frame-offset': '60px'});
  });

  it('uses light adjustments by default', () => {
    expect(
      buildCustomProperties(
        {
          colors: {surface: '#CCCCCC'},
          colorScheme: DefaultColorScheme,
        },
        true,
      ),
    ).toStrictEqual(
      expect.objectContaining({
        '--p-background': 'rgba(246, 246, 246, 1)',
      }),
    );
  });

  it('does not throw when given a color role that does not exist', () => {
    expect(() => {
      buildCustomProperties(
        {
          colors: {blarp: '#CCCCCC'} as Partial<RoleColors>,
          colorScheme: DefaultColorScheme,
        },
        true,
      );
    }).not.toThrow();
  });

  it('uses dark adjustments if the colorScheme is dark', () => {
    expect(
      buildCustomProperties(
        {colors: {surface: '#333333'}, colorScheme: 'dark'},
        true,
      ),
    ).toStrictEqual(
      expect.objectContaining({
        '--p-background': 'rgba(12, 12, 12, 1)',
      }),
    );
  });
});

describe('buildThemeContext', () => {
  it('reduces theme config down to a theme', () => {
    expect(
      buildThemeContext(
        {colors: {}, logo: {}, colorScheme: 'light'},
        {foo: 'bar'},
      ),
    ).toStrictEqual({
      logo: {},
      cssCustomProperties: 'foo:bar',
      colors: {},
      colorScheme: 'light',
    });
  });
});
