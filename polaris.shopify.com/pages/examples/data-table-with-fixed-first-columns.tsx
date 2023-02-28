import {Link, Page, LegacyCard, DataTable, useBreakpoints} from '@shopify/polaris';
import {useState} from 'react';
import {withPolarisExample} from '../../src/components/PolarisExampleWrapper';

function DataTableWithFixedFirstColumnsExample() {
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
      '$14,250.00',
      '$12,240.00',
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
      '$12,240.00',
      '$11,270.00',
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
      '$10,241.00',
      '$10,201.00',
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
      '$14,240.00',
      '$14,200.10',
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
      '$14,300.30',
      '$17,200.00',
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
      '$18,770.07',
      '$15,545.00',
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
      '$14,240.00',
      '$14,240.00',
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
      '$19,290.00',
      '$12,997.00',
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
      '$11,211.20',
      '$11,343.50',
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
      '$12,430.00',
      '$17,420.00',
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
      '$14,790.00',
      '$12,370.00',
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
      '$16,241.00',
      '$18,211.00',
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
      '$15,111.00',
      '$11,221.00',
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
      '$17,880.00',
      '$11,280.00',
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
      '$11,111.00',
      '$17,211.00',
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
      '$14,240.00',
      '$17,840.00',
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
      '$13,238.00',
      '$14,288.00',
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
      '$14,988.00',
      '$14,902.10',
    ],
  ];
  const [sortedRows, setSortedRows] = useState(rows);
  const {lgDown} = useBreakpoints();
  const fixedFirstColumns = lgDown ? 2 : 0;

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
            'numeric',
            'numeric',
          ]}
          headings={[
            'Product',
            'Price',
            'SKU Number',
            'Net quantity',
            'Net sales',
            'Gross sales',
            'Discounts',
          ]}
          rows={sortedRows}
          totals={['', '', '', 255, '$155,830.00', '', '']}
          sortable={[false, true, false, false, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          onSort={(index, direction) => {
            setSortedRows(
              [...rows].sort((rowA, rowB) => {
                const amountA = rowA[index]?.props?.children
                  ? rowA[index]?.props?.children
                  : parseFloat(rowA[index].substring(1));
                const amountB = rowB[index]?.props?.children
                  ? rowB[index]?.props?.children
                  : parseFloat(rowB[index].substring(1));

                return (
                  direction === 'descending'
                    ? amountA > amountB
                    : amountB > amountA
                )
                  ? 1
                  : -1;
              }),
            );
          }}
          footerContent={`Showing ${sortedRows.length} of ${sortedRows.length} results`}
          stickyHeader
          fixedFirstColumns={fixedFirstColumns}
        />
      </LegacyCard>
    </Page>
  );
}

export default withPolarisExample(DataTableWithFixedFirstColumnsExample);
