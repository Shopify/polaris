import React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
// eslint-disable-next-line no-restricted-imports
import {mountWithAppProvider, trigger} from 'test-utilities/legacy';
import {mountWithApp} from 'test-utilities';
import {Checkbox} from 'components';

import {Cell, Navigation} from '../components';
import {DataTable, DataTableProps} from '../DataTable';

describe('<DataTable />', () => {
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

  const columnContentTypes: DataTableProps['columnContentTypes'] = [
    'text',
    'numeric',
    'numeric',
    'numeric',
    'numeric',
  ];

  const defaultProps: DataTableProps = {columnContentTypes, headings, rows};

  beforeEach(() => {
    timer.mock();
  });

  afterEach(() => {
    timer.restore();
  });

  it('does not throw an error when there are no header cells', () => {
    function test() {
      const dataTable = mountWithApp(
        <DataTable columnContentTypes={[]} headings={[]} rows={[]} />,
      );
      const table = dataTable.find('table')!.domNode;

      Object.defineProperty(table, 'scrollWidth', {
        value: 1,
        writable: true,
        configurable: true,
      });

      window.dispatchEvent(new Event('resize'));
      timer.runAllTimers();
    }

    expect(test).not.toThrow();
  });

  it('does not set state after the component has been unmounted', () => {
    // When a React component calls setState after being unmounted it logs the error:
    // "Warning: Can't perform a React state update on an unmounted component ..."
    const consoleSpy = jest.spyOn(console, 'error');
    const dataTable = mountWithApp(
      <DataTable columnContentTypes={[]} headings={[]} rows={[]} />,
    );
    dataTable.unmount();
    timer.runAllTimers();
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  describe('columnContentTypes', () => {
    it('sets the provided contentType of Cells in each column', () => {
      const headings = ['Column 1', 'Column 2'];
      const rows = [['Cell 1', '2']];
      const columnContentTypes: DataTableProps['columnContentTypes'] = [
        'text',
        'numeric',
      ];
      const dataTable = mountWithAppProvider(
        <DataTable
          {...defaultProps}
          columnContentTypes={columnContentTypes}
          headings={headings}
          rows={rows}
        />,
      );

      const cells = dataTable.find(Cell);
      const firstColumnCells = cells.filterWhere(
        (cell) => cell.prop('firstColumn') === true,
      );

      const secondColumnCells = cells.filterWhere(
        (cell) => cell.prop('firstColumn') !== true,
      );

      expect(cells).toHaveLength(4);

      firstColumnCells.forEach((cell) =>
        expect(cell.prop('contentType')).toBe('text'),
      );

      secondColumnCells.forEach((cell) =>
        expect(cell.prop('contentType')).toBe('numeric'),
      );
    });
  });

  describe('headings', () => {
    it('renders a single table header row', () => {
      const headings = ['Heading 1', 'Heading 2', 'Heading 3'];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} headings={headings} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(1);
    });

    it('renders each header Cell with the content provided', () => {
      const headings = ['Heading 1', 'Heading 2', 'Heading 3'];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} headings={headings} />,
      );

      const headingCells = dataTable.find('thead tr').find(Cell);

      headingCells.forEach((headingCell, headingCellIndex) =>
        expect(headingCell.text()).toBe(headings[headingCellIndex]),
      );
    });

    it('renders JSX in header cell', () => {
      const headings = [
        <Checkbox key="123" label="Heading 1" />,
        'Heading 2',
        'Heading 3',
      ];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} headings={headings} />,
      );

      const checkbox = dataTable.find('thead tr').find(Checkbox);

      expect(checkbox).toHaveLength(1);
      expect(checkbox.prop('label')).toBe('Heading 1');
    });
  });

  describe('totals', () => {
    it('renders a second table header row with totals', () => {
      const totals = ['', '$20.00', ''];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(2);

      const totalsRow = dataTable.find('thead tr').at(1);

      expect(totalsRow.text()).toContain(totals.join(''));
    });

    it('renders the singular default totals row label when only one total is provided', () => {
      const totals = ['', '', '', '', '$155,830.00'];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(2);

      const firstTotalCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('total') === true)
        .first();

      expect(firstTotalCell.prop('content')).toBe('Total');
    });

    it('renders the plural default totals label when more than one total is provided', () => {
      const totals = ['', '', '', '255', '$155,830.00'];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(2);

      const firstTotalCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('total') === true)
        .first();

      expect(firstTotalCell.prop('content')).toBe('Totals');
    });

    it('sets the contentType of non-empty total Cells to numeric', () => {
      const totals = ['', '$20.00', ''];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} />,
      );
      const totalsCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('total') === true);

      const nonEmptyTotalCells = totalsCells.filterWhere(
        (cell) => cell.prop('contentType') === 'numeric',
      );

      const secondTotalsCell = totalsCells.at(1);

      expect(nonEmptyTotalCells).toHaveLength(1);
      expect(secondTotalsCell.prop('contentType')).toBe('numeric');
    });

    it('renders an empty Cell for falsey total values', () => {
      const totals = ['', '', ''];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(2);

      const totalsCells = dataTable
        .find(Cell)
        .filterWhere(
          (cell) =>
            cell.prop('total') === true && cell.prop('firstColumn') !== true,
        );

      totalsCells.forEach((total) => expect(total.text()).toBe(''));
    });

    it('renders totals in the footer with a showTotalsInFooter prop', () => {
      const totals = ['', '', ''];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} showTotalsInFooter />,
      );

      expect(dataTable.find('tfoot')).toHaveLength(1);
    });
  });

  describe('totalsName', () => {
    it('renders the singular custom totals label when only one total provided', () => {
      const totals = ['', '', '', '', '$155,830.00'];
      const totalsName = {
        singular: 'Price',
        plural: 'Prices',
      };

      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} totalsName={totalsName} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(2);

      const firstTotalCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('total') === true)
        .first();

      expect(firstTotalCell.prop('content')).toBe('Price');
    });

    it('renders the plural custom totals label when more than one total is provided', () => {
      const totals = ['', '', '', '255', '$155,830.00'];
      const totalsName = {
        singular: 'Price',
        plural: 'Prices',
      };

      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} totals={totals} totalsName={totalsName} />,
      );

      expect(dataTable.find('thead tr')).toHaveLength(2);

      const firstTotalCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('total') === true)
        .first();

      expect(firstTotalCell.prop('content')).toBe('Prices');
    });
  });

  describe('rows', () => {
    it('renders a table body row for each list of table data provided', () => {
      const rows = [['First row'], ['Second row'], ['Third row']];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} rows={rows} />,
      );

      expect(dataTable.find('tbody tr')).toHaveLength(3);
    });
  });

  describe('truncate', () => {
    it('defaults to false', () => {
      const dataTable = mountWithAppProvider(<DataTable {...defaultProps} />);

      const firstColumnCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('firstColumn') === true);

      firstColumnCells.forEach((cell) =>
        expect(cell.prop('truncate')).toBe(false),
      );
    });

    it('passes the value provided to its cells', () => {
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} truncate />,
      );

      const firstColumnCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('firstColumn') === true);

      firstColumnCells.forEach((cell) =>
        expect(cell.prop('truncate')).toBe(true),
      );
    });
  });

  describe('hideScrollIndicator', () => {
    it('shows <Navigation /> by default', () => {
      const dataTable = mountWithAppProvider(<DataTable {...defaultProps} />);

      expect(dataTable.find(Navigation)).toHaveLength(1);
    });

    it('hide <Navigation /> when true', () => {
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} hideScrollIndicator />,
      );

      expect(dataTable.find(Navigation)).toHaveLength(0);
    });

    it('show <Navigation /> when false', () => {
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} hideScrollIndicator={false} />,
      );

      expect(dataTable.find(Navigation)).toHaveLength(1);
    });
  });

  describe('verticalAlign', () => {
    it('defaults to undefined', () => {
      const dataTable = mountWithAppProvider(<DataTable {...defaultProps} />);

      const cells = dataTable.find(Cell);

      cells.forEach((cell) =>
        expect(cell.prop('verticalAlign')).toBeUndefined(),
      );
    });

    it('passes the value provided to its cells', () => {
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} verticalAlign="middle" />,
      );

      const cells = dataTable.find(Cell);

      cells.forEach((cell) =>
        expect(cell.prop('verticalAlign')).toBe('middle'),
      );
    });
  });

  describe('footerContent', () => {
    it('renders string footer content when provided', () => {
      const footerContent = 'Footer text';
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} footerContent={footerContent} />,
      );

      expect(dataTable.text()).toContain(footerContent);
    });

    it('renders JSX footer content when provided', () => {
      const footerContent = <div>Footer text</div>;
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} footerContent={footerContent} />,
      );

      expect(dataTable.containsMatchingElement(footerContent)).toBe(true);
    });
  });

  describe('sortable', () => {
    it('defaults to a non-sortable table', () => {
      const dataTable = mountWithAppProvider(<DataTable {...defaultProps} />);
      const cells = dataTable.find(Cell);

      cells.forEach((cell) => expect(cell.find('button')).toHaveLength(0));
    });

    it('renders a sortable header Cell for each true index', () => {
      const sortable = [false, true, false, false, true];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} sortable={sortable} />,
      );

      const sortableCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('sortable') === true);

      expect(sortableCells).toHaveLength(2);
    });

    it('renders a plain header Cell for each false index', () => {
      const sortable = [false, true, false, false, true];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} sortable={sortable} />,
      );

      const nonSortableCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('sortable') === false);

      expect(nonSortableCells).toHaveLength(3);
    });
  });

  describe('hoverable', () => {
    it('defaults to rows with hover state', () => {
      const dataTable = mountWithAppProvider(<DataTable {...defaultProps} />);
      const rows = dataTable.find('tbody tr');

      rows.forEach((row) =>
        expect(row.props().className).toContain('hoverable'),
      );
    });

    it('renders rows without hover state class name when false', () => {
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} hoverable={false} />,
      );
      const rows = dataTable.find('tbody tr');

      rows.forEach((row) =>
        expect(row.props().className).not.toContain('hoverable'),
      );
    });
  });

  describe('defaultSortDirection', () => {
    it('passes the value down to the Cell', () => {
      const sortable = [false, true, false, false, true];
      const dataTable = mountWithAppProvider(
        <DataTable
          {...defaultProps}
          sortable={sortable}
          defaultSortDirection="ascending"
        />,
      );

      const firstHeadingCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.props().header === true)
        .first();

      expect(firstHeadingCell.prop('defaultSortDirection')).toBe('ascending');
    });
  });

  describe('initialSortColumnIndex', () => {
    it('defaults to first column if not specified', () => {
      const sortable = [true, true, false, false, true, false];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} sortable={sortable} />,
      );

      const firstHeadingCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.props().header === true)
        .first();

      expect(firstHeadingCell.props().sorted).toBe(true);
    });

    it('sets specified initial sort column', () => {
      const sortable = [true, true, false, false, true, false];
      const initialSortColumnIndex = 4;
      const dataTable = mountWithAppProvider(
        <DataTable
          {...defaultProps}
          sortable={sortable}
          initialSortColumnIndex={initialSortColumnIndex}
        />,
      );

      const fifthHeadingCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.props().header === true)
        .at(initialSortColumnIndex);

      expect(fifthHeadingCell.props().sorted).toBe(true);
    });
  });

  describe('onSort', () => {
    it('gets called when sortable column heading is clicked', () => {
      const spyOnSort = jest.fn();
      const sortable = [true, false, false, false, false];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} sortable={sortable} onSort={spyOnSort} />,
      );

      const firstHeadingCell = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.props().header === true)
        .first();

      trigger(firstHeadingCell, 'onSort');

      expect(spyOnSort).toHaveBeenCalledTimes(1);
    });
  });

  describe('colSpan', () => {
    it('has a colSpan of 1 when header length and row length are equal', () => {
      const rows = [['Emerald Silk Gown', '$230.00', 124689, 32, '$19,090.00']];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} rows={rows} />,
      );

      const singleSpanCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('colSpan') === 1);

      expect(singleSpanCells).toHaveLength(5);
    });

    it('has a colSpan that spans all headings when there is only one cell in the row', () => {
      const rows = [['Emerald Silk Gown']];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} rows={rows} />,
      );

      const fullSpanCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('colSpan') === headings.length);

      expect(fullSpanCells).toHaveLength(1);
    });

    it('cells still fill the full table width when there are no headings', () => {
      const rows = [['Emerald Silk Gown', '$230.00']];
      const dataTable = mountWithAppProvider(
        <DataTable {...defaultProps} headings={[]} rows={rows} />,
      );

      const twoSpanCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('colSpan') === 2);

      const threeSpanCells = dataTable
        .find(Cell)
        .filterWhere((cell) => cell.prop('colSpan') === 2);

      expect(twoSpanCells).toHaveLength(1);
      expect(threeSpanCells).toHaveLength(1);
    });
  });
});
