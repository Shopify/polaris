import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {DisableableAction} from '../../../../types';
import {Duration} from '../../../shared';
import {
  Icon,
  ActionList,
  Popover,
 // ActionListProps,
} from '../../../';
import Action from './Action';
import CheckableButton from './CheckableButton';


import selectIcon from './icons/enable-selection.svg';
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

export type Actions = DisableableAction;

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

    const cancelButtonClassName = classNames(styles.Button, styles['Button-cancel']);
    const cancelButton = (
      <button className={cancelButtonClassName} onClick={this.setSelectMode.bind(this, false)}>
        Cancel
      </button>
    );

    const selectButtonClassName = classNames(styles.Button, styles['Button-select']);
    const selectButton = (
      <button className={selectButtonClassName} onClick={this.setSelectMode.bind(this, true)}>
        <span className={styles.Icon}>
          <Icon source={selectIcon} />
        </span>
        Select
      </button>
    );

    const checkableButtonProps = {
      accessibilityLabel,
      label,
      selected,
      selectMode,
      onToggleAll,
    };

    const checkableButton = <CheckableButton {...checkableButtonProps} />;

    const caretDownButtonMarkup = (
      <Action disclosure onAction={this.togglePopover}>Actions</Action>
    );

    const popoverActions = actions
      ? (
        <div className={styles.Popover}>
          <Popover
            active={popoverVisible}
            activator={caretDownButtonMarkup}
            onClose={this.togglePopover}
          >
            <ActionList items={actions} />
          </Popover>
        </div>
      )
      : null;

    const smallScreenGroupClassName = classNames(styles.Group, styles['Group-smallScreen']);
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
              <div className={styles.slideWrapper}>
                {checkableButton}
                {popoverActions}
              </div>
            </CSSTransition>
            {cancelButton}
          </div>
        </CSSTransition>
        <CSSTransition
          in={!selectMode}
          timeout={Duration.Base}
          classNames={fadeClasses}
          mountOnEnter
          unmountOnExit
        >
          {selectButton}
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

