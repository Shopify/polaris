/* eslint-disable @shopify/strict-component-boundaries */
/* eslint-disable @shopify/jsx-no-hardcoded-content */
import React, {useCallback, useRef} from 'react';
import {ChevronDownMinor} from '@shopify/polaris-icons';

import {classNames} from '../../../../utilities/css';
import {Button, buttonFrom} from '../../../Button';
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
import {InlineStack} from '../../../InlineStack';
import {FilterActionsProvider} from '../../../FilterActionsProvider';
import {useFrame} from '../../../../utilities/frame';
import {Badge} from '../../../Badge';
import {Icon} from '../../../Icon';
import {Bleed} from '../../../Bleed';
import {useToggle} from '../../../../utilities/use-toggle';
import {DiscardConfirmationModal} from '../../../Frame/components/ContextualSaveBar/components';
import {CSSAnimation} from '../../../Frame/components';
import {useEventListener} from '../../../../utilities/use-event-listener';
import {debounce} from '../../../../utilities/debounce';

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
  /** Enables filtering action list items */
  filterActions?: boolean;
  /** Primary page-level action */
  primaryAction?: PrimaryAction | React.ReactNode;
  /** Page-level pagination */
  pagination?: PaginationProps;
  /** A back action link */
  backAction?: BreadcrumbsProps['backAction'];
  /** Collection of secondary page-level actions */
  secondaryActions?: MenuActionDescriptor[] | React.ReactNode;
  /** Collection of page-level groups of secondary actions */
  actionGroups?: MenuGroupDescriptor[];
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
  filterActions,
  backAction,
  secondaryActions = [],
  actionGroups = [],
  compactTitle = false,
  onActionRollup,
}: HeaderProps) {
  const i18n = useI18n();
  const {isNavigationCollapsed} = useMediaQuery();
  const {showContextualSaveBar, getContextualSaveBarProps} = useFrame();

  const isSingleRow =
    !primaryAction &&
    !pagination &&
    ((isInterface(secondaryActions) && !secondaryActions.length) ||
      isReactElement(secondaryActions)) &&
    !actionGroups.length;

  const breadcrumbMarkup = backAction ? (
    <div className={styles.BreadcrumbWrapper}>
      <Box maxWidth="100%" paddingInlineEnd="100" printHidden>
        <Breadcrumbs backAction={backAction} />
      </Box>
    </div>
  ) : null;

  const paginationMarkup =
    pagination && !isNavigationCollapsed ? (
      <div className={styles.PaginationWrapper}>
        <Box printHidden>
          <Pagination
            {...pagination}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
          />
        </Box>
      </div>
    ) : null;

  const {discardAction, saveAction} = getContextualSaveBarProps() || {};

  const saveActionContent =
    saveAction && saveAction.content
      ? saveAction.content
      : i18n.translate('Polaris.ContextualSaveBar.save');

  const {
    value: discardConfirmationModalVisible,
    toggle: toggleDiscardConfirmationModal,
    setFalse: closeDiscardConfirmationModal,
  } = useToggle(false);

  const handleDiscardAction = useCallback(() => {
    if (discardAction && discardAction.onAction) {
      discardAction.onAction();
    }
    closeDiscardConfirmationModal();
  }, [closeDiscardConfirmationModal, discardAction]);

  const discardActionContent =
    discardAction && discardAction.content
      ? discardAction.content
      : i18n.translate('Polaris.ContextualSaveBar.discard');

  let discardActionHandler;
  if (discardAction && discardAction.discardConfirmationModal) {
    discardActionHandler = toggleDiscardConfirmationModal;
  } else if (discardAction) {
    discardActionHandler = discardAction.onAction;
  }

  const discardConfirmationModalMarkup = discardAction &&
    discardAction.onAction &&
    discardAction.discardConfirmationModal && (
      <DiscardConfirmationModal
        open={discardConfirmationModalVisible}
        onCancel={toggleDiscardConfirmationModal}
        onDiscard={handleDiscardAction}
      />
    );

  const handleLeaveConfirmation = debounce(
    () => {
      badgeRef.current?.classList.add(styles.Green, styles.Shake);

      setTimeout(() => {
        badgeRef.current?.classList.remove(styles.Green, styles.Shake);
      }, 300);
    },
    500,
    {leading: true, trailing: false},
  );

  useEventListener(
    'onLeaveDirtyState' as keyof WindowEventMap,
    handleLeaveConfirmation,
  );

  const badgeRef = useRef<HTMLDivElement>(null);

  const pageTitleMarkup = (
    <div className={styles.TitleWrapper}>
      <Title
        title={title}
        subtitle={subtitle}
        titleMetadata={
          <InlineStack wrap={false}>
            {!showContextualSaveBar() && titleMetadata}
            <CSSAnimation
              in={showContextualSaveBar()}
              type="fade"
              className={styles.Save}
            >
              <Box paddingInlineStart="200">
                <InlineStack gap="200" align="center">
                  <div
                    style={{maxHeight: '20px', paddingBlock: '2px'}}
                    ref={badgeRef}
                  >
                    <Badge size="small">
                      <InlineStack align="center" gap="025">
                        <Text as="span">Unsaved changes</Text>
                        <Bleed marginBlock="050">
                          <Icon source={ChevronDownMinor} />
                        </Bleed>
                      </InlineStack>
                    </Badge>
                  </div>
                  <CSSAnimation in={showContextualSaveBar()} type="slideFade">
                    <InlineStack gap="200" align="center">
                      {discardAction && (
                        <Button
                          size="micro"
                          url={discardAction.url}
                          onClick={discardActionHandler}
                          loading={discardAction.loading}
                          disabled={discardAction.disabled}
                          accessibilityLabel={discardAction.content}
                        >
                          {discardActionContent}
                        </Button>
                      )}
                      {saveAction && (
                        <Button
                          size="micro"
                          variant="primary"
                          url={saveAction.url}
                          onClick={saveAction.onAction}
                          loading={saveAction.loading}
                          disabled={saveAction.disabled}
                          accessibilityLabel={saveAction.content}
                        >
                          {saveActionContent}
                        </Button>
                      )}
                    </InlineStack>
                  </CSSAnimation>
                </InlineStack>
              </Box>
            </CSSAnimation>
          </InlineStack>
        }
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
        rollup={isNavigationCollapsed || showContextualSaveBar()}
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
    breadcrumbMarkup || paginationMarkup ? (
      <Box
        printHidden
        paddingBlockEnd="100"
        paddingInlineEnd={
          actionMenuMarkup && isNavigationCollapsed ? '1000' : undefined
        }
      >
        <InlineStack gap="400" align="space-between" blockAlign="center">
          {breadcrumbMarkup}
          {paginationMarkup}
        </InlineStack>
      </Box>
    ) : null;

  const additionalMetadataMarkup = additionalMetadata ? (
    <div className={styles.AdditionalMetaData}>
      <Text tone="subdued" as="span" variant="bodySm">
        {additionalMetadata}
      </Text>
    </div>
  ) : null;

  const headerClassNames = classNames(
    isSingleRow && styles.isSingleRow,
    navigationMarkup && styles.hasNavigation,
    actionMenuMarkup && styles.hasActionMenu,
    isNavigationCollapsed && styles.mobileView,
    !backAction && styles.noBreadcrumbs,
    title && title.length < LONG_TITLE && styles.mediumTitle,
    title && title.length > LONG_TITLE && styles.longTitle,
  );

  const {slot1, slot2, slot3, slot4, slot5} = determineLayout({
    actionMenuMarkup,
    additionalMetadataMarkup,
    breadcrumbMarkup,
    isNavigationCollapsed,
    pageTitleMarkup,
    paginationMarkup,
    primaryActionMarkup,
    title,
    showContextualSaveBar: showContextualSaveBar(),
  });

  return (
    <Box
      position="relative"
      paddingBlockStart={{xs: '400', md: '600'}}
      paddingBlockEnd={{xs: '400', md: '600'}}
      paddingInlineStart={{xs: '400', sm: '0'}}
      paddingInlineEnd={{xs: '400', sm: '0'}}
      visuallyHidden={titleHidden}
    >
      <div className={headerClassNames}>
        <FilterActionsProvider filterActions={Boolean(filterActions)}>
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
          <ConditionalRender condition={[slot5].some(notNull)}>
            <div className={styles.Row}>
              <InlineStack gap="400">{slot5}</InlineStack>
            </div>
          </ConditionalRender>
        </FilterActionsProvider>
      </div>
      {discardConfirmationModalMarkup}
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
        variant: primary ? 'primary' : undefined,
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
  breadcrumbMarkup,
  isNavigationCollapsed,
  pageTitleMarkup,
  paginationMarkup,
  primaryActionMarkup,
  title,
  showContextualSaveBar = false,
}: {
  actionMenuMarkup: MaybeJSX;
  additionalMetadataMarkup: MaybeJSX;
  breadcrumbMarkup: MaybeJSX;
  isNavigationCollapsed: boolean;
  pageTitleMarkup: JSX.Element;
  paginationMarkup: MaybeJSX;
  primaryActionMarkup: MaybeJSX;
  title?: string;
  showContextualSaveBar?: boolean;
}) {
  //    Header Layout
  // |----------------------------------------------------|
  // | slot1 | slot2 |                    | slot3 | slot4 |
  // |----------------------------------------------------|
  // | slot5 |                                            |
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
      },
      condition:
        !isNavigationCollapsed &&
        paginationMarkup == null &&
        actionMenuMarkup == null &&
        title != null &&
        title.length <= SHORT_TITLE,
    },
    desktopCompactSaveBar: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: null,
        slot5: additionalMetadataMarkup,
      },
      condition:
        !isNavigationCollapsed &&
        paginationMarkup == null &&
        actionMenuMarkup == null &&
        title != null &&
        title.length <= SHORT_TITLE &&
        showContextualSaveBar,
    },
    desktopDefaultSaveBar: {
      slots: {
        slot1: breadcrumbMarkup,
        slot2: pageTitleMarkup,
        slot3: actionMenuMarkup,
        slot4: null,
        slot5: additionalMetadataMarkup,
      },
      condition: showContextualSaveBar,
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
      },
      condition: !isNavigationCollapsed,
    },
  };

  const layout =
    Object.values(layouts).find((layout) => layout.condition) ||
    layouts.desktopDefault;

  return layout.slots;
}
