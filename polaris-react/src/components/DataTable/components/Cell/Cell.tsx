import React, {useRef} from 'react';
import type {FocusEventHandler} from 'react';
import {SortAscendingIcon, SortDescendingIcon} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {headerCell} from '../../../shared';
import {Icon} from '../../../Icon';
import type {SortDirection, VerticalAlign} from '../../types';
import styles from '../../DataTable.module.scss';
import {Tooltip} from '../../../Tooltip';

export interface CellProps {
  content?: React.ReactNode;
  contentType?: string;
  nthColumn?: boolean;
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
  hovered?: boolean;
  handleFocus?: FocusEventHandler;
  inFixedNthColumn?: boolean;
  hasFixedNthColumn?: boolean;
  fixedCellVisible?: boolean;
  firstColumnMinWidth?: string;
  style?: React.CSSProperties;
  lastFixedFirstColumn?: boolean;
}

export function Cell({
  content,
  contentType,
  nthColumn,
  firstColumn,
  truncate,
  header,
  total,
  totalInFooter,
  sorted,
  sortable,
  sortDirection,
  inFixedNthColumn,
  verticalAlign = 'top',
  defaultSortDirection = 'ascending',
  onSort,
  colSpan,
  setRef = () => {},
  stickyHeadingCell = false,
  stickyCellWidth,
  hovered = false,
  handleFocus = () => {},
  hasFixedNthColumn = false,
  fixedCellVisible = false,
  firstColumnMinWidth,
  style,
  lastFixedFirstColumn,
}: CellProps) {
  const i18n = useI18n();
  const numeric = contentType === 'numeric';

  const className = classNames(
    styles.Cell,
    styles[`Cell-${variationName('verticalAlign', verticalAlign)}`],
    firstColumn && styles['Cell-firstColumn'],
    truncate && styles['Cell-truncated'],
    header && styles['Cell-header'],
    total && styles['Cell-total'],
    totalInFooter && styles['Cell-total-footer'],
    numeric && styles['Cell-numeric'],
    sortable && styles['Cell-sortable'],
    sorted && styles['Cell-sorted'],
    stickyHeadingCell && styles.StickyHeaderCell,
    hovered && styles['Cell-hovered'],
    lastFixedFirstColumn &&
      inFixedNthColumn &&
      fixedCellVisible &&
      styles['Cell-separate'],
    nthColumn &&
      inFixedNthColumn &&
      stickyHeadingCell &&
      styles.FixedFirstColumn,
  );

  const headerClassName = classNames(
    header && styles.Heading,
    header && contentType === 'text' && styles['Heading-left'],
  );

  const iconClassName = classNames(sortable && styles.Icon);
  const direction =
    sorted && sortDirection ? sortDirection : defaultSortDirection;
  const source =
    direction === 'descending' ? SortDescendingIcon : SortAscendingIcon;
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

  const focusable = !(
    stickyHeadingCell &&
    hasFixedNthColumn &&
    nthColumn &&
    !inFixedNthColumn
  );

  const sortableHeadingContent = (
    <button
      className={headerClassName}
      onClick={onSort}
      onFocus={handleFocus}
      tabIndex={focusable ? 0 : -1}
    >
      {iconMarkup}
      {content}
    </button>
  );

  const columnHeadingContent = sortable ? sortableHeadingContent : content;

  const colSpanProp = colSpan && colSpan > 1 ? {colSpan} : {};

  const minWidthStyles =
    nthColumn && firstColumnMinWidth
      ? {minWidth: firstColumnMinWidth}
      : {minWidth: stickyCellWidth};

  const stickyHeading = (
    <th
      ref={setRef}
      {...headerCell.props}
      {...colSpanProp}
      className={className}
      aria-sort={sortDirection}
      style={{
        ...style,
        ...minWidthStyles,
      }}
      data-index-table-sticky-heading
    >
      {columnHeadingContent}
    </th>
  );
  const headingMarkup = header ? (
    <th
      {...headerCell.props}
      aria-sort={sortDirection}
      {...colSpanProp}
      ref={setRef}
      className={className}
      scope="col"
      style={{...minWidthStyles}}
    >
      {columnHeadingContent}
    </th>
  ) : (
    <th
      {...colSpanProp}
      ref={setRef}
      className={className}
      scope="row"
      style={{...minWidthStyles}}
    >
      {truncate ? (
        <TruncatedText className={styles.TooltipContent}>
          {content}
        </TruncatedText>
      ) : (
        content
      )}
    </th>
  );

  const cellMarkup =
    header || firstColumn || nthColumn ? (
      headingMarkup
    ) : (
      <td className={className} {...colSpanProp}>
        {content}
      </td>
    );

  return stickyHeadingCell ? stickyHeading : cellMarkup;
}

const TruncatedText = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const textRef = useRef<any | null>(null);
  const {current} = textRef;
  const text = (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );

  return current?.scrollWidth > current?.offsetWidth ? (
    <Tooltip content={textRef.current.innerText}>{text}</Tooltip>
  ) : (
    text
  );
};
