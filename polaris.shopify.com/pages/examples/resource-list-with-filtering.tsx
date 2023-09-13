import {
  TextField,
  LegacyFilters,
  Button,
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListWithFilteringExample() {
  const [taggedWith, setTaggedWith] = useState<string | undefined>('VIP');
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);

  const handleTaggedWithChange = useCallback(
    (value: any) => setTaggedWith(value),
    [],
  );
  const handleTaggedWithRemove = useCallback(
    () => setTaggedWith(undefined),
    [],
  );
  const handleQueryValueRemove = useCallback(
    () => setQueryValue(undefined),
    [],
  );
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
      id: '108',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA',
    },
    {
      id: '208',
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

  const appliedFilters =
    taggedWith && !isEmpty(taggedWith)
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
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        filterControl={filterControl}
      />
    </LegacyCard>
  );

  function renderItem(item: typeof items[number]) {
    const {id, url, name, location} = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceItem id={id} url={url} media={media}>
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {name}
        </Text>
        <div>{location}</div>
      </ResourceItem>
    );
  }

  function disambiguateLabel(key: string, value: string): string {
    switch (key) {
      case 'taggedWith1':
        return `Tagged with ${value}`;
      default:
        return value;
    }
  }

  function isEmpty(value: string): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}

export default withPolarisExample(ResourceListWithFilteringExample);
