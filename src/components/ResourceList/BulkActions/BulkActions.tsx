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

export interface Props {
  accessibilityLabel?: string,
  label?: string,
  selected?: boolean | 'indeterminate',
  selectMode?: boolean,
  actions: {
    primaryAction?: DisableableAction,
    secondaryAction?: DisableableAction,
    tertiaryActions?: (DisableableAction | ActionListSection)[],
  },
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

  private get allActionsSections(): ActionListSection[] | undefined {
    const {actions: {primaryAction, secondaryAction}} = this.props;

    const firstSectionItems: DisableableAction[] = [];
    if (primaryAction) { firstSectionItems.push(primaryAction); }
    if (secondaryAction) { firstSectionItems.push(secondaryAction); }

    if (firstSectionItems.length === 0) {
      return this.tertiarySections;
    }

    if (!this.tertiarySections) {
      return [{
        items: firstSectionItems,
      }];
    }

    return [
      {
        items: firstSectionItems,
      },
      ...this.tertiarySections,
    ];

  }

  private get tertiarySections(): ActionListSection[] | undefined {
    const {actions: {tertiaryActions}} = this.props;

    if (
      !tertiaryActions ||
      tertiaryActions.length === 0
    ) { return; }

    if (instanceOfActionListSectionArray(tertiaryActions)) {
      return tertiaryActions;
    }

    if (instanceOfDisableableActionArray(tertiaryActions)) {
      return [{
        items: tertiaryActions,
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
      actions: {
        primaryAction,
        secondaryAction,
      },
    } = this.props;

    const {smallScreenPopoverVisible, largeScreenPopoverVisible} = this.state;

    const cancelButtonClassName = classNames(styles.Button, styles['Button-cancel']);
    const cancelButton = (
      <button className={cancelButtonClassName} onClick={this.setSelectMode.bind(this, false)}>
        Cancel
      </button>
    );

    const allActionsPopover = this.allActionsSections
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
              sections={this.allActionsSections}
              onActionAnyItem={this.toggleSmallScreenPopover}
            />
          </Popover>
        </div>
      )
      : null;

    const primaryButton = primaryAction
      ? <Action {...primaryAction} />
      : null;

    const secondaryButton = secondaryAction
      ? <Action {...secondaryAction} />
      : null;

    const tertiaryActionsPopover = this.tertiarySections
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
              sections={this.tertiarySections}
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
            {primaryButton}
            {secondaryButton}
            {tertiaryActionsPopover}
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

function instanceOfActionListSectionArray(
  actions: (DisableableAction | ActionListSection)[],
): actions is ActionListSection[] {
  const validList = actions.filter((action: any) => {
    return action.items;
  });

  return actions.length === validList.length;
}

function instanceOfDisableableActionArray(
  actions: (DisableableAction | ActionListSection)[],
): actions is DisableableAction[] {
  const validList = actions.filter((action: any) => {
    return !action.items;
  });

  return actions.length === validList.length;
}
