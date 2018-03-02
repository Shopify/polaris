import * as React from 'react';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';

import EventListener from '../EventListener';
import Cell, {Props as CellProps} from './Cell';
import Navigation from './Navigation';

import * as styles from './DataTable.scss';

export type TableRow = Props['headings'] | Props['rows'] | Props['totals'];
export type TableData = string | number | React.ReactNode;
export type SortDirection = 'ascending' | 'descending' | 'none';
export type ColumnContentType = 'text' | 'numeric';

export interface ColumnVisibilityData {
  leftEdge: number,
  rightEdge: number,
  isVisible: boolean,
  isScrolledFarthestLeft?: boolean,
  isScrolledFarthestRight?: boolean,
}

interface TableMeasurements {
  tableLeftVisibleEdge: number,
  tableRightVisibleEdge: number,
  firstVisibleColumnIndex: number,
  fixedColumnWidth: number,
}

export interface Props {
  columnContentTypes: ColumnContentType[],
  headings: string[],
  totals?: TableData[],
  rows: TableData[][],
  footerContent?: TableData,
  sortable?: boolean[],
  defaultSortDirection?: SortDirection,
  initialSortColumnIndex?: number,
  onSort?(headingIndex: number, direction: SortDirection): void,
}

export interface State {
  collapsed: boolean,
  columnVisibilityData: ColumnVisibilityData[],
  previousColumn?: ColumnVisibilityData,
  currentColumn?: ColumnVisibilityData,
  sorted?: boolean,
  sortedColumnIndex?: number,
  sortDirection?: SortDirection,
}

export default class DataTable extends React.PureComponent<Props, State> {

  state: State = {
    collapsed: false,
    columnVisibilityData: [],
    sorted: (this.props.sortable && this.props.sortable.length > 0),
  };

  private dataTable: HTMLElement;
  private scrollContainer: HTMLElement;
  private table: HTMLElement;

