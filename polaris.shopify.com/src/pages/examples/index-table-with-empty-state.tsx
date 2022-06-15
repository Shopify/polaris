import {
  EmptySearchResult,
  IndexTable,
  TextStyle,
  Card,
  useIndexResourceState,
} from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function IndexTableWithCustomEmptyStateExample() {
  const customers = [];
  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(customers);

  const emptyStateMarkup = (
    <EmptySearchResult
      title={"No customers yet"}
      description={"Try changing the filters or search term"}
      withIllustration
    />
  );

  const rowMarkup = customers.map(
    ({ id, name, location, orders, amountSpent }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle>
        </IndexTable.Cell>
        <IndexTable.Cell>{location}</IndexTable.Cell>
        <IndexTable.Cell>{orders}</IndexTable.Cell>
        <IndexTable.Cell>{amountSpent}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card>
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        emptyState={emptyStateMarkup}
        headings={[
          { title: "Name" },
          { title: "Location" },
          { title: "Order count" },
          { title: "Amount spent" },
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
}

export default withPolarisExample(IndexTableWithCustomEmptyStateExample);
