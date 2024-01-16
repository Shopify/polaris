import React, {PureComponent, createRef, forwardRef} from 'react';
import {Transition} from 'react-transition-group';

import {debounce} from '../../utilities/debounce';
import {classNames} from '../../utilities/css';
import {useI18n} from '../../utilities/i18n';
import {clamp} from '../../utilities/clamp';
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
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import type {ButtonProps} from '../Button';

import {BulkActionButton, BulkActionMenu} from './components';
import styles from './BulkActions.module.scss';

export type BulkAction = DisableableAction & BadgeAction;

type BulkActionListSection = ActionListSection;

type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
type AriaLive = 'off' | 'polite' | undefined;

const BUTTONS_NODE_ADDITIONAL_WIDTH = 64;

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
}

type CombinedProps = BulkActionsProps & {
  i18n: ReturnType<typeof useI18n>;
};

interface State {
  popoverVisible: boolean;
  containerWidth: number;
  measuring: boolean;
}

class BulkActionsInner extends PureComponent<CombinedProps, State> {
  state: State = {
    popoverVisible: false,
    containerWidth: 0,
    measuring: true,
  };

  private containerNode: HTMLElement | null = null;
  private buttonsNode: HTMLElement | null = null;
  private moreActionsNode: HTMLElement | null = null;
  private groupNode = createRef<HTMLDivElement>();
  private promotedActionsWidths: number[] = [];
  private bulkActionsWidth = 0;
  private addedMoreActionsWidthForMeasuring = 0;

