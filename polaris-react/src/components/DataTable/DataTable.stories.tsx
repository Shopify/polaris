import React, {useCallback, useState} from 'react';
import type {Meta} from '@storybook/react';
import {LegacyCard, DataTable, Link, Page} from '@shopify/polaris';

export default {
  component: DataTable,
} as Meta<typeof DataTable>;

function sortCurrency(rows, index, direction) {
  return [...rows].sort((rowA, rowB) => {
    const amountA = parseFloat(rowA[index].substring(1));
    const amountB = parseFloat(rowB[index].substring(1));

    return direction === 'descending' ? amountB - amountA : amountA - amountB;
  });
}

export const Default = {
  render() {
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
        <LegacyCard>
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
        </LegacyCard>
      </Page>
    );
  },
};

export const Sortable = {
  render() {
    const [sortedRows, setSortedRows] = useState<any[]>();

    const initiallySortedRows = [
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
    const rows = sortedRows ? sortedRows : initiallySortedRows;

    const handleSort = useCallback(
      (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
      [rows],
    );

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
            headings={[
              'Product',
              'Price',
              'SKU Number',
              'Net quantity',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', 255, '$155,830.00']}
            sortable={[false, true, false, false, true]}
            defaultSortDirection="descending"
            initialSortColumnIndex={4}
            onSort={handleSort}
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithFooter = {
  render() {
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
        <LegacyCard>
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
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithCustomTotalsHeading = {
  render() {
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
        <LegacyCard>
          <DataTable
            showTotalsInFooter
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
            totals={['', '', '', '', '$155,830.00']}
            totalsName={{
              singular: 'Total net sales',
              plural: 'Total net sales',
            }}
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithTotalsInFooter = {
  render() {
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
        <LegacyCard>
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
            showTotalsInFooter
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithRowHeadingLinks = {
  render() {
    const rows = [
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
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
            headings={[
              'Product',
              'Price',
              'SKU Number',
              'Quantity',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', 255, '$155,830.00']}
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithAllOfItsElements = {
  render() {
    const [sortedRows, setSortedRows] = useState<any[]>();

    const initiallySortedRows = [
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
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

    const rows = sortedRows ? sortedRows : initiallySortedRows;
    const handleSort = useCallback(
      (index, direction) => setSortedRows(sortCurrency(rows, index, direction)),
      [rows],
    );

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
            headings={[
              'Product',
              'Price',
              'SKU Number',
              'Net quantity',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', 255, '$155,830.00']}
            sortable={[false, true, false, false, true]}
            defaultSortDirection="descending"
            initialSortColumnIndex={4}
            onSort={handleSort}
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
            stickyHeader
            fixedFirstColumns={1}
            truncate
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithColumnSpanning = {
  render() {
    const rows = [
      [
        'Sep 19, 2010, 1:02 pm NDT',
        '#1234',
        'Adjustment',
        '$1.00',
        '$1.00',
        '$1.00',
        '$1.00',
        '$1.00',
      ],
      // eslint-disable-next-line react/jsx-key
      [<LegacyCard>Hello</LegacyCard>],
      [
        'Sep 19, 2010, 1:02 pm NDT',
        '#1234',
        'Adjustment',
        '$1.00',
        '$1.00',
        '$1.00',
        '$1.00',
        '$1.00',
      ],
    ];

    return (
      <Page title="Payouts">
        <LegacyCard>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
            ]}
            headings={[
              'transactionDate',
              'reference',
              'type',
              'amount',
              'fee',
              'net',
              'gross',
              'number',
            ]}
            rows={rows}
            verticalAlign="middle"
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithFixedColumns = {
  parameters: {
    a11y: {
      config: {
        rules: [{id: 'empty-table-header', enabled: false}],
      },
    },
  },
  render() {
    const rows = [
      [
        'Emerald Silk Gown',
        'Formalwear',
        "Jill's formal",
        10,
        '$875.00',
        124689,
        140,
        '$426.00',
        '$122,500.00',
      ],
      [
        'Mauve Cashmere Scarf',
        'Accessories',
        "Jack's Accessories",
        253,
        '$230.00',
        124533,
        83,
        '$620.00',
        '$19,090.00',
      ],
      [
        'Navy Merino Wool Blazer with khaki chinos and yellow belt',
        'Ensembles',
        'Avocado Fashions',
        23,
        '$445.00',
        124518,
        32,
        '$353.00',
        '$14,240.00',
      ],
      [
        'Socks',
        'Essentials',
        'Avocado Fashions',
        465,
        '$4.00',
        124518,
        32,
        '$3.00',
        '$140.00',
      ],
    ];

    return (
      <Page title="Sales by product">
        <LegacyCard>
          <DataTable
            columnContentTypes={[
              'text',
              'text',
              'text',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
              'numeric',
            ]}
            headings={[
              'Product',
              'Category',
              'Vendor',
              'Orders',
              'Price',
              'SKU Number',
              'Net quantity',
              'Shipping',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', '', '', '', 255, '$1399', '$155,830.00']}
            initialSortColumnIndex={4}
            stickyHeader
            fixedFirstColumns={3}
            truncate
            showTotalsInFooter
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithIncreasedDensityAndZebraStriping = {
  render() {
    const rows = [
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
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
            headings={[
              'Product',
              'Price',
              'SKU Number',
              'Net quantity',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', 255, '$155,830.00']}
            defaultSortDirection="descending"
            initialSortColumnIndex={4}
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
            hasZebraStripingOnData
            increasedTableDensity
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithStickyHeaderEnabled = {
  render() {
    const rows = [
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
          key="navy-merino-wool"
        >
          Navy Merino Wool Blazer with khaki chinos and yellow belt
        </Link>,
        '$445.00',
        124518,
        32,
        '$14,240.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
          key="navy-merino-wool"
        >
          Navy Merino Wool Blazer with khaki chinos and yellow belt
        </Link>,
        '$445.00',
        124518,
        32,
        '$14,240.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
          key="navy-merino-wool"
        >
          Navy Merino Wool Blazer with khaki chinos and yellow belt
        </Link>,
        '$445.00',
        124518,
        32,
        '$14,240.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
          key="navy-merino-wool"
        >
          Navy Merino Wool Blazer with khaki chinos and yellow belt
        </Link>,
        '$445.00',
        124518,
        32,
        '$14,240.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
          key="navy-merino-wool"
        >
          Navy Merino Wool Blazer with khaki chinos and yellow belt
        </Link>,
        '$445.00',
        124518,
        32,
        '$14,240.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
          key="emerald-silk-gown"
        >
          Emerald Silk Gown
        </Link>,
        '$875.00',
        124689,
        140,
        '$121,500.00',
      ],
      [
        <Link
          removeUnderline
          url="https://www.example.com"
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
          removeUnderline
          url="https://www.example.com"
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
            headings={[
              'Product',
              'Price',
              'SKU Number',
              'Net quantity',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', 255, '$155,830.00']}
            defaultSortDirection="descending"
            initialSortColumnIndex={4}
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
            hasZebraStripingOnData
            increasedTableDensity
            stickyHeader
          />
        </LegacyCard>
      </Page>
    );
  },
};

export const WithPagination = {
  render() {
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
        <LegacyCard>
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
            pagination={{
              hasNext: true,
              onNext: () => {},
            }}
          />
        </LegacyCard>
      </Page>
    );
  },
};
