import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  Fragment,
  forwardRef,
  useImperativeHandle,
} from 'react';
import debounce from 'lodash/debounce';
import {Transition} from '@material-ui/react-transition-group';
import {classNames} from '../../utilities/css';
import {DisableableAction, Action, ActionListSection} from '../../types';
import {ActionList} from '../ActionList';
import {Popover} from '../Popover';
import {Button} from '../Button';
import {ButtonGroup} from '../ButtonGroup';
import {EventListener} from '../EventListener';
import {useIsMountedRef} from '../../utilities/use-is-mounted-ref';
import {useI18n} from '../../utilities/i18n';
import {useToggle} from '../../utilities/use-toggle';
import {arraysAreEqual} from '../../utilities/arrays';
import {CheckableButton} from '../CheckableButton';

import styles from './BulkActions.scss';

type BulkAction = DisableableAction & {disclosure?: boolean};
type BulkActionListSection = ActionListSection;
type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

export interface BulkActionsProps {
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Whether to render the small screen BulkActions or not */
  smallScreen?: boolean;
  /** Label for the bulk actions */
  label?: string;
  /** State of the bulk actions checkbox */
  selected?: boolean | 'indeterminate';
  /** List is in a selectable state */
  selectMode?: boolean;
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
  /** Callback when the select all checkbox is clicked */
  onToggleAll?(): void;
  /** Callback when selectable state of list is changed */
  onSelectModeToggle?(selectMode: boolean): void;
}

export const BulkActions = forwardRef<
  {focusInput: () => void},
  BulkActionsProps
