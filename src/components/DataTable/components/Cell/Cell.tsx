import React from 'react';
import {CaretUpMinor, CaretDownMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {useI18n} from '../../../../utilities/i18n';
import {headerCell} from '../../../shared';
import Icon from '../../../Icon';
import {SortDirection} from '../../types';

import styles from '../../DataTable.scss';

export interface Props {
  content?: React.ReactNode;
  contentType?: string;
  firstColumn?: boolean;
  truncate?: boolean;
  header?: boolean;
  total?: boolean;
  sorted?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  defaultSortDirection?: SortDirection;
  onSort?(): void;
}

export default function Cell({
  content,
  contentType,
  firstColumn,
  truncate,
  header,
  total,
  sorted,
  sortable,
  sortDirection,
  defaultSortDirection = 'ascending',
  onSort,
}: Props) {
  const {translate} = useI18n();
  const numeric = contentType === 'numeric';
  const className = classNames(
    styles.Cell,
    firstColumn && styles['Cell-firstColumn'],
    firstColumn && truncate && styles['Cell-truncated'],
    header && styles['Cell-header'],
    total && styles['Cell-total'],
    numeric && styles['Cell-numeric'],
    sortable && styles['Cell-sortable'],
    sorted && styles['Cell-sorted'],
  );

  const headerClassName = classNames(
    header && styles.Heading,
    header && contentType === 'text' && styles['Heading-left'],
  );

  const iconClassName = classNames(sortable && styles.Icon);
  const direction = sorted ? sortDirection : defaultSortDirection;
  const source = direction === 'descending' ? CaretDownMinor : CaretUpMinor;
  const oppositeDirection =
    sortDirection === 'ascending' ? 'descending' : 'ascending';

  const sortAccessibilityLabel = translate(
    'Polaris.DataTable.sortAccessibilityLabel',
    {direction: sorted ? oppositeDirection : direction},
  );

  const iconMarkup = (
    <span className={iconClassName}>
      <Icon source={source} accessibilityLabel={sortAccessibilityLabel} />
    </span>
  );

  const sortableHeadingContent = (
    <button className={headerClassName} onClick={onSort}>
      {iconMarkup}
      {content}
    </button>
  );

  const columnHeadingContent = sortable ? sortableHeadingContent : content;

  const headingMarkup = header ? (
    <th
      {...headerCell.props}
      className={className}
      scope="col"
      aria-sort={sortDirection}
    >
      {columnHeadingContent}
    </th>
  ) : (
    <th className={className} scope="row">
      {content}
    </th>
  );

  const cellMarkup =
    header || firstColumn ? (
      headingMarkup
    ) : (
      <td className={className}>{content}</td>
    );

  return cellMarkup;
}
