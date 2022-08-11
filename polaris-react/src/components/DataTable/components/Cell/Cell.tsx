import React, {FocusEventHandler, useRef} from 'react';
import {SortAscendingMajor, SortDescendingMajor} from '@shopify/polaris-icons';

import {classNames, variationName} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {headerCell} from '../../../shared';
import {Icon} from '../../../Icon';
import type {SortDirection, VerticalAlign} from '../../types';
import styles from '../../DataTable.scss';
import {Tooltip} from '../../../Tooltip';

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
  hovered?: boolean;
  handleFocus?: FocusEventHandler;
  inFixedFirstColumn?: boolean;
  hasFixedFirstColumn?: boolean;
  fixedCellVisible?: boolean;
  firstColumnMinWidth?: string;
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
  inFixedFirstColumn,
  verticalAlign = 'top',
  defaultSortDirection = 'ascending',
  onSort,
  colSpan,
  setRef = () => {},
  stickyHeadingCell = false,
  stickyCellWidth,
  hovered = false,
  handleFocus = () => {},
  hasFixedFirstColumn = false,
  fixedCellVisible = false,
  firstColumnMinWidth,
}: CellProps) {
  const i18n = useI18n();
  const numeric = contentType === 'numeric';

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
    fixedCellVisible && styles.separate,
    firstColumn &&
      inFixedFirstColumn &&
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
    direction === 'descending' ? SortDescendingMajor : SortAscendingMajor;
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
    hasFixedFirstColumn &&
    firstColumn &&
    !inFixedFirstColumn
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

  const stickyHeading = (
    <th
      ref={setRef}
      {...headerCell.props}
      {...colSpanProp}
      className={className}
      aria-sort={sortDirection}
      style={
        firstColumn && firstColumnMinWidth
          ? {minWidth: firstColumnMinWidth}
          : {minWidth: stickyCellWidth}
      }
      data-index-table-sticky-heading
    >
      {columnHeadingContent}
    </th>
  );
  const headingMarkup = header ? (
    <th
      {...headerCell.props}
      {...colSpanProp}
      ref={setRef}
      className={className}
      scope="col"
      aria-sort={sortDirection}
      style={firstColumn ? {minWidth: firstColumnMinWidth} : {}}
    >
      {columnHeadingContent}
    </th>
  ) : (
    <th
      style={{minWidth: firstColumnMinWidth}}
      className={className}
      scope="row"
      {...colSpanProp}
      ref={(ref) => {
        setRef(ref);
      }}
    >
      <TruncatedText className={styles.TooltipContent}>{content}</TruncatedText>
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

  // const handleCellFocus = (event: React.FocusEvent<HTMLElement>) => {
  //   const anchor = containerRef?.current?.querySelector('a');

  //   if (anchor === event.target) {
  //     setIsFocused(true);
  //   }

  //   setShowTooltip(true);
  // });

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
