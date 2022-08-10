import {Page, Card, DataTable} from '@shopify/polaris';
import React from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

// we don't need this linting rule here as DataTable has specific UI that
// appears as soon as a container becomes scrollable.
// eslint-disable jsx-a11y/scrollable-region-focusable

function DataTableExample() {
  const rows = [
    ['Emerald Silk Gown', '$875.00', 124689, 140, '$122,500.00'],
    ['Mauve Cashmere Scarf', '$230.00', 124533, 83, '$19,090.00'],
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$445.00',
      124518,
      32,
      '$14,240.00',
    ],
  ];

  return (
    <Page title="Sales by product">
      <Card>
        <DataTable
          columnContentTypes={[
            'text',
            'numeric',
            'numeric',
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
          ]}
          rows={rows}
          totals={['', '', '', 255, '$155,830.00']}
        />
      </Card>
    </Page>
  );
}

export default withPolarisExample(DataTableExample);
