import React, {useCallback, useState} from 'react';
import type {ComponentMeta} from '@storybook/react';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  LegacyFilters,
  Layout,
  Page,
  ResourceItem,
  ResourceList,
  TextField,
  Text,
  BlockStack,
  Box,
} from '@shopify/polaris';

export default {
  component: ResourceList,
} as ComponentMeta<typeof ResourceList>;

export function Default() {
  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 100,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 200,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="md" name={name} />;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export function WithEmptyState() {
  const items = [];
  const appliedFilters = [];
  const filters = [];

  const filterControl = (
    <LegacyFilters
      disabled={!items.length}
      queryValue=""
      filters={filters}
      appliedFilters={appliedFilters}
    />
  );

  const emptyStateMarkup =
    !appliedFilters.length && !items.length ? (
      <EmptyState
        heading="Upload a file to get started"
        action={{content: 'Upload files'}}
        image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
      >
        <p>
          You can use the Files section to upload images, videos, and other
          documents
        </p>
      </EmptyState>
    ) : undefined;

  return (
    <Page title="Files">
      <Layout>
        <Layout.Section>
          <Card padding="0" roundedAbove="sm">
            <ResourceList
              emptyState={emptyStateMarkup}
              items={items}
              renderItem={() => {}}
              filterControl={filterControl}
              resourceName={{singular: 'file', plural: 'files'}}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export function WithSelectionAndNoBulkActions() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 101,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 201,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export function WithBulkActions() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 103,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 203,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export function WithBulkActionsAndManyItems() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$24,00',
    };
  });

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export function WithLoadingState() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 104,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 204,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        loading
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export function WithTotalCount() {
  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 105,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 205,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="md" name={name} />;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
        showHeader
        totalItemsCount={50}
      />
    </Card>
  );
}

