import React from 'react';
import {FilterIcon} from '@shopify/polaris-icons';

import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {Button} from '../../../Button';

import styles from './FilterButton.module.css';

export interface FilterButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  pressed?: boolean;
  tooltipContent: string;
  disclosureZIndexOverride?: number;
}

export function FilterButton({
  onClick,
  label,
  disabled,
  pressed,
  tooltipContent,
  disclosureZIndexOverride,
}: FilterButtonProps) {
  const className = pressed ? styles.pressed : undefined;

  const activator = (
    <div className={className}>
      <Button
        size="slim"
        onClick={onClick}
        disabled={disabled}
        pressed={pressed}
        icon={FilterIcon}
        accessibilityLabel={label}
      />
    </div>
  );

  const content = (
    <Text as="span" variant="bodyMd" alignment="center">
      {tooltipContent}
    </Text>
  );

  return (
    <Tooltip
      content={content}
      preferredPosition="above"
      hoverDelay={400}
      zIndexOverride={disclosureZIndexOverride}
    >
      {activator}
    </Tooltip>
  );
}
