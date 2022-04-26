import React, {useRef} from 'react';
import {CaretUpMinor, CaretDownMinor} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {headerCell} from '../../../shared';
import {Icon} from '../../../Icon';
import type {SortDirection, VerticalAlign} from '../../types';
import styles from '../../DataTable.scss';

export interface CellProps {
  content?: React.ReactNode;
  contentType?: string;
  firstColumn?: boolean;
  truncate?: boolean;
  header?: boolean;
  total?: boolean;
  totalInFooter?: boolean;
  sorted?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  defaultSortDirection?: SortDirection;
  verticalAlign?: VerticalAlign;
  onSort?(): void;
  colSpan?: number;
  setRef?: (ref: HTMLTableCellElement | null) => void;
  stickyHeadingCell?: boolean;
  stickyCellWidth?: number;
  key?: string;
  hovered?: boolean;
  firstColWidth?: number;
  visibility?: boolean;
}

export function Cell({
  content,
  contentType,
  firstColumn,
  truncate,
  header,
  total,
  totalInFooter,
  sorted,
  sortable,
  sortDirection,
  isFixedFirstColumn,
  verticalAlign = 'top',
  defaultSortDirection = 'ascending',
  onSort,
  colSpan,
  setRef = () => {},
  stickyHeadingCell = false,
  stickyCellWidth,
  key,
  hovered = false,
  firstColWidth,
  visibility,
  scrollContainer,
  colLeftEdge,
}: CellProps) {
  const i18n = useI18n();
  const numeric = contentType === 'numeric';
  const cellRef = useRef(null);
  const handleFocus = () => {
    if (!visibility) {
      // scrollContainer.current.scrollLeft = colLeftEdge - firstColWidth;
      scrollContainer.current.clientWidth < colLeftEdge
        ? colLeftEdge - firstColWidth
        : (scrollContainer.current.scrollLeft = 0);
    }
  };
  const className = classNames(
    styles.Cell,
    styles[`Cell-${variationName('verticalAlign', verticalAlign)}`],
    firstColumn && styles['Cell-firstColumn'],
    firstColumn && truncate && styles['Cell-truncated'],
    header && styles['Cell-header'],
    total && styles['Cell-total'],
    totalInFooter && styles['Cell-total-footer'],
    numeric && styles['Cell-numeric'],
    sortable && styles['Cell-sortable'],
    sorted && styles['Cell-sorted'],
    stickyHeadingCell && styles.StickyHeaderCell,
    hovered && styles['Cell-hovered'],
  );

  const headerClassName = classNames(
    header && styles.Heading,
    header && contentType === 'text' && styles['Heading-left'],
  );

  const iconClassName = classNames(sortable && styles.Icon);
  const direction =
    sorted && sortDirection ? sortDirection : defaultSortDirection;
  const source = direction === 'descending' ? CaretDownMinor : CaretUpMinor;
  const oppositeDirection =
    sortDirection === 'ascending' ? 'descending' : 'ascending';

  const sortAccessibilityLabel = i18n.translate(
    'Polaris.DataTable.sortAccessibilityLabel',
    {direction: sorted ? oppositeDirection : direction},
  );

  const iconMarkup = (
    <span className={iconClassName}>
      <Icon source={source} accessibilityLabel={sortAccessibilityLabel} />
    </span>
  );

  const sortableHeadingContent = (
    <button
      className={headerClassName}
      onClick={onSort}
      onFocus={handleFocus}
      ref={cellRef}
      tabIndex={isFixedFirstColumn ? -1 : 0}
    >
      {iconMarkup}
      {content}
    </button>
  );

  const columnHeadingContent = sortable ? sortableHeadingContent : content;

  const colSpanProp = colSpan && colSpan > 1 ? {colSpan} : {};

  const stickyHeading = (
    <div
      ref={setRef}
      {...headerCell.props}
      {...colSpanProp}
      className={className}
      aria-sort={sortDirection}
      style={{
        width: stickyCellWidth,
      }}
      data-index-table-sticky-heading
    >
      {columnHeadingContent}
    </div>
  );

  const headingMarkup = header ? (
    <th
      {...headerCell.props}
      {...colSpanProp}
      ref={setRef}
      className={className}
      scope="col"
      aria-sort={sortDirection}
    >
      {columnHeadingContent}
    </th>
  ) : (
    <th className={className} scope="row" {...colSpanProp}>
      {content}
    </th>
  );

  const cellMarkup =
    header || firstColumn ? (
      headingMarkup
    ) : (
      <td className={className} {...colSpanProp}>
        {content}
      </td>
    );

  return stickyHeadingCell ? stickyHeading : cellMarkup;
}