export function WithHeaderContent() {
  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        headerContent="Customer details shown below"
        items={[
          {
            id: 105,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 205,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="md" name={name} />;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
        showHeader
      />
    </Card>
  );
}

export function WithSorting() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 106,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 206,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        sortValue={sortValue}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
        ]}
        onSortChange={(selected) => {
          setSortValue(selected);
          console.log(`Sort option changed to ${selected}.`);
        }}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export function WithAlternateTool() {
  const resourceName = {
    singular: 'Customer',
    plural: 'Customers',
  };

  const items = [
    {
      id: 107,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 207,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        items={items}
        renderItem={renderItem}
        resourceName={resourceName}
        alternateTool={<Button>Email customers</Button>}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export function WithFiltering() {
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 108,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 208,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
  ];

  const filters = [
    {
      key: 'taggedWith1',
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
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith1',
          label: disambiguateLabel('taggedWith1', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const filterControl = (
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={setQueryValue}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{paddingLeft: '8px'}}>
        <Button onClick={() => console.log('New filter saved')}>Save</Button>
      </div>
    </LegacyFilters>
  );

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        filterControl={filterControl}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem id={id} url={url} media={media}>
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith1':
        return `Tagged with ${value}`;
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

export function WithACustomEmptySearchResultState() {
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);
  const [items, setItems] = useState([]);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback((value) => {
    setQueryValue(value);
    setItems([]);
  }, []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const filters = [
    {
      key: 'taggedWith2',
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
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith2',
          label: disambiguateLabel('taggedWith2', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const filterControl = (
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{paddingLeft: '8px'}}>
        <Button onClick={() => console.log('New filter saved')}>Save</Button>
      </div>
    </LegacyFilters>
  );

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        filterControl={filterControl}
        emptySearchState={<div>This is a custom empty state</div>}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem id={id} url={url} media={media}>
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith2':
        return `Tagged with ${value}`;
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

export function WithItemShortcutActions() {
  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 109,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            latestOrderUrl: '#',
          },
          {
            id: 209,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            latestOrderUrl: '#',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location, latestOrderUrl} = item;
          const media = <Avatar customer size="md" name={name} />;
          const shortcutActions = latestOrderUrl
            ? [
                {
                  content: 'View latest order',
                  accessibilityLabel: `View ${name}’s latest order`,
                  url: latestOrderUrl,
                },
              ]
            : null;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
              shortcutActions={shortcutActions}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export function WithPersistentItemShortcutActions() {
  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 110,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
            latestOrderUrl: '#',
          },
          {
            id: 210,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
            latestOrderUrl: '#',
          },
        ]}
        renderItem={(item) => {
          const {id, url, name, location, latestOrderUrl} = item;
          const media = <Avatar customer size="md" name={name} />;
          const shortcutActions = latestOrderUrl
            ? [
                {
                  content: 'View latest order',
                  accessibilityLabel: `View ${name}’s latest order`,
                  url: latestOrderUrl,
                },
              ]
            : null;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
              shortcutActions={shortcutActions}
              persistActions
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export function WithMultiselect() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 111,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: 211,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
    },
    {
      id: 311,
      url: '#',
      name: 'Joe Smith',
      location: 'Arizona, USA',
    },
    {
      id: 411,
      url: '#',
      name: 'Haden Jerado',
      location: 'Decatur, USA',
    },
    {
      id: 511,
      url: '#',
      name: 'Tom Thommas',
      location: 'Florida, USA',
    },
    {
      id: 611,
      url: '#',
      name: 'Emily Amrak',
      location: 'Texas, USA',
    },
  ];

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        resolveItemId={resolveItemIds}
      />
    </Card>
  );

  function renderItem(item, _, index) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="md" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        sortOrder={index}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  function resolveItemIds({id}) {
    return id;
  }
}

export function WithAllOfItsElements() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [taggedWith, setTaggedWith] = useState('VIP');
  const [queryValue, setQueryValue] = useState(null);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = [
    {
      id: 112,
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
      latestOrderUrl: '#',
    },
    {
      id: 212,
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA',
      latestOrderUrl: '#',
    },
  ];

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const filters = [
    {
      key: 'taggedWith3',
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
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith3',
          label: disambiguateLabel('taggedWith3', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  const filterControl = (
    <LegacyFilters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryValueChange}
      onQueryClear={handleQueryValueRemove}
      onClearAll={handleClearAll}
    >
      <div style={{paddingLeft: '8px'}}>
        <Button onClick={() => console.log('New filter saved')}>Save</Button>
      </div>
    </LegacyFilters>
  );

  return (
    <Card padding="0" roundedAbove="sm">
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        sortValue={sortValue}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'},
        ]}
        onSortChange={(selected) => {
          setSortValue(selected);
          console.log(`Sort option changed to ${selected}.`);
        }}
        filterControl={filterControl}
      />
    </Card>
  );

  function renderItem(item) {
    const {id, url, name, location, latestOrderUrl} = item;
    const media = <Avatar customer size="md" name={name} />;
    const shortcutActions = latestOrderUrl
      ? [{content: 'View latest order', url: latestOrderUrl}]
      : null;
    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <Text fontWeight="bold" as="span">
            {name}
          </Text>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith3':
        return `Tagged with ${value}`;
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

export function WithPagination() {
  return (
    <Card padding="0">
      <ResourceList
        resourceName={{singular: 'customer', plural: 'customers'}}
        items={[
          {
            id: 100,
            url: '#',
            name: 'Mae Jemison',
            location: 'Decatur, USA',
          },
          {
            id: 200,
            url: '#',
            name: 'Ellen Ochoa',
            location: 'Los Angeles, USA',
          },
        ]}
        pagination={{
          hasNext: true,
          onNext: () => {},
        }}
        renderItem={(item) => {
          const {id, url, name, location} = item;
          const media = <Avatar customer size="md" name={name} />;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={media}
              accessibilityLabel={`View details for ${name}`}
            >
              <h3>
                <Text fontWeight="bold" as="span">
                  {name}
                </Text>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export function WithBulkActionsAndPagination() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const items = Array.from({length: 50}, (_, num) => {
    return {
      id: `${num}`,
      url: '#',
      name: `Mae Jemison ${num}`,
      location: 'Decatur, USA',
      orders: 20,
      amountSpent: '$24,00',
    };
  });

  const promotedBulkActions = [
    {
      content: 'Edit customers',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];

  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log('Todo: implement bulk add tags'),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];
  return (
    <BlockStack gap="400">
      <div style={{height: 2000}}>
        <Card>Hello world</Card>
      </div>
      <Card padding="0">
        <ResourceList
          resourceName={resourceName}
          items={items}
          bulkActions={bulkActions}
          promotedBulkActions={promotedBulkActions}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          pagination={{
            hasNext: true,
            onNext: () => {},
          }}
          renderItem={(item) => {
            const {id, url, name, location} = item;
            const media = <Avatar customer size="md" name={name} />;

            return (
              <ResourceItem
                id={id}
                url={url}
                media={media}
                accessibilityLabel={`View details for ${name}`}
              >
                <h3>
                  <Text fontWeight="bold" as="span">
                    {name}
                  </Text>
                </h3>
                <div>{location}</div>
              </ResourceItem>
            );
          }}
        />
      </Card>
      <div style={{height: 2000}}>
        <Card>Hello world</Card>
      </div>
    </BlockStack>
  );
}
