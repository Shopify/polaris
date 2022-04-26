import { AppProvider, DescriptionList } from "@shopify/polaris";

import translations from '@shopify/polaris/locales/en.json';

function Example() {
  return (
    <AppProvider i18n={translations}>
      <div
        style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 50px",
  }}
      >
        <DescriptionList
  items={[
    {
      term: 'Logistics',
      description:
        'The management of products or other resources as they travel between a point of origin and a destination.',
    },
    {
      term: 'Sole proprietorship',
      description:
        'A business structure where a single individual both owns and runs the company.',
    },
    {
      term: 'Discount code',
      description:
        'A series of numbers and/or letters that an online shopper may enter at checkout to get a discount or special offer.',
    },
  ]}
/>
      </div>
    </AppProvider>
  );
}

export default Example;
