import React from 'react';
import type {CSSProperties} from 'react';
import {SearchMinor, FilterMinor} from '@shopify/polaris-icons';

import {Icon} from '../../../Icon';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {InlineStack} from '../../../InlineStack';
import {Button} from '../../../Button';

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
  const iconMarkup = (
    <InlineStack gap="0">
      {hideQueryField ? null : <Icon source={SearchMinor} tone="base" />}
      {hideFilters ? null : <Icon source={FilterMinor} tone="base" />}
    </InlineStack>
  );

  const activator = (
    <div style={style}>
      <Button
        size="slim"
        onClick={onClick}
        disabled={disabled}
        icon={iconMarkup}
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
    <Tooltip content={content} preferredPosition="above" hoverDelay={400}>
      {activator}
    </Tooltip>
  );
}
