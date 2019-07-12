import * as React from 'react';
import {CaretUpMinor, CaretDownMinor} from '@shopify/polaris-icons';
import {classNames, variationName} from '@shopify/css-utilities';

import {headerCell} from '../../../shared';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Icon from '../../../Icon';
import {SortDirection, VerticalAlign} from '../../types';

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
  verticalAlign?: VerticalAlign;
  onSort?(): void;
}

type CombinedProps = Props & WithAppProviderProps;

function Cell({
  content,
  contentType,
  firstColumn,
  truncate,
  header,
  total,
  sorted,
  sortable,
  sortDirection,
  verticalAlign = 'top',
  defaultSortDirection = 'ascending',
  polaris: {
    intl: {translate},
  },
  onSort,
}: CombinedProps) {
  const numeric = contentType === 'numeric';
  const className = classNames(
    styles.Cell,
    styles[`Cell-${variationName('verticalAlign', verticalAlign)}`],
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

export default withAppProvider<Props>()(Cell);
