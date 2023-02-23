import React, {useState, useCallback} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  ChoiceList,
  Text,
  useIndexResourceState,
  IndexTable,
  IndexFilters,
  RangeSlider,
  TextField,
  Card,
} from '@shopify/polaris';
import type {AppliedFilterInterface} from '@shopify/polaris';

import type {TabProps} from '../Tabs';
import type {FiltersProps} from '../Filters';

import type {IndexFiltersProps} from './IndexFilters';
import {useSetIndexFiltersMode} from './hooks';

export default {
  component: IndexFilters,
  parameters: {
    a11y: {
      config: {
        // disabled due to DataTable having a scrollable region without
        // keyboard access when all content fits without scrolling.
        rules: [{id: 'scrollable-region-focusable', enabled: false}],
      },
    },
  },
} as ComponentMeta<typeof IndexFilters>;

const useDefaultData = () => {
  const [selected, setSelected] = useState(0);
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ]);
  const [sortSelected, setSortSelected] = useState(['order-number asc']);
  const {mode, setMode} = useSetIndexFiltersMode();

  const handleSaveNewViewModal = async (value: string) => {
    setItemStrings([...itemStrings, value]);
    return true;
  };

  const [searchTerm, setSearchTerm] = useState('');

  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
  };

  const duplicateView = (index: number) => {
    const item = itemStrings[index];
    setItemStrings([...itemStrings, item]);
  };

  const items: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[] =
    itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 0,
      permissions: index === 0 ? [] : ['rename', 'duplicate', 'edit', 'delete'],
      onClickRenameView: () => {},
      onSaveRenameViewModal: async (value: string, id: string) => {
        const newItemsStrings = items.map((item) => {
          if (item.id === id) {
            return value;
          }
          return item.content;
        });
        setItemStrings(newItemsStrings);
      },
      onClickDuplicateView: async (id: string) => {
        duplicateView(index);
      },
      onClickEditView: (id: string) => {},
      onClickDeleteView: (id: string) => {},
      onConfirmDeleteView: async (id: string) => {
        deleteView(index);
      },
    }));

  const onHandleUpdate = async () => {
    return true;
  };

  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    return true;
  };

  const onHandleSaveAs = async () => {
    return true;
  };

  const isCurrentViewLocked = Boolean(items[selected].isLocked);

  const viewNames = items.map(({content}) => content);

  const primaryAction: IndexFiltersProps['primaryAction'] =
    selected === 0
      ? {
          type: 'save-as',
          onAction: onHandleSaveAs,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleUpdate,
          disabled: false,
          loading: false,
        };

  return {
    items,
    selected,
    setSelected,
    isCurrentViewLocked,
    handleSaveNewViewModal,
    searchTerm,
    setSearchTerm,
    sortOptions,
    sortSelected,
    setSortSelected,
    onHandleUpdate,
    onHandleCancel,
    onHandleSave,
    onHandleSaveAs,
    filters,
    appliedFilters,
    onClearAllFilters,
    mode,
    setMode,
    primaryAction,
  };
};

function Table() {
  const customers = [
    {
      id: '3411',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$2,400',
    },
    {
      id: '2561',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      orders: 30,
      amountSpent: '$140',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(customers);

  const rowMarkup = customers.map(
    ({id, name, location, orders, amountSpent}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {name}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  return (
    <IndexTable
      resourceName={resourceName}
      itemCount={customers.length}
      selectedItemsCount={
        allResourcesSelected ? 'All' : selectedResources.length
      }
      onSelectionChange={handleSelectionChange}
      headings={[
        {title: 'Name', flush: true},
        {title: 'Location', flush: true},
        {title: 'Order count', flush: true},
        {title: 'Amount spent', flush: true},
      ]}
    >
      {rowMarkup}
    </IndexTable>
  );
}

export function Default() {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const [itemStrings, setItemStrings] = useState([
    'All',
    'Unpaid',
    'Open',
    'Closed',
    'Local delivery',
    'Local pickup',
  ]);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    return true;
  };

  const tabs: Omit<TabProps, 'onToggleModal' | 'onTogglePopover'>[] =
    itemStrings.map((item, index) => ({
      content: item,
      index,
      onAction: () => {},
      id: `${item}-${index}`,
      isLocked: index === 0,
      permissions: index === 0 ? [] : ['rename', 'duplicate', 'edit', 'delete'],
      onClickRenameView: () => {},
      onSaveRenameViewModal: async (value: string, id: string) => {
        const newItemsStrings = tabs.map((item) => {
          if (item.id === id) {
            return value;
          }
          return item.content;
        });
        setItemStrings(newItemsStrings);
      },
      onClickEditView: (id: string) => {},
      onClickDeleteView: (id: string) => {},
      onConfirmDuplicateView: async (name) => {
        duplicateView(name);
      },
      onConfirmDeleteView: async (id: string) => {
        deleteView(index);
      },
    }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Order', value: 'order asc', directionLabel: 'Ascending'},
    {label: 'Order', value: 'order desc', directionLabel: 'Descending'},
    {label: 'Customer', value: 'customer asc', directionLabel: 'A-Z'},
    {label: 'Customer', value: 'customer desc', directionLabel: 'Z-A'},
    {label: 'Date', value: 'date asc', directionLabel: 'A-Z'},
    {label: 'Date', value: 'date desc', directionLabel: 'Z-A'},
    {label: 'Total', value: 'total asc', directionLabel: 'Ascending'},
    {label: 'Total', value: 'total desc', directionLabel: 'Descending'},
  ];
  const [sortSelected, setSortSelected] = useState(['order asc']);
  const {mode, setMode} = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    return true;
  };

  const primaryAction: IndexFiltersProps['primaryAction'] =
    selected === 0
      ? {
          type: 'save-as',
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };
  const [accountStatus, setAccountStatus] = useState(null);
  const [moneySpent, setMoneySpent] = useState(null);
  const [taggedWith, setTaggedWith] = useState(null);
  const [queryValue, setQueryValue] = useState('');

  const handleAccountStatusChange = useCallback(
    (value) => setAccountStatus(value),
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
  const handleFiltersQueryChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleAccountStatusRemove = useCallback(
    () => setAccountStatus(null),
    [],
  );
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(null), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [
    handleAccountStatusRemove,
    handleMoneySpentRemove,
    handleQueryValueRemove,
    handleTaggedWithRemove,
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
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
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

  return (
    <Card>
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => {}}
        onSortChange={setSortSelected}
        primaryAction={primaryAction}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        disableTabs={false}
        canCreateNewView
        onCreateNewView={onCreateNewView}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      <Table />
    </Card>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return value.map((val) => `Customer ${val}`).join(', ');
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
