import type {ColumnVisibilityData, DataTableState} from './types';

interface TableMeasurements {
  firstVisibleColumnIndex: number;
  tableLeftVisibleEdge: number;
  tableRightVisibleEdge: number;
}

export function measureColumn(tableData: TableMeasurements) {
  return function (column: HTMLElement, index: number): ColumnVisibilityData {
    const {
      firstVisibleColumnIndex,
      tableLeftVisibleEdge: tableStart,
      tableRightVisibleEdge: tableEnd,
    } = tableData;

    const leftEdge = column.offsetLeft;
    const rightEdge = leftEdge + column.offsetWidth;
    const isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd, 'left');
    const isVisibleRight = isEdgeVisible(
      rightEdge,
      tableStart,
      tableEnd,
      'right',
    );
    const isVisible = isVisibleLeft || isVisibleRight;
    const width = column.offsetWidth;

    if (isVisible) {
      tableData.firstVisibleColumnIndex = Math.min(
        firstVisibleColumnIndex,
        index,
      );
    }
    return {leftEdge, rightEdge, isVisible, width, index};
  };
}

export function isEdgeVisible(
  position: number,
  start: number,
  end: number,
  edgeType: string,
) {
  const minVisiblePixels = 30;

  return (
    position >= start + (edgeType === 'left' ? 0 : minVisiblePixels) &&
    position <= end - minVisiblePixels
  );
}

export function getPrevAndCurrentColumns(
  tableData: TableMeasurements,
  columnData: DataTableState['columnVisibilityData'],
) {
  const {firstVisibleColumnIndex} = tableData;
  const previousColumnIndex = Math.max(firstVisibleColumnIndex - 1, 0);
  const previousColumn = columnData[previousColumnIndex];
  const currentColumn = columnData[firstVisibleColumnIndex];

  return {previousColumn, currentColumn};
}
