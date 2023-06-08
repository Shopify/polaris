import React from 'react';
import type {CSSProperties} from 'react';
import {SearchMinor, FilterMinor} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {HorizontalStack} from '../../../HorizontalStack';
import {FilterButton} from '../FilterButton';
import {useFeatures} from '../../../../utilities/features';

export interface SearchFilterButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  tooltipContent: string;
  hideFilters?: boolean;
  hideQueryField?: boolean;
  style: CSSProperties;
}

export function SearchFilterButton({
  onClick,
  label,
  disabled,
  tooltipContent,
  style,
  hideFilters,
  hideQueryField,
}: SearchFilterButtonProps) {
  const {polarisSummerEditions2023: se23} = useFeatures();

  const iconMarkup = (
    <HorizontalStack gap="0">
      {hideQueryField ? null : <Icon source={SearchMinor} color="base" />}
      {hideFilters ? null : <Icon source={FilterMinor} color="base" />}
    </HorizontalStack>
  );

  const childMarkup = !se23 ? iconMarkup : null;

  const activator = (
    <div style={style}>
      <FilterButton
        onClick={onClick}
        label={label}
        disabled={disabled}
        icon={se23 ? iconMarkup : undefined}
      >
        {childMarkup}
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
