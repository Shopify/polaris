import React from 'react';
import {SearchMinor} from '@shopify/polaris-icons';
import {ComplexAction} from '../../../../types';
import {buttonsFrom} from '../../../Button';
import Icon from '../../../Icon';
import FormLayout from '../../../FormLayout';
import TextField from '../../../TextField';
import Tag from '../../../Tag';
import {usePolaris} from '../../../../hooks';
import ResourceListContext from '../../context';

import {FilterCreator} from './components';
import {AppliedFilter, Filter, FilterType, Operator} from './types';
import styles from './FilterControl.scss';

export interface Props {
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

export default function FilterControl({
  searchValue,
  appliedFilters = [],
  additionalAction,
  focused = false,
  filters = [],
  placeholder,
  onSearchBlur,
  onSearchChange,
  onFiltersChange,
}: Props) {
  const {intl} = usePolaris();
  const {selectMode, resourceName} = React.useContext(ResourceListContext);

  const filterResourceName = resourceName || {
    singular: intl.translate('Polaris.ResourceList.defaultItemSingular'),
    plural: intl.translate('Polaris.ResourceList.defaultItemPlural'),
  };

  const handleAddFilter = React.useCallback(
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

  const handleRemoveFilter = React.useCallback(
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

  const getRemoveFilterCallback = React.useCallback(
    (filterId: string) => {
      return () => {
        handleRemoveFilter(filterId);
      };
    },
    [handleRemoveFilter],
  );

  const textFieldLabel = placeholder
    ? placeholder
    : intl.translate('Polaris.ResourceList.FilterControl.textFieldLabel', {
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
        prefix={<Icon source={SearchMinor} color="skyDark" />}
        value={searchValue}
        onChange={onSearchChange}
        onBlur={onSearchBlur}
        focused={focused}
        disabled={selectMode}
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
      const foundFilterOption = filter.options.find(
        (option) =>
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
        const filterLabelKey = `Polaris.ResourceList.DateSelector.FilterLabelForValue.${
          appliedFilter.value
        }`;

        return intl.translationKeyExists(filterLabelKey)
          ? intl.translate(filterLabelKey)
          : appliedFilter.value;
      }

      if (appliedFilter.key === filter.maxKey) {
        return intl.translate(
          'Polaris.ResourceList.DateSelector.FilterLabelForValue.on_or_before',
          {
            date: formatDateForLabelDisplay(appliedFilter.value),
          },
        );
      }

      if (appliedFilter.key === filter.minKey) {
        return intl.translate(
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
