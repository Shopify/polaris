import React from 'react';

import {Button} from '../../../Button';
import type {ButtonProps} from '../../../Button';

export interface FilterButtonProps {
  onClick: () => void;
  label: string;
  icon: ButtonProps['icon'];
  disabled?: boolean;
}

export function FilterButton({
  onClick,
  label,
  icon,
  disabled,
}: FilterButtonProps) {
  return (
    <Button
      icon={icon}
      onClick={onClick}
      disabled={disabled}
      accessibilityLabel={label}
    />
  );
}
