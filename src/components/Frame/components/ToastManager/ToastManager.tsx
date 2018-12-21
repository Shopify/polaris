import * as React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import EventListener from '../../../EventListener';
import Portal from '../../../Portal';
import {ToastPropsWithID} from '../../types';
import Toast from '../Toast';

import * as styles from './ToastManager.scss';

export interface Props {
  toastMessages: (ToastPropsWithID)[];
}

export default class ToastManager extends React.PureComponent<Props, never> {
  private toastNodes: React.RefObject<HTMLDivElement>[] = [];

  componentDidUpdate() {
    this.updateToasts();
  }

  render() {
    const {toastMessages} = this.props;

    const toastsMarkup = toastMessages.map((toast, index) => {
      this.toastNodes[index] = React.createRef();

      return (
        <CSSTransition
          key={toast.id}
          timeout={{enter: 0, exit: 400}}
          classNames={toastClasses}
        >
          <div ref={this.toastNodes[index]} aria-live="polite">
            <Toast {...toast} />
          </div>
        </CSSTransition>
      );
    });

    return (
      <Portal idPrefix="toast-manager">
        <EventListener event="resize" handler={this.updateToasts} />
        <div className={styles.ToastManager}>
          <TransitionGroup component={null}>{toastsMarkup}</TransitionGroup>
        </div>
      </Portal>
    );
  }

  @autobind
  updateToasts() {
    const {toastMessages} = this.props;

    let targetInPos = 0;

    toastMessages.forEach((_toast, i) => {
      const currentToast = this.toastNodes[i].current;
      if (currentToast) {
        targetInPos += currentToast.clientHeight;
        currentToast.style.setProperty(
          '--toast-translate-y-in',
          `-${targetInPos}px`,
        );
        currentToast.style.setProperty(
          '--toast-translate-y-out',
          `${-targetInPos + 150}px`,
        );
      }
    });
  }
}

const toastClasses = {
  enter: classNames(styles.ToastWrapper, styles['ToastWrapper-enter']),
  enterDone: classNames(styles.ToastWrapper, styles['ToastWrapper-enter-done']),
  exit: classNames(styles.ToastWrapper, styles['ToastWrapper-exit']),
};