>(function BulkActions(
  {
    accessibilityLabel,
    label,
    selected,
    selectMode,
    onToggleAll,
    disabled,
    onSelectModeToggle,
    actions,
    promotedActions = [],
    paginatedSelectAllAction,
    paginatedSelectAllText,
    smallScreen,
  },
  ref,
) {
  const isMounted = useIsMountedRef();
  const i18n = useI18n();
  const {value: popoverActive, toggle: togglePopoverActive} = useToggle(false);
  const [promotedActionsWidth, setPromotedActionsWidth] = useState<number[]>(
    [],
  );
  const [
    availableSpaceForPromotedActions,
    setAvailableSpaceForPromotedActions,
  ] = useState(0);
  const wrapperNode = useRef<HTMLDivElement>(null);
  const checkableWrapperNode = useRef<HTMLDivElement>(null);
  const checkableNode = useRef<{focus: () => void}>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (checkableNode.current) {
        checkableNode.current.focus();
      }
    },
  }));

  const handleCalculations = useCallback(() => {
    const nextWrapperNodeWidth = wrapperNode.current
      ? wrapperNode.current.getBoundingClientRect().width
      : 0;

    const hiddenNode =
      wrapperNode.current && wrapperNode.current.previousElementSibling;
    const measuringNodes = hiddenNode && [
      ...hiddenNode.querySelectorAll('[data-polaris-button-group-item]'),
    ];
    if (!measuringNodes) return;
    const hiddenCheckableButton = measuringNodes[0];
    const hiddenPromotedBulkActions = measuringNodes.slice(
      1,
      measuringNodes.length - 1,
    );
    const hiddenPopoverActivator = measuringNodes[measuringNodes.length - 1];

    const nextCheckableButtonWidth = hiddenCheckableButton.getBoundingClientRect()
      .width;
    const nextPopoverActivatorWidth = hiddenPopoverActivator.getBoundingClientRect()
      .width;

    const nextAvailableSpaceForPromotedActions =
      nextWrapperNodeWidth -
      nextCheckableButtonWidth -
      nextPopoverActivatorWidth;

    setAvailableSpaceForPromotedActions(nextAvailableSpaceForPromotedActions);

    const nextPromotedActionsWidth = [];
    for (const node of hiddenPromotedBulkActions) {
      nextPromotedActionsWidth.push(node.getBoundingClientRect().width);
    }

    if (
      !arraysAreEqual(
        promotedActionsWidth,
        nextPromotedActionsWidth,
        compareWidths,
      )
    ) {
      setPromotedActionsWidth(nextPromotedActionsWidth);
    }
  }, [promotedActionsWidth]);

  useEffect(() => {
    handleCalculations();
    // We want to re-run calculations when promotedActions change
  }, [handleCalculations, promotedActions]);

  const checkableButtonProps = {
    accessibilityLabel,
    label,
    selected,
    selectMode,
    onToggleAll,
    measuring: !isMounted.current,
    disabled,
  };

  const cancelButton = (
    <Button
      onClick={() => setSelectMode(false)}
      testID="btn-cancel"
      disabled={disabled}
    >
      {i18n.translate('Polaris.Common.cancel')}
    </Button>
  );

  const hasActions = Boolean(
    (promotedActions && promotedActions.length > 0) ||
      (actions && actions.length > 0),
  );

  const paginatedSelectAllTextMarkup =
    paginatedSelectAllText && paginatedSelectAllAction ? (
      <span aria-live="polite">{paginatedSelectAllText}</span>
    ) : (
      paginatedSelectAllText
    );

  const allActionsPopover = hasActions ? (
    <div className={styles.Popover}>
      <Popover
        active={popoverActive}
        activator={renderBulkActionButton({
          disclosure: true,
          onAction: togglePopoverActive,
          content: i18n.translate(
            'Polaris.ResourceList.BulkActions.actionsActivatorLabel',
          ),
          disabled,
        })}
        onClose={togglePopoverActive}
      >
        <ActionList
          items={promotedActions}
          sections={actionSections()}
          onActionAnyItem={togglePopoverActive}
        />
      </Popover>
    </div>
  ) : null;

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

  const paginatedSelectAllMarkup =
    paginatedSelectAllActionMarkup || paginatedSelectAllTextMarkup ? (
      <div className={styles.PaginatedSelectAll} testID="paginated-select-all">
        {paginatedSelectAllTextMarkup} {paginatedSelectAllActionMarkup}
      </div>
    ) : null;

  const handleResize = useCallback(
    debounce(
      () => {
        popoverActive && togglePopoverActive();
        handleCalculations();
      },
      50,
      {trailing: true},
    ),
    [],
  );

  let numberOfPromotedActionsToRender = 0;
  let spaceAvailable = availableSpaceForPromotedActions;
  for (const width of promotedActionsWidth) {
    if (spaceAvailable < width) break;

    spaceAvailable -= width;
    numberOfPromotedActionsToRender++;
  }

  const activatorLabel =
    !promotedActions ||
    (promotedActions &&
      numberOfPromotedActionsToRender === 0 &&
      isMounted.current)
      ? i18n.translate('Polaris.ResourceList.BulkActions.actionsActivatorLabel')
      : i18n.translate(
          'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
        );

  const measuringMarkup = (
    <div className={styles.hidden} aria-hidden>
      <div className={styles.ButtonGroupWrapper}>
        <ButtonGroup segmented>
          <CheckableButton {...checkableButtonProps} />
          {promotedActions.map(renderBulkActionButton)}
          {renderBulkActionButton({
            disclosure: true,
            onAction: togglePopoverActive,
            content: activatorLabel,
            disabled,
          })}
        </ButtonGroup>
      </div>
    </div>
  );

  return (
    <Transition
      timeout={0}
      in={selectMode}
      key="smallGroup"
      testID="smallGroup"
      findDOMNode={() => wrapperNode.current}
    >
      {(status: TransitionStatus) => (
        <Fragment>
          {measuringMarkup}
          <div ref={wrapperNode}>
            {smallScreen
              ? smallGroupContent(status)
              : largeGroupContent(status)}
          </div>
        </Fragment>
      )}
    </Transition>
  );

  function largeGroupContent(status: TransitionStatus) {
    const largeScreenGroupClassName = classNames(
      styles.Group,
      styles['Group-largeScreen'],
      isMounted.current && styles[`Group-${status}`],
      !isMounted.current && styles['Group-measuring'],
    );

    const popoverActionSections = actionSections();
    let combinedActions: ActionListSection[] = [];

    const rolledInPromotedActions =
      numberOfPromotedActionsToRender < promotedActions.length
        ? promotedActions.slice(numberOfPromotedActionsToRender)
        : [];

    const promotedActionsMarkup = isMounted.current
      ? promotedActions
          .slice(0, numberOfPromotedActionsToRender)
          .map(renderBulkActionButton)
      : [];

    if (popoverActionSections && rolledInPromotedActions.length > 0) {
      combinedActions = [
        {items: rolledInPromotedActions},
        ...popoverActionSections,
      ];
    } else if (popoverActionSections) {
      combinedActions = popoverActionSections;
    } else if (rolledInPromotedActions.length > 0) {
      combinedActions = [{items: rolledInPromotedActions}];
    }

    const actionsPopover =
      popoverActionSections ||
      rolledInPromotedActions.length > 0 ||
      !isMounted.current ? (
        <div className={styles.Popover}>
          <Popover
            active={popoverActive}
            activator={renderBulkActionButton({
              disclosure: true,
              onAction: togglePopoverActive,
              content: activatorLabel,
              disabled,
            })}
            onClose={togglePopoverActive}
          >
            <ActionList
              sections={combinedActions}
              onActionAnyItem={togglePopoverActive}
            />
          </Popover>
        </div>
      ) : null;

    const largeGroupMarkup =
      promotedActionsMarkup.length > 0 || actionsPopover ? (
        <ButtonGroup segmented>
          <CheckableButton {...checkableButtonProps} ref={checkableNode} />
          {promotedActionsMarkup}
          {actionsPopover}
        </ButtonGroup>
      ) : (
        <CheckableButton {...checkableButtonProps} ref={checkableNode} />
      );

    return (
      <div className={largeScreenGroupClassName}>
        <EventListener event="resize" handler={handleResize} />
        <div className={styles.ButtonGroupWrapper}>{largeGroupMarkup}</div>
        {paginatedSelectAllMarkup}
      </div>
    );
  }

  function smallGroupContent(status: TransitionStatus) {
    const smallScreenGroupClassName = classNames(
      styles.Group,
      styles['Group-smallScreen'],
      styles[`Group-${status}`],
    );
    return (
      <div className={smallScreenGroupClassName}>
        <div className={styles.ButtonGroupWrapper}>
          <ButtonGroup segmented>
            <div
              className={styles.CheckableContainer}
              ref={checkableWrapperNode}
            >
              <CheckableButton {...checkableButtonProps} ref={checkableNode} />
            </div>
            {allActionsPopover}
            {cancelButton}
          </ButtonGroup>
        </div>
        {paginatedSelectAllMarkup}
      </div>
    );
  }

  function renderBulkActionButton(
    {external, url, onAction, disabled, disclosure, content}: BulkAction,
    index?: number,
  ) {
    return (
      <div className={styles.BulkActionButton} key={index}>
        <Button
          external={Boolean(external)}
          url={url}
          aria-label={accessibilityLabel}
          onClick={onAction}
          disabled={disabled}
          disclosure={disclosure}
        >
          {content}
        </Button>
      </div>
    );
  }

  function setSelectMode(val: boolean) {
    if (onSelectModeToggle) {
      onSelectModeToggle(val);
    }
  }

  function actionSections(): BulkActionListSection[] | undefined {
    if (!actions || actions.length === 0) {
      return;
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
});

function compareWidths(first: number, second: number) {
  return first === second;
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