  private handleResize = debounce(
    () => {
      const {popoverVisible} = this.state;

      if (this.containerNode) {
        const containerWidth = this.containerNode.getBoundingClientRect().width;
        if (containerWidth > 0) {
          this.setState({containerWidth});
        }
      }

      if (popoverVisible) {
        this.setState({
          popoverVisible: false,
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

    const containerWidthMinusAdditionalWidth = Math.max(
      0,
      containerWidth - BUTTONS_NODE_ADDITIONAL_WIDTH,
    );

    if (
      containerWidthMinusAdditionalWidth >= this.bulkActionsWidth ||
      measuring
    ) {
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
      if (containerWidthMinusAdditionalWidth >= widthWithRemovedAction) {
        sufficientSpace = true;
      } else {
        counter--;
      }
    }

    return clamp(counter, 0, promotedActions.length);
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

  private rolledInPromotedActions() {
    const {promotedActions} = this.props;
    const numberOfPromotedActionsToRender =
      this.numberOfPromotedActionsToRender();

    if (
      !promotedActions ||
      promotedActions.length === 0 ||
      numberOfPromotedActionsToRender >= promotedActions.length
    ) {
      return [];
    }

    const rolledInPromotedActions = promotedActions.map((action) => {
      if (instanceOfMenuGroupDescriptor(action)) {
        return {items: [...action.actions]};
      }
      return {items: [action]};
    });

    return rolledInPromotedActions.slice(numberOfPromotedActionsToRender);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  componentDidMount() {
    const {actions, promotedActions} = this.props;

    if (promotedActions && !actions && this.moreActionsNode) {
      this.addedMoreActionsWidthForMeasuring =
        this.moreActionsNode.getBoundingClientRect().width;
    }

    this.bulkActionsWidth = this.buttonsNode
      ? this.buttonsNode.getBoundingClientRect().width -
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
      disabled,
      promotedActions,
      i18n,
      paginatedSelectAllText,
      paginatedSelectAllAction,
      accessibilityLabel,
      onToggleAll,
      selected,
      innerRef,
      buttonSize = 'micro',
    } = this.props;
    const actionSections = this.actionSections();

    const {popoverVisible, measuring} = this.state;

    const numberOfPromotedActionsToRender =
      this.numberOfPromotedActionsToRender();

    const promotedActionsMarkup =
      promotedActions && numberOfPromotedActionsToRender > 0
        ? [...promotedActions]
            .slice(0, numberOfPromotedActionsToRender)
            .map((action, index) => {
              if (instanceOfMenuGroupDescriptor(action)) {
                return (
                  <BulkActionMenu
                    key={index}
                    {...action}
                    isNewBadgeInBadgeActions={this.isNewBadgeInBadgeActions()}
                    size={buttonSize}
                  />
                );
              }
              return (
                <BulkActionButton
                  key={index}
                  disabled={disabled}
                  {...action}
                  handleMeasurement={this.handleMeasurement}
                  size={buttonSize}
                />
              );
            })
        : null;

    const rolledInPromotedActions = this.rolledInPromotedActions();

    const activatorLabel =
      !promotedActions ||
      (promotedActions && numberOfPromotedActionsToRender === 0 && !measuring)
        ? i18n.translate(
            'Polaris.ResourceList.BulkActions.actionsActivatorLabel',
          )
        : i18n.translate(
            'Polaris.ResourceList.BulkActions.moreActionsActivatorLabel',
          );

    let combinedActions: ActionListSection[] = [];

    if (actionSections && rolledInPromotedActions.length > 0) {
      combinedActions = [...rolledInPromotedActions, ...actionSections];
    } else if (actionSections) {
      combinedActions = actionSections;
    } else if (rolledInPromotedActions.length > 0) {
      combinedActions = [...rolledInPromotedActions];
    }

    const hasTextAndAction = paginatedSelectAllText && paginatedSelectAllAction;

    const ariaLive: AriaLive = hasTextAndAction ? 'polite' : undefined;

    const checkableButtonProps = {
      accessibilityLabel,
      selected,
      onToggleAll,
      disabled,
      ariaLive,
      ref: innerRef,
    };

    const actionsPopover =
      actionSections || rolledInPromotedActions.length > 0 || measuring ? (
        <div className={styles.Popover} ref={this.setMoreActionsNode}>
          <Popover
            active={popoverVisible}
            activator={
              <BulkActionButton
                disclosure
                showContentInButton={!promotedActionsMarkup}
                onAction={this.togglePopover}
                content={activatorLabel}
                disabled={disabled}
                indicator={this.isNewBadgeInBadgeActions()}
                size={buttonSize}
              />
            }
            preferredAlignment="right"
            onClose={this.togglePopover}
          >
            <ActionList
              sections={combinedActions}
              onActionAnyItem={this.togglePopover}
            />
          </Popover>
        </div>
      ) : null;

    const groupContent =
      promotedActionsMarkup || actionsPopover ? (
        <InlineStack gap="300" blockAlign="center">
          <CheckableButton {...checkableButtonProps} />
          <InlineStack gap="100" blockAlign="center">
            {promotedActionsMarkup}
            {actionsPopover}
          </InlineStack>
        </InlineStack>
      ) : null;

    if (!groupContent) {
      return null;
    }

    const group = (
      <Transition
        timeout={0}
        in={selectMode}
        key="group"
        nodeRef={this.groupNode}
      >
        {(status: TransitionStatus) => {
          const groupClassName = classNames(
            styles.Group,
            status && styles[`Group-${status}`],
          );
          return (
            <div className={groupClassName} ref={this.groupNode}>
              <EventListener event="resize" handler={this.handleResize} />
              <div
                className={styles.ButtonGroupWrapper}
                ref={this.setButtonsNode}
              >
                <div className={styles.ButtonGroupInner}>{groupContent}</div>
              </div>
            </div>
          );
        }}
      </Transition>
    );

    return <div ref={this.setContainerNode}>{group}</div>;
  }

  private isNewBadgeInBadgeActions() {
    const actions = this.actionSections();
    if (!actions) return false;

    for (const action of actions) {
      for (const item of action.items) {
        if (item.badge?.tone === 'new') return true;
      }
    }

    return false;
  }

  private setButtonsNode = (node: HTMLElement | null) => {
    this.buttonsNode = node;
  };

  private setContainerNode = (node: HTMLElement | null) => {
    this.containerNode = node;
  };

  private setMoreActionsNode = (node: HTMLElement | null) => {
    this.moreActionsNode = node;
  };

  private togglePopover = () => {
    if (this.props.onMoreActionPopoverToggle) {
      this.props.onMoreActionPopoverToggle(this.state.popoverVisible);
    }

    this.setState(({popoverVisible}) => ({
      popoverVisible: !popoverVisible,
    }));
  };

  private handleMeasurement = (width: number) => {
    const {measuring} = this.state;
    if (measuring) {
      this.promotedActionsWidths.push(width);
    }
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

function instanceOfMenuGroupDescriptor(
  action: MenuGroupDescriptor | BulkAction,
): action is MenuGroupDescriptor {
  return 'title' in action;
}

export const BulkActions = forwardRef(function BulkActions(
  props: BulkActionsProps,
  ref,
) {
  const i18n = useI18n();

  return <BulkActionsInner {...props} i18n={i18n} innerRef={ref} />;
});
