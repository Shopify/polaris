import {
  Filters,
  EmptyState,
  Page,
  Layout,
  Card,
  ResourceList,
} from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ResourceListWithEmptyStateExample() {
  const items = [];
  const appliedFilters = [];
  const filters = [];

  const filterControl = (
    <Filters
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
        action={{ content: "Upload files" }}
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
          <Card>
            <ResourceList
              emptyState={emptyStateMarkup}
              items={items}
              renderItem={() => {}}
              filterControl={filterControl}
              resourceName={{ singular: "file", plural: "files" }}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export default withPolarisExample(ResourceListWithEmptyStateExample);
