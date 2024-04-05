import {
  TextField,
  Card,
  ResourceList,
  Filters,
  Button,
  Avatar,
  Text,
  Box,
  ChoiceList,
  RangeSlider,
} from '@shopify/polaris';
import type {FiltersProps} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

export function FiltersWithChildrenContentAndUnsavedChangesExample() {
  const emptyFilterState: {
    query: {
      label: string;
      value: '';
    };
    accountStatus: {
      label: string;
      value: string[];
    };
    moneySpent: {
      label: string;
      value: [number, number];
    };
    taggedWith: {
      label: string;
      value: '';
    };
  } = {
    query: {
      label: 'Search',
      value: '',
    },
    accountStatus: {
      label: 'Account status',
      value: [],
    },
    moneySpent: {
      label: 'Money spent',
      value: [0, 0],
    },
    taggedWith: {
      label: 'Tagged with',
      value: '',
    },
  };

  const [queryValue, setQueryValue] = useState('');
  const [taggedWith, setTaggedWith] = useState('');
  const [moneySpent, setMoneySpent] = useState<[number, number]>([0, 0]);
  const [accountStatus, setAccountStatus] = useState<string[]>(['enabled']);
  const [savedFilterState, setSavedFilterState] = useState<
    Map<
      string,
      {
        label: string;
        value: string | string[] | number | [number, number];
      }
    >
  >(new Map(Object.entries(emptyFilterState)));

  const handleFilterChange =
    (key: string) => (value: string | string[] | number | [number, number]) => {
      if (key === 'taggedWith') setTaggedWith(value as string);
      if (key === 'moneySpent') setMoneySpent(value as [number, number]);
      if (key === 'accountStatus') setAccountStatus(value as string[]);
    };

  const handleFilterRemove = (key: string) => {
    if (key === 'taggedWith') {
      setTaggedWith(emptyFilterState.taggedWith.value);
    } else if (key === 'moneySpent') {
      setMoneySpent(emptyFilterState.moneySpent.value);
    } else if (key === 'accountStatus') {
      setAccountStatus(emptyFilterState.accountStatus.value);
    }
  };

  const handleFiltersQueryChange = (value: string) => setQueryValue(value);

  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);

  const handleFiltersClearAll = () => {
    Object.entries(emptyFilterState).forEach(([key]) =>
      handleFilterRemove(key),
    );

    handleQueryValueRemove();
  };

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      value: accountStatus,
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            {label: 'Enabled', value: 'enabled'},
            {label: 'Not invited', value: 'not invited'},
            {label: 'Invited', value: 'invited'},
            {label: 'Declined', value: 'declined'},
          ]}
          selected={accountStatus}
          onChange={handleFilterChange('accountStatus')}
          allowMultiple
        />
      ),
      shortcut: true,
      pinned: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      value: taggedWith,
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleFilterChange('taggedWith')}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
      pinned: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      value: moneySpent,
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleFilterChange('moneySpent')}
        />
      ),
    },
  ];

  const appliedFilters: FiltersProps['appliedFilters'] = [];

  filters.forEach(({key, label, value}) => {
    if (!isEmpty(value)) {
      appliedFilters.push({
        key,
        label: `${label}: ${humanReadableValue(key, value)}`,
        unsavedChanges: !isUnchanged(key, value),
        onRemove: () => handleFilterRemove(key),
      });
    }
  });

  const handleSaveFilters = () => {
    const nextSavedFilterState = new Map(savedFilterState);
    appliedFilters.forEach(({key, unsavedChanges}) => {
      const savedFilter = nextSavedFilterState.get(key);
      const value = filters.find((filter) => filter.key === key)?.value;
      console.log(`Saving filter: ${key}, ${value}`, savedFilter);

      if (value && unsavedChanges && savedFilter) {
        savedFilter.value = value;
      }
    });

    setSavedFilterState(nextSavedFilterState);
  };

  const disableAction = appliedFilters.every(
    ({unsavedChanges}) => !unsavedChanges,
  );

  return (
    <div style={{height: '568px'}}>
      <Card roundedAbove="sm" padding="0">
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <Filters
              queryValue={queryValue}
              queryPlaceholder="Searching in all"
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleFiltersClearAll}
            >
              <Box paddingInlineStart="200">
                <Button
                  disabled={disableAction}
                  onClick={handleSaveFilters}
                  size="micro"
                  variant="tertiary"
                >
                  Save
                </Button>
              </Box>
            </Filters>
          }
          flushFilters
          items={[
            {
              id: '341',
              url: '#',
              name: 'Mae Jemison',
              location: 'Decatur, USA',
            },
            {
              id: '256',
              url: '#',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA',
            },
          ]}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = (
              <Avatar
                initials={name
                  .split(' ')
                  .map((nm) => nm.substring(0, 1))
                  .join('')}
                size="md"
                name={name}
              />
            );

            return (
              <ResourceList.Item
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <Text as="h3" fontWeight="bold">
                  {name}
                </Text>
                <div>{location}</div>
              </ResourceList.Item>
            );
          }}
        />
      </Card>
    </div>
  );

  function humanReadableValue(
    key: string,
    value: string | string[] | number | [number, number],
  ): string {
    if (isEmpty(value)) return '';

    switch (key) {
      case 'moneySpent': {
        const [min, max] = value as [number, number];
        if (min === 0 && max === 0) return '';
        if (min === 0) return `up to $${max}`;
        if (max === 0) return `more than $${min}`;
        return `between $${min} and $${max}`;
      }

      case 'taggedWith': {
        const tags = (value as string).trim().split(',');
        if (tags.length === 1) return ` ${tags[0]}`;
        else if (tags.length === 2) return `${tags[0]} and ${tags[1]}`;
        return tags
          .map((tag, index) => {
            return index !== tags.length - 1 ? tag : `and ${tag}`;
          })
          .join(', ');
      }
      case 'accountStatus': {
        const statuses = value as string[];
        if (statuses.length === 1) {
          return statuses[0];
        } else if (statuses.length === 2) {
          return `${statuses[0]} or ${statuses[1]}`;
        } else {
          return statuses
            .map((status, index) => {
              return index !== statuses.length - 1 ? status : `or ${status}`;
            })
            .join(', ');
        }
      }
      default:
        return '';
    }
  }

  function isEmpty(value: string | string[] | number | [number, number]) {
    if (Array.isArray(value)) {
      return value.length === 0 || value[1] === 0;
    } else {
      return value === '' || value === 0 || value == null;
    }
  }

  function isUnchanged(
    key: string,
    value: string | string[] | number | [number, number],
  ) {
    if (key === 'taggedWith') {
      return value === savedFilterState.get(key)?.value;
    } else if (key === 'moneySpent') {
      const [min, max] = value as [number, number];
      const savedMoneySpent = savedFilterState.get(key)?.value as [
        number,
        number,
      ];

      return min === savedMoneySpent?.[0] && max === savedMoneySpent?.[1];
    } else if (key === 'accountStatus') {
      const savedAccountStatus =
        (savedFilterState.get(key)?.value as string[]) || [];
      return (
        Array.isArray(value) &&
        (value as string[]).every((val) =>
          savedAccountStatus?.includes(val as string),
        )
      );
    }
  }
}

export default withPolarisExample(
  FiltersWithChildrenContentAndUnsavedChangesExample,
);
