---
name: Data table
category: Lists and tables
keywords:
  - DataTable
  - data
  - table
  - tabular
  - index
---

# Data table

Data tables are used to organize and display all information from a data set. While a data visualization represents part of data set, a data table lets merchants view details from the entire set. This helps merchants compare and analyze the data.

---

## Examples

### Default data table

Use to present small amounts of data for merchants to view statically.

```jsx
class DataTableExample extends React.Component {
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
}
```

### Sortable data table

Use when clarity of the table’s content is needed. For example, to note the number of rows currently shown in a data table with pagination.

```jsx
class SortableDataTableExample extends React.Component {
  state = {
    sortedRows: null,
  };

  sortCurrency = (rows, index, direction) => {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index].substring(1));
      const amountB = parseFloat(rowB[index].substring(1));

      return direction === 'descending' ? amountB - amountA : amountA - amountB;
    });
  };

  handleSort = (rows) => (index, direction) => {
    this.setState({sortedRows: this.sortCurrency(rows, index, direction)});
  };

  render() {
    const {sortedRows} = this.state;
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
            onSort={this.handleSort(rows)}
          />
        </Card>
      </Page>
    );
  }
}
```

### Data table with footer

Use when clarity of the table’s content is needed. For example, to note the number of rows currently shown in a data table with pagination.

```jsx
class DataTableFooterExample extends React.Component {
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
            footerContent={`Showing ${rows.length} of ${rows.length} results`}
          />
        </Card>
      </Page>
    );
  }
}
```

### Data table with row heading links

Use to help merchants find relevant, finer grained data sets.

```jsx
class DataTableLinkExample extends React.Component {
  render() {
    const rows = [
      [
        <Link url="https://www.example.com">Emerald Silk Gown</Link>,
        '$875.00',
        124689,
        140,
        '$122,500.00',
      ],
      [
        <Link url="https://www.example.com">Mauve Cashmere Scarf</Link>,
        '$230.00',
        124533,
        83,
        '$19,090.00',
      ],
      [
        <Link url="https://www.example.com">
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
              'Quantity',
              'Net sales',
            ]}
            rows={rows}
            totals={['', '', '', 255, '$155,830.00']}
          />
        </Card>
      </Page>
    );
  }
}
```

---

## Best practices

Data tables should:

- Show values across multiple categories and measures.
- Allow for filtering and ordering when comparison is not a priority.
- Help merchants visualize and scan many values from an entire data set.
- Help merchants find other values in the data hierarchy through use of links.
- Minimize clutter by only including values that supports the data’s purpose.
- Include a summary row to surface the column totals.
- Not include calculations within the summary row.
- Wrap instead of truncate content. This is because if row titles start with the same word, they’ll all appear the same when truncated.
- Not to be used for an actionable list of items that link to details pages. For this functionality, use the [resource list] component.

### Alignment

Column content types are built into the component props so the following alignment rules are followed:

- Numerical = Right aligned
- Textual data = Left aligned
- Align headers with their related data
- Don’t center align

---

## Content guidelines

Headers should:

- Be informative and descriptive
- Concise and scannable
- Include units of measurement symbols so they aren’t repeated throughout the columns
- Use sentence case (first word capitalized, rest lowercase)

<!-- usagelist -->

#### Do

Temperature °C

#### Don’t

Temperature

<!-- end -->

Column content should:

- Be concise and scannable
- Not include units of measurement symbols (put those symbols in the headers)
- Use sentence case (first word capitalized, rest lowercase)

### Decimals

Keep decimals consistent. For example, don’t use 3 decimals in one row and 2 in others.

---

## Related components

- To create an actionable list of related items that link to details pages, such as a list of customers, use the [resource list component](/components/lists-and-tables/resource-list).
