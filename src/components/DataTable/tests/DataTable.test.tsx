import * as React from 'react';
import {mount} from 'enzyme';

import {findByTestID} from '../../../../tests/utilities/enzyme';
import DataTable, {Props, ColumnContentType} from '../DataTable';
import Cell from '../Cell';

interface DataTableTestProps {
  sortable?: Props['sortable'],
  defaultSortDirection?: Props['defaultSortDirection'],
  initialSortColumnIndex?: Props['initialSortColumnIndex'],
  onSort?: Props['onSort'],
}

const sortable = [false, true, false, false, true, false];
const columnContentTypes: ColumnContentType[] = ['text', 'numeric', 'numeric', 'numeric', 'numeric'];
const spyOnSort = jest.fn();

function setup(propOverrides?: DataTableTestProps) {
  const headings = ['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal'];
  const rows = [
    ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$875.00', 124518, 83, '$122,500.00'],
    ['Emerald Silk Gown', '$230.00', 124689, 32, '$19,090.00'],
    ['Mauve Cashmere Scarf', '$445.00', 124533, 140, '$14,240.00'],
  ];
  const summary = ['', '', '', 255, '$155,830.00'];

  const props = {
    columnContentTypes,
    headings,
    rows,
    summary,
    ...propOverrides,
  };
  const dataTable = mount(<DataTable {...props} />);

  return {
    ...props,
    dataTable,
    twoClicks: true,
  };
}

describe('<DataTable />', () => {

  it('renders all table body rows', () => {
    const {dataTable} = setup();

    expect(dataTable.find('tbody tr').length).toEqual(3);
  });

  it('defaults to non-sorting column headings', () => {
    const {dataTable} = setup();
    const sortableHeadings = dataTable.find(Cell).filter({sortable: true});

    expect(sortableHeadings.length).toEqual(0);
  });

  it('initial sort column defaults to first column if not specified', () => {
    const firstColumnSortable = [true, true, false, false, true, false];
    const {dataTable} = setup({sortable: firstColumnSortable, onSort: spyOnSort});
    const firstHeadingCell = findByTestID(dataTable, `heading-cell-${0}`);

    expect(firstHeadingCell.props().sorted).toBe(true);
  });

  it('sets specified initial sort column', () => {
    const {dataTable} = setup({
      sortable,
      onSort: spyOnSort,
      initialSortColumnIndex: 4,
    });
    const fifthHeadingCell = findByTestID(dataTable, `heading-cell-${5}`);

    expect(fifthHeadingCell.props().sorted).toBe(true);
  });

});
