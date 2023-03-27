import {
  LegacyFilters,
  EmptyState,
  Page,
  Layout,
  LegacyCard,
  ResourceList,
} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function ResourceListWithEmptyStateExample() {
  const items: any[] = [];
  const appliedFilters: any[] = [];
  const filters: any[] = [];

  const filterControl = (
    <LegacyFilters
      disabled={!items.length}
      queryValue=""
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={() => undefined}
      onQueryChange={() => undefined}
      onQueryClear={() => undefined}
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
          <LegacyCard>
            <ResourceList
              emptyState={emptyStateMarkup}
              items={items}
              renderItem={() => <></>}
              filterControl={filterControl}
              resourceName={{singular: 'file', plural: 'files'}}
            />
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default withPolarisExample(ResourceListWithEmptyStateExample);
