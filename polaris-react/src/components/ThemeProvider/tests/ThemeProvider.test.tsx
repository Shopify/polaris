import React from 'react';
import {mountWithApp} from 'tests/utilities';
import {themeNameDefault} from '@shopify/polaris-tokens';
import type {ThemeName} from '@shopify/polaris-tokens';

import {ThemeProvider} from '../ThemeProvider';
import {useThemeName} from '../../../utilities/use-theme';

const LIGHT_THEME: ThemeName = 'light';
const DARK_THEME: ThemeName = 'dark-experimental';

describe('<ThemeProvider />', () => {
  const ThemeNameText = () => {
    const themeName = useThemeName();

    return <span>{themeName}</span>;
  };

  it('uses default theme when no component level ThemeProviders', () => {
    const app = mountWithApp(<ThemeNameText />);
    expect(app).toContainReactText(themeNameDefault);
  });

  it('uses light theme when wrapped in a light theme provider', () => {
    const app = mountWithApp(
      <ThemeProvider theme={LIGHT_THEME}>
        <ThemeNameText />
      </ThemeProvider>,
    );
    expect(app).toContainReactText(LIGHT_THEME);
  });

  it('uses dark theme when wrapped in a dark theme provider', () => {
    const app = mountWithApp(
      <ThemeProvider theme={DARK_THEME}>
        <ThemeNameText />
      </ThemeProvider>,
    );
    expect(app).toContainReactText(DARK_THEME);
  });

  it('nests a dark theme within a light theme', () => {
    const app = mountWithApp(
      <ThemeProvider theme={LIGHT_THEME}>
        <ThemeNameText />
        <ThemeProvider theme={DARK_THEME}>
          <ThemeNameText />
        </ThemeProvider>
      </ThemeProvider>,
    );

    const themes = app.findAll(ThemeNameText);
    expect(themes[0]).toContainReactText(LIGHT_THEME);
    expect(themes[1]).toContainReactText(DARK_THEME);
  });

  it('nests a light theme within a dark theme', () => {
    const app = mountWithApp(
      <ThemeProvider theme={DARK_THEME}>
        <ThemeNameText />
        <ThemeProvider theme={LIGHT_THEME}>
          <ThemeNameText />
        </ThemeProvider>
      </ThemeProvider>,
    );

    const themes = app.findAll(ThemeNameText);
    expect(themes[0]).toContainReactText(DARK_THEME);
    expect(themes[1]).toContainReactText(LIGHT_THEME);
  });
});
