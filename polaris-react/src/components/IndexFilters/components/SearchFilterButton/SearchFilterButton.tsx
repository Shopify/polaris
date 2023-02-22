import React from 'react';

import {Icon} from '../../../Icon';
import {Stack} from '../../../Stack';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {SearchFilter} from '../../icons';
import {FilterButton} from '../FilterButton';

export interface SearchFilterButtonProps {
  onClick: () => void;
  'aria-label': string;
  disabled?: boolean;
  disabledTooltipMessage?: string;
  tooltipContent: string;
}

export function SearchFilterButton({
  onClick,
  'aria-label': ariaLabel,
  disabled,
  disabledTooltipMessage,
  tooltipContent,
}: SearchFilterButtonProps) {
  const activator = (
    <FilterButton
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      disabledTooltipMessage={disabledTooltipMessage}
      hasDoubleWidthIcon
    >
      <Stack spacing="none">
        <Icon source={SearchFilter} color="base" />
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
