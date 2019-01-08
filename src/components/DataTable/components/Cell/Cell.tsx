import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {headerCell} from '../../../shared';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Icon, {IconSource} from '../../../Icon';
import {SortDirection} from '../../types';

import * as styles from '../../DataTable.scss';

export interface Props {
  testID?: string;
  height?: number;
  content?: React.ReactNode;
  contentType?: string;
  fixed?: boolean;
  truncate?: boolean;
  header?: boolean;
  total?: boolean;
  footer?: boolean;
  sorted?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  defaultSortDirection?: SortDirection;
  onSort?(): void;
}

export type CombinedProps = Props & WithAppProviderProps;

function Cell({
  height,
  content,
  contentType,
  fixed,
  truncate,
  header,
  total,
  footer,
  sorted,
  sortable,
  sortDirection,
  defaultSortDirection,
  polaris: {
    intl: {translate},
  },
  onSort,
}: CombinedProps) {
  const numeric = contentType === 'numeric';

  const className = classNames(
    styles.Cell,
    fixed && styles['Cell-fixed'],
    fixed && truncate && styles['Cell-truncated'],
    header && styles['Cell-header'],
    total && styles['Cell-total'],
    footer && styles['Cell-footer'],
    numeric && styles['Cell-numeric'],
    sortable && styles['Cell-sortable'],
    sorted && styles['Cell-sorted'],
  );

  const headerClassName = classNames(
    header && styles.Heading,
    header && contentType === 'text' && styles['Heading-left'],
  );

  const iconClassName = classNames(sortable && styles.Icon);

  const style = {
    height: height ? `${height}px` : undefined,
  };

  const direction = sorted ? sortDirection : defaultSortDirection;
  const source = `caret${direction === 'ascending' ? 'Up' : 'Down'}`;
  const oppositeDirection =
    sortDirection === 'ascending' ? 'descending' : 'ascending';

  const sortAccessibilityLabel = translate(
    'Polaris.DataTable.sortAccessibilityLabel',
    {direction: sorted ? oppositeDirection : direction},
  );

  const iconMarkup = (
    <span className={iconClassName}>
      <Icon
        source={source as IconSource}
        accessibilityLabel={sortAccessibilityLabel}
      />
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
      style={style}
    >
      {columnHeadingContent}
    </th>
  ) : (
    <th className={className} scope="row" style={style}>
      {content}
    </th>
  );

  const cellMarkup =
    header || fixed ? (
      headingMarkup
    ) : (
      <td className={className} style={style}>
        {content}
      </td>
    );

  return cellMarkup;
}

export default withAppProvider<Props>()(Cell);
