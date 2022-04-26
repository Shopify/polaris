import { AppProvider, MediaCard } from "@shopify/polaris";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';


function Example() {
  return (
    <AppProvider i18n={translations}>
      <MediaCard
  title="Getting Started"
  description="Discover how Shopify can power up your entrepreneurial journey."
  popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
>
  <img
    alt=""
    width="100%"
    height="100%"
    style={{objectFit: 'cover', objectPosition: 'center'}}
    src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
  />
</MediaCard>
    </AppProvider>
  );
}

export default Example;
    