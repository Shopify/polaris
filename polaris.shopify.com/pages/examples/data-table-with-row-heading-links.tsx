import {Link, Page, LegacyCard, DataTable} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DataTableLinkExample() {
  const rows = [
    [
      <Link
        href="https://www.example.com"
        key="emerald-silk-gown"
      >
        Emerald Silk Gown
      </Link>,
      '$875.00',
      124689,
      140,
      '$122,500.00',
    ],
    [
      <Link
        href="https://www.example.com"
        key="mauve-cashmere-scarf"
      >
        Mauve Cashmere Scarf
      </Link>,
      '$230.00',
      124533,
      83,
      '$19,090.00',
    ],
    [
      <Link
        href="https://www.example.com"
        key="navy-merino-wool"
      >
        Navy Merino Wool Blazer with khaki chinos and yellow belt
      </Link>,
      '$445.00',
      124518,
      32,
      '$14,240.00',
    ],
  ];

  return (
    <Page title="Sales by product">
      <LegacyCard>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={['Product', 'Price', 'SKU Number', 'Quantity', 'Net sales']}
          rows={rows}
          totals={['', '', '', 255, '$155,830.00']}
        />
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(DataTableLinkExample);
