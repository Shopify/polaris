import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Icon, {IconSource} from '../Icon';
import {SortDirection, ColumnContentType} from './DataTable';

import * as styles from './DataTable.scss';

export interface Props {
  /* TODO(enhancement): custom renderCell prop? It's possible that devs will want/need to pass in more than just a string or number as cell content. We could also just accept a React.ReactNode instead in addition to strings and numbers. The initial thought behind having an optional custom cell render function was to allow users of the component to 'roll their own' sortability, but I think that's best done with an onSort prop that we add to the implementation of the default sort functionality we'll be building in. */
  testID?: string,
  content?: React.ReactNode,
  contentType?: ColumnContentType,
  presentational?: boolean,
  fixed?: boolean,
  header?: boolean,
  summary?: boolean,
  sorted?: boolean,
  sortable?: boolean,
  sortDirection?: SortDirection,
  onSort?(): void,
}

export default function Cell({
  content,
  contentType,
  presentational,
  fixed,
  header,
  sorted,
  sortable,
  sortDirection,
  summary,
  onSort,
}: Props) {

  const numeric = contentType === 'numeric' || contentType === 'currency';

  const className = classNames(
    styles.Cell,
    presentational && styles['Cell-presentational'],
    fixed && styles['Cell-fixed'],
    summary && styles['Cell-summary'],
    header && styles['Cell-header'],
    numeric && styles['Cell-numeric'],
    sorted && styles['Cell-sorted'],
    sortable && styles['Cell-sortable'],
  );

  const headerClassName = classNames(
    header && styles['Heading'],
  );

  const presentationalMarkup = header
    ? <th aria-hidden role="presentation" className={className} />
    : <td aria-hidden role="presentation" className={className} />;

  let direction;
  if (sorted) { direction = sortDirection === 'ascending' ? 'Up' : 'Down'; }
  const source = `caret${direction}`;
  const iconMarkup = sortable && sorted ? <Icon source={source as IconSource} /> : null;

  const columnHeadingContent = sortable
    ? (
      <span className={headerClassName} aria-label={`sort by ${(content as string).toLowerCase()}`}>
        {content}
        <span>{iconMarkup}</span>
      </span>
    )
    : content;

  const sortProps = sortable
    ? {onClick: onSort, 'aria-sort': sortDirection}
    : {'aria-disabled': true};

  const headingMarkup = header
    ? (
      <th className={className} scope="col" {...sortProps}>
        {columnHeadingContent}
      </th>
    )
    : <th className={className} scope="row">{content}</th>;

  const nonPresentationalMarkup = header || fixed
    ? headingMarkup
    : <td className={className}>{content}</td>;

  const cellMarkup = presentational
    ? presentationalMarkup
    : nonPresentationalMarkup;

  return cellMarkup;
}
