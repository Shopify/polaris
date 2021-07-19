import React, {PureComponent, createRef} from 'react';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {headerCell} from '../shared';
import {EventListener} from '../EventListener';

import {Cell, CellProps, Navigation} from './components';
import {measureColumn, getPrevAndCurrentColumns} from './utilities';
import type {DataTableState, SortDirection, VerticalAlign} from './types';
import styles from './DataTable.scss';

export type {SortDirection};

export type TableRow =
  | DataTableProps['headings']
  | DataTableProps['rows']
  | DataTableProps['totals'];

export type TableData = string | number | React.ReactNode;

export type ColumnContentType = 'text' | 'numeric';

export interface DataTableProps {
  /** List of data types, which determines content alignment for each column. Data types are "text," which aligns left, or "numeric," which aligns right. */
  columnContentTypes: ColumnContentType[];
  /** List of column headings. */
  headings: React.ReactNode[];
  /** List of numeric column totals, highlighted in the table’s header below column headings. Use empty strings as placeholders for columns with no total. */
  totals?: TableData[];
  /** Custom totals row heading */
  totalsName?: {
    singular: string;
    plural: string;
  };
  /** Placement of totals row within table */
  showTotalsInFooter?: boolean;
  /** Lists of data points which map to table body rows. */
  rows: TableData[][];
  /** Hide column visibility and navigation buttons above the header when the table horizontally collapses to be scrollable.
   * @default false
   */
  hideScrollIndicator?: boolean;
  /** Truncate content in first column instead of wrapping.
   * @default true
   */
  truncate?: boolean;
  /** Vertical alignment of content in the cells.
   * @default 'top'
   */
  verticalAlign?: VerticalAlign;
  /** Content centered in the full width cell of the table footer row. */
  footerContent?: TableData;
  /** Table row has hover state. Defaults to true. */
  hoverable?: boolean;
  /** List of booleans, which maps to whether sorting is enabled or not for each column. Defaults to false for all columns.  */
  sortable?: boolean[];
  /**
   * The direction to sort the table rows on first click or keypress of a sortable column heading. Defaults to ascending.
   * @default 'ascending'
   */
  defaultSortDirection?: SortDirection;
  /**
   * The index of the heading that the table rows are initially sorted by. Defaults to the first column.
   * @default 0
   */
  initialSortColumnIndex?: number;
  /** Callback fired on click or keypress of a sortable column heading. */
  onSort?(headingIndex: number, direction: SortDirection): void;
}

type CombinedProps = DataTableProps & {
  i18n: ReturnType<typeof useI18n>;
};

class DataTableInner extends PureComponent<CombinedProps, DataTableState> {
  state: DataTableState = {
    condensed: false,
    columnVisibilityData: [],
    isScrolledFarthestLeft: true,
    isScrolledFarthestRight: false,
  };

  private dataTable = createRef<HTMLDivElement>();
  private scrollContainer = createRef<HTMLDivElement>();
  private table = createRef<HTMLTableElement>();

  private handleResize = debounce(() => {
    const {
      table: {current: table},
      scrollContainer: {current: scrollContainer},
    } = this;

    let condensed = false;

    if (table && scrollContainer) {
      condensed = table.scrollWidth > scrollContainer.clientWidth;
    }

    this.setState({
      condensed,
      ...this.calculateColumnVisibilityData(condensed),
    });
  });

