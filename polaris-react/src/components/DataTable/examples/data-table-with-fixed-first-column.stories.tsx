function DataTableFixedFirstColumnExample() {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
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
          truncate
        />
      </Card>
    </Page>
  );

  function sortRows(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      let type;
      if (rowA[index].length > 1) {
        if (!isNaN(parseFloat(rowA[index]))) {
          type = 'number';
        } else if (!isNaN(parseFloat(rowA[index].substring(1)))) {
          type = 'currency';
        } else type = 'string';
      } else {
        type = !isNaN(parseFloat(rowA[index])) ? 'number' : 'string';
      }

      let itemA;
      let itemB;
      if (type === 'number') {
        itemA = parseInt(rowA[index], 10);
      } else if (type === 'currency') {
        itemA = parseFloat(rowA[index].substring(1));
      } else {
        itemA = rowA[index];
      }
      if (type === 'number') {
        itemB = parseInt(rowB[index], 10);
      } else if (type === 'currency') {
        itemB = parseFloat(rowA[index].substring(1));
      } else {
        itemB = rowA[index];
      }
      if (type === 'string') {
        let result;

        if (itemA > itemB) result = 1;
        else if (itemB > itemA) result = -1;
        else result = 0;
        return direction === 'descending' ? result * -1 : result;
      }

      return direction === 'descending' ? itemB - itemA : itemA - itemB;
    });
  }
}