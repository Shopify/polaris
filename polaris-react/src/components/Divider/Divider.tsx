import React from 'react';
import type {BorderWidthScale, ColorBorderAlias} from '@shopify/polaris-tokens';

import {useFeatures} from '../../utilities/features';

import styles from './Divider.scss';

export interface DividerProps {
  /**
   * Divider border color
   * @default 'border-subdued'
   */
  borderColor?: ColorBorderAlias | 'transparent';
  /**
   * Divider border width
   * @default '1'
   */
  borderWidth?: BorderWidthScale;
}

export const Divider = ({
  borderColor = 'border-subdued',
  borderWidth = '1',
}: DividerProps) => {
  const {polarisSummerEditions2023} = useFeatures();

  const borderColorValue =
    borderColor === 'transparent'
      ? borderColor
      : `var(--p-color-${
          polarisSummerEditions2023 && borderColor === 'border-subdued'
            ? 'border-faint-experimental'
            : borderColor
        })`;

  return (
    <hr
      className={styles.Divider}
      style={{
        borderBlockStart: `var(--p-border-width-${borderWidth}) solid ${borderColorValue}`,
      }}
    />
  );
};
