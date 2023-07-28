import React from 'react';
import type {CSSProperties} from 'react';
import {SearchMinor, FilterMinor} from '@shopify/polaris-icons';

import {TextField} from '../../../TextField';
import {Icon} from '../../../Icon';
import {Tooltip} from '../../../Tooltip';
import {Text} from '../../../Text';
import {HorizontalStack} from '../../../HorizontalStack';
import {FilterButton} from '../FilterButton';
import {classNames} from '../../../../utilities/css';
import {useFeatures} from '../../../../utilities/features';
import type {Never} from '../../../../types';

import styles from './SearchFilterButton.scss';

interface SearchFilterButtonPropsBase {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  tooltipContent: string;
  hideFilters?: boolean;
  style: CSSProperties;
}

export interface SearchFilterButtonPropsHiddenQuery {
  /* Do not show the search query or activator button. */
  hideQueryField?: boolean;
}

export interface SearchFilterButtonPropsPeekQuery {
  /* Show a mini search field instead of a search icon which expands upon click. */
  peekQueryField?: boolean;
}

export type SearchFilterButtonProps =
  | ((SearchFilterButtonPropsBase & SearchFilterButtonPropsHiddenQuery) &
      Never<SearchFilterButtonPropsPeekQuery>)
  | ((SearchFilterButtonPropsBase & SearchFilterButtonPropsPeekQuery) &
      Never<SearchFilterButtonPropsHiddenQuery>);

export function SearchFilterButton({
  onClick,
  label,
  disabled,
  tooltipContent,
  style,
  hideFilters,
  hideQueryField,
  peekQueryField,
}: SearchFilterButtonProps) {
  const {polarisSummerEditions2023: se23} = useFeatures();

  const iconMarkup = (
    <HorizontalStack gap="0" wrap={false}>
      <div
        className={classNames(
          styles.SearchIcon,
          hideQueryField && styles.Hidden,
          peekQueryField && styles.PeekQueryField,
        )}
      >
        <Icon source={SearchMinor} color="base" />
      </div>
      <div
        className={classNames(styles.FilterIcon, hideFilters && styles.Hidden)}
      >
        <Icon source={FilterMinor} color="base" />
      </div>
    </HorizontalStack>
  );

  const childMarkup = !se23 ? iconMarkup : null;

  const activator = (
    <div style={style} className={styles.ActivatorWrapper}>
      <div
        className={classNames(
          styles.SearchField,
          hideQueryField && styles.Hidden,
          peekQueryField && styles.PeekQueryField,
        )}
      >
        <TextField
          label="Search"
          labelHidden
          type="text"
          value=""
          placeholder="Search"
          prefix={<Icon source={SearchMinor} />}
          autoComplete="off"
          onFocus={onClick}
          disabled={disabled}
        />
      </div>
      <div
        className={classNames(
          styles.FilterButton,
          hideFilters && styles.HiddenFilters,
          hideQueryField && styles.HiddenQuery,
          peekQueryField && styles.PeekQueryField,
        )}
      >
        <FilterButton
          onClick={onClick}
          label={label}
          disabled={disabled}
          icon={se23 ? iconMarkup : undefined}
        >
          {childMarkup}
        </FilterButton>
      </div>
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
