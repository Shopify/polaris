import React, {useCallback, useState} from 'react';
import {
  Avatar,
  LegacyCard,
  ChoiceList,
  AlphaFilters,
  RangeSlider,
  ResourceList,
  TextField,
  Text,
} from '@shopify/polaris';

export function Playground() {
  const [accountStatus, setAccountStatus] = useState(null);
  const [deliveryShipped, setDeliveryShipped] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [deliveryNotes, setDeliveryNotes] = useState(null);
  const [queryValue, setQueryValue] = useState(null);
  const [manageFilters, setManageFilters] = useState(false);


  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
    [],
  );
  const handleDeliveryShippedChange = useCallback(
    (value) => setDeliveryShipped(value),
    [],
  );
  const handleMoneySpentChange = useCallback(
    (value) => setMoneySpent(value),
    [],
  );
  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleDeliveryNotesChange = useCallback(
    (value) => setDeliveryNotes(value),
    [],
  );
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(null),
    [],
  );
  const handleDeliveryShippedRemove = useCallback(
    () => setDeliveryShipped(null),
    [],
  );
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleDeliveryNotesRemove = useCallback(() => setDeliveryNotes(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
    handleDeliveryShippedRemove();
    handleDeliveryNotesRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
    handleDeliveryShippedRemove,
    handleDeliveryNotesRemove,
  ]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
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
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
      pinned: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
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
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
      shortcut: true,
      pinnned: true,
    },
  ];

  const metafieldFilters = [
    {
      key: 'deliveryShipped',
      label: 'Delivery shipped',
      filter: (
            <ChoiceList
            title="Delivery shipped"
            titleHidden
            choices={[
              {value: 'true', label: 'True'},
              {value: 'false', label: 'False'},
            ]}
            selected={deliveryShipped || []}
            onChange={handleDeliveryShippedChange}
          />
      ),
    },
    {
      key: 'deliveryNotes',
      label: 'Delivery notes',
      filter: (
        <TextField
          label="Tagged with"
          value={deliveryNotes}
          onChange={handleDeliveryNotesChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
      pinned: true,
    }
  ];



  const appliedFilters = [];
  if (!isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (!isEmpty(moneySpent)) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }
  if (!isEmpty(deliveryNotes)) {
    const key = 'deliveryNotes';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, deliveryNotes),
      onRemove: handleDeliveryNotesRemove,
    });
  }
  if (!isEmpty(deliveryShipped)) {
    const key = 'deliveryShipped';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, deliveryShipped),
      onRemove: handleDeliveryShippedRemove,
    });
  }

  const createdMetafields = {

  }


  return (
    <div style={{height: '568px'}}>
      <LegacyCard>
        {manageFilters ? (
          <div>
            <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <AlphaFilters
              queryValue={queryValue}
              queryPlaceholder="Searching in all"
              filters={filters}
              sections={[
                {
                  title: 'Manage Filters',
                  titleAction: {
                    content: 'Back',
                    onAction: () => setManageFilters(false),
                  },
                  filters: metafieldFilters,
                },
              ]}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleFiltersClearAll}
            />
          }
          flushFilters
          items={[
            {
              id: 341,
              url: '#',
              name: 'Mae Jemison',
              location: 'Decatur, USA',
            },
            {
              id: 256,
              url: '#',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA',
            },
          ]}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = <Avatar customer size="medium" name={name} />;

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
          </div>
        ) : (
          <div>
            <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <AlphaFilters
              queryValue={queryValue}
              queryPlaceholder="Searching in all"
              filters={filters}
              sections={[
                {
                  title: 'Metafields',
                  titleAction: {
                    content: 'Manage',
                    onAction: () => setManageFilters(true),
                  },
                  filters: metafieldFilters,
                },
              ]}
              appliedFilters={appliedFilters}
              onQueryChange={handleFiltersQueryChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleFiltersClearAll}
            />
          }
          flushFilters
          items={[
            {
              id: 341,
              url: '#',
              name: 'Mae Jemison',
              location: 'Decatur, USA',
            },
            {
              id: 256,
              url: '#',
              name: 'Ellen Ochoa',
              location: 'Los Angeles, USA',
            },
          ]}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = <Avatar customer size="medium" name={name} />;

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
          </div>
        )}

      </LegacyCard>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
        case 'deliveryNotes':
        return `Delivery notes: ${value}`;
      case 'accountStatus':
        return value.map((val) => `Customer ${val}`).join(', ');
      case 'deliveryShipped':
        return `Has it been delivered? ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
