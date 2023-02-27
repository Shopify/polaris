import React from 'react';
import {SearchMinor, FilterMinor} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {Stack} from '../../../Stack';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {FilterButton} from '../FilterButton';

export interface SearchFilterButtonProps {
  onClick: () => void;
  'aria-label': string;
  disabled?: boolean;
  tooltipContent: string;
}

export function SearchFilterButton({
  onClick,
  'aria-label': ariaLabel,
  disabled,
  tooltipContent,
}: SearchFilterButtonProps) {
  const activator = (
    <FilterButton
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      hasDoubleWidthIcon
    >
      <Stack spacing="none">
        <Icon source={SearchMinor} color="base" />
        <Icon source={FilterMinor} color="base" />
      </Stack>
    </FilterButton>
  );

  const content = (
    <Text as="span" variant="bodyMd" alignment="center">
      {tooltipContent}
    </Text>
  );

  return (
    <Tooltip content={content} preferredPosition="above" hoverDelay={400}>
      {activator}
    </Tooltip>
  );
}
