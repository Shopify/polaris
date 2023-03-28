import React from 'react';
import {timer} from '@shopify/jest-dom-mocks';
import {mountWithApp} from 'tests/utilities';

import {Checkbox} from '../../Checkbox';
import {Cell, Navigation} from '../components';
import {DataTable} from '../DataTable';
import type {DataTableProps} from '../DataTable';

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
      const dataTable = mountWithApp(
        <DataTable
          {...defaultProps}
          columnContentTypes={columnContentTypes}
          headings={headings}
          rows={rows}
        />,
      );

      const cells = dataTable.findAll(Cell);

      // 2 for the headers and 2 for the body
      expect(cells).toHaveLength(4);

      expect(
        cells
          .filter((cell) => cell.prop('header'))
          .map((cell) => cell.prop('contentType')),
      ).toStrictEqual(columnContentTypes);

      expect(
        cells
          .filter((cell) => !cell.prop('header'))
          .map((cell) => cell.prop('contentType')),
      ).toStrictEqual(columnContentTypes);
    });
  });

  describe('headings', () => {
    it('renders a single table header row', () => {
      const headings = ['Heading 1', 'Heading 2', 'Heading 3'];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} headings={headings} />,
      );

      expect(dataTable.find('thead')).toContainReactComponentTimes('tr', 1);
    });

    it('renders each header Cell with the content provided', () => {
      const headings = ['Heading 1', 'Heading 2', 'Heading 3'];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} headings={headings} />,
      );

      const headingCells = dataTable.find('thead')!.find('tr')!.findAll(Cell);

      headingCells.forEach((headingCell, headingCellIndex) =>
        expect(headingCell).toContainReactText(headings[headingCellIndex]),
      );
    });

    it('renders JSX in header cell', () => {
      const headings = [
        <Checkbox key="123" label="Heading 1" />,
        'Heading 2',
        'Heading 3',
      ];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} headings={headings} />,
      );

      const headerCell = dataTable.find('thead')!.find('tr')!;

      expect(headerCell).toContainReactComponent(Checkbox, {
        label: 'Heading 1',
      });
    });
  });

  describe('totals', () => {
    it('renders a second table header row with totals', () => {
      const totals = ['', '$20.00', ''];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} />,
      );

      const headingRows = dataTable.find('thead');
      expect(headingRows).toContainReactComponentTimes('tr', 2);

      const totalsRow = headingRows!.findAll('tr')[1];
      expect(totalsRow).toContainReactText(totals.join(''));
    });

    it('renders the singular default totals row label when only one total is provided', () => {
      const totals = ['', '', '', '', '$155,830.00'];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} />,
      );

      const headingRows = dataTable.find('thead');
      expect(headingRows).toContainReactComponentTimes('tr', 2);

      const firstTotalCell = dataTable
        .findAll(Cell)
        .find((cell) => cell.prop('total'));
      expect(firstTotalCell?.prop('content')).toBe('Total');
    });

    it('renders the plural default totals label when more than one total is provided', () => {
      const totals = ['', '', '', '255', '$155,830.00'];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} />,
      );

      const headingRows = dataTable.find('thead');
      expect(headingRows).toContainReactComponentTimes('tr', 2);

      const firstTotalCell = dataTable
        .findAll(Cell)
        .find((cell) => cell.prop('total'));
      expect(firstTotalCell?.prop('content')).toBe('Totals');
    });

    it('sets the contentType of non-empty total Cells to numeric', () => {
      const totals = ['', '$20.00', ''];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} />,
      );

      const totalsCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('total'));
      const nonEmptyTotalCells = totalsCells.filter(
        (cell) => cell.prop('contentType') === 'numeric',
      );

      expect(nonEmptyTotalCells).toHaveLength(1);

      const secondTotalsCell = totalsCells[1];
      expect(secondTotalsCell).toHaveReactProps({contentType: 'numeric'});
    });

    it('renders an empty Cell for falsey total values', () => {
      const totals = ['', '', ''];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} />,
      );

      expect(dataTable.find('thead')).toContainReactComponentTimes('tr', 2);

      const totalsCells = dataTable
        .findAll(Cell)
        .filter(
          (cell) =>
            cell.prop('total') === true && cell.prop('nthColumn') !== true,
        );

      totalsCells.forEach((total) => expect(total).toContainReactText(''));
    });

    it('renders totals in the footer with a showTotalsInFooter prop', () => {
      const totals = ['', '', ''];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} showTotalsInFooter />,
      );

      expect(dataTable).toContainReactComponentTimes('tfoot', 1);
    });
  });

  describe('totalsName', () => {
    it('renders the singular custom totals label when only one total provided', () => {
      const totals = ['', '', '', '', '$155,830.00'];
      const totalsName = {
        singular: 'Price',
        plural: 'Prices',
      };

      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} totalsName={totalsName} />,
      );

      expect(dataTable.find('thead')).toContainReactComponentTimes('tr', 2);

      expect(dataTable).toContainReactComponentTimes(Cell, 1, {
        total: true,
        content: 'Price',
      });
    });

    it('renders the plural custom totals label when more than one total is provided', () => {
      const totals = ['', '', '', '255', '$155,830.00'];
      const totalsName = {
        singular: 'Price',
        plural: 'Prices',
      };

      const dataTable = mountWithApp(
        <DataTable {...defaultProps} totals={totals} totalsName={totalsName} />,
      );

      expect(dataTable.find('thead')).toContainReactComponentTimes('tr', 2);

      expect(dataTable).toContainReactComponentTimes(Cell, 1, {
        total: true,
        content: 'Prices',
      });
    });
  });

  describe('rows', () => {
    it('renders a table body row for each list of table data provided', () => {
      const rows = [['First row'], ['Second row'], ['Third row']];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} rows={rows} />,
      );

      expect(dataTable.find('tbody')).toContainReactComponentTimes('tr', 3);
    });
  });

  describe('truncate', () => {
    it('defaults to false', () => {
      const dataTable = mountWithApp(<DataTable {...defaultProps} />);

      const firstColumnCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('nthColumn') === true);

      firstColumnCells.forEach((cell) =>
        expect(cell).toHaveReactProps({truncate: false}),
      );
    });

    it('passes the value provided to its cells', () => {
      const dataTable = mountWithApp(<DataTable {...defaultProps} truncate />);

      const firstColumnCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('nthColumn') === true);

      firstColumnCells.forEach((cell) =>
        expect(cell).toHaveReactProps({truncate: true}),
      );
    });
  });

  describe('hideScrollIndicator', () => {
    it('shows <Navigation /> by default', () => {
      const dataTable = mountWithApp(<DataTable {...defaultProps} />);

      expect(dataTable).toContainReactComponent(Navigation);
    });

    it('hides <Navigation /> when true', () => {
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} hideScrollIndicator />,
      );

      expect(dataTable).not.toContainReactComponent(Navigation);
    });

    it('shows <Navigation /> when false', () => {
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} hideScrollIndicator={false} />,
      );

      expect(dataTable).toContainReactComponent(Navigation);
    });
  });

  describe('verticalAlign', () => {
    it('defaults to undefined', () => {
      const dataTable = mountWithApp(<DataTable {...defaultProps} />);

      const cells = dataTable.findAll(Cell);

      cells.forEach((cell) =>
        expect(cell).toHaveReactProps({verticalAlign: undefined}),
      );
    });

    it('passes the value provided to its cells', () => {
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} verticalAlign="middle" />,
      );

      const cells = dataTable.findAll(Cell);

      cells.forEach((cell) =>
        expect(cell).toHaveReactProps({verticalAlign: 'middle'}),
      );
    });
  });

  describe('footerContent', () => {
    it('renders string footer content when provided', () => {
      const footerContent = 'Footer text';
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} footerContent={footerContent} />,
      );

      expect(dataTable).toContainReactText(footerContent);
    });

    it('renders JSX footer content when provided', () => {
      const footerContent: any = <div>Footer text</div>;
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} footerContent={footerContent} />,
      );

      expect(dataTable).toContainReactComponent(footerContent);
    });
  });

  describe('sortable', () => {
    it('defaults to a non-sortable table', () => {
      const dataTable = mountWithApp(<DataTable {...defaultProps} />);
      const cells = dataTable.findAll(Cell);

      cells.forEach((cell) =>
        expect(cell).not.toContainReactComponent('button'),
      );
    });

    it('renders a sortable header Cell for each true index', () => {
      const sortable = [false, true, false, false, true];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} sortable={sortable} />,
      );

      const sortableCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('sortable') === true)
        .filter((cell) => cell.prop('stickyHeadingCell') !== true);

      expect(sortableCells).toHaveLength(2);
    });

    it('renders a plain header Cell for each false index', () => {
      const sortable = [false, true, false, false, true];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} sortable={sortable} />,
      );

      const nonSortableCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('sortable') === false)
        .filter((cell) => cell.prop('stickyHeadingCell') !== true);

      expect(nonSortableCells).toHaveLength(3);
    });
  });

  describe('hoverable', () => {
    it('defaults to rows with hover state', () => {
      const dataTable = mountWithApp(<DataTable {...defaultProps} />);
      const rows = dataTable.find('tbody')!.findAll('tr');

      rows.forEach((row) =>
        expect(row).toHaveReactProps({
          className: expect.stringContaining('hoverable'),
        }),
      );
    });

    it('renders rows without hover state class name when false', () => {
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} hoverable={false} />,
      );
      const rows = dataTable.find('tbody')!.findAll('tr');

      rows.forEach((row) =>
        expect(row).not.toHaveReactProps({
          className: expect.stringContaining('hoverable'),
        }),
      );
    });
  });

  describe('defaultSortDirection', () => {
    it('passes the value down to the Cell', () => {
      const sortable = [false, true, false, false, true];
      const dataTable = mountWithApp(
        <DataTable
          {...defaultProps}
          sortable={sortable}
          defaultSortDirection="ascending"
        />,
      );

      const firstHeadingCell = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('header') === true)[0];

      expect(firstHeadingCell).toHaveReactProps({
        defaultSortDirection: 'ascending',
      });
    });
  });

  describe('initialSortColumnIndex', () => {
    it('defaults to first column if not specified', () => {
      const sortable = [true, true, false, false, true, false];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} sortable={sortable} />,
      );

      const firstHeadingCell = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('header') === true)[0];

      expect(firstHeadingCell).toHaveReactProps({sorted: true});
    });

    it('sets specified initial sort column', () => {
      const sortable = [true, true, false, false, true, false];
      const initialSortColumnIndex = 4;
      const dataTable = mountWithApp(
        <DataTable
          {...defaultProps}
          sortable={sortable}
          initialSortColumnIndex={initialSortColumnIndex}
        />,
      );

      const fifthHeadingCell = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('header') === true)[initialSortColumnIndex];

      expect(fifthHeadingCell).toHaveReactProps({sorted: true});
    });
  });

  describe('onSort', () => {
    it('gets called when sortable column heading is clicked', () => {
      const spyOnSort = jest.fn();
      const sortable = [true, false, false, false, false];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} sortable={sortable} onSort={spyOnSort} />,
      );

      const firstHeadingCell = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('header') === true)[0];

      firstHeadingCell.trigger('onSort');

      expect(spyOnSort).toHaveBeenCalledTimes(1);
    });
  });

  describe('colSpan', () => {
    it('has a colSpan of 1 when header length and row length are equal', () => {
      const rows = [['Emerald Silk Gown', '$230.00', 124689, 32, '$19,090.00']];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} rows={rows} />,
      );

      const singleSpanCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('colSpan') === 1);

      expect(singleSpanCells).toHaveLength(5);
    });

    it('has a colSpan that spans all headings when there is only one cell in the row', () => {
      const rows = [['Emerald Silk Gown']];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} rows={rows} />,
      );

      const fullSpanCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('colSpan') === headings.length);

      expect(fullSpanCells).toHaveLength(1);
    });

    it('cells still fill the full table width when there are no headings', () => {
      const rows = [['Emerald Silk Gown', '$230.00']];
      const dataTable = mountWithApp(
        <DataTable {...defaultProps} headings={[]} rows={rows} />,
      );

      const twoSpanCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('colSpan') === 2);

      const threeSpanCells = dataTable
        .findAll(Cell)
        .filter((cell) => cell.prop('colSpan') === 2);

      expect(twoSpanCells).toHaveLength(1);
      expect(threeSpanCells).toHaveLength(1);
    });
  });

  describe('fixedFirstColumns', () => {
    const headings = ['Product', 'Price', 'Order Number'];
    const rows = [
      [
        'Navy Merino Wool Blazer with khaki chinos and yellow belt',
        '$875.00',
        124518,
        83,
        '$122,500.00',
      ],
    ];

    const columnContentTypes: DataTableProps['columnContentTypes'] = [
      'text',
      'numeric',
      'numeric',
    ];

    const fixedFirstColumnsProps = {
      headings,
      rows,
      columnContentTypes,
    };

    it('sets fixed first columns', () => {
      const dataTable = mountWithApp(
        <DataTable {...fixedFirstColumnsProps} fixedFirstColumns={2} />,
      );

      const table = dataTable.find('table')!.domNode;

      Object.defineProperty(table, 'scrollWidth', {
        value: 100,
        writable: true,
        configurable: true,
      });

      window.dispatchEvent(new Event('resize'));
      timer.runAllTimers();

      dataTable.forceUpdate();

      const separateTable = dataTable.findAll('table')[0];
      const separateTableHeadingGroup = separateTable.find('thead');
      const separateTableHeaders = separateTableHeadingGroup?.findAll('th');

      expect(separateTableHeaders).toHaveLength(2);
    });

    it('sets "fixedFirstColumns" to 0 if it exceeds or is equal to columns amount', () => {
      const dataTable = mountWithApp(
        <DataTable {...fixedFirstColumnsProps} fixedFirstColumns={3} />,
      );

      const table = dataTable.find('table')!.domNode;

      Object.defineProperty(table, 'scrollWidth', {
        value: 100,
        writable: true,
        configurable: true,
      });

      window.dispatchEvent(new Event('resize'));
      timer.runAllTimers();

      dataTable.forceUpdate();

      const tables = dataTable.findAll('table');

      expect(tables).toHaveLength(1);
    });
  });
});
