import React, {createRef} from 'react';
import debounce from 'lodash/debounce';
import {durationBase} from '@shopify/polaris-tokens';
import {CSSTransition, Transition} from '@material-ui/react-transition-group';
import {classNames} from '../../../../utilities/css';
import {DisableableAction, Action, ActionListSection} from '../../../../types';
import {ActionList} from '../../../ActionList';
import {Popover} from '../../../Popover';
import {Button} from '../../../Button';
import {ButtonGroup} from '../../../ButtonGroup';
import {EventListener} from '../../../EventListener';
import {
  withAppProvider,
  WithAppProviderProps,
} from '../../../../utilities/with-app-provider';
import {CheckableButton} from '../CheckableButton';
import {BulkActionButton} from './components';
import styles from './BulkActions.scss';

type BulkAction = DisableableAction;

type BulkActionListSection = ActionListSection;

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';

const MAX_PROMOTED_ACTIONS = 2;

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

interface State {
  smallScreenPopoverVisible: boolean;
  largeScreenPopoverVisible: boolean;
  containerWidth: number;
  measuring: boolean;
}

const slideClasses = {
  appear: classNames(styles.Slide, styles['Slide-appear']),
  appearActive: classNames(styles.Slide, styles['Slide-appearing']),
  enter: classNames(styles.Slide, styles['Slide-enter']),
  enterActive: classNames(styles.Slide, styles['Slide-entering']),
  exit: classNames(styles.Slide, styles['Slide-exit']),
};

type CombinedProps = BulkActionsProps & WithAppProviderProps;

class BulkActionsInner extends React.PureComponent<CombinedProps, State> {
  state: State = {
    smallScreenPopoverVisible: false,
    largeScreenPopoverVisible: false,
    containerWidth: 0,
    measuring: true,
  };

  private containerNode: HTMLElement | null = null;
  private largeScreenButtonsNode: HTMLElement | null = null;
  private moreActionsNode: HTMLElement | null = null;
  private checkableWrapperNode = createRef<HTMLDivElement>();
  private largeScreenGroupNode = createRef<HTMLDivElement>();
  private smallScreenGroupNode = createRef<HTMLDivElement>();
  private promotedActionsWidths: number[] = [];
  private bulkActionsWidth = 0;
  private addedMoreActionsWidthForMeasuring = 0;

  private handleResize = debounce(
    () => {
      const {smallScreenPopoverVisible, largeScreenPopoverVisible} = this.state;

      if (this.containerNode) {
        const containerWidth = this.containerNode.getBoundingClientRect().width;
        if (containerWidth > 0) {
          this.setState({containerWidth});
        }
      }

      if (smallScreenPopoverVisible || largeScreenPopoverVisible) {
        this.setState({
          smallScreenPopoverVisible: false,
          largeScreenPopoverVisible: false,
        });
      }
    },
    50,
    {trailing: true},
  );

  private numberOfPromotedActionsToRender(): number {
    const {promotedActions} = this.props;
    const {containerWidth, measuring} = this.state;

    if (!promotedActions) {
      return 0;
    }

    if (containerWidth >= this.bulkActionsWidth || measuring) {
      return promotedActions.length;
    }

    let sufficientSpace = false;
    let counter = promotedActions.length - 1;
    let totalWidth = 0;

    while (!sufficientSpace && counter >= 0) {
      totalWidth += this.promotedActionsWidths[counter];
      const widthWithRemovedAction =
        this.bulkActionsWidth -
        totalWidth +
        this.addedMoreActionsWidthForMeasuring;
      if (containerWidth >= widthWithRemovedAction) {
        sufficientSpace = true;
      } else {
        counter--;
      }
    }

    return counter;
  }

  private hasActions() {
    const {promotedActions, actions} = this.props;
    return Boolean(
      (promotedActions && promotedActions.length > 0) ||
        (actions && actions.length > 0),
    );
  }

