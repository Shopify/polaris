import React from 'react';
import type {SpacingSpaceScale} from '@shopify/polaris-tokens';

import type {ResponsiveProp} from '../../utilities/css';
import {classNames, variationName} from '../../utilities/css';
import {Icon} from '../Icon';
import {ButtonBase} from '../ButtonBase';
import {Box} from '../Box';

import styles from './ButtonNew.scss';

type ButtonSizes = 'small' | 'medium' | 'large';
type Spacing = ResponsiveProp<SpacingSpaceScale>;
export interface ButtonNewProps {
  children?: React.ReactNode;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: ButtonSizes;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  tone?: 'critical';
  disabled?: boolean;
  /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineStart='4'
   * paddingInlineStart={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineStart?: Spacing;
  /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
   * @example
   * paddingInlineEnd='4'
   * paddingInlineEnd={{xs: '2', sm: '3', md: '4', lg: '5', xl: '6'}}
   */
  paddingInlineEnd?: Spacing;
}

const DEFAULT_SIZE = 'medium';

export const ButtonNew = ({
  children,
  size = DEFAULT_SIZE,
  variant,
  tone,
  disabled,
  paddingInlineStart,
  paddingInlineEnd,
}: ButtonNewProps) => {
  const className = classNames(
    styles.Button,
    disabled && styles.disabled,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    variant && styles[variationName('variant', variant)],
    tone && styles[variationName('tone', tone)],
  );

  const inlinePadding = (size: ButtonSizes) => {
    if (size === 'small') {
      return '2';
    } else if (size === 'large') {
      return '4';
    } else {
      return '3';
    }
  };

  return (
    <ButtonBase className={className}>
      <Box
        paddingInlineStart={paddingInlineStart || inlinePadding(size)}
        paddingInlineEnd={paddingInlineEnd || inlinePadding(size)}
      >
        {children}
      </Box>
    </ButtonBase>
  );
};
