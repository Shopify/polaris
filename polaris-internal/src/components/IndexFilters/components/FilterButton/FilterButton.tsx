import React from 'react';
import {FilterIcon} from '@shopify/polaris-icons';

<<<<<<<< HEAD:polaris-react/src/components/IndexFilters/components/SearchFilterButton/SearchFilterButton.tsx
import {Icon} from '../../../Icon';
========
>>>>>>>> ee64715c9 ([IndexFilters] Prototype "add as filter" search input UX):polaris-internal/src/components/IndexFilters/components/FilterButton/FilterButton.tsx
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
<<<<<<<< HEAD:polaris-react/src/components/IndexFilters/components/SearchFilterButton/SearchFilterButton.tsx
  style,
  hideFilters,
  hideQueryField,
}: SearchFilterButtonProps) {
  const iconMarkup = (
    <InlineStack gap="0">
      {hideQueryField ? null : <Icon source={SearchIcon} tone="base" />}
      {hideFilters ? null : <Icon source={FilterIcon} tone="base" />}
    </InlineStack>
  );
========
}: FilterButtonProps) {
  const className = pressed ? styles.pressed : undefined;
>>>>>>>> ee64715c9 ([IndexFilters] Prototype "add as filter" search input UX):polaris-internal/src/components/IndexFilters/components/FilterButton/FilterButton.tsx

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
