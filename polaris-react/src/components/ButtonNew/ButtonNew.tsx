import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {Icon} from '../Icon';
import {ButtonBase} from '../ButtonBase';
import type {IconSource} from '../../types';
import {HorizontalStack} from '../HorizontalStack';

import styles from './ButtonNew.scss';

type ButtonSizes = 'small' | 'medium' | 'large';
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
  iconPrefix?: IconSource;
  iconSuffix?: IconSource;
}

const DEFAULT_SIZE = 'medium';

export const ButtonNew = ({
  children,
  size = DEFAULT_SIZE,
  variant,
  tone,
  disabled,
  iconPrefix,
  iconSuffix,
}: ButtonNewProps) => {
  const className = classNames(
    styles.Button,
    disabled && styles.disabled,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    variant && styles[variationName('variant', variant)],
    tone && styles[variationName('tone', tone)],
    iconPrefix && styles.iconPrefix,
    iconSuffix && styles.iconSuffix,
  );

  if (iconPrefix || iconSuffix) {
    const iconPrefixMarkup = iconPrefix && (
      <Icon source={iconPrefix} color="base" />
    );

    const iconSuffixMarkup = iconSuffix && (
      <Icon source={iconSuffix} color="base" />
    );
    const iconGap = size === 'small' ? '05' : '1';
    return (
      <ButtonBase className={className}>
        <HorizontalStack gap={iconGap} blockAlign="center">
          {iconPrefix && iconPrefixMarkup}
          {children}
          {iconSuffix && iconSuffixMarkup}
        </HorizontalStack>
      </ButtonBase>
    );
  }

  return <ButtonBase className={className}>{children}</ButtonBase>;
};
