import React, {useContext, useEffect, useRef, useState} from 'react';
import debounce from 'lodash/debounce';
import {durationBase} from '@shopify/polaris-tokens';
import {CSSTransition, Transition} from '@material-ui/react-transition-group';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {IndexContext, SELECT_ALL_ITEMS} from '../../utilities/index';
import {DisableableAction, Action, ActionListSection} from '../../types';
import {ActionList} from '../ActionList';
import {Popover} from '../Popover';
import {Button} from '../Button';
import {EventListener} from '../EventListener';
import {BulkActionButton, CheckableButton} from './components';
import styles from './BulkActions.scss';

export type BulkAction = DisableableAction;

export type BulkActionListSection = ActionListSection;

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

const MAX_PROMOTED_ACTIONS = 2;

export interface BulkActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Label for the bulk actions */
  label?: string;
  /** Actions that will be given more prominence */
  promotedActions?: BulkAction[];
  /** List of actions */
  actions?: (BulkAction | BulkActionListSection)[];
  /** Text to select all across pages */
  paginatedSelectAllText?: string;
  /** Action for selecting all across pages */
  paginatedSelectAllAction?: Action;
  /** Disables bulk actions */
  disabled?: boolean;
}

const slideClasses = {
  appear: classNames(styles.Slide, styles['Slide-appear']),
  appearActive: classNames(styles.Slide, styles['Slide-appearing']),
  enter: classNames(styles.Slide, styles['Slide-enter']),
  enterActive: classNames(styles.Slide, styles['Slide-entering']),
  exit: classNames(styles.Slide, styles['Slide-exit']),
};

