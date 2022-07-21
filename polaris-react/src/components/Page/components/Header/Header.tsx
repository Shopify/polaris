import React from 'react';

import {classNames} from '../../../../utilities/css';
import {buttonsFrom} from '../../../Button';
import {TextStyle} from '../../../TextStyle';
import {useMediaQuery} from '../../../../utilities/media-query';
import {useI18n} from '../../../../utilities/i18n';
import {
  ConditionalRender,
  ConditionalWrapper,
} from '../../../../utilities/components';
import type {
  ActionWithTooltip,
  DestructableAction,
  DisableableAction,
  IconableAction,
  LoadableAction,
  MenuActionDescriptor,
  MenuGroupDescriptor,
} from '../../../../types';
import {Breadcrumbs, BreadcrumbsProps} from '../../../Breadcrumbs';
import {Pagination, PaginationProps} from '../../../Pagination';
import {ActionMenu, hasGroupsWithActions} from '../../../ActionMenu';
import {isInterface} from '../../../../utilities/is-interface';
import {isReactElement} from '../../../../utilities/is-react-element';

import {Title, TitleProps} from './components';
import styles from './Header.scss';

type MaybeJSX = JSX.Element | null;

interface PrimaryAction
  extends DestructableAction,
    DisableableAction,
    LoadableAction,
    IconableAction,
    ActionWithTooltip {
  /** Provides extra visual weight and identifies the primary action in a set of buttons */
  primary?: boolean;
}

export interface HeaderProps extends TitleProps {
  /** Visually hide the title */
  titleHidden?: boolean;
  /** Primary page-level action */
  primaryAction?: PrimaryAction | React.ReactNode;
  /** Page-level pagination */
  pagination?: PaginationProps;
  /** Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** Collection of secondary page-level actions */
  secondaryActions?: MenuActionDescriptor[] | React.ReactNode;
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
  /** @deprecated Additional navigation markup */
  additionalNavigation?: React.ReactNode;
  // Additional meta data
  additionalMetadata?: React.ReactNode | string;
  /** Callback that returns true when secondary actions are rolled up into action groups, and false when not */
  onActionRollup?(hasRolledUp: boolean): void;
}

const SHORT_TITLE = 20;
const REALLY_SHORT_TITLE = 8;
const LONG_TITLE = 34;

export function Header({
  title,
  subtitle,
  titleMetadata,
  additionalMetadata,
  titleHidden = false,
  primaryAction,
  pagination,
  additionalNavigation,
  breadcrumbs = [],
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup,
}: HeaderProps) {
  const i18n = useI18n();
  const {isNavigationCollapsed} = useMediaQuery();

  if (additionalNavigation && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `additionalNavigation` on Page is deprecated and will be removed in the next major version.',
    );
  }

  const isSingleRow =
    !primaryAction &&
    !pagination &&
    ((isInterface(secondaryActions) && !secondaryActions.length) ||
      isReactElement(secondaryActions)) &&
    !actionGroups.length;

  const breadcrumbMarkup =
    breadcrumbs.length > 0 ? (
      <div className={styles.BreadcrumbWrapper}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
    ) : null;

  const paginationMarkup =
    pagination && !isNavigationCollapsed ? (
      <div className={styles.PaginationWrapper}>
        <Pagination {...pagination} />
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
    <div className={styles.TitleWrapper}>
      <Title
        title={title}
        subtitle={subtitle}
        titleMetadata={titleMetadata}
        compactTitle={compactTitle}
      />
    </div>
  );

  const primaryActionMarkup = primaryAction ? (
    <PrimaryActionMarkup primaryAction={primaryAction} />
  ) : null;

  let actionMenuMarkup: MaybeJSX = null;
  if (
    isInterface(secondaryActions) &&
    (secondaryActions.length > 0 || hasGroupsWithActions(actionGroups))
  ) {
    actionMenuMarkup = (
      <ActionMenu
        actions={secondaryActions}
        groups={actionGroups}
        rollup={isNavigationCollapsed}
        rollupActionsLabel={
          title
            ? i18n.translate('Polaris.Page.Header.rollupActionsLabel', {title})
            : undefined
        }
        onActionRollup={onActionRollup}
      />
    );
  } else if (isReactElement(secondaryActions)) {
    actionMenuMarkup = <>{secondaryActions}</>;
  }

  const additionalMetadataMarkup = additionalMetadata ? (
    <div className={styles.AdditionalMetaData}>
      <TextStyle variation="subdued">{additionalMetadata}</TextStyle>
    </div>
  ) : null;

  const headerClassNames = classNames(
    styles.Header,
    isSingleRow && styles.isSingleRow,
    titleHidden && styles.titleHidden,
    navigationMarkup && styles.hasNavigation,
    actionMenuMarkup && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    !breadcrumbs.length && styles.noBreadcrumbs,
    title && title.length < LONG_TITLE && styles.mediumTitle,
    title && title.length > LONG_TITLE && styles.longTitle,
  );

  const {slot1, slot2, slot3, slot4, slot5, slot6} = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    additionalNavigationMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title,
  });

  return (
    <div className={headerClassNames}>
      <ConditionalRender condition={[slot1, slot2, slot3, slot4].some(notNull)}>
        <div className={styles.Row}>
          {slot1}
          {slot2}
          <ConditionalRender condition={[slot3, slot4].some(notNull)}>
            <div className={styles.RightAlign}>
              <ConditionalWrapper
                condition={[slot3, slot4].every(notNull)}
                wrapper={(children) => (
                  <div className={styles.Actions}>{children}</div>
                )}
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

function PrimaryActionMarkup({
  primaryAction,
}: {
  primaryAction: PrimaryAction | React.ReactNode;
}) {
  const {isNavigationCollapsed} = useMediaQuery();
  let content = primaryAction;
  if (isInterface(primaryAction)) {
    const primary =
      primaryAction.primary === undefined ? true : primaryAction.primary;

    content = buttonsFrom(
      shouldShowIconOnly(isNavigationCollapsed, primaryAction),
      {
        primary,
      },
    );
  }

  return <div className={styles.PrimaryActionWrapper}>{content}</div>;
}

function shouldShowIconOnly(
  isMobile: boolean,
  action: PrimaryAction,
): PrimaryAction {
  let {content, accessibilityLabel, icon} = action;
  if (icon == null) return {...action, icon: undefined};

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
  actionMenuMarkup,
  additionalMetadataMarkup,
  additionalNavigationMarkup,
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title,
}: {
  actionMenuMarkup: MaybeJSX;
  additionalMetadataMarkup: MaybeJSX;
  additionalNavigationMarkup: MaybeJSX;
  breadcrumbMarkup: MaybeJSX;
  isNavigationCollapsed: boolean;
  pageTitleMarkup: JSX.Element;
  paginationMarkup: MaybeJSX;
  primaryActionMarkup: MaybeJSX;
  title?: string;
}) {
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
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition:
        isNavigationCollapsed &&
        breadcrumbMarkup == null &&
        title != null &&
        title.length <= REALLY_SHORT_TITLE,
    },
    mobileDefault: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition: isNavigationCollapsed,
    },
    desktopCompact: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: primaryActionMarkup,
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition:
        !isNavigationCollapsed &&
        paginationMarkup == null &&
        actionMenuMarkup == null &&
        title != null &&
        title.length <= SHORT_TITLE,
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
        slot5: additionalMetadataMarkup,
        slot6: additionalNavigationMarkup,
      },
      condition: !isNavigationCollapsed,
    },
  };

  const layout =
    Object.values(layouts).find((layout) => layout.condition) ||
    layouts.desktopDefault;

  return layout.slots;
}
