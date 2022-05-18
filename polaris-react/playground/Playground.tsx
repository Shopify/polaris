import React, {useCallback, useState} from 'react';

import {Card, DataTable, Page} from '../src';

export function Playground() {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
    [
      'May21-May-27 2012',
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
      "Jack's Accessories and Wonderful clothes",
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
      'Category',
      'Avocado Fashions',
      465,
      '$4.00',
      124518,
      32,
      '$3.00',
      '$140.00',
    ],
    [
      'May21-May-27 2012',
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
      "Jack's Accessories and Wonderful clothes",
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
    [
      'May21-May-27 2012',
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
      "Jack's Accessories and Wonderful clothes",
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
    [
      'May21-May-27 2012',
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
      "Jack's Accessories and Wonderful clothes",
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
    [
      'May21-May-27 2012',
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
      "Jack's Accessories and Wonderful clothes",
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
      'Category',
      'Avocado Fashions',
      465,
      '$4.00',
      124518,
      32,
      '$3.00',
      '$140.00',
    ],
    [
      'May21-May-27 2012',
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
      "Jack's Accessories and Wonderful clothes",
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
  const rows = sortedRows ? sortedRows : initiallySortedRows;

  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortRows(rows, index, direction)),
    [rows],
  );

  return (
    <Page title="Sales by product">
      <Card>
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
          sortable={[true, true, true, true, true, true, true, true, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={4}
          onSort={handleSort}
          hasFixedFirstColumn
          // truncate
          stickyHeader
          firstColumnMinWidth="249.6px"
        />
      </Card>
    </Page>
  );

  function sortRows(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      let type;
      if (rowA[index].length > 1) {
        type = !isNaN(parseFloat(rowA[index]))
          ? 'number'
          : !isNaN(parseFloat(rowA[index].substring(1)))
          ? 'currency'
          : 'string';
      } else {
        type = !isNaN(parseFloat(rowA[index])) ? 'number' : 'string';
      }

      const itemA =
        type === 'number'
          ? parseInt(rowA[index])
          : type === 'currency'
          ? parseFloat(rowA[index].substring(1))
          : rowA[index];
      const itemB =
        type === 'number'
          ? parseInt(rowB[index])
          : type === 'currency'
          ? parseFloat(rowB[index].substring(1))
          : rowB[index];

      if (type === 'string') {
        const result = itemA > itemB ? 1 : itemB > itemA ? -1 : 0;
        return direction === 'descending' ? result * -1 : result;
      }

      return direction === 'descending' ? itemB - itemA : itemA - itemB;
    });
  }
}
