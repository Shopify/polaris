import React from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';
import {UnstyledButton} from '../../../UnstyledButton';
import {useFeatures} from '../../../../utilities/features';
import {classNames} from '../../../../utilities/css';

import styles from './FilterButton.scss';

export interface FilterButtonProps {
  onClick: () => void;
  label: string;
  icon?: ButtonProps['icon'];
  disabled?: boolean;
  children?: React.ReactNode;
}

export function FilterButton({
  onClick,
  label,
  icon,
  disabled,
  children,
}: FilterButtonProps) {
  const {polarisSummerEditions2023: se23} = useFeatures();

  const classes = classNames(styles.FilterButton, disabled && styles.Disabled);

  const buttonMarkup = se23 ? (
    <Button
      size="slim"
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      accessibilityLabel={label}
    />
  ) : (
    <UnstyledButton
      className={classes}
      onClick={onClick}
      disabled={disabled}
      accessibilityLabel={label}
    >
      {children}
    </UnstyledButton>
  );

  return buttonMarkup;
}