  private actionSections(): BulkActionListSection[] | undefined {
    const {actions} = this.props;

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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  componentDidMount() {
    const {actions, promotedActions} = this.props;

    if (promotedActions && !actions && this.moreActionsNode) {
      this.addedMoreActionsWidthForMeasuring = this.moreActionsNode.getBoundingClientRect().width;
    }

    this.bulkActionsWidth = this.largeScreenButtonsNode
      ? this.largeScreenButtonsNode.getBoundingClientRect().width -
        this.addedMoreActionsWidthForMeasuring
      : 0;

    if (this.containerNode) {
      this.setState({
        containerWidth: this.containerNode.getBoundingClientRect().width,
        measuring: false,
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  render() {
    const {
      selectMode,
      accessibilityLabel,
      label = '',
      onToggleAll,
      selected,
      smallScreen,
      disabled,
      promotedActions,
      paginatedSelectAllText = null,
      paginatedSelectAllAction,
      polaris: {intl},
    } = this.props;

    const actionSections = this.actionSections();

    if (promotedActions && promotedActions.length > MAX_PROMOTED_ACTIONS) {
      // eslint-disable-next-line no-console
      console.warn(
        intl.translate('Polaris.ResourceList.BulkActions.warningMessage', {
          maxPromotedActions: MAX_PROMOTED_ACTIONS,
        }),
      );
    }

    const {
      smallScreenPopoverVisible,
      largeScreenPopoverVisible,
      measuring,
    } = this.state;

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
        <div
          className={styles.PaginatedSelectAll}
          testID="paginated-select-all"
        >
          {paginatedSelectAllTextMarkup} {paginatedSelectAllActionMarkup}
        </div>
      ) : null;

    const cancelButton = (
      <Button
        onClick={this.setSelectMode.bind(this, false)}
        testID="btn-cancel"
        disabled={disabled}
      >
        {intl.translate('Polaris.Common.cancel')}
      </Button>
    );

    const numberOfPromotedActionsToRender = this.numberOfPromotedActionsToRender();

    const allActionsPopover = this.hasActions() ? (
      <div className={styles.Popover} ref={this.setMoreActionsNode}>
        <Popover
          active={smallScreenPopoverVisible}
          activator={
            <BulkActionButton
              disclosure
              onAction={this.toggleSmallScreenPopover}
              content={intl.translate(
                'Polaris.ResourceList.BulkActions.actionsActivatorLabel',
              )}
              disabled={disabled}
            />
          }
          onClose={this.toggleSmallScreenPopover}
        >
          <ActionList
            items={promotedActions}
            sections={actionSections}
            onActionAnyItem={this.toggleSmallScreenPopover}
          />
        </Popover>
      </div>
    ) : null;

    const promotedActionsMarkup =
      promotedActions && numberOfPromotedActionsToRender > 0
        ? [...promotedActions]
            .slice(0, numberOfPromotedActionsToRender)
            .map((action, index) => (
              <BulkActionButton
                disabled={disabled}
                {...action}
                key={index}
                handleMeasurement={this.handleMeasurement}
              />
            ))
        : null;

    const rolledInPromotedActions =
      promotedActions &&
      numberOfPromotedActionsToRender < promotedActions.length
        ? [...promotedActions].slice(numberOfPromotedActionsToRender)
        : [];

    const activatorLabel =
      !promotedActions ||
      (promotedActions && numberOfPromotedActionsToRender === 0 && !measuring)
        ? intl.translate(
            'Polaris.ResourceList.BulkActions.actionsActivatorLabel',
          )
        : intl.translate(
            'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
          );

    let combinedActions: ActionListSection[] = [];

    if (actionSections && rolledInPromotedActions.length > 0) {
      combinedActions = [{items: rolledInPromotedActions}, ...actionSections];
    } else if (actionSections) {
      combinedActions = actionSections;
    } else if (rolledInPromotedActions.length > 0) {
      combinedActions = [{items: rolledInPromotedActions}];
    }

    const actionsPopover =
      actionSections || rolledInPromotedActions.length > 0 || measuring ? (
        <div className={styles.Popover} ref={this.setMoreActionsNode}>
          <Popover
            active={largeScreenPopoverVisible}
            activator={
              <BulkActionButton
                disclosure
                onAction={this.toggleLargeScreenPopover}
                content={activatorLabel}
                disabled={disabled}
              />
            }
            onClose={this.toggleLargeScreenPopover}
          >
            <ActionList
              sections={combinedActions}
              onActionAnyItem={this.toggleLargeScreenPopover}
            />
          </Popover>
        </div>
      ) : null;

    const checkableButtonProps = {
      accessibilityLabel,
      label,
      selected,
      selectMode,
      onToggleAll,
      measuring,
      disabled,
    };

    const smallScreenGroup = smallScreen ? (
      <Transition
        timeout={0}
        in={selectMode}
        key="smallGroup"
        testID="smallGroup"
        findDOMNode={this.findSmallScreenGroupNode}
      >
        {(status: TransitionStatus) => {
          const smallScreenGroupClassName = classNames(
            styles.Group,
            styles['Group-smallScreen'],
            styles[`Group-${status}`],
          );
          return (
            <div
              className={smallScreenGroupClassName}
              ref={this.smallScreenGroupNode}
            >
              <div className={styles.ButtonGroupWrapper}>
                <ButtonGroup segmented>
                  <CSSTransition
                    findDOMNode={this.findCheckableWrapperNode}
                    in={selectMode}
                    timeout={durationBase}
                    classNames={slideClasses}
                    appear={!selectMode}
                  >
                    <div
                      className={styles.CheckableContainer}
                      ref={this.checkableWrapperNode}
                    >
                      <CheckableButton {...checkableButtonProps} smallScreen />
                    </div>
                  </CSSTransition>
                  {allActionsPopover}
                  {cancelButton}
                </ButtonGroup>
              </div>
              {paginatedSelectAllMarkup}
            </div>
          );
        }}
      </Transition>
    ) : null;

    const largeGroupContent =
      promotedActionsMarkup || actionsPopover ? (
        <ButtonGroup segmented>
          <CheckableButton {...checkableButtonProps} />
          {promotedActionsMarkup}
          {actionsPopover}
        </ButtonGroup>
      ) : (
        <CheckableButton {...checkableButtonProps} />
      );

    const largeScreenGroup = smallScreen ? null : (
      <Transition
        timeout={0}
        in={selectMode}
        key="largeGroup"
        findDOMNode={this.findLargeScreenGroupNode}
        testID="largeGroup"
      >
        {(status: TransitionStatus) => {
          const largeScreenGroupClassName = classNames(
            styles.Group,
            styles['Group-largeScreen'],
            !measuring && styles[`Group-${status}`],
            measuring && styles['Group-measuring'],
          );
          return (
            <div
              className={largeScreenGroupClassName}
              ref={this.largeScreenGroupNode}
            >
              <EventListener event="resize" handler={this.handleResize} />
              <div
                className={styles.ButtonGroupWrapper}
                ref={this.setLargeScreenButtonsNode}
              >
                {largeGroupContent}
              </div>
              {paginatedSelectAllMarkup}
            </div>
          );
        }}
      </Transition>
    );

    return (
      <div ref={this.setContainerNode}>
        {smallScreenGroup}
        {largeScreenGroup}
      </div>
    );
  }

  private setLargeScreenButtonsNode = (node: HTMLElement | null) => {
    this.largeScreenButtonsNode = node;
  };

  private setContainerNode = (node: HTMLElement | null) => {
    this.containerNode = node;
  };

  private setMoreActionsNode = (node: HTMLElement | null) => {
    this.moreActionsNode = node;
  };

  private setSelectMode = (val: boolean) => {
    const {onSelectModeToggle} = this.props;
    if (onSelectModeToggle) {
      onSelectModeToggle(val);
    }
  };

  private toggleSmallScreenPopover = () => {
    this.setState(({smallScreenPopoverVisible}) => ({
      smallScreenPopoverVisible: !smallScreenPopoverVisible,
    }));
  };

  private toggleLargeScreenPopover = () => {
    this.setState(({largeScreenPopoverVisible}) => ({
      largeScreenPopoverVisible: !largeScreenPopoverVisible,
    }));
  };

  private handleMeasurement = (width: number) => {
    const {measuring} = this.state;
    if (measuring) {
      this.promotedActionsWidths.push(width);
    }
  };

  private findLargeScreenGroupNode = () => {
    return this.largeScreenGroupNode.current;
  };

  private findCheckableWrapperNode = () => {
    return this.checkableWrapperNode.current;
  };

  private findSmallScreenGroupNode = () => {
    return this.smallScreenGroupNode.current;
  };
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

export const BulkActions = withAppProvider<BulkActionsProps>()(
  BulkActionsInner,
);
