import React from 'react';

export interface ThemeProviderProps {
  /** Custom logos and colors provided to select components */
  colorScheme?: 'light' | 'dark';
  /** The content to display */
  children?: React.ReactNode;
}

export function ThemeProvider({
  colorScheme: 'light',
  children,
}: ThemeProviderProps) {
  return (
    <div style={{colorScheme: colorScheme}}>{children}</div>
  );
}
