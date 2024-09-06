import React from 'react';
import {FilterIcon} from '@shopify/polaris-icons';

import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {Button} from '../../../Button';
import {classNames} from '../../../../utilities/css';

import styles from './FilterButton.module.css';

export interface FilterButtonProps {
  label: string;
  disabled?: boolean;
  pressed?: boolean;
  tooltipContent: string;
  disclosureZIndexOverride?: number;
  hasAppliedFilters?: boolean;
  onClick: () => void;
}

export function FilterButton({
  onClick,
  label,
  disabled,
  pressed,
  tooltipContent,
  hasAppliedFilters = false,
  disclosureZIndexOverride,
}: FilterButtonProps) {
  const className = classNames(styles.FilterButton, pressed && styles.pressed);

  const appliedFilterIndicator = hasAppliedFilters ? (
    <div className={styles.AppliedFilterIndicator} />
  ) : null;

  const activator = (
    <div className={className}>
      <Button
        size="slim"
        onClick={onClick}
        disabled={disabled}
        pressed={pressed}
        icon={FilterIcon}
        accessibilityLabel={label}
        ariaExpanded={pressed}
      />
      {appliedFilterIndicator}
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
