import React from 'react';

import {classNames} from '../../../../utilities/css';
import {buttonsFrom} from '../../../Button';
import {useMediaQuery} from '../../../../utilities/media-query';
import {useFeatures} from '../../../../utilities/features';
import {
  ConditionalRender,
  ConditionalWrapper,
} from '../../../../utilities/components';
import {
  MenuGroupDescriptor,
  MenuActionDescriptor,
  AppBridgeAction,
  DestructableAction,
  DisableableAction,
  LoadableAction,
  IconableAction,
} from '../../../../types';
import {Breadcrumbs, BreadcrumbsProps} from '../../../Breadcrumbs';
import {Pagination, PaginationDescriptor} from '../../../Pagination';
import {ActionMenu, hasGroupsWithActions} from '../../../ActionMenu';
import {ButtonGroup} from '../../../ButtonGroup';

import {Title, TitleProps} from './components';
import styles from './Header.scss';

interface PrimaryAction
  extends DestructableAction,
    DisableableAction,
    LoadableAction,
    AppBridgeAction,
    IconableAction {
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
  secondaryActions?: MenuActionDescriptor[];
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
  const {newDesignLanguage} = useFeatures();

  const breadcrumbMarkup =
    breadcrumbs.length > 0 ? (
      <div
        className={classNames(
          styles.BreadcrumbWrapper,
          newDesignLanguage && styles.newDesignLanguage,
        )}
      >
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
    <ConditionalWrapper
      condition={!newDesignLanguage}
      wrapper={(children) => (
        <div className={styles.PrimaryActionWrapper}>{children}</div>
      )}
    >
      {buttonsFrom(
        shouldShowIconOnly(
          newDesignLanguage,
          isNavigationCollapsed,
          primaryAction,
        ),
        {
          primary,
        },
      )}
    </ConditionalWrapper>
  ) : null;

  const actionMenuMarkup =
    secondaryActions.length > 0 || hasGroupsWithActions(actionGroups) ? (
      <ConditionalWrapper
        condition={!newDesignLanguage}
        wrapper={(children) => (
          <div className={styles.ActionMenuWrapper}>{children}</div>
        )}
      >
        <ActionMenu
          actions={secondaryActions}
          groups={actionGroups}
          rollup={isNavigationCollapsed}
        />
      </ConditionalWrapper>
    ) : null;

  const headerClassNames = classNames(
    styles.Header,
    titleHidden && styles.titleHidden,
    separator && styles.separator,
    navigationMarkup && styles.hasNavigation,
    actionMenuMarkup && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    newDesignLanguage && styles.newDesignLanguage,
  );

  if (newDesignLanguage) {
    const slot1 = breadcrumbMarkup;
    let slot2: JSX.Element | null = null;
    let slot3: JSX.Element | null = null;
    let slot4: JSX.Element | null = null;
    let slot5: JSX.Element | null = null;
    let slot6: JSX.Element | null = null;

    if (isNavigationCollapsed) {
      slot3 = actionMenuMarkup;
      slot4 = primaryActionMarkup;
      if (breadcrumbMarkup == null && title && title.length <= 8) {
        slot2 = pageTitleMarkup;
      } else {
        slot5 = pageTitleMarkup;
      }
    } else {
      slot2 = pageTitleMarkup;
      if (paginationMarkup == null && actionMenuMarkup == null) {
        slot4 = primaryActionMarkup;
      } else {
        slot4 = paginationMarkup;
        slot5 = actionMenuMarkup;
        slot6 = primaryActionMarkup;
      }
    }

    return (
      <div className={headerClassNames}>
        <ConditionalRender
          condition={[slot1, slot2, slot3, slot4].some((slot) => slot != null)}
        >
          <div className={styles.Row}>
            <div className={styles.LeftAlign}>
              {slot1}
              {slot2}
            </div>
            <ConditionalRender condition={slot3 != null || slot4 != null}>
              <div className={styles.RightAlign}>
                <ConditionalWrapper
                  condition={slot3 != null && slot4 != null}
                  wrapper={(children) => <ButtonGroup>{children}</ButtonGroup>}
                >
                  {slot3}
                  {slot4}
                </ConditionalWrapper>
              </div>
            </ConditionalRender>
          </div>
        </ConditionalRender>
        <ConditionalRender condition={slot5 != null || slot6 != null}>
          <div className={styles.Row}>
            <div className={styles.LeftAlign}>{slot5}</div>
            <div className={styles.RightAlign}>{slot6}</div>
          </div>
        </ConditionalRender>
      </div>
    );
  }

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

function shouldShowIconOnly(
  newDesignLanguage: boolean,
  isMobile: boolean,
  action: PrimaryAction,
): PrimaryAction {
  let {content, accessibilityLabel, icon} = action;
  if (!newDesignLanguage || icon == null) return {...action, icon: undefined};

  if (isMobile) {
    accessibilityLabel = accessibilityLabel || content;
    content = undefined;
  } else {
    icon = undefined;
  }

  return {
    ...action,
    content,
    accessibilityLabel,
    icon,
  };
}
