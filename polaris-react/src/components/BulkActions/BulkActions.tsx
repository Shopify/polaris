import React, {
  useReducer,
  useState,
  useEffect,
  useCallback,
  useMemo,
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
import {Button} from '../Button';
import {ActionList} from '../ActionList';
import {Popover} from '../Popover';
import {InlineStack} from '../InlineStack';
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
import styles from './BulkActions.module.css';

export type BulkAction = DisableableAction & BadgeAction;

type BulkActionListSection = ActionListSection;

type AriaLive = 'off' | 'polite' | undefined;

export interface BulkActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Actions that will be given more prominence */
  promotedActions?: (BulkAction | MenuGroupDescriptor)[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Disables bulk actions */
  disabled?: boolean;
  /** Callback when more actions button is toggled */
  onMoreActionPopoverToggle?(isOpen: boolean): void;
  /** The size of the buttons to render
   * @default 'medium'
   */
  buttonSize?: Extract<ButtonProps['size'], 'micro' | 'medium'>;
  /** Label for the bulk actions */
  label?: string;
  /** List is in a selectable state. Will only render the bulk actions when `true` */
  selectMode?: boolean;
  /** The number of rows selected in the table */
  selectedItemsCount?: number | 'All';
  /** The total number of rows in the table */
  itemCount: number;
  /** Callback when the select all checkbox is clicked */
  onSelect?(selectionType: 'page' | 'all' | 'none'): void;
  /** @deprecated Used for forwarding the ref. Use `ref` prop instead */
  innerRef?: React.Ref<any>;
  /** @deprecated Callback when selectable state of list is changed. Unused callback */
  onSelectModeToggle?(selectMode: boolean): void;
  /** @deprecated If the BulkActions is currently sticky in view */
  isSticky?: boolean;
  /** @deprecated The width of the BulkActions */
  width?: number;
}

interface BulkActionsState {
  visiblePromotedActions: number[];
  hiddenPromotedActions: number[];
  actionsWidths: number[];
  containerWidth: number;
  disclosureWidth: number;
  hasMeasured: boolean;
}

export const BulkActions = ({
  promotedActions,
  actions,
  disabled,
  buttonSize = 'medium',
  paginatedSelectAllAction,
  paginatedSelectAllText,
  selected,
  onSelect,
  onMoreActionPopoverToggle,
  width,
  selectMode,
  selectedItemsCount = 0,
  itemCount,
}: BulkActionsProps) => {
  const i18n = useI18n();
  const [popoverActive, setPopoverActive] = useState(false);
  const [selectedAllMenuActive, setSelectedAllMenuActive] = useState(false);

  const toggleSelectAllMenu = () => {
    setSelectedAllMenuActive((active) => !active);
  };

  const handleBulkSelection =
    (selectionType: 'page' | 'all' | 'none') => () => {
      onSelect?.(selectionType);
    };

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
      visiblePromotedActions: [],
      hiddenPromotedActions: [],
      hasMeasured: false,
    },
  );

  const {
    visiblePromotedActions,
    hiddenPromotedActions,
    containerWidth,
    disclosureWidth,
    actionsWidths,
    hasMeasured,
  } = state;

  useEffect(() => {
    if (
      containerWidth === 0 ||
      !promotedActions ||
      promotedActions.length === 0
    ) {
      return;
    }
    const {visiblePromotedActions, hiddenPromotedActions} =
      getVisibleAndHiddenActionsIndices(
        promotedActions,
        disclosureWidth,
        actionsWidths,
        containerWidth,
      );
    setState({
      visiblePromotedActions,
      hiddenPromotedActions,
      hasMeasured: containerWidth !== Infinity,
    });
  }, [containerWidth, disclosureWidth, promotedActions, actionsWidths]);

  const activatorLabel =
    !promotedActions || (promotedActions && visiblePromotedActions.length === 0)
      ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
      : i18n.translate(
          'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
        );

  const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;

  const ariaLive: AriaLive = hasTextAndAction ? 'polite' : undefined;

  const selectAllOnPageItem = {
    content: i18n.translate(
      'Polaris.ResourceList.BulkActions.selectAllMenu.items.selectAllOnPage',
    ),
    disabled: selected === true,
    onAction: handleBulkSelection('page'),
  };

  const selectAllInStoreItem = paginatedSelectAllAction
    ? {
        ...paginatedSelectAllAction,
        disabled: selectedItemsCount === 'All',
        content: paginatedSelectAllText
          ? paginatedSelectAllText
          : i18n.translate(
              'Polaris.ResourceList.BulkActions.selectAllMenu.items.selectAllInStore',
              {itemCount},
            ),
      }
    : null;

  const unselectAllItem = {
    content: i18n.translate(
      'Polaris.ResourceList.BulkActions.selectAllMenu.items.unselectAll',
    ),
    disabled: selectedItemsCount === 0,
    onAction: handleBulkSelection('none'),
  };

  const selectAllActionsMarkup = selectMode ? (
    <div aria-live={ariaLive}>
      <Popover
        active={selectedAllMenuActive}
        onClose={toggleSelectAllMenu}
        activator={
          <Button
            disclosure
            pressed={selectedAllMenuActive}
            variant="tertiary"
            onClick={toggleSelectAllMenu}
          >
            {i18n.translate(
              'Polaris.ResourceList.BulkActions.selectAllMenu.activator',
              {selectedItemsCount},
            )}
          </Button>
        }
      >
        <ActionList
          items={[
            selectAllOnPageItem,
            ...(selectAllInStoreItem
              ? [selectAllInStoreItem, unselectAllItem]
              : [unselectAllItem]),
          ]}
          onActionAnyItem={toggleSelectAllMenu}
        />
      </Popover>
    </div>
  ) : null;

  const togglePopover = useCallback(() => {
    onMoreActionPopoverToggle?.(popoverActive);
    setPopoverActive((popoverActive) => !popoverActive);
  }, [onMoreActionPopoverToggle, popoverActive]);

  const handleMeasurement = useCallback(
    (measurements: ActionsMeasurements) => {
      const {
        hiddenActionsWidths: actionsWidths,
        containerWidth,
        disclosureWidth,
      } = measurements;
      if (!promotedActions || promotedActions.length === 0) {
        return;
      }

      const {visiblePromotedActions, hiddenPromotedActions} =
        getVisibleAndHiddenActionsIndices(
          promotedActions,
          disclosureWidth,
          actionsWidths,
          containerWidth,
        );

      setState({
        visiblePromotedActions,
        hiddenPromotedActions,
        actionsWidths,
        containerWidth,
        disclosureWidth,
        hasMeasured: true,
      });
    },
    [promotedActions],
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

  const hiddenPromotedActionObjects = hiddenPromotedActions.map(
    (index) => promotedActions?.[index],
  );

  const mergedHiddenPromotedActions = hiddenPromotedActionObjects.reduce(
    (memo, action) => {
      if (!action) return memo;
      if (instanceOfMenuGroupDescriptor(action)) {
        return memo.concat(action.actions);
      }
      return memo.concat(action);
    },
    [] as (BulkAction | MenuGroupDescriptor)[],
  );

  const hiddenPromotedSection = {
    items: mergedHiddenPromotedActions,
  };

  const allHiddenActions = useMemo(() => {
    if (actionSections) {
      return actionSections;
    }
    if (!actions) {
      return [];
    }
    let isAFlatArray = true;
    return actions
      .filter((action) => action)
      .reduce(
        (
          memo: BulkActionListSection[],
          action: BulkAction | BulkActionListSection,
        ): BulkActionListSection[] => {
          if (instanceOfBulkActionListSection(action)) {
            isAFlatArray = false;
            return memo.concat(action);
          }
          if (isAFlatArray) {
            if (memo.length === 0) {
              return [{items: [action]}];
            }
            const lastItem = memo[memo.length - 1];
            memo.splice(memo.length - 1, 1, {
              items: [...lastItem.items, action],
            });
            return memo;
          }

          isAFlatArray = true;

          return memo.concat({items: [action]});
        },
        [],
      );
  }, [actions, actionSections]);

  const activator = (
    <BulkActionButton
      disclosure
      showContentInButton={!promotedActionsMarkup}
      onAction={togglePopover}
      content={activatorLabel}
      disabled={disabled}
      indicator={isNewBadgeInBadgeActions(actionSections)}
      size={buttonSize}
    />
  );

  const actionsMarkup =
    allHiddenActions.length > 0 ? (
      <Popover
        active={popoverActive}
        activator={activator}
        preferredAlignment="right"
        onClose={togglePopover}
      >
        <ActionList
          sections={
            hiddenPromotedSection.items.length > 0
              ? [hiddenPromotedSection, ...allHiddenActions]
              : allHiddenActions
          }
          onActionAnyItem={togglePopover}
        />
      </Popover>
    ) : null;

  const measurerMarkup = (
    <BulkActionsMeasurer
      promotedActions={promotedActions}
      disabled={disabled}
      buttonSize={buttonSize}
      handleMeasurement={handleMeasurement}
    />
  );

  return selectMode ? (
    <div className={styles.BulkActions} style={width ? {width} : undefined}>
      <div className={styles.BulkActionsPromotedActionsWrapper}>
        <InlineStack gap="100" align="start" blockAlign="center" wrap={false}>
          {selectAllActionsMarkup}
          <div className={styles.BulkActionsOuterLayout}>
            {measurerMarkup}
            <div
              className={classNames(
                styles.BulkActionsLayout,
                !hasMeasured && styles['BulkActionsLayout--measuring'],
              )}
            >
              {promotedActionsMarkup}
              {actionsMarkup}
            </div>
          </div>
        </InlineStack>
      </div>
    </div>
  ) : null;
};
