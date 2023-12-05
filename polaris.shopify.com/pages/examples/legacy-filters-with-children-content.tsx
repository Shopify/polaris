import {
  TextField,
  LegacyCard,
  ResourceList,
  LegacyFilters,
  Button,
  Avatar,
  Text,
} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function FiltersExample() {
  const [taggedWith, setTaggedWith] = useState<string | undefined>(undefined);
  const [queryValue, setQueryValue] = useState<string | undefined>(undefined);

  const handleTaggedWithChange = useCallback(
    (value: string) => setTaggedWith(value),
    [],
  );
  const handleQueryValueChange = useCallback(
    (value: string) => setQueryValue(value),
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
  ];

  const appliedFilters =
    taggedWith && !isEmpty(taggedWith)
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
            <LegacyFilters
              queryValue={queryValue}
              filters={filters}
              appliedFilters={appliedFilters}
              onQueryChange={handleQueryValueChange}
              onQueryClear={handleQueryValueRemove}
              onClearAll={handleClearAll}
            >
              <div style={{paddingLeft: '8px'}}>
                <Button onClick={() => console.log('New filter saved')}>
                  Save
                </Button>
              </div>
            </LegacyFilters>
          }
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
            const media = <Avatar customer size="md" name={name} />;

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

  function disambiguateLabel(key: string, value: string): string {
    switch (key) {
      case 'taggedWith':
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

export default withPolarisExample(FiltersExample);
