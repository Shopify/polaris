import { AppProvider, ActionList, Thumbnail, Icon, Avatar } from "@shopify/polaris";
import { ChevronRightMinor } from "@shopify/polaris-icons";
import React from "react";
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';

function ActionListWithPrefixSuffixExample() {
  return (
    <div style={{height: '250px', maxWidth: '350px'}}>
      <ActionList
        actionRole="menuitem"
        items={[
          {
            content: 'Go here',
            prefix: (
              <Thumbnail
                source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                size="small"
                alt="Black leather pet collar"
              />
            ),
            suffix: <Icon source={ChevronRightMinor} />,
          },
          {
            content: 'Or there',
            prefix: <Avatar customer name="Farrah" size="small" />,
            suffix: <Icon source={ChevronRightMinor} />,
          },
        ]}
      />
    </div>
  );
}

function Example() {
  return (
    <AppProvider i18n={translations}>
      <ActionListWithPrefixSuffixExample />
    </AppProvider>
  );
}

export default Example;
    