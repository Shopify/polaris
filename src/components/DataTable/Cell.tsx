import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import Icon, {IconSource} from '../Icon';
import {SortDirection, ColumnContentType} from './DataTable';

import * as styles from './DataTable.scss';

export interface Props {
  testID?: string,
  content?: React.ReactNode,
  contentType?: ColumnContentType,
  presentational?: boolean,
  fixed?: boolean,
  header?: boolean,
  total?: boolean,
  sorted?: boolean,
  sortable?: boolean,
  sortDirection?: SortDirection,
  defaultSortDirection?: SortDirection,
  onSort?(): void,
}

export default function Cell({
  content,
  contentType,
  presentational,
  fixed,
  header,
  total,
  sorted,
  sortable,
  sortDirection,
  defaultSortDirection,
  onSort,
}: Props) {

  const numeric = contentType === 'numeric';

  const className = classNames(
    styles.Cell,
    presentational && styles['Cell-presentational'],
    fixed && styles['Cell-fixed'],
    total && styles['Cell-total'],
    header && styles['Cell-header'],
    numeric && styles['Cell-numeric'],
    sorted && styles['Cell-sorted'],
    sortable && styles['Cell-sortable'],
  );

  const headerClassName = classNames(
    header && styles['Heading'],
  );

  const iconClassName = classNames(
    sortable && styles['Heading-sortable'],
  );

  const presentationalMarkup = header
    ? <th aria-hidden role="presentation" className={className} />
    : <td aria-hidden role="presentation" className={className} />;

  let sortedIconMarkup = null;
  let sortableIconMarkup = null;
  let sortAccessibilityLabel;

  if (sortable) {
    // i18n string variable
    sortAccessibilityLabel = `sort by ${(content as string).toLowerCase()}`;

    if (sorted) {
      const direction = sortDirection === 'ascending' ? 'Up' : 'Down';
      const source = `caret${direction}`;
      sortedIconMarkup = <Icon source={source as IconSource} />;
    } else {
      const direction = defaultSortDirection === 'ascending' ? 'Up' : 'Down';
      const source = `caret${direction}`;
      sortableIconMarkup = <Icon source={source as IconSource} />;
    }
  }

  const columnHeadingContent = sortable
    ? (
      <span className={headerClassName}>
        <span className={iconClassName}>{sortableIconMarkup}</span>
        <span>{sortedIconMarkup}</span>
        {content}
      </span>
    )
    : content;

  const sortProps = sortable
    ? {
      role: 'button',
      onClick: onSort,
      onKeyDown: onKeyDownEnter(onSort),
      'aria-sort': sortDirection,
      'aria-label': sortAccessibilityLabel,
      tabIndex: 0,
    }
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

function onKeyDownEnter(sortFunc?: () => void) {
  return function handleKeyPress(event: React.KeyboardEvent<HTMLElement>) {
    const {keyCode} = event;
    if (keyCode === 13 && sortFunc !== undefined) { sortFunc(); }
  };
}
