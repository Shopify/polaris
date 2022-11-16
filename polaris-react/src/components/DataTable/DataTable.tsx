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

const getRowClientHeights = (rows: NodeList | undefined) => {
  const heights: number[] = [];
  if (!rows) {
    return heights;
  }
  rows.forEach((row: HTMLTableRowElement) => {
    heights.push(row.clientHeight);
  });
  return heights;
};

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
  /** @deprecated Add a fixed first column on horizontal scroll. Use fixedFirstColumns={n} instead. */
  hasFixedFirstColumn?: boolean;
  /** Add fixed columns on horizontal scroll. */
  fixedFirstColumns?: number;
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
  private stickyTable = createRef<HTMLTableElement>();
  private stickyNav: HTMLDivElement | null = null;
  private headerNav: HTMLDivElement | null = null;
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
      // safari sometimes incorrectly sets the scrollwidth too large by 1px
      condensed = table.scrollWidth > scrollContainer.clientWidth + 1;
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
      hasFixedFirstColumn: fixedFirstColumn = false,
    } = this.props;
    const {
      condensed,
      columnVisibilityData,
      isScrolledFarthestLeft,
      isScrolledFarthestRight,
    } = this.state;

    if (fixedFirstColumn && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Deprecation: The `hasFixedFirstColumn` prop on the `DataTable` has been deprecated. Use fixedFirstColumns={n} instead.',
      );
    }

    const fixedFirstColumns = this.fixedFirstColumns();

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
            inFixedNthColumn: false,
            inStickyHeader: false,
          }),
        )}
      </tr>
    );

    const totalsMarkup = totals ? (
      <tr>{totals.map((total, index) => this.renderTotals({total, index}))}</tr>
    ) : null;

    const nthColumns = rows.map((row) => row.slice(0, fixedFirstColumns));
    const nthHeadings = headings.slice(0, fixedFirstColumns);
    const nthTotals = totals?.slice(0, fixedFirstColumns);
    const tableHeaderRows = this.table.current?.children[0].childNodes;
    const tableBodyRows = this.table.current?.children[1].childNodes;
    const headerRowHeights: number[] = getRowClientHeights(tableHeaderRows);
    const bodyRowHeights: number[] = getRowClientHeights(tableBodyRows);

    const fixedNthColumnMarkup = condensed && fixedFirstColumns !== 0 && (
      <table
        className={classNames(
          styles.FixedFirstColumn,
          !isScrolledFarthestLeft && styles.separate,
        )}
        style={{
          width: `${columnVisibilityData[fixedFirstColumns - 1]?.rightEdge}px`,
        }}
      >
        <thead>
          <tr style={{height: `${headerRowHeights[0]}px`}}>
            {nthHeadings.map((heading, index) =>
              this.renderHeading({
                heading,
                headingIndex: index,
                inFixedNthColumn: true,
                inStickyHeader: false,
              }),
            )}
          </tr>
          {totals && !showTotalsInFooter && (
            <tr style={{height: `${headerRowHeights[1]}px`}}>
              {nthTotals?.map((total, index) =>
                this.renderTotals({total, index}),
              )}
            </tr>
          )}
        </thead>
        <tbody>
          {nthColumns.map((row, index) =>
            this.defaultRenderRow({
              row,
              index,
              inFixedNthColumn: true,
              rowHeights: bodyRowHeights,
            }),
          )}
        </tbody>
        {totals && showTotalsInFooter && (
          <tfoot>
            <tr>
              {nthTotals?.map((total, index) =>
                this.renderTotals({total, index}),
              )}
            </tr>
          </tfoot>
        )}
      </table>
    );

    const bodyMarkup = rows.map((row, index) =>
      this.defaultRenderRow({
        row,
        index,
        inFixedNthColumn: false,
      }),
    );

    const footerMarkup = footerContent ? (
      <div className={styles.Footer}>{footerContent}</div>
    ) : null;

    const headerTotalsMarkup = !showTotalsInFooter ? totalsMarkup : null;
    const footerTotalsMarkup = showTotalsInFooter ? (
      <tfoot>{totalsMarkup}</tfoot>
    ) : null;

    const navigationMarkup = (location: 'sticky' | 'header') =>
      hideScrollIndicator ? null : (
        <Navigation
          columnVisibilityData={columnVisibilityData}
          isScrolledFarthestLeft={isScrolledFarthestLeft}
          isScrolledFarthestRight={isScrolledFarthestRight}
          navigateTableLeft={this.navigateTable('left')}
          navigateTableRight={this.navigateTable('right')}
          fixedFirstColumns={fixedFirstColumns}
          setRef={(ref: any) => {
            if (location === 'header') {
              this.headerNav = ref;
            } else if (location === 'sticky') {
              this.stickyNav = ref;
            }
          }}
        />
      );

    const stickyHeaderMarkup = stickyHeader ? (
      <AfterInitialMount>
        <div className={styles.StickyHeaderWrapper} role="presentation">
          <Sticky
            boundingElement={this.dataTable.current}
            onStickyChange={(isSticky) => {
              this.changeHeadingFocus();
              this.stickyHeaderActive = isSticky;
            }}
          >
            {(isSticky: boolean) => {
              const stickyHeaderInnerClassNames = classNames(
                styles.StickyHeaderInner,
                isSticky && styles['StickyHeaderInner-isSticky'],
              );
              const stickyHeaderTableClassNames = classNames(
                styles.StickyHeaderTable,
                !isScrolledFarthestLeft && styles.separate,
              );

              return (
                <div className={stickyHeaderInnerClassNames}>
                  <div>{navigationMarkup('sticky')}</div>
                  <table
                    className={stickyHeaderTableClassNames}
                    ref={this.stickyTable}
                  >
                    <thead>
                      <tr className={styles.StickyTableHeadingsRow}>
                        {headings.map((heading, index) => {
                          return this.renderHeading({
                            heading,
                            headingIndex: index,
                            inFixedNthColumn: Boolean(
                              index <= fixedFirstColumns - 1 &&
                                fixedFirstColumns,
                            ),
                            inStickyHeader: true,
                          });
                        })}
                      </tr>
                    </thead>
                  </table>
                </div>
              );
            }}
          </Sticky>
        </div>
      </AfterInitialMount>
    ) : null;

    return (
      <div className={wrapperClassName} ref={this.dataTable}>
        {stickyHeaderMarkup}
        {navigationMarkup('header')}
        <div className={className}>
          <div className={styles.ScrollContainer} ref={this.scrollContainer}>
            <EventListener event="resize" handler={this.handleResize} />
            <EventListener
              capture
              passive
              event="scroll"
              handler={this.scrollListener}
            />
            {fixedNthColumnMarkup}
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

  private fixedFirstColumns() {
    const {hasFixedFirstColumn, fixedFirstColumns = 0, headings} = this.props;
    const numberOfFixedFirstColumns =
      hasFixedFirstColumn && !fixedFirstColumns ? 1 : fixedFirstColumns;

    if (numberOfFixedFirstColumns >= headings.length) {
      return 0;
    }

    return numberOfFixedFirstColumns;
  }

  private setCellRef = ({
    ref,
    index,
    inStickyHeader,
  }: {
    ref: HTMLTableCellElement | null;
    index: number;
    inStickyHeader: boolean;
  }) => {
    if (ref == null) {
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
      this.tableHeadingWidths[index] = ref.clientWidth;
    }
  };

  private changeHeadingFocus = () => {
    const {tableHeadings, stickyHeadings, stickyNav, headerNav} = this;

    const stickyFocusedItemIndex = stickyHeadings.findIndex(
      (item) => item === document.activeElement?.parentElement,
    );

    const tableFocusedItemIndex = tableHeadings.findIndex(
      (item) => item === document.activeElement?.parentElement,
    );

    const arrowsInStickyNav = stickyNav?.querySelectorAll('button');
    const arrowsInHeaderNav = headerNav?.querySelectorAll('button');

    let stickyFocusedNavIndex = -1;

    arrowsInStickyNav?.forEach((item: HTMLButtonElement, index: number) => {
      if (item === document.activeElement) {
        stickyFocusedNavIndex = index;
      }
    });

    let headerFocusedNavIndex = -1;

    arrowsInHeaderNav?.forEach((item: HTMLButtonElement, index: number) => {
      if (item === document.activeElement) {
        headerFocusedNavIndex = index;
      }
    });

    if (
      stickyFocusedItemIndex < 0 &&
      tableFocusedItemIndex < 0 &&
      stickyFocusedNavIndex < 0 &&
      headerFocusedNavIndex < 0
    ) {
      return null;
    }

    let button;

    if (stickyFocusedItemIndex >= 0) {
      button = tableHeadings[stickyFocusedItemIndex].querySelector('button');
    } else if (tableFocusedItemIndex >= 0) {
      button = stickyHeadings[tableFocusedItemIndex].querySelector('button');
    }

    if (stickyFocusedNavIndex >= 0) {
      button = arrowsInHeaderNav?.[stickyFocusedNavIndex];
    } else if (headerFocusedNavIndex >= 0) {
      button = arrowsInStickyNav?.[headerFocusedNavIndex];
    }

    if (button == null) {
      return null;
    }

    button.style.visibility = 'visible';
    button.focus();
    button.style.removeProperty('visibility');
  };

  private calculateColumnVisibilityData = (condensed: boolean) => {
    const fixedFirstColumns = this.fixedFirstColumns();
    const {
      table: {current: table},
      scrollContainer: {current: scrollContainer},
      dataTable: {current: dataTable},
    } = this;
    const {stickyHeader} = this.props;

    if ((stickyHeader || condensed) && table && scrollContainer && dataTable) {
      const headerCells = table.querySelectorAll<HTMLTableCellElement>(
        headerCell.selector,
      );

      const rightMostHeader = headerCells[fixedFirstColumns - 1];
      const nthColumnWidth = fixedFirstColumns
        ? rightMostHeader.offsetLeft + rightMostHeader.offsetWidth
        : 0;

      if (headerCells.length > 0) {
        const firstVisibleColumnIndex = headerCells.length - 1;
        const tableLeftVisibleEdge =
          scrollContainer.scrollLeft + nthColumnWidth;

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

        const isScrolledFarthestLeft = fixedFirstColumns
          ? tableLeftVisibleEdge === nthColumnWidth
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
    const fixedFirstColumns = this.fixedFirstColumns();
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
    const nthColumnWidth =
      this.state.columnVisibilityData.length > 0
        ? this.state.columnVisibilityData[fixedFirstColumns]?.rightEdge
        : 0;
    const currentColumnLeftEdge = currentCell.offsetLeft;
    const currentColumnRightEdge =
      currentCell.offsetLeft + currentCell.offsetWidth;

    if (tableScrollLeft > currentColumnLeftEdge - nthColumnWidth) {
      this.scrollContainer.current.scrollLeft =
        currentColumnLeftEdge - nthColumnWidth;
    }

    if (currentColumnRightEdge > tableRightEdge) {
      this.scrollContainer.current.scrollLeft =
        currentColumnRightEdge - tableViewableWidth;
    }
  };

  private stickyHeaderScrolling = () => {
    const {current: stickyTable} = this.stickyTable;
    const {current: scrollContainer} = this.scrollContainer;

    if (stickyTable == null || scrollContainer == null) {
      return;
    }

    stickyTable.scrollLeft = scrollContainer.scrollLeft;
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
    const fixedFirstColumns = this.fixedFirstColumns();
    if (this.scrollContainer.current == null || event.target == null) {
      return;
    }
    const currentCell = event.target.parentNode as HTMLTableCellElement;
    const fixedNthColumn = this.props;
    const nthColumnWidth = fixedNthColumn
      ? this.state.columnVisibilityData[fixedFirstColumns]?.rightEdge
      : 0;
    const currentColumnLeftEdge = currentCell.offsetLeft;
    const desiredScrollLeft = currentColumnLeftEdge - nthColumnWidth;

    if (this.scrollContainer.current.scrollLeft > desiredScrollLeft) {
      this.scrollContainer.current.scrollLeft = desiredScrollLeft;
    }

    // focus fixed first column if present
  };

  private navigateTable = (direction: string) => {
    const fixedFirstColumns = this.fixedFirstColumns();
    const {currentColumn, previousColumn} = this.state;
    const nthColumnWidth =
      this.state.columnVisibilityData[fixedFirstColumns - 1]?.rightEdge;
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
      if (fixedFirstColumns) {
        newScrollLeft =
          direction === 'right'
            ? prevWidths - nthColumnWidth + currentColumn.width
            : prevWidths - previousColumn.width - nthColumnWidth;
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
    inFixedNthColumn,
    inStickyHeader,
  }: {
    heading: string | ReactNode;
    headingIndex: number;
    inFixedNthColumn: boolean;
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
    const fixedFirstColumns = this.fixedFirstColumns();

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
        fixedNthColumn: fixedFirstColumns,
        inFixedNthColumn: fixedFirstColumns,
      };
    }

    const stickyCellWidth = inStickyHeader
      ? this.tableHeadingWidths[headingIndex]
      : undefined;

    const fixedCellVisible = !isScrolledFarthestLeft;

    const cellProps = {
      header: true,
      stickyHeadingCell: inStickyHeader,
      content: heading,
      contentType: columnContentTypes[headingIndex],
      nthColumn: headingIndex < fixedFirstColumns,
      fixedFirstColumns,
      truncate,
      headingIndex,
      ...sortableHeadingProps,
      verticalAlign,
      handleFocus: this.handleFocus,
      stickyCellWidth,
      fixedCellVisible,
      firstColumnMinWidth,
    };

    if (inFixedNthColumn && inStickyHeader) {
      // need two cells for fixed first column (actual cell and the overlapping one)
      // the sticky cell is second so that the index is associated with the sticky
      // cell and not the underlying one. This helps `changeHeadingFocus` to put
      // focus on the right cell when switching from sticky to non-sticky headers
      return [
        <Cell
          key={id}
          {...cellProps}
          setRef={(ref: any) => {
            this.setCellRef({
              ref,
              index: headingIndex,
              inStickyHeader,
            });
          }}
          inFixedNthColumn={false}
        />,
        <Cell
          key={`${id}-sticky`}
          {...cellProps}
          setRef={(ref: any) => {
            this.setCellRef({
              ref,
              index: headingIndex,
              inStickyHeader,
            });
          }}
          inFixedNthColumn={Boolean(fixedFirstColumns)}
          lastFixedFirstColumn={headingIndex === fixedFirstColumns - 1}
          style={{
            left: this.state.columnVisibilityData[headingIndex]?.leftEdge,
          }}
        />,
      ];
    }

    return (
      <Cell
        key={id}
        {...cellProps}
        setRef={(ref: any) => {
          this.setCellRef({
            ref,
            index: headingIndex,
            inStickyHeader,
          });
        }}
        lastFixedFirstColumn={headingIndex === fixedFirstColumns - 1}
        inFixedNthColumn={inFixedNthColumn}
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
  private renderTotals = ({
    total,
    index,
  }: {
    total: TableData;
    index: number;
  }) => {
    const fixedFirstColumns = this.fixedFirstColumns();
    const id = `totals-cell-${index}`;
    const {truncate = false, verticalAlign, columnContentTypes} = this.props;

    let content;
    let contentType;

    if (index === 0) {
      content = this.totalsRowHeading();
    }

    if (total !== '' && index > 0) {
      contentType = columnContentTypes[index];
      content = total;
    }

    const totalInFooter = this.props.showTotalsInFooter;

    return (
      <Cell
        total
        totalInFooter={totalInFooter}
        nthColumn={index <= fixedFirstColumns - 1}
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
    // We decided that it shouldn't be possible to have fixed "n" columns and content that spans multiple columns
    const fixedFirstColumns = this.fixedFirstColumns();
    if (fixedFirstColumns) {
      return 1;
    }
    const rowLen = rowLength ? rowLength : 1;
    const colLen = headingsLength ? headingsLength : contentTypesLength;
    const colSpan = Math.floor(colLen / rowLen);
    const remainder = colLen % rowLen;
    return cellIndex === 0 ? colSpan + remainder : colSpan;
  };

  private defaultRenderRow = ({
    row,
    index,
    inFixedNthColumn,
    rowHeights,
  }: {
    row: TableData[];
    index: number;
    inFixedNthColumn: boolean;
    rowHeights?: number[];
  }) => {
    const {
      columnContentTypes,
      truncate = false,
      verticalAlign,
      hoverable = true,
      headings,
    } = this.props;
    const {condensed} = this.state;
    const fixedFirstColumns = this.fixedFirstColumns();
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
              nthColumn={cellIndex <= fixedFirstColumns - 1}
              firstColumn={cellIndex === 0}
              truncate={truncate}
              verticalAlign={verticalAlign}
              colSpan={colSpan}
              hovered={hovered}
              style={rowHeights ? {height: `${rowHeights[index]}px`} : {}}
              inFixedNthColumn={condensed && inFixedNthColumn}
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
