import React from 'react';
import type {ColorScheme} from '@shopify/polaris-tokens';

import './CustomProperties.scss';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export interface CustomPropertiesProps {
  /** Determines what color scheme is applied to child content. */
  colorScheme?: ColorScheme;
  /** The content to display. */
  children?: React.ReactNode;
  /** Class name applied to the root element. */
  className?: string;
  /** Inline styles applied to the root element. */
  style?: React.CSSProperties;
  /** Element used for the root node. */
  as?: React.ElementType;
}

/**
 * @deprecated The CustomProperties component will be removed in the next
 * major version. See the Polaris token documentation for replacing
 * colors relying on dark color scheme values.
 *
 * https://polaris.shopify.com/tokens
 */
export function CustomProperties(props: CustomPropertiesProps) {
  const {
    as: Component = 'div',
    children,
    className,
    colorScheme = DEFAULT_COLOR_SCHEME,
    style,
  } = props;

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `CustomProperties` component has been deprecated. See the v10 migration guide for replacing dark color scheme styles. https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md',
    );
  }

  return (
    <Component
      p-color-scheme={colorScheme}
      className={className}
      style={{color: 'var(--p-text)', ...style}}
    >
      {children}
    </Component>
  );
}
