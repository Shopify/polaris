import React from 'react';
import type {
  BorderRadiusAliasOrScale,
  ShadowAliasOrScale,
} from '@shopify/polaris-tokens';

import {getResponsiveValue, mapResponsivePropValues} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';

import styles from './ShadowBevel.scss';

export interface ShadowBevelProps {
  as?: React.ElementType;
  children?: React.ReactNode;
  /** The box-shadow applied to the root element. */
  boxShadow: ShadowAliasOrScale;
  /** The border-radius applied to both the root and pseudo elements. */
  borderRadius: BorderRadiusAliasOrScale;
  /** The z-index applied to the pseudo element. */
  zIndex?: string;
  /**
   * Enable/disable the bevel effect.
   * Note: This also disables the border-radius and box-shadow.
   * @default true
   */
  bevel?: ResponsiveProp<boolean>;
}

export function ShadowBevel(props: ShadowBevelProps) {
  const {
    as = 'div',
    bevel = true,
    borderRadius,
    boxShadow,
    children,
    zIndex = '0',
  } = props;

  const Component = as;

  return (
    <Component
      className={styles.ShadowBevel}
      style={{
        '--pc-shadow-bevel-z-index': zIndex,
        ...getResponsiveValue(
          'shadow-bevel',
          'content',
          mapResponsivePropValues(bevel, (bevel) => (bevel ? '""' : 'none')),
        ),
        ...getResponsiveValue(
          'shadow-bevel',
          'box-shadow',
          mapResponsivePropValues(bevel, (bevel) =>
            bevel ? `var(--p-shadow-${boxShadow})` : 'none',
          ),
        ),
        ...getResponsiveValue(
          'shadow-bevel',
          'border-radius',
          mapResponsivePropValues(bevel, (bevel) =>
            bevel
              ? `var(--p-border-radius-${borderRadius})`
              : 'var(--p-border-radius-0)',
          ),
        ),
      }}
    >
      {children}
    </Component>
  );
}