  componentDidMount() {
    // We need to defer the calculation in development so the styles have time to be injected.
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.handleResize();
      }, 10);
    } else {
      this.handleResize();
    }
  }

  componentDidUpdate(prevProps: DataTableProps) {
    if (isEqual(prevProps, this.props)) {
      return;
    }
    this.handleResize();
  }

  componentWillUnmount() {
    this.handleResize.cancel();
  }

  render() {
    const {
      headings,
      totals,
      showTotalsInFooter,
      rows,
      footerContent,
      hideScrollIndicator = false,
    } = this.props;
    const {
      condensed,
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight,
    } = this.state;

    const className = classNames(
      styles.DataTable,
      condensed && styles.condensed,
    );

    const wrapperClassName = classNames(
      styles.TableWrapper,
      condensed && styles.condensed,
    );

    const headingMarkup = <tr>{headings.map(this.renderHeadings)}</tr>;

    const totalsMarkup = totals ? (
      <tr>{totals.map(this.renderTotals)}</tr>
    ) : null;

    const bodyMarkup = rows.map(this.defaultRenderRow);

    const footerMarkup = footerContent ? (
      <div className={styles.Footer}>{footerContent}</div>
    ) : null;

    const headerTotalsMarkup = !showTotalsInFooter ? totalsMarkup : null;
    const footerTotalsMarkup = showTotalsInFooter ? (
      <tfoot>{totalsMarkup}</tfoot>
    ) : null;

    const navigationMarkup = hideScrollIndicator ? null : (
      <Navigation
        columnVisibilityData={columnVisibilityData}
        isScrolledFarthestLeft={isScrolledFarthestLeft}
        isScrolledFarthestRight={isScrolledFarthestRight}
        navigateTableLeft={this.navigateTable('left')}
        navigateTableRight={this.navigateTable('right')}
      />
    );

    return (
      <div className={wrapperClassName}>
        {navigationMarkup}
        <div className={className} ref={this.dataTable}>
          <div className={styles.ScrollContainer} ref={this.scrollContainer}>
            <EventListener event="resize" handler={this.handleResize} />
            <EventListener
              capture
              event="scroll"
              handler={this.scrollListener}
            />
            <table className={styles.Table} ref={this.table}>
              <thead>
                {headingMarkup}
                {headerTotalsMarkup}
              </thead>
              <tbody>{bodyMarkup}</tbody>
              {footerTotalsMarkup}
            </table>
          </div>
          {footerMarkup}
        </div>
      </div>
    );
  }

  private calculateColumnVisibilityData = (condensed: boolean) => {
    const {
      table: {current: table},
      scrollContainer: {current: scrollContainer},
      dataTable: {current: dataTable},
    } = this;

    if (condensed && table && scrollContainer && dataTable) {
      const headerCells = table.querySelectorAll(headerCell.selector);

      if (headerCells.length > 0) {
        const firstVisibleColumnIndex = headerCells.length - 1;
        const tableLeftVisibleEdge = scrollContainer.scrollLeft;

        const tableRightVisibleEdge =
          scrollContainer.scrollLeft + dataTable.offsetWidth;

        const tableData = {
          firstVisibleColumnIndex,
          tableLeftVisibleEdge,
          tableRightVisibleEdge,
        };

        const columnVisibilityData = [...headerCells].map(
          measureColumn(tableData),
        );

        const lastColumn =
          columnVisibilityData[columnVisibilityData.length - 1];

        return {
          columnVisibilityData,
          ...getPrevAndCurrentColumns(tableData, columnVisibilityData),
          isScrolledFarthestLeft: tableLeftVisibleEdge === 0,
          isScrolledFarthestRight:
            lastColumn.rightEdge <= tableRightVisibleEdge,
        };
      }
    }

    return {
      columnVisibilityData: [],
      previousColumn: undefined,
      currentColumn: undefined,
    };
  };

  private scrollListener = () => {
    this.setState((prevState) => ({
      ...this.calculateColumnVisibilityData(prevState.condensed),
    }));
  };

  private navigateTable = (direction: string) => {
    const {currentColumn, previousColumn} = this.state;
    const {current: scrollContainer} = this.scrollContainer;

    const handleScroll = () => {
      if (!currentColumn || !previousColumn) {
        return;
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft =
          direction === 'right'
            ? currentColumn.rightEdge
            : previousColumn.leftEdge;

        requestAnimationFrame(() => {
          this.setState((prevState) => ({
            ...this.calculateColumnVisibilityData(prevState.condensed),
          }));
        });
      }
    };

    return handleScroll;
  };

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderHeadings = (heading: string, headingIndex: number) => {
    const {
      sortable,
      truncate = false,
      columnContentTypes,
      defaultSortDirection,
      initialSortColumnIndex = 0,
      verticalAlign,
    } = this.props;

    const {
      sortDirection = defaultSortDirection,
      sortedColumnIndex = initialSortColumnIndex,
    } = this.state;

    let sortableHeadingProps;
    const id = `heading-cell-${headingIndex}`;

    if (sortable) {
      const isSortable = sortable[headingIndex];
      const isSorted = isSortable && sortedColumnIndex === headingIndex;
      const direction = isSorted ? sortDirection : 'none';

      sortableHeadingProps = {
        defaultSortDirection,
        sorted: isSorted,
        sortable: isSortable,
        sortDirection: direction,
        onSort: this.defaultOnSort(headingIndex),
      };
    }

    return (
      <Cell
        header
        key={id}
        content={heading}
        contentType={columnContentTypes[headingIndex]}
        firstColumn={headingIndex === 0}
        truncate={truncate}
        {...sortableHeadingProps}
        verticalAlign={verticalAlign}
      />
    );
  };

  private totalsRowHeading = () => {
    const {i18n, totals, totalsName} = this.props;

    const totalsLabel = totalsName
      ? totalsName
      : {
          singular: i18n.translate('Polaris.DataTable.totalRowHeading'),
          plural: i18n.translate('Polaris.DataTable.totalsRowHeading'),
        };

    return totals && totals.filter((total) => total !== '').length > 1
      ? totalsLabel.plural
      : totalsLabel.singular;
  };

  // eslint-disable-next-line @shopify/react-no-multiple-render-methods
  private renderTotals = (total: TableData, index: number) => {
    const id = `totals-cell-${index}`;
    const {truncate = false, verticalAlign} = this.props;

    let content;
    let contentType;

    if (index === 0) {
      content = this.totalsRowHeading();
    }

    if (total !== '' && index > 0) {
      contentType = 'numeric';
      content = total;
    }

    const totalInFooter = this.props.showTotalsInFooter;

    return (
      <Cell
        total
        totalInFooter={totalInFooter}
        firstColumn={index === 0}
        key={id}
        content={content}
        contentType={contentType}
        truncate={truncate}
        verticalAlign={verticalAlign}
      />
    );
  };

  private getColSpan = (
    rowLength: number,
    headingsLength: number,
    contentTypesLength: number,
    cellIndex: number,
  ) => {
    const rowLen = rowLength ? rowLength : 1;
    const colLen = headingsLength ? headingsLength : contentTypesLength;
    const colSpan = Math.floor(colLen / rowLen);
    const remainder = colLen % rowLen;
    return cellIndex === 0 ? colSpan + remainder : colSpan;
  };

  private defaultRenderRow = (row: TableData[], index: number) => {
    const {
      columnContentTypes,
      truncate = false,
      verticalAlign,
      hoverable = true,
      headings,
    } = this.props;
    const className = classNames(
      styles.TableRow,
      hoverable && styles.hoverable,
    );

    return (
      <tr key={`row-${index}`} className={className}>
        {row.map((content: CellProps['content'], cellIndex: number) => {
          const id = `cell-${cellIndex}-row-${index}`;
          const colSpan = this.getColSpan(
            row.length,
            headings.length,
            columnContentTypes.length,
            cellIndex,
          );

          return (
            <Cell
              key={id}
              content={content}
              contentType={columnContentTypes[cellIndex]}
              firstColumn={cellIndex === 0}
              truncate={truncate}
              verticalAlign={verticalAlign}
              colSpan={colSpan}
            />
          );
        })}
      </tr>
    );
  };

  private defaultOnSort = (headingIndex: number) => {
    const {
      onSort,
      defaultSortDirection = 'ascending',
      initialSortColumnIndex,
    } = this.props;

    const {
      sortDirection = defaultSortDirection,
      sortedColumnIndex = initialSortColumnIndex,
    } = this.state;

    let newSortDirection = defaultSortDirection;

    if (sortedColumnIndex === headingIndex) {
      newSortDirection =
        sortDirection === 'ascending' ? 'descending' : 'ascending';
    }

    const handleSort = () => {
      this.setState(
        {
          sortDirection: newSortDirection,
          sortedColumnIndex: headingIndex,
        },
        () => {
          if (onSort) {
            onSort(headingIndex, newSortDirection);
          }
        },
      );
    };

    return handleSort;
  };
}

export function DataTable(props: DataTableProps) {
  const i18n = useI18n();
  return <DataTableInner {...props} i18n={i18n} />;
}
