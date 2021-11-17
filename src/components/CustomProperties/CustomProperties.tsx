import React from 'react';

import type {ColorScheme} from '../../designTokens';

import {styles} from './styles';

// This variable is intentionally in module scope to ensure
// Polaris custom properties are only inject one time.
let injectedCustomProperties = false;

export interface CustomPropertiesProps {
  /** Determines what color scheme is applied to child content. */
  colorScheme?: ColorScheme;
  /** The content to display. */
  children?: React.ReactNode;
  /** Class name applied to the root element. */
  className?: string;
  /** Element used for the root node. */
  as?: React.ElementType;
}

export function CustomProperties(props: CustomPropertiesProps) {
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
    styleSheet.dataset.polarisCustomProperties = '';

    styleSheet.textContent = styles;

    document.head.appendChild(styleSheet);
  }, []);

  return (
    <Component color-scheme={colorScheme} className={className}>
      {children}
    </Component>
  );
}
