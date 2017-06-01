import * as React from 'react';
import {classNames} from '@shopify/react-utilities/styles';

import {IconableAction, DisableableAction} from '../../types';
import {handleMouseUpByBlurring} from '../../utilities/focus';
import Icon from '../Icon';
import {buttonsFrom} from '../Button';
import Breadcrumbs, {Props as BreadcrumbProps} from '../Breadcrumbs';
import Pagination, {PaginationDescriptor} from '../Pagination';
import DisplayText from '../DisplayText';
import UnstyledLink from '../UnstyledLink';

import * as styles from './Page.scss';

export interface Props {
  title: string,
  icon?: string,
  breadcrumbs?: BreadcrumbProps['breadcrumbs'],
  secondaryActions?: IconableAction[],
  primaryAction?: DisableableAction,
  pagination?: PaginationDescriptor,
}

export default function Header({
  title,
  breadcrumbs,
  secondaryActions,
  primaryAction,
  pagination,
}: Props) {
  const className = classNames(
    styles.Header,
    pagination && styles['Header-hasPagination'],
    breadcrumbs && breadcrumbs.length && styles['Header-hasBreadcrumbs'],
  );

  const breadcrumbMarkup = breadcrumbs != null && breadcrumbs.length > 0
    ? <Breadcrumbs breadcrumbs={breadcrumbs} />
    : null;

  const primaryActionMarkup = primaryAction
    ? (
      <div className={styles.PrimaryAction}>
        {buttonsFrom(primaryAction, {primary: true})}
      </div>
    )
    : null;

  const secondaryActionsMarkup = secondaryActions
    ? (
      <div className={styles.SecondaryActions}>
        {secondaryActionsFrom(secondaryActions)}
      </div>
    )
    : null;

  const paginationMarkup = pagination
    ? (
      <div className={styles.Pagination}>
        <Pagination {...pagination} plain />
      </div>
    )
    : null;

  const actionsMarkup = primaryActionMarkup || secondaryActionsMarkup
    ? (
      <div className={styles.Actions}>
        {primaryActionMarkup}
        {secondaryActionsMarkup}
      </div>
    )
    : null;

  const navigationMarkup = breadcrumbMarkup || paginationMarkup
    ? (
      <div className={styles.Navigation}>
        {breadcrumbMarkup}
        {paginationMarkup}
      </div>
    )
    : null;

  return (
    <div className={className}>
      {navigationMarkup}
      <DisplayText size="large" element="h1">{title}</DisplayText>
      {actionsMarkup}
    </div>
  );
}

function secondaryActionsFrom(actions: IconableAction[]) {
  return actions.map(({url, onAction, content, icon, accessibilityLabel}) => {
    const contentMarkup = icon
      ? (
        <span className={styles.ActionContent}>
          <span className={styles.ActionIcon}>
            <Icon source={icon} />
          </span>
          {content}
        </span>
      )
      : content;

    if (url) {
      return (
        <UnstyledLink
          key={content}
          url={url}
          onMouseUp={handleMouseUpByBlurring}
          className={styles.Action}
          aria-label={accessibilityLabel}
        >
          {contentMarkup}
        </UnstyledLink>
      );
    }

    return (
      <button
        key={content}
        onClick={onAction}
        onMouseUp={handleMouseUpByBlurring}
        className={styles.Action}
        aria-label={accessibilityLabel}
      >
        {contentMarkup}
      </button>
    );
  });
}
