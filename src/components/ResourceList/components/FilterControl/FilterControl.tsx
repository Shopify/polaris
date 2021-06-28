import React, {useCallback, useContext} from 'react';
import {SearchMinor} from '@shopify/polaris-icons';

import type {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import {Icon} from '../../../Icon';
import {FormLayout} from '../../../FormLayout';
import {TextField} from '../../../TextField';
import {Tag} from '../../../Tag';
import {useI18n} from '../../../../utilities/i18n';
import {ResourceListContext} from '../../../../utilities/resource-list';

import {FilterCreator} from './components';
import {AppliedFilter, Filter, FilterType, Operator} from './types';
import styles from './FilterControl.scss';

export interface FilterControlProps {
  searchValue?: string;
  appliedFilters?: AppliedFilter[];
  additionalAction?: ComplexAction;
  focused?: boolean;
  filters?: Filter[];
  placeholder?: string;
  onSearchBlur?(): void;
  onSearchChange(searchValue: string, id: string): void;
  onFiltersChange?(appliedFilters: AppliedFilter[]): void;
}

/** @deprecated This is a private component, do not use it. This component might be removed in a minor version update. Use <Filters /> instead. */
export function FilterControl({
  searchValue,
  appliedFilters = [],
  additionalAction,
  focused = false,
  filters = [],
  placeholder,
  onSearchBlur,
  onSearchChange,
  onFiltersChange,
}: FilterControlProps) {
  // eslint-disable-next-line no-console
  console.warn(
    'Deprecation: <FilterControl /> is deprecated. This is a private component, do not use it. This component might be removed in a minor version update. Use <Filters /> instead.',
  );

  const i18n = useI18n();
  const {selectMode, resourceName} = useContext(ResourceListContext);

  const filterResourceName = resourceName || {
    singular: i18n.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: i18n.translate('Polaris.ResourceList.defaultItemPlural'),
  };

  const handleAddFilter = useCallback(
    (newFilter: AppliedFilter) => {
      if (!onFiltersChange) {
        return;
      }

      const foundFilter = appliedFilters.find(
        (appliedFilter) =>
          idFromFilter(appliedFilter) === idFromFilter(newFilter),
      );

      if (foundFilter) {
        return;
      }

      const newAppliedFilters = [...appliedFilters, newFilter];

      onFiltersChange(newAppliedFilters);
    },
    [onFiltersChange, appliedFilters],
  );

  const handleRemoveFilter = useCallback(
    (filterId: string) => {
      if (!onFiltersChange) {
        return;
      }

      const foundIndex = appliedFilters.findIndex(
        (appliedFilter) => idFromFilter(appliedFilter) === filterId,
      );

      const newAppliedFilters =
        foundIndex >= 0
          ? [
              ...appliedFilters.slice(0, foundIndex),
              ...appliedFilters.slice(foundIndex + 1, appliedFilters.length),
            ]
          : [...appliedFilters];

      onFiltersChange(newAppliedFilters);
    },
    [appliedFilters, onFiltersChange],
  );

  const getRemoveFilterCallback = useCallback(
    (filterId: string) => {
      return () => {
        handleRemoveFilter(filterId);
      };
    },
    [handleRemoveFilter],
  );

  const textFieldLabel = placeholder
    ? placeholder
    : i18n.translate('Polaris.ResourceList.FilterControl.textFieldLabel', {
        resourceNamePlural: filterResourceName.plural.toLocaleLowerCase(),
      });

  if (additionalAction) {
    additionalAction.disabled = selectMode;
  }

  const additionalActionButton =
    (additionalAction && buttonsFrom(additionalAction)) || null;

  const filterCreatorMarkup =
    filters.length > 0 ? (
      <FilterCreator
        resourceName={filterResourceName}
        filters={filters}
        onAddFilter={handleAddFilter}
        disabled={selectMode}
      />
    ) : null;

  const appliedFiltersMarkup = appliedFilters.map((appliedFilter) => {
    const activeFilterLabel = getFilterLabel(appliedFilter);
    const filterId = idFromFilter(appliedFilter);
    return (
      <li className={styles.AppliedFilter} key={filterId}>
        <Tag onRemove={getRemoveFilterCallback(filterId)} disabled={selectMode}>
          {activeFilterLabel}
        </Tag>
      </li>
    );
  });

  const appliedFiltersWrapper =
    appliedFilters.length > 0 ? (
      <ul className={styles.AppliedFilters}>{appliedFiltersMarkup}</ul>
    ) : null;

  return (
    <FormLayout>
      <TextField
        connectedLeft={filterCreatorMarkup}
        connectedRight={additionalActionButton}
        label={textFieldLabel}
        labelHidden
        placeholder={textFieldLabel}
        prefix={<Icon source={SearchMinor} color="subdued" />}
        value={searchValue}
        onChange={onSearchChange}
        onBlur={onSearchBlur}
        focused={focused}
        disabled={selectMode}
        autoComplete="off"
      />
      {appliedFiltersWrapper}
    </FormLayout>
  );

  function getFilterLabel(appliedFilter: AppliedFilter) {
    const {key, value, label} = appliedFilter;
    if (label) {
      return label;
    }

    const filter = filters.find((filter: any) => {
      const {minKey, maxKey, operatorText} = filter;

      if (minKey || maxKey) {
        return filter.key === key || minKey === key || maxKey === key;
      }

      if (operatorText && typeof operatorText !== 'string') {
        return (
          filter.key === key ||
          operatorText.filter(
            ({key: operatorKey}: Operator) => operatorKey === key,
          ).length === 1
        );
      }

      return filter.key === key;
    });

    if (!filter) {
      return value;
    }

    const filterOperatorLabel = findOperatorLabel(filter, appliedFilter);
    const filterLabelByType = findFilterLabelByType(filter, appliedFilter);

    if (!filterOperatorLabel) {
      return `${filter.label} ${filterLabelByType}`;
    }

    return `${filter.label} ${filterOperatorLabel} ${filterLabelByType}`;
  }

  function findFilterLabelByType(filter: Filter, appliedFilter: AppliedFilter) {
    const {value: appliedFilterValue} = appliedFilter;

    if (filter.type === FilterType.Select) {
      const foundFilterOption = filter.options.find((option) =>
        typeof option === 'string'
          ? option === appliedFilterValue
          : option.value === appliedFilterValue,
      );

      if (foundFilterOption) {
        return typeof foundFilterOption === 'string'
          ? foundFilterOption
          : foundFilterOption.label;
      }
    }

    if (filter.type === FilterType.DateSelector) {
      if (filter.key === appliedFilter.key) {
        const filterLabelKey = `Polaris.ResourceList.DateSelector.FilterLabelForValue.${appliedFilter.value}`;

        return i18n.translationKeyExists(filterLabelKey)
          ? i18n.translate(filterLabelKey)
          : appliedFilter.value;
      }

      if (appliedFilter.key === filter.maxKey) {
        return i18n.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_before',
          {
            date: formatDateForLabelDisplay(appliedFilter.value),
          },
        );
      }

      if (appliedFilter.key === filter.minKey) {
        return i18n.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_after',
          {
            date: formatDateForLabelDisplay(appliedFilter.value),
          },
        );
      }
    }

    return appliedFilterValue;
  }
}

function idFromFilter(appliedFilter: AppliedFilter) {
  return `${appliedFilter.key}-${appliedFilter.value}`;
}

function formatDateForLabelDisplay(date: string) {
  if (isNaN(new Date(date).getTime())) {
    return date;
  }

  return new Date(date.replace(/-/g, '/')).toLocaleDateString();
}

function findOperatorLabel(filter: Filter, appliedFilter: AppliedFilter) {
  const {operatorText} = filter;

  if (
    filter.type === FilterType.DateSelector &&
    (appliedFilter.key === filter.minKey || appliedFilter.key === filter.maxKey)
  ) {
    return '';
  }

  if (!operatorText || typeof operatorText === 'string') {
    return operatorText;
  }

  const appliedOperator = operatorText.find((operator) => {
    return operator.key === appliedFilter.key;
  });

  if (appliedOperator) {
    return appliedOperator.filterLabel || appliedOperator.optionLabel;
  }
}
