import { AppProvider, Card,ResourceList,ResourceItem,TextStyle } from "@shopify/polaris";
import { useState } from "react";
import translations from '@shopify/polaris/locales/en.json';
function ResourceItemExample() {
  const [selectedItems, setSelectedItems] = useState([]);

  return (
    <Card>
      <ResourceList
        resourceName={{singular: 'blog post', plural: 'blog posts'}}
        items={[
          {
            id: 6,
            url: 'posts/6',
            title: 'How To Get Value From Wireframes',
            author: 'Jonathan Mangrove',
          },
        ]}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
        renderItem={(item) => {
          const {id, url, title, author} = item;
          const authorMarkup = author ? <div>by {author}</div> : null;
          return (
            <ResourceItem
              id={id}
              url={url}
              accessibilityLabel={`View details for ${title}`}
              name={title}
            >
              <h3>
                <TextStyle variation="strong">{title}</TextStyle>
              </h3>
              {authorMarkup}
            </ResourceItem>
          );
        }}
      />
    </Card>
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
        <ResourceItemExample />
      </div>
    </AppProvider>
  );
}

export default Example;
    