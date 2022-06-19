import React, {
  PureComponent,
  createRef,
  ReactNode,
  FocusEventHandler,
} from 'react';
import isEqual from 'react-fast-compare';

import {debounce} from '../../utilities/debounce';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {headerCell} from '../shared';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import {AfterInitialMount} from '../AfterInitialMount';
import {Sticky} from '../Sticky';

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
    singular: React.ReactNode;
    plural: React.ReactNode;
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
  /** Increased density */
  increasedTableDensity?: boolean;
  /** Add zebra striping to data rows */
  hasZebraStripingOnData?: boolean;
  /** Header becomes sticky and pins to top of table when scrolling  */
  stickyHeader?: boolean;
  /** Add a fixed first column on horizontal scroll. */
  hasFixedFirstColumn?: boolean;
  /** Specify a min width for the first column if neccessary */
  firstColumnMinWidth?: string;
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
    rowHovered: undefined,
  };

  private dataTable = createRef<HTMLDivElement>();
  private scrollContainer = createRef<HTMLDivElement>();
  private table = createRef<HTMLTableElement>();
  private stickyTableHeadingsRow = createRef<HTMLTableRowElement>();
  private tableHeadings: HTMLTableCellElement[] = [];
  private stickyHeadings: HTMLDivElement[] = [];
  private tableHeadingWidths: number[] = [];
  private stickyHeaderActive = false;
  private scrollStopTimer: ReturnType<typeof setTimeout> | null = null;

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
      increasedTableDensity = false,
      hasZebraStripingOnData = false,
      stickyHeader = false,
      hasFixedFirstColumn = false,
    } = this.props;
    const {
      condensed,
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight,
    } = this.state;

    const rowCountIsEven = rows.length % 2 === 0;

    const className = classNames(
      styles.DataTable,
      condensed && styles.condensed,
      totals && styles.ShowTotals,
      showTotalsInFooter && styles.ShowTotalsInFooter,
      hasZebraStripingOnData && styles.ZebraStripingOnData,
      hasZebraStripingOnData && rowCountIsEven && styles.RowCountIsEven,
    );

    const wrapperClassName = classNames(
      styles.TableWrapper,
      condensed && styles.condensed,
      increasedTableDensity && styles.IncreasedTableDensity,
      stickyHeader && styles.StickyHeaderEnabled,
    );

    const headingMarkup = (
      <tr>
        {headings.map((heading, index) =>
          this.renderHeading({
            heading,
            headingIndex: index,
            inFixedFirstColumn: false,
            inStickyHeader: false,
          }),
        )}
      </tr>
    );

    const totalsMarkup = totals ? (
      <tr>{totals.map(this.renderTotals)}</tr>
    ) : null;

    const firstColumn = rows.map((row) => row.slice(0, 1));
    const firstHeading = headings.slice(0, 1);
    const firstTotal = totals?.slice(0, 1);

    const fixedFirstColumn = condensed && hasFixedFirstColumn && (
      <table
        className={classNames(
          styles.FixedFirstColumn,
          !isScrolledFarthestLeft && styles.separate,
        )}
        style={{maxWidth: `${columnVisibilityData[0].rightEdge}px`}}
      >
        <thead>
          <tr>
            {firstHeading.map((heading, index) =>
              this.renderHeading({
                heading,
                headingIndex: index,
                inFixedFirstColumn: true,
                inStickyHeader: false,
              }),
            )}
          </tr>
          {totals && !showTotalsInFooter && (
            <tr>{firstTotal?.map(this.renderTotals)}</tr>
          )}
        </thead>
        <tbody>
          {firstColumn.map((row, index) =>
            this.defaultRenderRow({row, index, inFixedFirstColumn: true}),
          )}
        </tbody>
        {totals && showTotalsInFooter && (
          <tfoot>
            <tr>{firstTotal?.map(this.renderTotals)}</tr>
          </tfoot>
        )}
      </table>
    );

    const bodyMarkup = rows.map((row, index) =>
      this.defaultRenderRow({row, index, inFixedFirstColumn: false}),
    );

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
        fixedFirstColumn={hasFixedFirstColumn}
      />
    );

    const stickyHeaderMarkup = stickyHeader ? (
      <AfterInitialMount>
        <div className={styles.StickyTable} role="presentation">
          <Sticky
            boundingElement={this.dataTable.current}
            onStickyChange={(isSticky) => {
              this.changeHeadingFocus();
              this.stickyHeaderActive = isSticky;
            }}
          >
            {(isSticky: boolean) => {
              const stickyHeaderClassNames = classNames(
                styles.StickyTableHeader,
                isSticky && styles['StickyTableHeader-isSticky'],
                !isScrolledFarthestLeft && styles.separate,
              );

              const fixedFirstStickyHeading = hasFixedFirstColumn ? (
                <table
                  className={classNames(
                    !isScrolledFarthestLeft && styles.separate,
                    styles.FixedFirstColumn,
                  )}
                >
                  <thead>
                    <tr>
                      {this.renderHeading({
                        heading: headings[0],
                        headingIndex: 0,
                        inFixedFirstColumn: true,
                        inStickyHeader: true,
                      })}
                    </tr>
                  </thead>
                </table>
              ) : null;

              return (
                <table className={stickyHeaderClassNames}>
                  <div>{navigationMarkup}</div>
                  <tr
                    className={styles.StickyTableHeadingsRow}
                    ref={this.stickyTableHeadingsRow}
                  >
                    {fixedFirstStickyHeading}
                    {headings.map((heading, index) => {
                      return this.renderHeading({
                        heading,
                        headingIndex: index,
                        inFixedFirstColumn: false,
                        inStickyHeader: true,
                      });
                    })}
                  </tr>
                </table>
              );
            }}
          </Sticky>
        </div>
      </AfterInitialMount>
    ) : null;

    return (
      <div className={wrapperClassName}>
        {navigationMarkup}
        <div className={className} ref={this.dataTable}>
          {stickyHeaderMarkup}
          <div className={styles.ScrollContainer} ref={this.scrollContainer}>
            <EventListener event="resize" handler={this.handleResize} />
            <EventListener
              capture
              passive
              event="scroll"
              handler={this.scrollListener}
            />
            {fixedFirstColumn}
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

  private setCellRef = ({
    ref,
    index,
    inStickyHeader,
    inFixedFirstColumn,
  }: {
    ref: HTMLTableCellElement | null;
    index: number;
    inStickyHeader: boolean;
    inFixedFirstColumn: boolean;
  }) => {
    const {hasFixedFirstColumn} = this.props;
    if (
      ref == null ||
      (hasFixedFirstColumn && !inFixedFirstColumn && index === 0)
    ) {
      return;
    }

    if (inStickyHeader) {
      this.stickyHeadings[index] = ref;
      const button = ref.querySelector('button');
      if (button == null) {
        return;
      }
      button.addEventListener('focus', this.handleHeaderButtonFocus);
    } else {
      this.tableHeadings[index] = ref;
      this.tableHeadingWidths[index] = ref.getBoundingClientRect().width;
    }
  };

  private changeHeadingFocus = () => {
    const {tableHeadings, stickyHeadings} = this;

    const stickyFocusedItemIndex = stickyHeadings.findIndex(
      (item) => item === document.activeElement?.parentElement,
    );

    const tableFocusedItemIndex = tableHeadings.findIndex(
      (item) => item === document.activeElement?.parentElement,
    );

    if (stickyFocusedItemIndex < 0 && tableFocusedItemIndex < 0) {
      return null;
    }

    let button;

    if (stickyFocusedItemIndex >= 0) {
      button = tableHeadings[stickyFocusedItemIndex].querySelector('button');
    } else if (tableFocusedItemIndex >= 0) {
      button = stickyHeadings[tableFocusedItemIndex].querySelector('button');
    }

    if (button == null) {
      return null;
    }

    button.style.visibility = 'visible';
    button.focus();
    button.style.removeProperty('visibility');
  };

  private calculateColumnVisibilityData = (condensed: boolean) => {
    const {
      table: {current: table},
      scrollContainer: {current: scrollContainer},
      dataTable: {current: dataTable},
    } = this;

    if (condensed && table && scrollContainer && dataTable) {
      const headerCells = table.querySelectorAll(headerCell.selector);
      const {hasFixedFirstColumn} = this.props;
      const firstColumnWidth = hasFixedFirstColumn
        ? headerCells[0].clientWidth
        : 0;

      if (headerCells.length > 0) {
        const firstVisibleColumnIndex = headerCells.length - 1;
        const tableLeftVisibleEdge =
          scrollContainer.scrollLeft + firstColumnWidth;

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

        const isScrolledFarthestLeft = hasFixedFirstColumn
          ? tableLeftVisibleEdge === firstColumnWidth
          : tableLeftVisibleEdge === 0;

        return {
          columnVisibilityData,
          ...getPrevAndCurrentColumns(tableData, columnVisibilityData),
          isScrolledFarthestLeft,
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

  private handleHeaderButtonFocus = (event: Event) => {
    if (
      this.scrollContainer.current == null ||
      event.target == null ||
      this.state.columnVisibilityData.length === 0
    ) {
      return;
    }

    const target = event.target as HTMLElement;
    const currentCell = target.parentNode as HTMLTableCellElement;

    const tableScrollLeft = this.scrollContainer.current.scrollLeft;
    const tableViewableWidth = this.scrollContainer.current.offsetWidth;
    const tableRightEdge = tableScrollLeft + tableViewableWidth;
    const firstColumnWidth =
      this.state.columnVisibilityData.length > 0
        ? this.state.columnVisibilityData[0].rightEdge
        : 0;
    const currentColumnLeftEdge = currentCell.offsetLeft;
    const currentColumnRightEdge =
      currentCell.offsetLeft + currentCell.offsetWidth;

    if (tableScrollLeft > currentColumnLeftEdge - firstColumnWidth) {
      this.scrollContainer.current.scrollLeft =
        currentColumnLeftEdge - firstColumnWidth;
    }

    if (currentColumnRightEdge > tableRightEdge) {
      this.scrollContainer.current.scrollLeft =
        currentColumnRightEdge - tableViewableWidth;
    }
  };

  private stickyHeaderScrolling = () => {
    const {current: stickyTableHeadingsRow} = this.stickyTableHeadingsRow;
    const {current: scrollContainer} = this.scrollContainer;

    if (stickyTableHeadingsRow == null || scrollContainer == null) {
      return;
    }

    stickyTableHeadingsRow.scrollLeft = scrollContainer.scrollLeft;
  };

  private scrollListener = () => {
    if (this.scrollStopTimer) {
      clearTimeout(this.scrollStopTimer);
    }

    this.scrollStopTimer = setTimeout(() => {
      this.setState((prevState) => ({
        ...this.calculateColumnVisibilityData(prevState.condensed),
      }));
    }, 100);
    this.setState({
      isScrolledFarthestLeft: this.scrollContainer.current?.scrollLeft === 0,
    });

    if (this.props.stickyHeader && this.stickyHeaderActive) {
      this.stickyHeaderScrolling();
    }
  };

  private handleHover = (row?: number) => () => {
    this.setState({rowHovered: row});
  };

  private handleFocus: FocusEventHandler = (event) => {
    if (this.scrollContainer.current == null || event.target == null) {
      return;
    }
    const currentCell = event.target.parentNode as HTMLTableCellElement;
    const hasFixedFirstColumn = this.state.columnVisibilityData.length > 0;
    const firstColumnWidth = hasFixedFirstColumn
      ? this.state.columnVisibilityData[0].rightEdge
      : 0;
    const currentColumnLeftEdge = currentCell.offsetLeft;
    const desiredScrollLeft = currentColumnLeftEdge - firstColumnWidth;

    if (this.scrollContainer.current.scrollLeft > desiredScrollLeft) {
      this.scrollContainer.current.scrollLeft = desiredScrollLeft;
    }
  };

  private navigateTable = (direction: string) => {
    const {currentColumn, previousColumn} = this.state;
    const firstColumnWidth = this.state.columnVisibilityData[0]?.rightEdge;
    if (!currentColumn || !previousColumn) {
      return;
    }

    let prevWidths = 0;
    for (let index = 0; index < currentColumn.index; index++) {
      prevWidths += this.state.columnVisibilityData[index].width;
    }

    const {current: scrollContainer} = this.scrollContainer;

    const handleScroll = () => {
      let newScrollLeft = 0;
      if (this.props.hasFixedFirstColumn) {
        newScrollLeft =
          direction === 'right'
            ? prevWidths - firstColumnWidth + currentColumn.width
            : prevWidths - previousColumn.width - firstColumnWidth;
      } else {
        newScrollLeft =
          direction === 'right'
            ? currentColumn.rightEdge
            : previousColumn.leftEdge;
      }

      if (scrollContainer) {
        scrollContainer.scrollLeft = newScrollLeft;

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
  private renderHeading = ({
    heading,
    headingIndex,
    inFixedFirstColumn,
    inStickyHeader,
  }: {
    heading: string | ReactNode;
    headingIndex: number;
    inFixedFirstColumn: boolean;
    inStickyHeader: boolean;
  }) => {
    const {
      sortable,
      truncate = false,
      columnContentTypes,
      defaultSortDirection,
      initialSortColumnIndex = 0,
      verticalAlign,
      firstColumnMinWidth,
    } = this.props;

    const {
      sortDirection = defaultSortDirection,
      sortedColumnIndex = initialSortColumnIndex,
      isScrolledFarthestLeft,
    } = this.state;

    let sortableHeadingProps;
    const headingCellId = `heading-cell-${headingIndex}`;
    const stickyHeaderId = `stickyheader-${headingIndex}`;
    const id = inStickyHeader ? stickyHeaderId : headingCellId;

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
        hasFixedFirstColumn: this.props.hasFixedFirstColumn,
        inFixedFirstColumn:
          this.props.hasFixedFirstColumn && inFixedFirstColumn,
      };
    }

    let stickyCellWidth;

    if (inStickyHeader) {
      stickyCellWidth = this.tableHeadingWidths[headingIndex];
    }
    return (
      <Cell
        setRef={(ref) => {
          this.setCellRef({
            ref,
            index: headingIndex,
            inStickyHeader,
            inFixedFirstColumn,
          });
        }}
        header
        stickyHeadingCell={inStickyHeader}
        key={id}
        content={heading}
        contentType={columnContentTypes[headingIndex]}
        firstColumn={headingIndex === 0}
        truncate={truncate}
        {...sortableHeadingProps}
        verticalAlign={verticalAlign}
        handleFocus={this.handleFocus}
        stickyCellWidth={stickyCellWidth}
        fixedCellVisible={!isScrolledFarthestLeft}
        firstColumnMinWidth={firstColumnMinWidth}
        inFixedFirstColumn={inFixedFirstColumn}
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

  private defaultRenderRow = ({
    row,
    index,
    inFixedFirstColumn,
  }: {
    row: TableData[];
    index: number;
    inFixedFirstColumn: boolean;
  }) => {
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
      <tr
        key={`row-${index}`}
        className={className}
        onMouseEnter={this.handleHover(index)}
        onMouseLeave={this.handleHover()}
      >
        {row.map((content: CellProps['content'], cellIndex: number) => {
          const hovered = index === this.state.rowHovered;
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
              hovered={hovered}
              inFixedFirstColumn={inFixedFirstColumn}
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
