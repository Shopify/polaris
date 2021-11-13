import React from 'react';

import type {ColorScheme} from './tokens';
import {customProperties} from './customProperties';

const styleSheet = document.createElement('style');
styleSheet.textContent = customProperties;
styleSheet.dataset.polarisCustomProperties = '👋';

// This variable is intentionally in module scope to ensure
// Polaris custom properties are only inject one time.
let injectedCustomProperties = false;

export interface ThemeProviderProps {
  /** Custom logos and colors provided to select components. */
  colorScheme?: ColorScheme;
  /** The content to display. */
  children?: React.ReactNode;
  /** Class name applied to the root element. */
  className?: string;
  /** Element used for the root node. */
  as?: React.ElementType;
}

export function ThemeProvider(props: ThemeProviderProps) {
  const {
    as: Component = 'div',
    children,
    className,
    colorScheme = 'light',
  } = props;

  React.useEffect(() => {
    if (injectedCustomProperties) return undefined;
    injectedCustomProperties = true;

    document.head.appendChild(styleSheet);
  }, []);

  return (
    <Component color-scheme={colorScheme} className={className}>
      {children}
    </Component>
  );
}
