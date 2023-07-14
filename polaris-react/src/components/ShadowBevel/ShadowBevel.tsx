import React from 'react';
import type {BorderRadiusScale, ShadowAlias} from '@shopify/polaris-tokens';

import {getResponsiveValue} from '../../utilities/css';
import type {ResponsiveProp} from '../../utilities/css';
import {useFeatures} from '../../utilities/features';

import styles from './ShadowBevel.scss';

export interface ShadowBevelProps {
  as?: React.ElementType;
  children?: React.ReactNode;
  /** The box-shadow applied to the root element. */
  boxShadow: ShadowAlias;
  /** The border-radius applied to both the root and pseudo elements. */
  borderRadius: BorderRadiusScale;
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

  const {polarisSummerEditions2023ShadowBevelOptOut} = useFeatures();

  const Component = as;

  return (
    <Component
      className={styles.ShadowBevel}
      style={{
        '--pc-shadow-bevel-z-index': zIndex,
        ...getResponsiveValue(
          'shadow-bevel',
          'content',
          mapResponsiveProp(bevel, (bevel) => {
            if (polarisSummerEditions2023ShadowBevelOptOut) {
              return 'none';
            }

            return bevel ? '""' : 'none';
          }),
        ),
        ...getResponsiveValue(
          'shadow-bevel',
          'box-shadow',
          mapResponsiveProp(bevel, (bevel) =>
            bevel ? `var(--p-shadow-${boxShadow})` : 'none',
          ),
        ),
        ...getResponsiveValue(
          'shadow-bevel',
          'border-radius',
          mapResponsiveProp(bevel, (bevel) =>
            bevel
              ? `var(--p-border-radius-${borderRadius})`
              : 'var(--p-border-radius-0-experimental)',
          ),
        ),
      }}
    >
      {children}
    </Component>
  );
}

function mapResponsiveProp(
  responsiveProp: ResponsiveProp<boolean>,
  callback: (value: boolean) => string,
): ResponsiveProp<string> {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [
      breakpointsAlias,
      callback(value),
    ]),
  );
}
