import {
  TextField,
  LegacyCard,
  ResourceList,
  Filters,
  Button,
  Avatar,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DisableSomeFiltersExample() {
  const [taggedWith, setTaggedWith] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [queryValue, setQueryValue] = useState(null);

  const handleTaggedWithChange = useCallback(
    (value) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value) => setQueryValue(value),
    [],
  );
  const handleVendorChange = useCallback((value) => setVendor(value), []);

  const handleTaggedWithRemove = useCallback(() => setTaggedWith(null), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(null), []);
  const handleVendorRemove = useCallback(() => setVendor(null), []);

  const handleClearAll = useCallback(() => {
    handleTaggedWithRemove();
    handleQueryValueRemove();
    handleVendorRemove();
  }, [handleQueryValueRemove, handleTaggedWithRemove, handleVendorRemove]);

  const filters = [
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
      key: 'vendor',
      label: 'Vendor',
      filter: (
        <TextField
          label="Vendor"
          value={vendor}
          onChange={handleVendorChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
      disabled: true,
    },
  ];

  const appliedFilters = !isEmpty(taggedWith)
    ? [
        {
          key: 'taggedWith',
          label: disambiguateLabel('taggedWith', taggedWith),
          onRemove: handleTaggedWithRemove,
        },
      ]
    : [];

  return (
    <div style={{height: '568px'}}>
      <LegacyCard>
        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          filterControl={
            <Filters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleQueryValueChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
            >
              <div style={{paddingLeft: '8px'}}>
                <Button
                  disabled
                  onClick={() => console.log('New filter saved')}
                >
                  Save
                </Button>
              </div>
            </Filters>
          }
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
                <Text as="h3" variant="bodyMd" fontWeight="bold">
                  {name}
                </Text>
                <div>{location}</div>
              </ResourceList.Item>
            );
          }}
        />
      </LegacyCard>
    </div>
  );

  function disambiguateLabel(key, value) {
    switch (key) {
      case 'taggedWith':
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

export default withPolarisExample(DisableSomeFiltersExample);
