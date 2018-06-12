import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {
  withAppProvider,
  WithAppProviderProps,
} from '../../components/AppProvider';
import Icon, {IconSource} from '../Icon';
import {SortDirection} from './DataTable';

import * as styles from './DataTable.scss';

export type CombinedProps = Props & WithAppProviderProps;

export interface Props {
  testID?: string;
  height?: number;
  content?: React.ReactNode;
  contentType?: string;
  fixed?: boolean;
  truncate?: boolean;
  presentational?: boolean;
  header?: boolean;
  total?: boolean;
  footer?: boolean;
  sorted?: boolean;
  sortable?: boolean;
  sortDirection?: SortDirection;
  defaultSortDirection?: SortDirection;
  onSort?(): void;
}

function Cell({
  height,
  content,
  contentType,
  fixed,
  truncate,
  presentational,
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
    presentational && styles['Cell-presentational'],
    header && styles['Cell-header'],
    total && styles['Cell-total'],
    footer && styles['Cell-footer'],
    numeric && styles['Cell-numeric'],
    sorted && styles['Cell-sorted'],
    sortable && styles['Cell-sortable'],
  );

  const style = height ? {height: `${height}px`} : undefined;

  const headerClassName = classNames(
    header && styles.Heading,
    header && contentType === 'text' && styles['Heading-left'],
  );

  const iconClassName = classNames(sortable && styles['Heading-sortable']);

  // TODO work out a better way for fix this lint violation
  const presentationalMarkup = header ? (
    // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
    <th aria-hidden role="presentation" className={className} style={style} />
  ) : (
    // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
    <td aria-hidden role="presentation" className={className} style={style} />
  );

  let sortedIconMarkup = null;
  let sortableIconMarkup = null;
  let sortAccessibilityLabel;

  if (sortable) {
    // i18n string variable
    sortAccessibilityLabel = translate(
      'Polaris.DataTable.sortAccessibilityLabel',
      {content: (content as string).toLowerCase()},
    );

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

  const sortableHeadingContent =
    contentType === 'text' ? (
      <span className={headerClassName}>
        {content}
        <span className={iconClassName}>{sortableIconMarkup}</span>
        <span>{sortedIconMarkup}</span>
      </span>
    ) : (
      <span className={headerClassName}>
        <span className={iconClassName}>{sortableIconMarkup}</span>
        <span>{sortedIconMarkup}</span>
        {content}
      </span>
    );

  const columnHeadingContent = sortable ? sortableHeadingContent : content;

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

  const headingMarkup = header ? (
    <th className={className} scope="col" style={style} {...sortProps}>
      {columnHeadingContent}
    </th>
  ) : (
    <th className={className} scope="row" style={style}>
      {content}
    </th>
  );

  const nonPresentationalMarkup =
    header || fixed ? (
      headingMarkup
    ) : (
      <td className={className} style={style}>
        {content}
      </td>
    );

  const cellMarkup = presentational
    ? presentationalMarkup
    : nonPresentationalMarkup;

  return cellMarkup;
}

function onKeyDownEnter(sortFunc?: () => void) {
  return function handleKeyPress(event: React.KeyboardEvent<HTMLElement>) {
    const {keyCode} = event;
    if (keyCode === 13 && sortFunc !== undefined) {
      sortFunc();
    }
  };
}

export default withAppProvider<Props>()(Cell);
