import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';

import {findByTestID, trigger} from '../../../../tests/utilities/enzyme';
import DataTable, {ColumnContentType, State} from '../DataTable';
import Cell from '../Cell';

function sortThenGetState(table: ReactWrapper, headingCellIndex: number, clickTwice?: boolean) {
  let headingCell = findByTestID(table, `heading-cell-${headingCellIndex}`);
  trigger(headingCell, 'onSort');

  if (clickTwice) {
    table.update();
    headingCell = findByTestID(table, `heading-cell-${headingCellIndex}`);
    trigger(headingCell, 'onSort');
  }

  return table.state() as State;
}

function setup(propOverrides?: object) {
  const columnContentTypes: ColumnContentType[] = ['text', 'currency', 'numeric', 'numeric', 'currency', 'date'];
  const headings = ['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal', 'Date'];

  const rows = [
    ['Navy Merino Wool Blazer with khaki chinos and yellow belt', '$875.00', 124518, 83, '$122,500.00', 'Jan 12 2018'],
    ['Emerald Silk Gown', '$230.00', 124689, 32, '$19,090.00', 'Jan 1 2018'],
    ['Mauve Cashmere Scarf', '$445.00', 124533, 140, '$14,240.00', 'Jan 6 2018'],
  ];
  const summary = ['', '', '', 255, '$155,830.00', ''];

  const props = {
    columnContentTypes,
    headings,
    rows,
    summary,
    ...propOverrides,
  };
  const dataTable = mount(<DataTable {...props} />);

  return {
    props,
    dataTable,
    twoClicks: true,
  };
}

const sortable = [false, true, false, false, true, false];
const spyOnSort = jest.fn();

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

  it('calls onSort callback if present', () => {
    const {dataTable} = setup({sortable, onSort: spyOnSort});
    const headingIndex = 6;
    const {sorted} = sortThenGetState(dataTable, headingIndex);

    expect(spyOnSort).toHaveBeenCalled();
    expect(sorted).toEqual(true);
  });

  it('sorts in ascending order on first click by default', () => {
    const {dataTable} = setup({sortable, onSort: spyOnSort});
    const headingIndex = 0;
    const {sortDirection} = sortThenGetState(dataTable, headingIndex);

    expect(sortDirection).toEqual('ascending');
  });

  it('sorts in descending order on second click', () => {
    const {dataTable, twoClicks} = setup({sortable, onSort: spyOnSort});
    const headingIndex = 0;
    const {sortDirection} = sortThenGetState(dataTable, headingIndex, twoClicks);

    expect(sortDirection).toEqual('descending');
  });

  it('sets a specified default sort direction', () => {
    const {dataTable} = setup({sortable, onSort: spyOnSort, defaultSortDirection: 'descending'});
    const headingIndex = 0;
    const {sortDirection} = sortThenGetState(dataTable, headingIndex);

    expect(sortDirection).toEqual('descending');
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
