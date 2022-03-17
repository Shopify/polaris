import React, {useEffect, useState} from 'react';

import type {ColorScheme} from '../../tokens';

import {styles} from './styles';

export const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

export const STYLE_SHEET_ID = 'polaris-custom-properties';

const canUseDOM = Boolean(
  typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement,
);
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

export function CustomProperties(props: CustomPropertiesProps) {
  const {
    as: Component = 'div',
    children,
    className,
    colorScheme = DEFAULT_COLOR_SCHEME,
  } = props;

  const [hasInjectedStyleSheet, setHasInjectStyleSheet] = useState(
    canUseDOM ? Boolean(document.getElementById(STYLE_SHEET_ID)) : false,
  );

  useEffect(() => {
    if (hasInjectedStyleSheet) return;

    const styleSheet = document.createElement('style');

    styleSheet.id = STYLE_SHEET_ID;
    styleSheet.textContent = styles;

    document.head.appendChild(styleSheet);

    setHasInjectStyleSheet(true);
  }, [hasInjectedStyleSheet]);

  return hasInjectedStyleSheet ? (
    <Component
      p-color-scheme={colorScheme}
      className={className}
      style={{color: 'var(--p-text)'}}
    >
      {children}
    </Component>
  ) : null;
}
