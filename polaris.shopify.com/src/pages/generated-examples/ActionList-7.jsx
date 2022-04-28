import { AppProvider, ActionList,Thumbnail,Icon,Avatar } from "@shopify/polaris";
import { ChevronRightMinor } from "@shopify/polaris-icons";
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
      <link
        rel="stylesheet"
        href="https://unpkg.com/@shopify/polaris@latest/build/esm/styles.css"
      />
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <ActionListWithPrefixSuffixExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    