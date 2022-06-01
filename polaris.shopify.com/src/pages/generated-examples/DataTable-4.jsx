import { AppProvider, Page, Card, DataTable } from "@shopify/polaris";
import translations from "@shopify/polaris/locales/en.json";
function DataTableExample() {
  const rows = [
    ["Emerald Silk Gown", "$875.00", 124689, 140, "$122,500.00"],
    ["Mauve Cashmere Scarf", "$230.00", 124533, 83, "$19,090.00"],
    [
      "Navy Merino Wool Blazer with khaki chinos and yellow belt",
      "$445.00",
      124518,
      32,
      "$14,240.00",
    ],
  ];

  return (
    <Page title="Sales by product">
      <Card>
        <DataTable
          showTotalsInFooter
          columnContentTypes={[
            "text",
            "numeric",
            "numeric",
            "numeric",
            "numeric",
          ]}
          headings={[
            "Product",
            "Price",
            "SKU Number",
            "Net quantity",
            "Net sales",
          ]}
          rows={rows}
          totals={["", "", "", "", "$155,830.00"]}
          totalsName={{
            singular: "Total net sales",
            plural: "Total net sales",
          }}
        />
      </Card>
    </Page>
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
        <DataTableExample />
      </div>
    </AppProvider>
  );
}

export default Example;
