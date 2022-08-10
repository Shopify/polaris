import {Link, Page, Card, DataTable} from '@shopify/polaris';
import {useState, useCallback} from 'react';
import {withPolarisExample} from '../../components/PolarisExampleWrapper';

function FullDataTableExample() {
  const [sortedRows, setSortedRows] = useState(null);

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
          sortable={[false, true, false, false, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          onSort={handleSort}
          footerContent={`Showing ${rows.length} of ${rows.length} results`}
        />
      </Card>
    </Page>
  );

  function sortCurrency(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index].substring(1));
      const amountB = parseFloat(rowB[index].substring(1));

      return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
  }
}

export default withPolarisExample(FullDataTableExample);
