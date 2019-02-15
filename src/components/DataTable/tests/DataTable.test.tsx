import * as React from 'react';
import {mountWithAppProvider, findByTestID} from 'test-utilities';
import {isEdgeVisible, getPrevAndCurrentColumns} from '../utilities';
import {Cell, Navigation} from '../components';
import DataTable, {CombinedProps as Props} from '../DataTable';

interface DataTableTestProps {
  sortable?: Props['sortable'];
  defaultSortDirection?: Props['defaultSortDirection'];
  initialSortColumnIndex?: Props['initialSortColumnIndex'];
  onSort?: Props['onSort'];
}

const sortable = [false, true, false, false, true, false];
const columnContentTypes: Props['columnContentTypes'] = [
  'text',
  'numeric',
  'numeric',
  'numeric',
  'numeric',
];
const spyOnSort = jest.fn();

function setup(propOverrides?: DataTableTestProps) {
  const headings = ['Product', 'Price', 'Order Number', 'Quantity', 'Subtotal'];
  const rows = [
    [
      'Navy Merino Wool Blazer with khaki chinos and yellow belt',
      '$875.00',
      124518,
      83,
      '$122,500.00',
    ],
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
  const dataTable = mountWithAppProvider(<DataTable {...props} />);

  return {
    ...props,
    dataTable,
    twoClicks: true,
  };
}

describe('<DataTable />', () => {
  it('renders a table, thead and table body rows', () => {
    const {dataTable} = setup();

    expect(dataTable.find('table')).toHaveLength(1);
    expect(dataTable.find('thead')).toHaveLength(1);
    expect(dataTable.find('thead th')).toHaveLength(5);
    expect(dataTable.find('tbody tr')).toHaveLength(3);
  });

  it('defaults to non-sorting column headings', () => {
    const {dataTable} = setup();
    const sortableHeadings = dataTable.find(Cell).filter({sortable: true});

    expect(sortableHeadings).toHaveLength(0);
  });

  it('initial sort column defaults to first column if not specified', () => {
    const firstColumnSortable = [true, true, false, false, true, false];
    const {dataTable} = setup({
      sortable: firstColumnSortable,
      onSort: spyOnSort,
    });
    const firstHeadingCell = findByTestID(dataTable, `heading-cell-${0}`);

    expect(firstHeadingCell.props().sorted).toBe(true);
  });

  it('sets specified initial sort column', () => {
    const {dataTable} = setup({
      sortable,
      onSort: spyOnSort,
      initialSortColumnIndex: 4,
    });
    const fifthHeadingCell = findByTestID(dataTable, `heading-cell-${4}`);

    expect(fifthHeadingCell.props().sorted).toBe(true);
  });

  describe('<Cell />', () => {
    const {dataTable} = setup();
    it('passes props', () => {
      expect(
        dataTable
          .find(Cell)
          .first()
          .prop('header'),
      ).toBe(true);
      expect(
        dataTable
          .find(Cell)
          .first()
          .prop('content'),
      ).toEqual('Product');
      expect(
        dataTable
          .find(Cell)
          .first()
          .prop('contentType'),
      ).toEqual('text');
    });
  });

  describe('<Navigation />', () => {
    const {dataTable} = setup();
    it('passes scroll props', () => {
      expect(
        dataTable
          .find(Navigation)
          .first()
          .prop('isScrolledFarthestLeft'),
      ).toBe(true);
      expect(
        dataTable
          .find(Navigation)
          .first()
          .prop('isScrolledFarthestRight'),
      ).toBe(false);
    });
  });

  describe('isEdgeVisible()', () => {
    it('returns true if there is enough room', () => {
      const position = 175;
      const tableStart = 145;
      const tableEnd = 205;

      const isVisible = isEdgeVisible(position, tableStart, tableEnd);

      expect(isVisible).toBe(true);
    });

    it('returns false if there is not enough room', () => {
      const position = 175;
      const tableStart = 145;
      const tableEnd = 200;

      const isVisible = isEdgeVisible(position, tableStart, tableEnd);

      expect(isVisible).toBe(false);
    });
  });

  describe('getPrevAndCurrentColumns()', () => {
    it('returns the calculated measurements', () => {
      const columnVisibilityData = [
        {leftEdge: 145, rightEdge: 236, isVisible: true},
        {leftEdge: 236, rightEdge: 357, isVisible: true},
        {leftEdge: 357, rightEdge: 474, isVisible: true},
        {leftEdge: 474, rightEdge: 601, isVisible: true},
      ];

      const tableData = {
        fixedColumnWidth: 145,
        firstVisibleColumnIndex: 3,
        tableLeftVisibleEdge: 145,
        tableRightVisibleEdge: 551,
      };

      const actualMeasurement = getPrevAndCurrentColumns(
        tableData,
        columnVisibilityData,
      );
      const expectedMeasurement = {
        previousColumn: {leftEdge: 357, rightEdge: 474, isVisible: true},
        currentColumn: {leftEdge: 474, rightEdge: 601, isVisible: true},
      };
      expect(actualMeasurement).toEqual(expectedMeasurement);
    });
  });
});
