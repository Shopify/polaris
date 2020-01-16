import React from 'react';
import {classNames} from '../../../../utilities/css';
import {buttonsFrom} from '../../../Button';
import {useMediaQuery} from '../../../../utilities/media-query';
import {
  ComplexAction,
  MenuGroupDescriptor,
  AppBridgeAction,
  DestructableAction,
  DisableableAction,
  LoadableAction,
} from '../../../../types';
import {Breadcrumbs, BreadcrumbsProps} from '../../../Breadcrumbs';
import {Pagination, PaginationDescriptor} from '../../../Pagination';
import {ActionMenu, hasGroupsWithActions} from '../../../ActionMenu';

import {Title, TitleProps} from './components';
import styles from './Header.scss';

interface PrimaryAction
  extends DestructableAction,
    DisableableAction,
    LoadableAction,
    AppBridgeAction {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

export interface HeaderProps extends TitleProps {
  /** Visually hide the title (stand-alone app use only) */
  titleHidden?: boolean;
  /** Adds a border to the bottom of the page header (stand-alone app use only) */
  separator?: boolean;
  /** Primary page-level action */
  primaryAction?: PrimaryAction;
  /** Page-level pagination (stand-alone app use only) */
  pagination?: PaginationDescriptor;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Collection of secondary page-level actions */
  secondaryActions?: ComplexAction[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
}

export function Header({
  title,
  subtitle,
  titleMetadata,
  thumbnail,
  titleHidden = false,
  separator,
  primaryAction,
  pagination,
  breadcrumbs = [],
  secondaryActions = [],
  actionGroups = [],
}: HeaderProps) {
  const {isNavigationCollapsed} = useMediaQuery();

  const breadcrumbMarkup =
    breadcrumbs.length > 0 ? (
      <div className={styles.BreadcrumbWrapper}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    ) : null;

  const paginationMarkup =
    pagination && !isNavigationCollapsed ? (
      <div className={styles.PaginationWrapper}>
        <Pagination {...pagination} plain />
      </div>
    ) : null;

  const navigationMarkup =
    breadcrumbMarkup || paginationMarkup ? (
      <div className={styles.Navigation}>
        {breadcrumbMarkup}
        {paginationMarkup}
      </div>
    ) : null;

  const pageTitleMarkup = (
    <Title
      title={title}
      subtitle={subtitle}
      titleMetadata={titleMetadata}
      thumbnail={thumbnail}
    />
  );

  const primary =
    primaryAction &&
    (primaryAction.primary === undefined ? true : primaryAction.primary);

  const primaryActionMarkup = primaryAction ? (
    <div className={styles.PrimaryActionWrapper}>
      {buttonsFrom(primaryAction, {primary})}
    </div>
  ) : null;

  const actionMenuMarkup =
    secondaryActions.length > 0 || hasGroupsWithActions(actionGroups) ? (
      <div className={styles.ActionMenuWrapper}>
        <ActionMenu
          actions={secondaryActions}
          groups={actionGroups}
          rollup={isNavigationCollapsed}
        />
      </div>
    ) : null;

  const headerClassNames = classNames(
    styles.Header,
    titleHidden && styles.titleHidden,
    separator && styles.separator,
    navigationMarkup && styles.hasNavigation,
    actionMenuMarkup && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
  );

  return (
    <div className={headerClassNames}>
      {navigationMarkup}

      <div className={styles.MainContent}>
        <div className={styles.TitleActionMenuWrapper}>
          {pageTitleMarkup}
          {actionMenuMarkup}
        </div>

        {primaryActionMarkup}
      </div>
    </div>
  );
}
