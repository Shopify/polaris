import * as React from 'react';
import {CSSTransition} from 'react-transition-group';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import {Action} from '../../../../types';
import {Duration} from '../../../shared';
import {
  Checkbox,
  Icon,
  // ActionList,
  // Popover,
  ActionListProps,
} from '../../../';

import selectIcon from './icons/enable-selection.svg';
import * as styles from './BulkActions.scss';

export interface Props {
  accessibilityLabel?: string,
  label?: string,
  selected?: boolean | 'indeterminate',
  selectMode?: boolean,
  primaryAction?: Action,
  secondaryActions?: ActionListProps['sections'],
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

  render() {
    const {
      selectMode,
    } = this.props;

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

    const plainCheckableButton = this.renderCheckableButton(true);

    const checkableButton = this.renderCheckableButton();

    // const bulkActions = this.renderBulkActions();

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
              {checkableButton}
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

    const largeScreenGroupClassName = classNames(styles.Group, styles['Group-largeScreen']);
    const largeScreenGroup = (
      <div key="largeScreenGroup" className={largeScreenGroupClassName}>
        <CSSTransition
          in={selectMode}
          timeout={Duration.Base}
          classNames={fadeClasses}
          mountOnEnter
          unmountOnExit
        >
          <div className={styles.ButtonGroup}>
              {checkableButton}
          </div>
        </CSSTransition>
        <CSSTransition
          in={!selectMode}
          timeout={Duration.Base}
          classNames={fadeClasses}
          mountOnEnter
          unmountOnExit
        >
          {plainCheckableButton}
        </CSSTransition>
      </div>
    );

    return [
      smallScreenGroup,
      largeScreenGroup,
    ];
  }

  @autobind
  private renderCheckableButton(plain?: boolean) {
    const {accessibilityLabel, label = '', onToggleAll, selected, selectMode} = this.props;
    const className = plain
      ? classNames(styles.CheckableButton, styles['CheckableButton-plain'])
      : classNames(
        styles.CheckableButton,
        selectMode && styles['CheckableButton-selectMode'],
        selected && styles['CheckableButton-selected'],
      );

    return (
      <div
        tabIndex={0}
        role="button"
        aria-pressed="true"
        aria-label={accessibilityLabel || label}
        className={className}
        onClick={onToggleAll}
      >
        <div className={styles.Checkbox}>
          <Checkbox
            label={label}
            labelHidden
            checked={selected}
          />
        </div>
        <span className={styles.Label}>{label}</span>
      </div>
    );
  }
// private renderBulkActions() {
//   return (
//     <div className={styles.Actions}>
//       {this.renderPrimaryActions()}
//       {this.renderSecondaryActions()}
//     </div>
//   );
// }
  // @autobind
  // private renderBulkActions() {
  //   return (
  //     <div className={styles.Action}>
  //       {this.renderPrimaryActions()}
  //       {this.renderSecondaryActions()}
  //     </div>
  //   );
  // }

  // @autobind
  // private renderPrimaryActions() {
  //   const {
  //     primaryAction,
  //   } = this.props;

  //   const primaryActionsMarkup = primaryAction
  //     ? (
  //       <button className={styles.Button} onClick={primaryAction.onAction}>
  //         {primaryAction.content}
  //       </button>
  //     )
  //     : null;

  //   return primaryActionsMarkup;
  // }

  // @autobind
  // private renderSecondaryActions() {
  //   const {
  //     secondaryActions,
  //   } = this.props;
  //   const {
  //     popoverVisible,
  //   } = this.state;

  //   const caretDownButtonMarkup = (
  //     <button className={styles.Button} onClick={this.togglePopover}>
  //       Actions
  //       <span className={styles.Icon}>
  //         <Icon source="caretDown" />
  //       </span>
  //     </button>
  //   );

  //   const secondaryActionsMarkup = secondaryActions
  //     ? (
  //       <div className={styles.Popover}>
  //         <Popover
  //           active={popoverVisible}
  //           activator={caretDownButtonMarkup}
  //           onClose={this.togglePopover}
  //         >
  //           <ActionList sections={secondaryActions} />
  //         </Popover>
  //       </div>
  //     )
  //     : null;

  //   return secondaryActionsMarkup;

  // }

  // @autobind
  // private togglePopover() {
  //   this.setState(({popoverVisible}) => ({popoverVisible: !popoverVisible}));
  // }

  @autobind private setSelectMode(val: boolean) {
    const {onSelectModeToggle} = this.props;
    if (onSelectModeToggle) {
      onSelectModeToggle(val);
    }
  }
}

