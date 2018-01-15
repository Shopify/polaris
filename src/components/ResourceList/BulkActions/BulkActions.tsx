import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {DisableableAction} from '../../../types';
import {Duration} from '../../shared';
import {
  ActionList,
  Popover,
} from '../../../';
import {ActionListSection} from '../../ActionList/Section';
import CheckableButton from '../CheckableButton';

import Action from './Action';
import * as styles from './BulkActions.scss';

export type BulkAction = DisableableAction;
export type BulkActionListSection = ActionListSection;

const MAX_PROMOTED_ACTIONS = 2;

export interface Props {
  accessibilityLabel?: string,
  label?: string,
  selected?: boolean | 'indeterminate',
  selectMode?: boolean,
  promotedActions?: BulkAction[],
  actions?: (BulkAction | BulkActionListSection)[],
  onToggleAll?(): void,
  onSelectModeToggle?(selectMode: boolean): void,
}

export interface State {
  smallScreenPopoverVisible: boolean,
  largeScreenPopoverVisible: boolean,
}

const fadeClasses = {
  appear: classNames(styles.Fade, styles['Fade-appear']),
  appearActive: classNames(styles.Fade, styles['Fade-appearing']),
  enter: classNames(styles.Fade, styles['Fade-enter']),
  enterActive: classNames(styles.Fade, styles['Fade-entering']),
  exit: classNames(styles.Fade, styles['Fade-exit']),
};

const slideClasses = {
  appear: classNames(styles.Slide, styles['Slide-appear']),
  appearActive: classNames(styles.Slide, styles['Slide-appearing']),
  enter: classNames(styles.Slide, styles['Slide-enter']),
  enterActive: classNames(styles.Slide, styles['Slide-entering']),
  exit: classNames(styles.Slide, styles['Slide-exit']),
};

export default class BulkActions extends React.PureComponent<Props, State> {
  state = {
    smallScreenPopoverVisible: false,
    largeScreenPopoverVisible: false,
  };

  private actionsActivatorLabel = 'Actions';
  private moreActionsActivatorLabel = 'More actions';

  private get hasActions() {
    const {promotedActions, actions} = this.props;
    return Boolean(
      (promotedActions && promotedActions.length > 0) ||
      (actions && actions.length > 0),
    );
  }

  private get actionSections(): BulkActionListSection[] | undefined {
    const {actions} = this.props;

    if (!actions || actions.length === 0) { return; }

    if (instanceOfBulkActionListSectionArray(actions)) {
      return actions;
    }

    if (instanceOfBulkActionArray(actions)) {
      return [{
        items: actions,
      }];
    }
  }

  render() {
    const {
      selectMode,
      accessibilityLabel,
      label = '',
      onToggleAll,
      selected,
      promotedActions,
    } = this.props;

    if (promotedActions && promotedActions.length > MAX_PROMOTED_ACTIONS) {
      // tslint:disable-next-line no-console
      console.warn(`To provide a better user experience. There should only be a maximum of ${MAX_PROMOTED_ACTIONS} promoted actions.`);
    }

    const {smallScreenPopoverVisible, largeScreenPopoverVisible} = this.state;

    const cancelButtonClassName = classNames(styles.Button, styles['Button-cancel']);
    const cancelButton = (
      <button className={cancelButtonClassName} onClick={this.setSelectMode.bind(this, false)}>
        Cancel
      </button>
    );

    const allActionsPopover = this.hasActions
      ? (
        <div className={styles.Popover}>
          <Popover
            active={smallScreenPopoverVisible}
            activator={
              <Action
                disclosure
                onAction={this.toggleSmallScreenPopover}
                content={this.actionsActivatorLabel}
              />
            }
            onClose={this.toggleSmallScreenPopover}
          >
            <ActionList
              items={promotedActions}
              sections={this.actionSections}
              onActionAnyItem={this.toggleSmallScreenPopover}
            />
          </Popover>
        </div>
      )
      : null;

    const promotedActionsMarkup = promotedActions && promotedActions.length > 0
      ? promotedActions.map((action, index) => (
        <Action {...action} key={index} />
      ))
      : null;

    const actionsPopover = this.actionSections
      ? (
        <div className={styles.Popover}>
          <Popover
            active={largeScreenPopoverVisible}
            activator={
              <Action
                disclosure
                onAction={this.toggleLargeScreenPopover}
                content={this.moreActionsActivatorLabel}
              />
            }
            onClose={this.toggleLargeScreenPopover}
          >
            <ActionList
              sections={this.actionSections}
              onActionAnyItem={this.toggleLargeScreenPopover}
            />
          </Popover>
        </div>
      )
      : null;

    const smallScreenGroupClassName = classNames(styles.Group, styles['Group-smallScreen']);

    const checkableButtonProps = {
      accessibilityLabel,
      label,
      selected,
      selectMode,
      onToggleAll,
    };

    const smallScreenGroup = (
      <div key="smallScreenGroup" className={smallScreenGroupClassName}>
        <CSSTransition
          in={selectMode}
          timeout={Duration.Base}
          classNames={fadeClasses}
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.ButtonGroup}>
            <CSSTransition
              in={selectMode}
              timeout={Duration.Base}
              classNames={slideClasses}
              mountOnEnter
              unmountOnExit
              appear
            >
              <CheckableButton {...checkableButtonProps} />
            </CSSTransition>
            {allActionsPopover}
            {cancelButton}
          </div>
        </CSSTransition>
      </div>
    );

    const largeScreenGroupClassName = classNames(styles.Group, styles['Group-largeScreen']);
    const largeScreenGroup = (
      <div key="largeScreenGroup" className={largeScreenGroupClassName}>
        <CSSTransition
          in={selectMode}
          timeout={Duration.Slow}
          classNames={fadeClasses}
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.ButtonGroup}>
            <CheckableButton {...checkableButtonProps} />
            {promotedActionsMarkup}
            {actionsPopover}
          </div>
        </CSSTransition>
      </div>
    );

    return [
      smallScreenGroup,
      largeScreenGroup,
    ];
  }

  @autobind private setSelectMode(val: boolean) {
    const {onSelectModeToggle} = this.props;
    if (onSelectModeToggle) {
      onSelectModeToggle(val);
    }
  }

  @autobind
  private toggleSmallScreenPopover() {
    this.setState(({smallScreenPopoverVisible}) => ({smallScreenPopoverVisible: !smallScreenPopoverVisible}));
  }

  @autobind
  private toggleLargeScreenPopover() {
    this.setState(({largeScreenPopoverVisible}) => ({largeScreenPopoverVisible: !largeScreenPopoverVisible}));
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
