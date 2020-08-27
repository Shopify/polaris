import React, {isValidElement} from 'react';

import {classNames} from '../../../../utilities/css';
import {buttonsFrom} from '../../../Button';
import {TextStyle} from '../../../TextStyle';
import {useMediaQuery} from '../../../../utilities/media-query';
import {useFeatures} from '../../../../utilities/features';
import {
  ConditionalRender,
  ConditionalWrapper,
} from '../../../../utilities/components';
import type {
  MenuGroupDescriptor,
  MenuActionDescriptor,
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

type MaybeJSX = JSX.Element | null;

interface PrimaryAction
  extends DestructableAction,
    DisableableAction,
    LoadableAction,
    IconableAction {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

export interface HeaderProps extends TitleProps {
  /** Visually hide the title */
  titleHidden?: boolean;
  /** Adds a border to the bottom of the page header */
  separator?: boolean;
  /** Primary page-level action */
  primaryAction?: PrimaryAction | React.ReactNode;
  /** Page-level pagination */
  pagination?: PaginationDescriptor;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Collection of secondary page-level actions */
  secondaryActions?: MenuActionDescriptor[];
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
  /** Additional navigation markup */
  additionalNavigation?: React.ReactNode;
  // Additional meta data
  additionalMetaData?: React.ReactNode | string;
}

export function isPrimaryAction(
  x: PrimaryAction | React.ReactNode,
): x is PrimaryAction {
  return !isValidElement(x) && x !== undefined;
}

export function Header({
  title,
  subtitle,
  titleMetadata,
  additionalMetaData,
  thumbnail,
  titleHidden = false,
  separator,
  primaryAction,
  pagination,
  additionalNavigation,
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

  const additionalNavigationMarkup = additionalNavigation ? (
    <div className={styles.AdditionalNavigationWrapper}>
      {additionalNavigation}
    </div>
  ) : null;

  const navigationMarkup =
    breadcrumbMarkup || paginationMarkup || additionalNavigationMarkup ? (
      <div className={styles.Navigation}>
        {breadcrumbMarkup}
        {additionalNavigationMarkup}
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

  const primaryActionMarkup = primaryAction ? (
    <PrimaryActionMarkup primaryAction={primaryAction} />
  ) : null;

  const actionMenuMarkup =
    secondaryActions.length > 0 || hasGroupsWithActions(actionGroups) ? (
      <ConditionalWrapper
        condition={newDesignLanguage === false}
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

  const additionalMetaDataMarkup = additionalMetaData ? (
    <TextStyle variation="subdued">{additionalMetaData}</TextStyle>
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
    const {slot1, slot2, slot3, slot4, slot5, slot6} = determineLayout({
      breadcrumbMarkup,
      pageTitleMarkup,
      additionalMetaDataMarkup,
      paginationMarkup,
      actionMenuMarkup,
      primaryActionMarkup,
      title,
      isNavigationCollapsed,
    });

    return (
      <div className={headerClassNames}>
        <ConditionalRender
          condition={[slot1, slot2, slot3, slot4].some(notNull)}
        >
          <div className={styles.Row}>
            <div className={styles.LeftAlign}>
              {slot1}
              {slot2}
            </div>
            <ConditionalRender condition={[slot3, slot4].some(notNull)}>
              <div className={styles.RightAlign}>
                <ConditionalWrapper
                  condition={[slot3, slot4].every(notNull)}
                  wrapper={(children) => <ButtonGroup>{children}</ButtonGroup>}
                >
                  {slot3}
                  {slot4}
                </ConditionalWrapper>
              </div>
            </ConditionalRender>
          </div>
        </ConditionalRender>
        <ConditionalRender condition={[slot5, slot6].some(notNull)}>
          <div className={styles.Row}>
            <div className={styles.LeftAlign}>{slot5}</div>
            <ConditionalRender condition={slot6 != null}>
              <div className={styles.RightAlign}>{slot6}</div>
            </ConditionalRender>
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

function PrimaryActionMarkup({
  primaryAction,
}: {
  primaryAction: PrimaryAction | React.ReactNode;
}) {
  const {isNavigationCollapsed} = useMediaQuery();
  const {newDesignLanguage} = useFeatures();
  let content = primaryAction;
  if (isPrimaryAction(primaryAction)) {
    const primary =
      primaryAction.primary === undefined ? true : primaryAction.primary;

    content = buttonsFrom(
      shouldShowIconOnly(
        newDesignLanguage,
        isNavigationCollapsed,
        primaryAction,
      ),
      {
        primary,
      },
    );
  }

  return (
    <ConditionalWrapper
      condition={newDesignLanguage === false}
      wrapper={(children) => (
        <div className={styles.PrimaryActionWrapper}>{children}</div>
      )}
    >
      {content}
    </ConditionalWrapper>
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

function notNull(value: any) {
  return value != null;
}

function determineLayout({
  breadcrumbMarkup,
  pageTitleMarkup,
  title,
  additionalMetaDataMarkup,
  paginationMarkup,
  actionMenuMarkup,
  primaryActionMarkup,
  isNavigationCollapsed,
}: {
  breadcrumbMarkup: MaybeJSX;
  pageTitleMarkup: JSX.Element;
  title?: string;
  additionalMetaDataMarkup: MaybeJSX;
  paginationMarkup: MaybeJSX;
  actionMenuMarkup: MaybeJSX;
  primaryActionMarkup: MaybeJSX;
  isNavigationCollapsed: boolean;
}) {
  const shortTitle = 20;
  const reallyShortTitle = 8;

  //    Header Layout
  // |----------------------------------------------------|
  // | slot1 | slot2 |                    | slot3 | slot4 |
  // |----------------------------------------------------|
  // | slot5 |                                    | slot6 |
  // |----------------------------------------------------|
  //
  const layouts = {
    mobileCompact: {
      slots: {
        slot1: null,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetaDataMarkup,
        slot6: null,
      },
      condition:
        isNavigationCollapsed &&
        breadcrumbMarkup == null &&
        title != null &&
        title.length <= reallyShortTitle,
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetaDataMarkup,
        slot6: null,
      },
      condition: isNavigationCollapsed,
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: null,
        slot4: primaryActionMarkup,
        slot5: additionalMetaDataMarkup,
        slot6: null,
      },
      condition:
        !isNavigationCollapsed &&
        paginationMarkup == null &&
        actionMenuMarkup == null &&
        title != null &&
        title.length <= shortTitle,
    },
    desktopDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: (
          <>
            {actionMenuMarkup}
            {primaryActionMarkup}
          </>
        ),
        slot4: paginationMarkup,
        slot5: additionalMetaDataMarkup,
        slot6: null,
      },
      condition: !isNavigationCollapsed,
    },
  };

  const layout =
    Object.values(layouts).find((layout) => layout.condition) ||
    layouts.desktopDefault;

  return layout.slots;
}
