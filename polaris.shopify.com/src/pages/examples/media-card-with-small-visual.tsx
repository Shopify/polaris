import { MediaCard } from "@shopify/polaris";
import React from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function MediaCardExample() {
  return (
    <MediaCard
      title="Getting Started"
      primaryAction={{
        content: "Learn about getting started",
        onAction: () => {},
      }}
      description="Discover how Shopify can power up your entrepreneurial journey."
      popoverActions={[{ content: "Dismiss", onAction: () => {} }]}
      size="small"
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
      />
    </MediaCard>
  );
}

export default withPolarisExample(MediaCardExample);
