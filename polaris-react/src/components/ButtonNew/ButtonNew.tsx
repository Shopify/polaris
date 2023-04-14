import React from 'react';

import {classNames, variationName} from '../../utilities/css';
import {Icon} from '../Icon';
import {ButtonBase} from '../ButtonBase';

import styles from './ButtonNew.scss';

export interface ButtonNewProps {
  children?: React.ReactNode;
  /**
   * Changes the size of the button, giving it more or less padding
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'transparent';
  tone?: 'critical';
  disabled?: boolean;
}

const hasChildOfType = (children: React.ReactNode, type: any) => {
  let hasType = false;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === type) {
      hasType = true;
    } else if (
      React.isValidElement(child) &&
      (child as React.ReactElement).props.children
    ) {
      hasType = hasChildOfType(
        (child as React.ReactElement).props.children,
        type,
      );
    }
  });

  return hasType;
};

const DEFAULT_SIZE = 'medium';

export const ButtonNew = ({
  children,
  size = DEFAULT_SIZE,
  variant,
  tone,
  disabled,
}: ButtonNewProps) => {
  const hasIcon = hasChildOfType(children, Icon);
  const className = classNames(
    styles.Button,
    disabled && styles.disabled,
    hasIcon && styles.hasIcon,
    size && size !== DEFAULT_SIZE && styles[variationName('size', size)],
    variant && styles[variationName('variant', variant)],
    tone && styles[variationName('tone', tone)],
  );

  return <ButtonBase className={className}>{children}</ButtonBase>;
};
