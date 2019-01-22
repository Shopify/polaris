import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {headerCell} from '../../../shared';
import {withAppProvider, WithAppProviderProps} from '../../../AppProvider';
import Icon, {IconSource} from '../../../Icon';
import UnstyledLink from '../../../UnstyledLink';
import {SortDirection} from '../../types';

import * as styles from '../../DataTable.scss';

export interface InjectableProps {
  height?: number;
  content?: React.ReactNode;
  contentType?: string;
  fixed?: boolean;
  truncate?: boolean;
  url?: string;
}

export interface Props extends InjectableProps {
  testID?: string;
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
  url,
}: CombinedProps) {
  const numeric = contentType === 'numeric';

  const className = classNames(
    styles.Cell,
    url && styles['Cell-link'],
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
  const cellContent = url ? (
    <UnstyledLink url={url} style={style}>
      {content}
    </UnstyledLink>
  ) : (
    content
  );

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
    <th className={className} scope="row" style={url ? undefined : style}>
      {cellContent}
    </th>
  );

  const cellMarkup =
    header || fixed ? (
      headingMarkup
    ) : (
      <td className={className} style={url ? undefined : style}>
        {cellContent}
      </td>
    );

  return cellMarkup;
}

export default withAppProvider<Props>()(Cell);
