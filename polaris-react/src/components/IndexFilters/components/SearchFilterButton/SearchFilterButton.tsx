import React, {CSSProperties} from 'react';
import {SearchMinor, FilterMinor} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {Inline} from '../../../Inline';
import {FilterButton} from '../FilterButton';

export interface SearchFilterButtonProps {
  onClick: () => void;
  'aria-label': string;
  disabled?: boolean;
  tooltipContent: string;
  hideFilters?: boolean;
  style: CSSProperties;
}

export function SearchFilterButton({
  onClick,
  'aria-label': ariaLabel,
  disabled,
  tooltipContent,
  style,
  hideFilters,
}: SearchFilterButtonProps) {
  const activator = (
    <div style={style}>
      <FilterButton
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <Inline gap="0">
          <Icon source={SearchMinor} color="base" />
          {hideFilters ? null : <Icon source={FilterMinor} color="base" />}
        </Inline>
      </FilterButton>
    </div>
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
