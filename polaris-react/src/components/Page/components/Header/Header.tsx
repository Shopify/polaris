import React from 'react';

import {classNames} from '../../../../utilities/css';
import {buttonFrom} from '../../../Button';
import {Text} from '../../../Text';
import {Tooltip} from '../../../Tooltip';
import {useMediaQuery} from '../../../../utilities/media-query';
import {useI18n} from '../../../../utilities/i18n';
import {
  ConditionalRender,
  ConditionalWrapper,
} from '../../../../utilities/components';
import type {
  DestructableAction,
  DisableableAction,
  IconableAction,
  LoadableAction,
  MenuActionDescriptor,
  MenuGroupDescriptor,
  TooltipAction,
} from '../../../../types';
import {Breadcrumbs} from '../../../Breadcrumbs';
import type {BreadcrumbsProps} from '../../../Breadcrumbs';
import {Pagination} from '../../../Pagination';
import type {PaginationProps} from '../../../Pagination';
import {ActionMenu, hasGroupsWithActions} from '../../../ActionMenu';
import {isInterface} from '../../../../utilities/is-interface';
import {isReactElement} from '../../../../utilities/is-react-element';
import {Box} from '../../../Box';
import {HorizontalStack} from '../../../HorizontalStack';

import {Title} from './components';
import type {TitleProps} from './components';
import styles from './Header.scss';

type MaybeJSX = JSX.Element | null;

interface PrimaryAction
  extends DestructableAction,
    DisableableAction,
    LoadableAction,
    IconableAction,
    TooltipAction {
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
  /** @deprecated Collection of breadcrumbs */
  breadcrumbs?: BreadcrumbsProps['breadcrumbs'];
  /** A back action link */
  backAction?: BreadcrumbsProps['backAction'];
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
  breadcrumbs,
  backAction,
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
  if (breadcrumbs && process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The `breadcrumbs` prop on Page is deprecated and will be removed in the next major version. Please replace with a single `backAction`.',
    );
  }

  const isSingleRow =
    !primaryAction &&
    !pagination &&
    ((isInterface(secondaryActions) && !secondaryActions.length) ||
      isReactElement(secondaryActions)) &&
    !actionGroups.length;

  let breadcrumbMarkup = null;
  if (backAction) {
    breadcrumbMarkup = (
      <div className={styles.BreadcrumbWrapper}>
        <Box maxWidth="100%" paddingInlineEnd="4" printHidden>
          <Breadcrumbs backAction={backAction} />
        </Box>
      </div>
    );
  } else if (
    (Array.isArray(breadcrumbs) && breadcrumbs.length > 0) ||
    (!Array.isArray(breadcrumbs) && breadcrumbs)
  ) {
    breadcrumbMarkup = (
      <div className={styles.BreadcrumbWrapper}>
        <Box maxWidth="100%" paddingInlineEnd="4" printHidden>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </Box>
      </div>
    );
  }

  const paginationMarkup =
    pagination && !isNavigationCollapsed ? (
      <div className={styles.PaginationWrapper}>
        <Box printHidden>
          <Pagination {...pagination} />
        </Box>
      </div>
    ) : null;

  const additionalNavigationMarkup = additionalNavigation ? (
    <HorizontalStack gap="4" align="end">
      <Box printHidden>{additionalNavigation}</Box>
    </HorizontalStack>
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

  const navigationMarkup =
    breadcrumbMarkup || paginationMarkup || additionalNavigationMarkup ? (
      <Box
        printHidden
        paddingBlockEnd="1"
        paddingInlineEnd={
          actionMenuMarkup && isNavigationCollapsed ? '10' : undefined
        }
      >
        <HorizontalStack gap="4" align="space-between" blockAlign="center">
          {breadcrumbMarkup}
          {additionalNavigationMarkup}
          {paginationMarkup}
        </HorizontalStack>
      </Box>
    ) : null;

  const additionalMetadataMarkup = additionalMetadata ? (
    <div className={styles.AdditionalMetaData}>
      <Text color="subdued" as="span">
        {additionalMetadata}
      </Text>
    </div>
  ) : null;

  const headerClassNames = classNames(
    isSingleRow && styles.isSingleRow,
    navigationMarkup && styles.hasNavigation,
    actionMenuMarkup && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    !breadcrumbMarkup && styles.noBreadcrumbs,
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
    <Box
      position="relative"
      paddingBlockStart={{xs: '4', md: '5'}}
      paddingBlockEnd={{xs: '4', md: '5'}}
      paddingInlineStart={{xs: '4', sm: '0'}}
      paddingInlineEnd={{xs: '4', sm: '0'}}
      visuallyHidden={titleHidden}
    >
      <div className={headerClassNames}>
        <ConditionalRender
          condition={[slot1, slot2, slot3, slot4].some(notNull)}
        >
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
            <HorizontalStack gap="4">{slot5}</HorizontalStack>
            <ConditionalRender condition={slot6 != null}>
              <div className={styles.RightAlign}>{slot6}</div>
            </ConditionalRender>
          </div>
        </ConditionalRender>
      </div>
    </Box>
  );
}

function PrimaryActionMarkup({
  primaryAction,
}: {
  primaryAction: PrimaryAction | React.ReactNode;
}) {
  const {isNavigationCollapsed} = useMediaQuery();

  let actionMarkup: React.ReactNode;
  if (isInterface(primaryAction)) {
    const {primary: isPrimary, helpText} = primaryAction;
    const primary = isPrimary === undefined ? true : isPrimary;
    const content = buttonFrom(
      shouldShowIconOnly(isNavigationCollapsed, primaryAction),
      {
        primary,
      },
    );

    actionMarkup = helpText ? (
      <Tooltip content={helpText}>{content}</Tooltip>
    ) : (
      content
    );
  } else {
    actionMarkup = primaryAction;
  }

  return (
    <div className={styles.PrimaryActionWrapper}>
      <Box printHidden>{actionMarkup}</Box>
    </div>
  );
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