  componentDidMount() {
    // We need to defer the calculation in development so the styles have time to be injected.
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        this.handleResize();
      }, 10);
    }
  }

  render() {

    const {
      headings,
      totals,
      rows,
      footerContent,
      sortable,
      defaultSortDirection = 'ascending',
      initialSortColumnIndex = 0,
    } = this.props;

    const {
      collapsed,
      columnVisibilityData,
      currentColumn,
      sortedColumnIndex = initialSortColumnIndex,
      sortDirection = defaultSortDirection,
    } = this.state;

    const className = classNames(
      styles.DataTable,
      collapsed && styles.collapsed,
      footerContent && styles['hasFooter'],
    );

    const footerClassName = classNames(
      footerContent && styles.TableFoot,
    );

    const footerMarkup = footerContent
      ? (
        <tfoot className={footerClassName}>
          <tr>{this.renderFooter()}</tr>
        </tfoot>
      )
      : null;

    const totalsMarkup = totals
      ? <tr>{insertPresentationalCell(totals).map(renderTotals)}</tr>
      : null;

    const headingMarkup = (
      <tr>
        {insertPresentationalCell(headings).map((heading, headingIndex) => {
          let sortableHeadingProps = {};
          const id = `heading-cell-${headingIndex}`;
          // we account for the presentational heading cell's index when accessing elements from arrays passed as props and when comparing a heading index with the sorted column's index
          const index = headingIndex <= 1 ? headingIndex : headingIndex - 1;
          const contentTypes = this.getContentTypes();

          if (sortable) {
            const isSortable = sortable[index];
            const isSorted = isSortable && (sortedColumnIndex === index);
            const direction = isSorted && sortedColumnIndex === index
              ? sortDirection
              : 'none';

            sortableHeadingProps = {
              sorted: isSorted,
              sortable: isSortable,
              sortDirection: direction,
              defaultSortDirection,
            };
          }

          return (
            <Cell
              header
              key={id}
              testID={id}
              content={heading}
              contentType={contentTypes[headingIndex]}
              fixed={headingIndex === 0}
              presentational={headingIndex === 1}
              {...sortableHeadingProps}
              onSort={this.defaultOnSort(index)}
            />
          );
        })}
      </tr>
    );

    const bodyMarkup = rows.map(this.defaultRenderRow);

    return (
      <div className={className} ref={this.setDataTable}>
        <div className={styles.Navigation}>
          <Navigation
            currentColumn={currentColumn}
            columnVisibilityData={columnVisibilityData}
            navigateTableLeft={this.navigateTable('left')}
            navigateTableRight={this.navigateTable('right')}
          />
        </div>
        <div className={styles.ScrollContainer} ref={this.setScrollContainer}>
          <EventListener event="resize" handler={this.handleResize} />
          <EventListener capture event="scroll" handler={this.scrollListener} />
          <table className={styles.TableWrapper} ref={this.setTable}>
            <thead>
              {headingMarkup}
              {totalsMarkup}
            </thead>
            <tbody>{bodyMarkup}</tbody>
            {footerMarkup}
          </table>
        </div>
      </div>
    );
  }

  @autobind
  private setDataTable(dataTable: HTMLDivElement) {
    this.dataTable = dataTable;
  }

  @autobind
  private setScrollContainer(scrollContainer: HTMLDivElement) {
    this.scrollContainer = scrollContainer;
  }

  @autobind
  private setTable(table: HTMLTableElement) {
    this.table = table;
  }

  @autobind
  private handleResize() {
    const collapsed = this.table.scrollWidth > this.dataTable.offsetWidth;
    this.scrollContainer.scrollLeft = 0;
    this.setState({
      collapsed,
      ...this.calculateColumnVisibilityData(collapsed),
    });
  }

  @autobind
  private calculateColumnVisibilityData(collapsed: boolean) {
    if (collapsed) {
      const headerCells = this.table.querySelectorAll('[class*=header]') as NodeListOf<HTMLElement>;
      const collapsedHeaderCells = Array.from(headerCells).slice(2);
      const fixedColumnWidth = headerCells[0].offsetWidth;
      const tableData = {
        fixedColumnWidth,
        firstVisibleColumnIndex: collapsedHeaderCells.length - 1,
        tableLeftVisibleEdge: this.scrollContainer.scrollLeft,
        tableRightVisibleEdge: this.scrollContainer.scrollLeft + (this.dataTable.offsetWidth - fixedColumnWidth),
      };
      const columnVisibilityData = collapsedHeaderCells.map(measureColumn(tableData));

      return {columnVisibilityData, ...getPrevAndCurrentColumns(tableData, columnVisibilityData)};
    }

    return {
      columnVisibilityData: [],
      previousColumn: undefined,
      currentColumn: undefined,
    };
  }

  @autobind
  private scrollListener() {
    this.setState({
      ...this.calculateColumnVisibilityData(this.state.collapsed),
    });
  }

  @autobind
  private navigateTable(direction: string) {
    const {scrollContainer} = this;
    const {currentColumn, previousColumn} = this.state;

    const handleScroll = () => {
      if (direction === 'right' && currentColumn) {
        scrollContainer.scrollLeft = currentColumn.rightEdge;
      } else if (previousColumn) {
        scrollContainer.scrollLeft = previousColumn.leftEdge < 10 ? 0 : previousColumn.leftEdge;
      }

      requestAnimationFrame(() => {
        this.setState({
          ...this.calculateColumnVisibilityData(this.state.collapsed),
        });
      });
    };

    return handleScroll;
  }

  @autobind
  private getContentTypes() {
    const {columnContentTypes} = this.props;
    const fixedCellType = columnContentTypes[0];

    return [fixedCellType, ...columnContentTypes];
  }

  @autobind
  private defaultRenderRow(row: TableData[], index: number) {
    const className = classNames(styles.TableRow);
    const contentTypes = this.getContentTypes();

    return (
      <tr key={`row-${index}`} className={className}>
        {insertPresentationalCell(row).map((content: CellProps['content'], cellIndex: number) => {
          const id = `cell-${cellIndex}-row-${index}`;
          return (
            <Cell
              key={id}
              testID={id}
              content={content}
              contentType={contentTypes[cellIndex]}
              fixed={cellIndex === 0}
              presentational={cellIndex === 1}
            />
          );
        })}
      </tr>
    );
  }

  @autobind
  private renderFooter() {
    return (
      <Cell
        total
        testID="footer-cell"
        content={this.props.footerContent}
      />
    );
  }

  @autobind
  private defaultOnSort(headingIndex: number) {
    const {onSort, defaultSortDirection = 'ascending', initialSortColumnIndex} = this.props;
    const {sortDirection, sortedColumnIndex = initialSortColumnIndex} = this.state;
    let newSortDirection = defaultSortDirection;

    if (sortedColumnIndex === headingIndex) {
      newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending';
    }

    const handleSort = () => {
      this.setState(
        {
          sorted: true,
          sortDirection: newSortDirection,
          sortedColumnIndex: headingIndex,
        },
        () => { if (onSort) { onSort(headingIndex, newSortDirection); } },
      );
    };

    return handleSort;
  }
}

