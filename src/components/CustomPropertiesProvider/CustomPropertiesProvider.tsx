import React from 'react';

import type {ColorScheme} from './tokens';
import {customProperties} from './customProperties';

// This variable is intentionally in module scope to ensure
// Polaris custom properties are only inject one time.
let injectedCustomProperties = false;

export interface CustomPropertiesProviderProps {
  /** Custom logos and colors provided to select components. */
  colorScheme?: ColorScheme;
  /** The content to display. */
  children?: React.ReactNode;
  /** Class name applied to the root element. */
  className?: string;
  /** Element used for the root node. */
  as?: React.ElementType;
}

export function CustomPropertiesProvider(props: CustomPropertiesProviderProps) {
  const {
    as: Component = 'div',
    children,
    className,
    colorScheme = 'light',
  } = props;

  React.useEffect(() => {
    if (injectedCustomProperties) return;
    injectedCustomProperties = true;

    const styleSheet = document.createElement('style');

    // This data attribute is used to identify the stylesheet in the devtools.
    styleSheet.dataset.polarisCustomPropertiesProvider = '';

    styleSheet.textContent = customProperties;

    document.head.appendChild(styleSheet);
  }, []);

  return (
    <Component color-scheme={colorScheme} className={className}>
      {children}
    </Component>
  );
}

/**
 * TODO:
 * - Excessive use of the name `color-scheme` may be a source of confusion
 *
 * - Discussion how to ship these changes
 */
