import * as React from 'react';
import {closest} from '@shopify/javascript-utilities/dom';
import {
  focusFirstFocusableNode,
  findFirstFocusableNode,
  focusLastFocusableNode,
} from '@shopify/javascript-utilities/focus';

import EventListener from '../EventListener';
import Focus from '../Focus';

export interface Props {
  trapping?: boolean;
  children?: React.ReactNode;
}

export interface State {
  shouldFocusSelf: boolean | undefined;
}

export default class TrapFocus extends React.PureComponent<Props, State> {
  state = {
    shouldFocusSelf: undefined,
  };

  private focusTrapWrapper: HTMLElement;

  componentDidMount() {
    this.setState(this.handleTrappingChange());
  }

  handleTrappingChange() {
    const {trapping = true} = this.props;

    if (this.focusTrapWrapper.contains(document.activeElement)) {
      return {shouldFocusSelf: false};
    }

    return {shouldFocusSelf: trapping};
  }

  render() {
    const {children} = this.props;

    return (
      <Focus disabled={this.shouldDisable}>
        <div ref={this.setFocusTrapWrapper}>
          <EventListener event="focusout" handler={this.handleBlur} />
          {children}
        </div>
      </Focus>
    );
  }

  private get shouldDisable() {
    const {trapping = true} = this.props;
    const {shouldFocusSelf} = this.state;

    if (shouldFocusSelf === undefined) {
      return true;
    }

    return shouldFocusSelf ? !trapping : !shouldFocusSelf;
  }

  private setFocusTrapWrapper = (node: HTMLDivElement) => {
    this.focusTrapWrapper = node;
  };

  private handleBlur = (event: FocusEvent) => {
    const {relatedTarget} = event;
    const {focusTrapWrapper} = this;
    const {trapping = true} = this.props;

    if (relatedTarget == null || trapping === false) {
      return;
    }

    if (
      focusTrapWrapper &&
      !focusTrapWrapper.contains(relatedTarget as HTMLElement) &&
      !closest(relatedTarget as HTMLElement, '[data-polaris-overlay]')
    ) {
      event.preventDefault();

      if (event.srcElement === findFirstFocusableNode(focusTrapWrapper)) {
        return focusLastFocusableNode(focusTrapWrapper);
      }
      focusFirstFocusableNode(focusTrapWrapper);
    }
  };
}
