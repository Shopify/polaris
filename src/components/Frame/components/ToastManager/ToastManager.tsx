import * as React from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {autobind} from '@shopify/javascript-utilities/decorators';
import {classNames} from '@shopify/react-utilities/styles';
import Toast from '../Toast';
import {ToastDescriptor} from '../../../types';
import {Portal, EventListener} from '../../..';
import * as styles from './ToastManager.scss';

export interface Props {
  toastMessages: (ToastDescriptor & {id: string})[];
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
          in
          enter
          mountOnEnter
          unmountOnExit
          timeout={{enter: 0, exit: 300}}
          classNames={toastClasses}
        >
          <div ref={this.toastNodes[index]} aria-live="polite">
            <Toast {...toast} />
          </div>
        </CSSTransition>
      );
    });

    return (
      <Portal idPrefix="ToastMessages">
        <EventListener event="resize" handler={this.updateToasts} />
        <div className={styles.ToastManager}>
          <TransitionGroup component="div">{toastsMarkup}</TransitionGroup>
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
        currentToast.style.setProperty(
          '--toast-translate-y-in',
          `-${targetInPos}px`,
        );
        currentToast.style.setProperty(
          '--toast-translate-y-out',
          `${-targetInPos + 150}px`,
        );
        targetInPos += currentToast.clientHeight;
      }
    });
  }
}

const toastClasses = {
  enter: classNames(styles.ToastWrapper, styles['ToastWrapper-enter']),
  enterDone: classNames(styles.ToastWrapper, styles['ToastWrapper-enter-done']),
  exit: classNames(styles.ToastWrapper, styles['ToastWrapper-exit']),
};
