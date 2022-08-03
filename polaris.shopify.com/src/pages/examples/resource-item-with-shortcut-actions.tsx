import {
  Card,
  ResourceList,
  ResourceItem,
  Avatar,
  TextStyle,
} from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExample";

function ResourceItemExample() {
  return (
    <Card>
      <ResourceList
        resourceName={{ singular: "customer", plural: "customers" }}
        items={[
          {
            id: 145,
            url: "customers/145",
            avatarSource:
              "https://burst.shopifycdn.com/photos/freelance-designer-working-on-laptop.jpg?width=746",
            name: "Yi So-Yeon",
            location: "Gwangju, South Korea",
            latestOrderUrl: "orders/1456",
          },
        ]}
        renderItem={(item) => {
          const { id, url, avatarSource, name, location, latestOrderUrl } =
            item;
          const shortcutActions = latestOrderUrl
            ? [{ content: "View latest order", url: latestOrderUrl }]
            : null;

          return (
            <ResourceItem
              id={id}
              url={url}
              media={
                <Avatar
                  customer
                  size="medium"
                  name={name}
                  source={avatarSource}
                />
              }
              shortcutActions={shortcutActions}
              accessibilityLabel={`View details for ${name}`}
              name={name}
            >
              <h3>
                <TextStyle variation="strong">{name}</TextStyle>
              </h3>
              <div>{location}</div>
            </ResourceItem>
          );
        }}
      />
    </Card>
  );
}

export default withPolarisExample(ResourceItemExample);