export function BulkActions({
  accessibilityLabel,
  label = '',
  disabled,
  actions,
  promotedActions,
  paginatedSelectAllText,
  paginatedSelectAllAction,
}: BulkActionsProps) {
  const i18n = useI18n();

  const {onSelectionChange, selectedItems, bulkSelectState} = useContext(
    IndexContext,
  );

  const selectMode = selectedItems != null && selectedItems.length > 0;

  const [smallScreenPopoverVisible, setSmallScreenPopoverVisible] = useState(
    false,
  );
  const [largeScreenPopoverVisible, setLargeScreenPopoverVisible] = useState(
    false,
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const [measuring, setMeasuring] = useState(true);

  const moreActionsNode = useRef(null);
  const checkableWrapperNode = useRef(null);
  const largeScreenGroupNode = useRef(null);
  const smallScreenGroupNode = useRef(null);
  const containerNode = useRef(null);
  const largeScreenButtonsNode = useRef(null);

  const promotedActionsWidths: number[] = [];

  let bulkActionsWidth = 0;
  let addedMoreActionsWidthForMeasuring = 0;

  useEffect(() => {
    if (promotedActions && !actions && moreActionsNode.current != null) {
      addedMoreActionsWidthForMeasuring = moreActionsNode.current.getBoundingClientRect()
        .width;
    }

    bulkActionsWidth = largeScreenButtonsNode.current
      ? largeScreenButtonsNode.current.getBoundingClientRect().width -
        addedMoreActionsWidthForMeasuring
      : 0;

    if (containerNode.current != null) {
      setContainerWidth(containerNode.current.getBoundingClientRect().width);
      setMeasuring(false);
    }
  });

  const handleResize = debounce(
    () => {
      if (containerNode.current != null) {
        const containerWidth = containerNode.current.getBoundingClientRect()
          .width;
        if (containerWidth > 0) {
          setContainerWidth(containerWidth);
        }
      }

      if (smallScreenPopoverVisible || largeScreenPopoverVisible) {
        setSmallScreenPopoverVisible(false);
        setLargeScreenPopoverVisible(false);
      }
    },
    50,
    {trailing: true},
  );

  if (promotedActions && promotedActions.length > MAX_PROMOTED_ACTIONS) {
    // eslint-disable-next-line no-console
    console.warn(
      i18n.translate('Polaris.ResourceList.BulkActions.warningMessage', {
        maxPromotedActions: MAX_PROMOTED_ACTIONS,
      }),
    );
  }

  const paginatedSelectAllActionMarkup = paginatedSelectAllAction ? (
    <Button
      onClick={paginatedSelectAllAction.onAction}
      plain
      testID="paginated-action"
      disabled={disabled}
    >
      {paginatedSelectAllAction.content}
    </Button>
  ) : null;

  const paginatedSelectAllTextMarkup =
    paginatedSelectAllText && paginatedSelectAllAction ? (
      <span aria-live="polite">{paginatedSelectAllText}</span>
    ) : (
      paginatedSelectAllText
    );

  const paginatedSelectAllMarkup =
    paginatedSelectAllActionMarkup || paginatedSelectAllTextMarkup ? (
      <div className={styles.PaginatedSelectAll} testID="paginated-select-all">
        {paginatedSelectAllTextMarkup} {paginatedSelectAllActionMarkup}
      </div>
    ) : null;

  const cancelButtonClassName = classNames(
    styles.Button,
    styles['Button-cancel'],
    disabled && styles.disabled,
  );
  const cancelButton = (
    <button
      className={cancelButtonClassName}
      onClick={onToggleAll}
      testID="btn-cancel"
      disabled={disabled}
    >
      {i18n.translate('Polaris.Common.cancel')}
    </button>
  );

  const allActionsPopover = hasActions ? (
    <div className={styles.Popover} ref={moreActionsNode}>
      <Popover
        active={smallScreenPopoverVisible}
        activator={
          <BulkActionButton
            disclosure
            onAction={toggleSmallScreenPopover}
            content={i18n.translate(
              'Polaris.ResourceList.BulkActions.actionsActivatorLabel',
            )}
            disabled={disabled}
          />
        }
        onClose={toggleSmallScreenPopover}
      >
        <ActionList
          items={promotedActions}
          sections={actionSections()}
          onActionAnyItem={toggleSmallScreenPopover}
        />
      </Popover>
    </div>
  ) : null;

  const promotedActionsMarkup =
    promotedActions && numberOfPromotedActionsToRender() > 0
      ? [...promotedActions]
          .slice(0, numberOfPromotedActionsToRender())
          .map((action, index) => (
            <BulkActionButton
              disabled={disabled}
              {...action}
              key={index}
              handleMeasurement={handleMeasurement}
            />
          ))
      : null;

  const rolledInPromotedActions =
    promotedActions &&
    numberOfPromotedActionsToRender() < promotedActions.length
      ? [...promotedActions].slice(numberOfPromotedActionsToRender())
      : [];

  const activatorLabel =
    !promotedActions ||
    (promotedActions && numberOfPromotedActionsToRender() === 0 && !measuring)
      ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
      : i18n.translate(
          'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
        );

  let combinedActions: ActionListSection[] = [];

  if (actionSections() && rolledInPromotedActions.length > 0) {
    combinedActions = [{items: rolledInPromotedActions}, ...actionSections()];
  } else if (actionSections()) {
    combinedActions = actionSections();
  } else if (rolledInPromotedActions.length > 0) {
    combinedActions = [{items: rolledInPromotedActions}];
  }

  const actionsPopover =
    actionSections || rolledInPromotedActions.length > 0 || measuring ? (
      <div className={styles.Popover} ref={moreActionsNode}>
        <Popover
          active={largeScreenPopoverVisible}
          activator={
            <BulkActionButton
              disclosure
              onAction={toggleLargeScreenPopover}
              content={activatorLabel}
              disabled={disabled}
            />
          }
          onClose={toggleLargeScreenPopover}
        >
          <ActionList
            sections={combinedActions}
            onActionAnyItem={toggleLargeScreenPopover}
          />
        </Popover>
      </div>
    ) : null;

  const checkableButtonProps = {
    accessibilityLabel,
    label,
    selected: bulkSelectState,
    selectMode,
    onToggleAll,
    measuring,
    disabled,
  };

  const smallScreenGroup = (
    <Transition
      timeout={0}
      in={selectMode}
      key="smallGroup"
      findDOMNode={findSmallScreenGroupNode}
    >
      {(status: TransitionStatus) => {
        const smallScreenGroupClassName = classNames(
          styles.Group,
          styles['Group-smallScreen'],
          styles[`Group-${status}`],
        );
        return (
          <div className={smallScreenGroupClassName} ref={smallScreenGroupNode}>
            <div className={styles.ButtonGroup}>
              <CSSTransition
                findDOMNode={findCheckableWrapperNode}
                in={selectMode}
                timeout={durationBase}
                classNames={slideClasses}
                appear
              >
                <div
                  className={styles.CheckableContainer}
                  ref={checkableWrapperNode}
                >
                  <CheckableButton {...checkableButtonProps} />
                </div>
              </CSSTransition>
              {allActionsPopover}
              {cancelButton}
            </div>
            {paginatedSelectAllMarkup}
          </div>
        );
      }}
    </Transition>
  );

  const largeScreenGroup = (
    <Transition
      timeout={0}
      in={selectMode}
      key="largeGroup"
      findDOMNode={findLargeScreenGroupNode}
    >
      {(status: TransitionStatus) => {
        const largeScreenGroupClassName = classNames(
          styles.Group,
          styles['Group-largeScreen'],
          !measuring && styles[`Group-${status}`],
          measuring && styles['Group-measuring'],
        );
        return (
          <div className={largeScreenGroupClassName} ref={largeScreenGroupNode}>
            <EventListener event="resize" handler={handleResize} />
            <div className={styles.ButtonGroup} ref={largeScreenButtonsNode}>
              <CheckableButton {...checkableButtonProps} />
              {promotedActionsMarkup}
              {actionsPopover}
            </div>
            {paginatedSelectAllMarkup}
          </div>
        );
      }}
    </Transition>
  );

  return (
    <div ref={containerNode}>
      {smallScreenGroup}
      {largeScreenGroup}
    </div>
  );

  function onToggleAll() {
    onSelectionChange(false, SELECT_ALL_ITEMS);
  }

  function toggleSmallScreenPopover() {
    setSmallScreenPopoverVisible(
      (smallScreenPopoverVisible) => !smallScreenPopoverVisible,
    );
  }

  function toggleLargeScreenPopover() {
    setLargeScreenPopoverVisible(
      (largeScreenPopoverVisible) => !largeScreenPopoverVisible,
    );
  }

  function handleMeasurement(width: number) {
    if (measuring) {
      promotedActionsWidths.push(width);
    }
  }

  function findLargeScreenGroupNode() {
    return largeScreenGroupNode.current;
  }

  function findCheckableWrapperNode() {
    return checkableWrapperNode.current;
  }

  function findSmallScreenGroupNode() {
    return smallScreenGroupNode.current;
  }

  function numberOfPromotedActionsToRender(): number {
    if (!promotedActions) {
      return 0;
    }

    if (containerWidth >= bulkActionsWidth || measuring) {
      return promotedActions.length;
    }

    let sufficientSpace = false;
    let counter = promotedActions.length - 1;
    let totalWidth = 0;

    while (!sufficientSpace && counter >= 0) {
      totalWidth += promotedActionsWidths[counter];
      const widthWithRemovedAction =
        bulkActionsWidth - totalWidth + addedMoreActionsWidthForMeasuring;
      if (containerWidth >= widthWithRemovedAction) {
        sufficientSpace = true;
      } else {
        counter--;
      }
    }

    return counter;
  }

  function hasActions() {
    return Boolean(
      (promotedActions && promotedActions.length > 0) ||
        (actions && actions.length > 0),
    );
  }

  function actionSections(): BulkActionListSection[] {
    if (!actions || actions.length === 0) {
      return [];
    }

    if (instanceOfBulkActionListSectionArray(actions)) {
      return actions;
    }

    if (instanceOfBulkActionArray(actions)) {
      return [
        {
          items: actions,
        },
      ];
    }
  }
}

function instanceOfBulkActionListSectionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkActionListSection[] {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

function instanceOfBulkActionArray(
  actions: (BulkAction | BulkActionListSection)[],
): actions is BulkAction[] {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}
