import {
  Card,
  ResourceList,
  Avatar,
  ResourceItem,
  TextStyle,
} from "@shopify/polaris";
import { useState } from "react";
import { withPolarisExample } from "../../components/PolarisExamplePage";

function ResourceListWithLoadingExample() {
  const [selectedItems, setSelectedItems] = useState([]);

  const resourceName = {
    singular: "customer",
    plural: "customers",
  };

  const items = [
    {
      id: 104,
      url: "customers/341",
      name: "Mae Jemison",
      location: "Decatur, USA",
    },
    {
      id: 204,
      url: "customers/256",
      name: "Ellen Ochoa",
      location: "Los Angeles, USA",
    },
  ];

  const promotedBulkActions = [
    {
      content: "Edit customers",
      onAction: () => console.log("Todo: implement bulk edit"),
    },
  ];

  const bulkActions = [
    {
      content: "Add tags",
      onAction: () => console.log("Todo: implement bulk add tags"),
    },
    {
      content: "Remove tags",
      onAction: () => console.log("Todo: implement bulk remove tags"),
    },
    {
      content: "Delete customers",
      onAction: () => console.log("Todo: implement bulk delete"),
    },
  ];

  return (
    <Card>
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
    const { id, url, name, location } = item;
    const media = <Avatar customer size="medium" name={name} />;

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${name}`}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{location}</div>
      </ResourceItem>
    );
  }
}

export default withPolarisExample(ResourceListWithLoadingExample);
