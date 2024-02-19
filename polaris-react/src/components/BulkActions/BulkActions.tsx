import React, {
  forwardRef,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from 'react';

import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import type {
  BadgeAction,
  DisableableAction,
  ActionListSection,
  MenuGroupDescriptor,
  Action,
} from '../../types';
import {ActionList} from '../ActionList';
import {Popover} from '../Popover';
import {InlineStack} from '../InlineStack';
import {CheckableButton} from '../CheckableButton';
import {UnstyledButton} from '../UnstyledButton';
import {Box} from '../Box';
import type {ButtonProps} from '../Button';

import {
  BulkActionButton,
  BulkActionMenu,
  BulkActionsMeasurer,
} from './components';
import type {ActionsMeasurements} from './components';
import {
  getVisibleAndHiddenActionsIndices,
  isNewBadgeInBadgeActions,
  instanceOfMenuGroupDescriptor,
  instanceOfBulkActionListSection,
  getActionSections,
} from './utilities';
import styles from './BulkActions.module.scss';

export type BulkAction = DisableableAction & BadgeAction;

type BulkActionListSection = ActionListSection;

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
type AriaLive = 'off' | 'polite' | undefined;

export interface BulkActionsProps {
  /** List is in a selectable state */
  selectMode?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Callback when the select all checkbox is clicked */
  onToggleAll?(): void;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Disables bulk actions */
  disabled?: boolean;
  /** Callback when selectable state of list is changed */
  onSelectModeToggle?(selectMode: boolean): void;
  /** Callback when more actions button is toggled */
  onMoreActionPopoverToggle?(isOpen: boolean): void;
  /** Used for forwarding the ref */
  innerRef?: React.Ref<any>;
  /** The size of the buttons to render */
  buttonSize?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
  /** @deprecated If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** @deprecated The width of the BulkActions */
  width?: number;
  /** Label for the bulk actions */
  label?: string;
}

interface BulkActionsState {
  visiblePromotedActions: number[];
  hiddenPromotedActions: number[];
  visibleActions: number[];
  hiddenActions: number[];
  actionsWidths: number[];
  containerWidth: number;
  disclosureWidth: number;
  hasMeasured: boolean;
}

export const BulkActions = forwardRef(function BulkActions(
  {
    promotedActions,
    actions,
    disabled,
    buttonSize,
    paginatedSelectAllAction,
    paginatedSelectAllText,
    label,
    accessibilityLabel,
    selected,
    onToggleAll,
  }: BulkActionsProps,
  ref,
) {
  const i18n = useI18n();
  const [popoverActive, setPopoverActive] = useState(false);

  const [state, setState] = useReducer(
    (
      data: BulkActionsState,
      partialData: Partial<BulkActionsState>,
    ): BulkActionsState => {
      return {...data, ...partialData};
    },
    {
      disclosureWidth: 0,
      containerWidth: Infinity,
      actionsWidths: [],
      visibleActions: [],
      hiddenActions: [],
      visiblePromotedActions: [],
      hiddenPromotedActions: [],
      hasMeasured: false,
    },
  );

  const {
    visibleActions,
    hiddenActions,
    visiblePromotedActions,
    hiddenPromotedActions,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured,
  } = state;

  useEffect(() => {
    if (containerWidth === 0) {
      return;
    }
    const {
      visibleActions,
      visiblePromotedActions,
      hiddenActions,
      hiddenPromotedActions,
    } = getVisibleAndHiddenActionsIndices(
      actions,
      promotedActions,
      disclosureWidth,
      actionsWidths,
      containerWidth,
    );
    setState({
      visibleActions,
      visiblePromotedActions,
      hiddenActions,
      hiddenPromotedActions,
      hasMeasured: containerWidth !== Infinity,
    });
  }, [
    containerWidth,
    disclosureWidth,
    actions,
    promotedActions,
    actionsWidths,
    setState,
  ]);

  const activatorLabel =
    !promotedActions || (promotedActions && visiblePromotedActions.length === 0)
      ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
      : i18n.translate(
          'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
        );

  const paginatedSelectAllActionMarkup = paginatedSelectAllAction ? (
    <UnstyledButton
      className={styles.AllAction}
      onClick={paginatedSelectAllAction.onAction}
      size="slim"
      disabled={disabled}
    >
      {paginatedSelectAllAction.content}
    </UnstyledButton>
  ) : null;

  const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;

  const paginatedSelectAllMarkup = paginatedSelectAllActionMarkup ? (
    <div className={styles.PaginatedSelectAll}>
      {paginatedSelectAllActionMarkup}
    </div>
  ) : null;

  const ariaLive: AriaLive = hasTextAndAction ? 'polite' : undefined;

  const checkableButtonProps = {
    accessibilityLabel,
    label: hasTextAndAction ? paginatedSelectAllText : label,
    selected,
    onToggleAll,
    disabled,
    ariaLive,
    ref,
  };

  const togglePopover = useCallback(() => {
    setPopoverActive((popoverActive) => !popoverActive);
  }, []);

  const handleMeasurement = useCallback(
    (measurements: ActionsMeasurements) => {
      const {
        hiddenActionsWidths: actionsWidths,
        containerWidth,
        disclosureWidth,
      } = measurements;

      const {
        visibleActions,
        hiddenActions,
        visiblePromotedActions,
        hiddenPromotedActions,
      } = getVisibleAndHiddenActionsIndices(
        actions,
        promotedActions,
        disclosureWidth,
        actionsWidths,
        containerWidth,
      );

      setState({
        visibleActions,
        hiddenActions,
        visiblePromotedActions,
        hiddenPromotedActions,
        actionsWidths,
        containerWidth,
        disclosureWidth,
        hasMeasured: true,
      });
    },
    [actions, promotedActions],
  );

  const actionSections = getActionSections(actions);

  const promotedActionsMarkup = promotedActions
    ? promotedActions
        .filter((_, index) => {
          if (!visiblePromotedActions.includes(index)) {
            return false;
          }

          return true;
        })
        .map((action, index) => {
          if (instanceOfMenuGroupDescriptor(action)) {
            return (
              <BulkActionMenu
                key={index}
                {...action}
                isNewBadgeInBadgeActions={isNewBadgeInBadgeActions(
                  actionSections,
                )}
                size={buttonSize}
              />
            );
          }
          return (
            <BulkActionButton
              key={index}
              disabled={disabled}
              {...action}
              size={buttonSize}
            />
          );
        })
    : null;

  const actionsMarkup = actions
    ? actions
        .filter((_, index) => {
          if (!visibleActions.includes(index)) {
            return false;
          }

          return true;
        })
        .map((action, index) => {
          if (instanceOfBulkActionListSection(action)) {
            return (
              <BulkActionMenu
                key={index}
                // {...action}
                actions={action.items}
                title={action.title}
                isNewBadgeInBadgeActions={isNewBadgeInBadgeActions(
                  actionSections,
                )}
                size={buttonSize}
              />
            );
          }
          return (
            <BulkActionButton
              key={index}
              disabled={disabled}
              {...action}
              size={buttonSize}
            />
          );
        })
    : null;

  const hiddenActionObjects = hiddenActions.map((index) => actions?.[index]);
  const hiddenPromotedActionObjects = hiddenPromotedActions.map(
    (index) => promotedActions?.[index],
  );

  const allHiddenActions = [
    ...hiddenPromotedActionObjects,
    ...hiddenActionObjects,
  ]
    .filter((action) => action)
    .map((action: BulkAction | MenuGroupDescriptor | BulkActionListSection) => {
      if (instanceOfBulkActionListSection(action)) {
        return {items: [...action.items]};
      } else if (instanceOfMenuGroupDescriptor(action)) {
        return {items: [...action.actions]};
      }
      return {items: [action]};
    });

  const hiddenActionsMarkup = (
    <Box
      paddingInlineStart="200"
      borderInlineStartWidth="025"
      borderColor="border"
    >
      <Popover
        active={popoverActive}
        activator={
          <BulkActionButton
            disclosure
            showContentInButton={!promotedActionsMarkup}
            onAction={togglePopover}
            content={activatorLabel}
            disabled={disabled}
            indicator={isNewBadgeInBadgeActions(actionSections)}
            size={buttonSize}
          />
        }
        preferredAlignment="right"
        onClose={togglePopover}
      >
        <ActionList
          sections={allHiddenActions}
          onActionAnyItem={togglePopover}
        />
      </Popover>
    </Box>
  );

  const measurerMarkup = (
    <BulkActionsMeasurer
      actions={actions}
      promotedActions={promotedActions}
      disabled={disabled}
      buttonSize={buttonSize}
      handleMeasurement={handleMeasurement}
    />
  );

  return (
    <div className={styles.BulkActions}>
      <InlineStack gap="200" blockAlign="center">
        <InlineStack gap="200" blockAlign="center">
          <CheckableButton {...checkableButtonProps} />
          {paginatedSelectAllMarkup}
        </InlineStack>
        <div className={styles.BulkActionsLayoutOuter}>
          {measurerMarkup}
          <div
            className={classNames(
              styles.BulkActionsLayout,
              !hasMeasured && styles['BulkActionsLayout--measuring'],
            )}
          >
            {promotedActionsMarkup}
            {actionsMarkup}
            {hiddenActionsMarkup}
          </div>
        </div>
      </InlineStack>
    </div>
  );
});
