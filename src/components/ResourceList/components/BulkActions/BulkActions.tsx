import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {DisableableAction} from '../../../../types';
import {Duration} from '../../../shared';
import {
  ActionList,
  Popover,
} from '../../../';
import Action from './Action';
import CheckableButton from './CheckableButton';

import * as styles from './BulkActions.scss';

export interface Props {
  accessibilityLabel?: string,
  label?: string,
  selected?: boolean | 'indeterminate',
  selectMode?: boolean,
  actions?: DisableableAction[],
  onToggleAll?(): void,
  onSelectModeToggle?(selectMode: boolean): void,
}

export interface State {
  popoverVisible: boolean,
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
    popoverVisible: false,
  };

  private actionsActivatorLabel = 'Actions';

  render() {
    const {
      selectMode,
      accessibilityLabel,
      label = '',
      onToggleAll,
      selected,
      actions,
    } = this.props;

    const {popoverVisible} = this.state;

    const checkableButtonProps = {
      accessibilityLabel,
      label,
      selected,
      selectMode,
      onToggleAll,
    };

    const cancelButtonClassName = classNames(styles.Button, styles['Button-cancel']);
    const cancelButton = (
      <button className={cancelButtonClassName} onClick={this.setSelectMode.bind(this, false)}>
        Cancel
      </button>
    );

    const activatorButtonMarkup = (
      <Action disclosure onAction={this.togglePopover}>{this.actionsActivatorLabel}</Action>
    );

    const popoverActions = actions
      ? (
        <div className={styles.Popover}>
          <Popover
            active={popoverVisible}
            activator={activatorButtonMarkup}
            onClose={this.togglePopover}
          >
            <ActionList
              items={actions}
              onActionAnyItem={this.togglePopover}
            />
          </Popover>
        </div>
      )
      : null;

    const smallScreenGroupClassName = classNames(styles.Group, styles.Group['smallScreen']);
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
            {popoverActions}
            {cancelButton}
          </div>
        </CSSTransition>
      </div>
    );

    return smallScreenGroup;
  }

  @autobind private setSelectMode(val: boolean) {
    const {onSelectModeToggle} = this.props;
    if (onSelectModeToggle) {
      onSelectModeToggle(val);
    }
  }

  @autobind
  private togglePopover() {
    this.setState(({popoverVisible}) => ({popoverVisible: !popoverVisible}));
  }
}

