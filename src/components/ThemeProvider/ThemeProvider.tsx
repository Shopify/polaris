import React, {useMemo} from 'react';
import {
  ThemeContext,
  ThemeConfig,
  buildThemeContext,
  buildCustomProperties,
} from '../../utilities/theme';
import {themeProvider} from '../shared';
import {useFeatures} from '../../utilities/features';

import styles from './ThemeProvider.scss';

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
  const {unstableGlobalTheming = false} = useFeatures();
  const theme = useMemo(() => buildThemeContext(themeConfig), [themeConfig]);
  const customProperties = useMemo(
    () => buildCustomProperties(themeConfig, unstableGlobalTheming),
    [unstableGlobalTheming, themeConfig],
  );

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={customProperties}
        {...themeProvider.props}
        className={styles.ThemeProvider}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
