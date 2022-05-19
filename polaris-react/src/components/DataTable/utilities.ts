import type {DataTableState} from './types';

interface TableMeasurements {
  firstVisibleColumnIndex: number;
  tableLeftVisibleEdge: number;
  tableRightVisibleEdge: number;
}

export function measureColumn(tableData: TableMeasurements) {
  return function (column: HTMLElement, index: number) {
    const {
      firstVisibleColumnIndex,
      tableLeftVisibleEdge: tableStart,
      tableRightVisibleEdge: tableEnd,
    } = tableData;

    const leftEdge = column.offsetLeft;
    const rightEdge = leftEdge + column.offsetWidth;
    const isVisibleLeft = isEdgeVisible(leftEdge, tableStart, tableEnd);
    const isVisibleRight = isEdgeVisible(rightEdge, tableStart, tableEnd);
    const isVisible = isVisibleLeft || isVisibleRight;

    if (isVisible) {
      tableData.firstVisibleColumnIndex = Math.min(
        firstVisibleColumnIndex,
        index,
      );
    }

    return {leftEdge, rightEdge, isVisible};
  };
}

export function isEdgeVisible(position: number, start: number, end: number) {
  const minVisiblePixels = 30;

  return (
    position >= start + minVisiblePixels && position <= end - minVisiblePixels
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