function insertPresentationalCell(arr: TableRow = []) {
  const fixedCell = arr[0];
  const presentationalCell = '';
  return [fixedCell, presentationalCell, ...arr.slice(1)];
}

function renderTotals(totals: TableData, index ?: number) {
  const id = `totals-cell-${index}`;
  return (
    totals === '' && index !== undefined
      ? renderFirstTwoTotalsCells(index)
      : (
        <Cell
          total
          testID={id}
          key={id}
          contentType="numeric"
          content={totals}
        />
      )
  );
}

function renderFirstTwoTotalsCells(index: number) {
  // i18n string variable
  const totalsRowHeading = 'Totals';
  const id = `totals-cell-${index}`;

  if (index === 0) {
    return (
      <Cell
        fixed
        total
        testID={id}
        key={id}
        contentType="numeric"
        content={totalsRowHeading}
      />
    );
  }

  if (index === 1) { return <Cell testID={id} key={id} presentational />; }

  return (
    <Cell
      total
      testID={id}
      key={id}
      contentType="numeric"
    />
  );
}

function measureColumn(tableData: TableMeasurements) {
  return function(column: HTMLElement, index: number) {
    const {
      tableLeftVisibleEdge,
      tableRightVisibleEdge,
      firstVisibleColumnIndex,
      fixedColumnWidth,
    } = tableData;

    const width = column.offsetWidth;
    const leftEdge = column.offsetLeft - fixedColumnWidth;
    const rightEdge = leftEdge + width;
    const leftEdgeIsVisible = isEdgeVisible(leftEdge, tableLeftVisibleEdge, tableRightVisibleEdge);
    const rightEdgeIsVisible = isEdgeVisible(rightEdge, tableLeftVisibleEdge, tableRightVisibleEdge);
    const isCompletelyVisible = (
      leftEdge < tableLeftVisibleEdge &&
      rightEdge > tableRightVisibleEdge
    );

    const isVisible = isCompletelyVisible || leftEdgeIsVisible || rightEdgeIsVisible;
    if (isVisible) { tableData.firstVisibleColumnIndex = Math.min(firstVisibleColumnIndex, index); }

    return {leftEdge, rightEdge, isVisible};
  };
}

function isEdgeVisible(target: number, start: number, end: number) {
  const minVisiblePixels = 30;

  return (
    target >= (start + minVisiblePixels) &&
    target <= (end - minVisiblePixels)
  );
}

function getPrevAndCurrentColumns(tableData: TableMeasurements, columnData: State['columnVisibilityData']) {
  const {tableRightVisibleEdge, tableLeftVisibleEdge, firstVisibleColumnIndex} = tableData;
  const previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
  const previousColumn = columnData[previousColumnIndex];
  const lastColumnIndex = columnData.length - 1;
  const lastColumn = columnData[lastColumnIndex];
  const currentColumn = {
    isScrolledFarthestLeft: firstVisibleColumnIndex === 0 && tableLeftVisibleEdge === 0,
    isScrolledFarthestRight: lastColumn.rightEdge <= tableRightVisibleEdge,
    ...columnData[firstVisibleColumnIndex],
  };

  return {previousColumn, currentColumn};
}
