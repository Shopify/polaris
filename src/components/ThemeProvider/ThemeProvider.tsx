import React, {useMemo} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
} from '../../utilities/theme';
import {themeProvider} from '../shared';
import {useFeatures} from '../../utilities/features';

interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  theme: ThemeConfig;
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProvider({
  theme: themeConfig,
  children,
}: ThemeProviderProps) {
  const {globalTheming} = useFeatures();
  const theme = useMemo(() => buildThemeContext(themeConfig), [themeConfig]);
  const customProperties = useMemo(
    () => buildCustomProperties(themeConfig, globalTheming),
    [globalTheming, themeConfig],
  );

  return (
    <ThemeContext.Provider value={theme}>
      <div style={customProperties} {...themeProvider.props}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
